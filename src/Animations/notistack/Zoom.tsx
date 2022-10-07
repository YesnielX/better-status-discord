/**
 * Credit to MUI team @ https://mui.com
 */
import {
  Transition,
  TransitionHandlerProps,
  TransitionProps,
  TransitionStatus,
} from "notistack";
import * as React from "react";
import {
  createTransition,
  getTransitionProps,
  reflow,
  useForkRef,
} from "./shared";

const styles: Partial<Record<TransitionStatus, React.CSSProperties>> = {
  entering: {
    transform: "none",
  },
  entered: {
    transform: "none",
  },
};

const Zoom = React.forwardRef<HTMLDivElement, TransitionProps>((props, ref) => {
  const {
    children,
    in: inProp,
    style,
    timeout = 0,
    onEnter,
    onEntered,
    onExit,
    onExited,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    direction, // Take this out since this is a Slide-only prop
    ...other
  } = props;

  const nodeRef = React.useRef(null);
  const handleRefIntermediary = useForkRef((children as any).ref, ref);
  const handleRef = useForkRef(nodeRef, handleRefIntermediary);

  const handleEnter: TransitionHandlerProps["onEnter"] = (
    node,
    isAppearing,
    snackId
  ) => {
    reflow(node);

    const transitionProps = getTransitionProps({
      style,
      timeout,
      mode: "enter",
    });
    node.style.webkitTransition = createTransition(
      "transform",
      transitionProps
    );
    node.style.transition = createTransition("transform", transitionProps);

    if (onEnter) {
      onEnter(node, isAppearing, snackId);
    }
  };

  const handleExit: TransitionHandlerProps["onExit"] = (node, snackId) => {
    const transitionProps = getTransitionProps({
      style,
      timeout,
      mode: "exit",
    });
    node.style.webkitTransition = createTransition(
      "transform",
      transitionProps
    );
    node.style.transition = createTransition("transform", transitionProps);

    if (onExit) {
      onExit(node, snackId);
    }
  };

  return (
    <Transition
      appear
      in={inProp}
      nodeRef={nodeRef}
      onEnter={handleEnter}
      onEntered={onEntered}
      onExit={handleExit}
      onExited={onExited}
      timeout={timeout}
      {...other}
    >
      {(state, childProps) =>
        React.cloneElement(children as any, {
          style: {
            transform: "scale(0)",
            visibility: state === "exited" && !inProp ? "hidden" : undefined,
            ...styles[state],
            ...style,
            ...(children as any).props.style,
          },
          ref: handleRef,
          ...childProps,
        })
      }
    </Transition>
  );
});

Zoom.displayName = "Zoom";

export default Zoom;
