// @ts-nocheck

import { assign } from "xstate";
import commands from "./commands";
import states from "./states";

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

export default transitions;
