import commands from "./commands";
import states from "./states";

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

export default transitions;
