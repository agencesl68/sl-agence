import React from 'react';
import { Composition } from 'remotion';
import { Reel } from './Reel';
import L from './timeline.json';

export const Racine: React.FC = () => (
  <Composition id="Reel" component={Reel} durationInFrames={L.duree} fps={L.fps} width={L.largeur} height={L.hauteur} />
);
