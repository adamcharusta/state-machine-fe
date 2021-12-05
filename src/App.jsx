import React, { useState } from "react";
import { commands, states, transition } from "./helpers/stateMachine";

import Button from "./components/Button";
import Container from "./components/Container";
import ImgBox from "./components/ImgBox";
import { apiUrl } from "./helpers/api";
import axios from "axios";
import random from "lodash/random";

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
      <ImgBox
        src={imgSrc}
        isLoading={compareState(states.isLoading)}
        isError={compareState(states.isError)}
        isEmpty={compareState(states.isEmpty)}
      />
      <Button onClick={handleClick} disabled={compareState(states.isLoading)}>
        {compareState(states.isLoaded) ? "One more?" : "Load picture."}
      </Button>
    </Container>
  );
}
