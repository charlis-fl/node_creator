import { useRef } from 'react';
import lottie from 'lottie-web';
import { LoaderProps } from 'common/designSystem/loader/types';
import { useEffectOnce } from 'common/hooks/useEffectOnce';
import { LoaderLayout } from './LoaderLayout';
import * as animationData from './lottie.json';

const Loader = (
  {
    width = '240px',
    height = '240px',
  }: LoaderProps,
) => {
  const lottieLoader = useRef(null);
  useEffectOnce(() => {
    const lottieLoaderElement = lottieLoader.current;
    if (lottieLoaderElement) {
      lottie.loadAnimation({
        container: lottieLoaderElement,
        animationData,
      });
    }
  });
  return (
    <LoaderLayout width={width} height={height}>
      <div className="render-loader" ref={lottieLoader}></div>
    </LoaderLayout>
  );
};

export default Loader;
