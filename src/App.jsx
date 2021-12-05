import React, { useState } from "react";
import { commands, states, transitions } from "./helpers/stateMachine";

import Button from "./components/Button";
import Container from "./components/Container";
import ImgBox from "./components/ImgBox";
import { apiUrl } from "./helpers/api";
import axios from "axios";
import { createMachine } from "xstate";
import random from "lodash/random";
import { useMachine } from "@xstate/react";

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
  const [{ matches, context }, send] = useMachine(pictureMachine);

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
      {matches(states.isEmpty) && (
        <span className="font-bold">
          What are you waiting for? Upload a photo.
        </span>
      )}
      <ImgBox
        src={context.imageSrc}
        isLoading={matches(states.isLoading)}
        isError={matches(states.isError)}
      />
      <Button onClick={handleClick} disabled={matches(states.isLoading)}>
        {matches(states.isLoaded) ? "One more?" : "Load picture."}
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
