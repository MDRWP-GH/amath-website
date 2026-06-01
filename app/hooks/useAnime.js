'use client';

import { useCallback, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { ANIMATION_PRESETS } from '../components/anime/presets';

/**
 * Hook for imperative anime.js control. Returns a ref to attach to any element.
 *
 * @example
 * const { ref, play } = useAnime({ preset: 'fadeInUp', autoPlay: false });
 * return <button ref={ref} onClick={play}>Animate</button>
 */
export function useAnime({ preset, animation = {}, autoPlay = true, trigger = 'mount', threshold = 0.15 } = {}) {
  const ref = useRef(null);
  const instanceRef = useRef(null);
  const animationRef = useRef(animation);
  animationRef.current = animation;

  const play = useCallback(() => {
    const el = ref.current;
    if (!el) return null;

    const presetParams = preset ? ANIMATION_PRESETS[preset] : {};
    const params = { ...presetParams, ...animationRef.current };

    instanceRef.current?.revert?.();
    instanceRef.current = animate(el, params);
    return instanceRef.current;
  }, [preset]);

  useEffect(() => {
    if (!autoPlay) return undefined;

    const el = ref.current;
    if (!el) return undefined;

    if (trigger === 'mount') {
      play();
      return () => instanceRef.current?.revert?.();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      instanceRef.current?.revert?.();
    };
  }, [autoPlay, trigger, threshold, play]);

  const revert = useCallback(() => {
    instanceRef.current?.revert?.();
    instanceRef.current = null;
  }, []);

  return { ref, play, revert, instance: instanceRef };
}
