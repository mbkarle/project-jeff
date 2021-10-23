import { useEffect, useState } from "react";
import { gsap } from "gsap";

export const useSlideDown = (ref, shouldOpen, duration) => {
  // avoid animations on initial render
  const [isInitialRender, setIsInitialRender] = useState(true);
  // maintain own open state
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const targetHeight = shouldOpen ? "auto" : 0;
    const oldHeight = isOpen ? "auto" : 0;
    const updateHeight = () => gsap.set(ref.current, { height: targetHeight });
    updateHeight(); // set height to target
    // if initial render, don't animate
    if (isInitialRender) {
      setIsInitialRender(false);
    } else if (isOpen !== shouldOpen) {
      // if not initial render, and shouldOpen has diverged from internal open status
      // trigger animation for open/close process
      gsap.from(ref.current, { height: oldHeight, duration, onComplete: updateHeight }); // re-set height oncomplete to get "auto" instead of hard-coded pixels from animation
    }

    setIsOpen(shouldOpen);
  }, [isOpen, shouldOpen, duration, isInitialRender]);
};
