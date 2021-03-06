import { h } from 'preact';
import { BackgroundImage } from './BackgroundImage';

export const RandomUnsplashImage = () => {
  const pixelRatio = window.devicePixelRatio;

  const realWidth = Math.round(window.screen.width * pixelRatio);
  const realHeight = Math.round(window.screen.height * pixelRatio);

  const dimensions = {
    height: realHeight,
    width: realWidth,
  };

  return (
    <BackgroundImage dimensions={dimensions} url={`https://source.unsplash.com/collection/${process.env.UNSPLASH_COLLECTION_ID}/${realWidth}x${realHeight}/daily`} />
  );
};
