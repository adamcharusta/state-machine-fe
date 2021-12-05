import React, { useState } from "react";

import Button from "./components/Button";
import Container from "./components/Container";
import ImgBox from "./components/ImgBox";
import { apiUrl } from "./helpers/api";
import axios from "axios";
import random from "lodash/random";

export default function App() {
  const [imgSrc, setImgSrc] = useState(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    setIsError(false);
    setImgSrc(null);
    setIsLoading(true);
    setIsLoaded(false);
    setIsEmpty(true);

    const randomId = random(0, 1000);

    axios(apiUrl(randomId))
      .then((res) => {
        setIsLoading(false);
        setIsLoaded(true);
        setIsEmpty(false);
        setImgSrc(res.config.url);
      })
      .catch(() => {
        setIsLoading(false);
        setIsLoaded(false);
        setIsError(true);
        setIsEmpty(false);
      });
  };

  return (
    <Container>
      <ImgBox
        src={imgSrc}
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
      />
      <Button onClick={handleClick} disabled={isLoading}>
        {isLoaded ? "One more?" : "Load picture."}
      </Button>
    </Container>
  );
}
