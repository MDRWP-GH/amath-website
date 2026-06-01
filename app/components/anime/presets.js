/** Reusable animation presets for the Anime component (anime.js v4). */
export const ANIMATION_PRESETS = {
  fadeIn: {
    opacity: { from: 0, to: 1 },
    duration: 800,
    ease: 'outExpo',
  },
  fadeInUp: {
    opacity: { from: 0, to: 1 },
    translateY: { from: 48, to: 0 },
    duration: 900,
    ease: 'outExpo',
  },
  fadeInDown: {
    opacity: { from: 0, to: 1 },
    translateY: { from: -48, to: 0 },
    duration: 900,
    ease: 'outExpo',
  },
  scaleIn: {
    opacity: { from: 0, to: 1 },
    scale: { from: 0.85, to: 1 },
    duration: 800,
    ease: 'outBack',
  },
};
