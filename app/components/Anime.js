'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { ANIMATION_PRESETS } from './anime/presets';

export { ANIMATION_PRESETS };

/**
 * Wraps content and runs an anime.js animation on mount or when scrolled into view.
 *
 * @example
 * <Anime preset="fadeInUp" trigger="inView">
 *   <h2>Animated heading</h2>
 * </Anime>
 *
 * @example
 * <Anime animation={{ opacity: { from: 0, to: 1 }, duration: 1200, delay: 200 }}>
 *   <p>Custom params</p>
 * </Anime>
 */
export default function Anime({
  children,
  as: Tag = 'div',
  preset,
  animation = {},
  trigger = 'mount',
  threshold = 0.15,
  className,
  style,
  ...rest
}) {
  const ref = useRef(null);
  const instanceRef = useRef(null);
  const animationRef = useRef(animation);
  animationRef.current = animation;
  const [pending, setPending] = useState(trigger === 'inView');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const presetParams = preset ? ANIMATION_PRESETS[preset] : {};
    const params = { ...presetParams, ...animationRef.current };

    const run = () => {
      setPending(false);
      instanceRef.current?.revert?.();
      instanceRef.current = animate(el, params);
    };

    if (trigger === 'mount') {
      run();
      return () => instanceRef.current?.revert?.();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
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
  }, [preset, trigger, threshold]);

  const classes = [className, pending && 'anime-pending'].filter(Boolean).join(' ') || undefined;

  return (
    <Tag ref={ref} className={classes} style={style} {...rest}>
      {children}
    </Tag>
  );
}
