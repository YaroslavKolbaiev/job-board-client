import { useTransition } from "@react-spring/web";

export const useTransitionHook = () => {
  const transitions = useTransition(1, {
    from: { opacity: 0, transform: "translate3d(-100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 1 },
  });

  return {
    transitions
  }
}