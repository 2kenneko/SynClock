import { useState } from "react";

export const useCounter = () => {
  const [count, setCount] = useState(0);

  // カウントを1増やす
  const incrementCount = () => setCount((count) => count + 1);

  // カウントを1減らす
  const decrementCount = () => setCount((count) => count - 1);

  return [count, { setCount, incrementCount, decrementCount }];
};
