import transitions from "./transitions";

export default function transition(currentState, action) {
  const nextState = transitions[currentState][action];
  return nextState || currentState;
}
