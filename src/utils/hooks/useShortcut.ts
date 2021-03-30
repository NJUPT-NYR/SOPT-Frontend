import { useCallback, useEffect, useRef } from "react";

export default function useShortCutTriggerClick() {
  const env = useRef({ registers: [] });
  useEffect(() => {
    const handleKeyDown = (event) => {
      const targets = (env.current.registers ?? []).filter(
        (one) =>
          one.key === event.key &&
          event.metaKey === !!one.metaKey &&
          event.shiftKey === !!one.shiftKey &&
          event.ctrlKey === !!one.ctrlKey
      );
      if (targets.length) {
        targets.forEach((one) => {
          one.callback(event);
        });
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const register = useCallback(
    (config: {
      callback: () => void;
      key: string;
      metaKey?: boolean;
      shiftKey?: boolean;
      ctrlKey?: boolean;
    }) => {
      env.current.registers.push(config);
    },
    [env]
  );
  const revokeAll = useCallback(() => {
    env.current.registers = [];
  }, []);
  return { register, revokeAll };
}
