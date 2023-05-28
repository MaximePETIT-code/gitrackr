import { useState, useEffect } from "react";

export function useScreenSize(maxSize) {
  const [isScreenSizeBelowMax, setIsScreenSizeBelowMax] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsScreenSizeBelowMax(window.innerWidth <= maxSize);
    }

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Check initial screen size
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [maxSize]);

  return isScreenSizeBelowMax;
}
