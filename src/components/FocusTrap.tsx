import { useEffect } from "react";

export default function useFocusTrap(
  active: boolean,
  ref: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const container = ref.current;
    const selectors = "a[href], button, input, select, textarea, [tabindex]";
    const getFocusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(selectors));

    const onKey = (e: KeyboardEvent) => {
      // Handle Tab key for focus trapping
      if (e.key === "Tab") {
        const focusables = getFocusables();
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        return;
      }

      // Prevent arrow key scrolling when NavDrawer is open
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "PageUp", "PageDown", "Home", "End", "Space"].includes(e.key)) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, ref]);
}
