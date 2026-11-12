import React from 'react';
import { Composition, Still } from 'remotion';
import { Couverture } from './Couverture';
import { Reel } from './Reel';
import L from './timeline.json';

export const Racine: React.FC = () => (
  <>
    <Composition id="Reel" component={Reel} durationInFrames={L.duree} fps={L.fps} width={L.largeur} height={L.hauteur} />
    <Still id="Couverture" component={Couverture} width={L.largeur} height={L.hauteur} />
  </>
);
