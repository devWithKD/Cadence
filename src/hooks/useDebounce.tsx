import { useEffect, useState } from "react";

const useDebounce = <T,>(value: T, delay = 500) => {
  const [debounceVal, setDebounceVal] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceVal(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debounceVal;
};

export default useDebounce;
