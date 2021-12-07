import React, { useState } from "react";

import Button from "./components/Button";
import Container from "./components/Container";
import ImgBox from "./components/ImgBox";
import { apiUrl } from "./helpers/api";
import axios from "axios";
import random from "lodash/random";

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
    [commands.FETCH_IMG]: states.isLoading,
  },
  [states.isLoading]: {
    [commands.FETCH_IMG_SUCCESS]: states.isLoaded,
    [commands.FETCH_IMG_ERROR]: states.isError,
  },
  [states.isLoaded]: {
    [commands.FETCH_IMG]: states.isLoading,
  },
  [states.isError]: {
    [commands.FETCH_IMG]: states.isLoading,
  },
};

function transition(currentState, action) {
  const nextState = transitions[currentState][action];
  return nextState || currentState;
}

export default function App() {
  const [currentState, setCurrentState] = useState(states.isEmpty);
  const [imgSrc, setImgSrc] = useState(null);

  function updateState(action) {
    setCurrentState((currentState) => transition(currentState, action));
  }

  const compareState = (state) => currentState === state;

  const handleClick = () => {
    updateState(commands.FETCH_IMG);
    setImgSrc(null);

    const randomId = random(0, 1000);

    axios(apiUrl(randomId))
      .then((res) => {
        setImgSrc(res.config.url);
        updateState(commands.FETCH_IMG_SUCCESS);
      })
      .catch(() => {
        updateState(commands.FETCH_IMG_ERROR);
      });
  };

  return (
    <Container>
      {compareState(states.isEmpty) && (
        <span className="font-bold">
          What are you waiting for? Upload a photo.
        </span>
      )}
      <ImgBox
        src={imgSrc}
        isLoading={compareState(states.isLoading)}
        isError={compareState(states.isError)}
      />
      <Button onClick={handleClick} disabled={compareState(states.isLoading)}>
        {compareState(states.isLoaded) ? "One more?" : "Load picture."}
      </Button>
    </Container>
  );
}
