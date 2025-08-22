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
      if (e.key !== "Tab") return;
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
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, ref]);
}
