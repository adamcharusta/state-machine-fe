import React, { useState } from "react";
import { assign, createMachine } from "xstate";

import Button from "./components/Button";
import Container from "./components/Container";
import ImgBox from "./components/ImgBox";
import { apiUrl } from "./helpers/api";
import axios from "axios";
import random from "lodash/random";
import { useMachine } from "@xstate/react";

const commands = {
  FETCH_IMG: "FETCH_IMG",
  FETCH_IMG_SUCCESS: "FETCH_IMG_SUCCESS",
  FETCH_IMG_ERROR: "FETCH_IMG_ERROR",
};

const states = {
  isEmpty: "empty",
  isLoading: "loading",
  isLoaded: "loaded",
  isError: "error",
};

const transitions = {
  [states.isEmpty]: {
    on: {
      [commands.FETCH_IMG]: {
        target: states.isLoading,
        actions: assign({ imageSrc: (context, event) => event.imageSrc }),
        cond: (context, event) => event.isReady,
      },
    },
  },
  [states.isLoading]: {
    on: {
      [commands.FETCH_IMG_SUCCESS]: {
        target: states.isLoaded,
        actions: assign({ imageSrc: (context, event) => event.imageSrc }),
      },
      [commands.FETCH_IMG_ERROR]: states.isError,
    },
  },
  [states.isLoaded]: {
    on: {
      [commands.FETCH_IMG]: {
        target: states.isLoading,
        actions: assign({ imageSrc: (context, event) => event.imageSrc }),
        cond: (context, event) => event.isReady,
      },
    },
  },
  [states.isError]: {
    on: {
      [commands.FETCH_IMG]: {
        target: states.isLoading,
        actions: assign({ imageSrc: (context, event) => event.imageSrc }),
        cond: (context, event) => event.isReady,
      },
    },
  },
};

const pictureMachine = createMachine({
  id: "picture",
  context: {
    imgSrc: null,
  },
  initial: states.isEmpty,
  states: transitions,
});

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [currentMachine, send] = useMachine(pictureMachine);

  const handleClick = () => {
    send(commands.FETCH_IMG, { imageSrc: null, isReady });
    const randomId = random(0, 1000);

    axios(apiUrl(randomId))
      .then((res) => {
        setIsReady(false);
        send(commands.FETCH_IMG_SUCCESS, { imageSrc: res.config.url });
      })
      .catch(() => {
        setIsReady(false);
        send(commands.FETCH_IMG_ERROR);
      });
  };

  return (
    <Container>
      {currentMachine.matches(states.isEmpty) && (
        <span className="font-bold">
          What are you waiting for? Upload a photo.
        </span>
      )}
      <ImgBox
        src={currentMachine.context.imageSrc}
        isLoading={currentMachine.matches(states.isLoading)}
        isError={currentMachine.matches(states.isError)}
      />
      <Button
        onClick={handleClick}
        disabled={currentMachine.matches(states.isLoading)}
      >
        {currentMachine.matches(states.isLoaded)
          ? "One more?"
          : "Load picture."}
      </Button>
      <label htmlFor="checkox">
        <input
          type="checkbox"
          id="checkox"
          checked={isReady}
          onChange={(e) => setIsReady(e.target.checked)}
        />
        <span className="font-bold select-none cursor-pointer">
          Are you sure you want to upload the picture?
        </span>
      </label>
    </Container>
  );
}
