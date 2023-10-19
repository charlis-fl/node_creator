import { useEffect, useRef, useState } from 'react';

export const useEffectOnce = (effect: () => void | (() => void)) => {
  const destroyFunc = useRef<void |(() => void)>();
  const effectCalled = useRef(false);
  const renderAfterCalled = useRef(false);
  const [value, setValue] = useState<number>(0);

  if (effectCalled.current) {
    renderAfterCalled.current = true;
  }

  useEffect(() => {
    if (!effectCalled.current) {
      destroyFunc.current = effect();
      effectCalled.current = true;
    }
    // eslint-disable-next-line no-shadow
    setValue((val) => val + 1);

    return () => {
      if (!renderAfterCalled.current) {
        return;
      }
      if (destroyFunc.current) {
        destroyFunc.current();
      }
    };
  }, []);
};
