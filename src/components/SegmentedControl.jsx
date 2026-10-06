import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import '../styles/SegmentedControl.css';

/** Controle segmentado com indicador elástico que desliza entre as opções. */
export default function SegmentedControl({ options, value, onChange, label }) {
  const rootRef = useRef(null);
  const [pill, setPill] = useState({ w: 0, h: 0, x: 0, y: 0 });
  const [pressed, setPressed] = useState(false);

  const measure = useCallback(() => {
    const el = rootRef.current?.querySelector('[aria-checked="true"]');
    if (el) setPill({ w: el.offsetWidth, h: el.offsetHeight, x: el.offsetLeft, y: el.offsetTop });
  }, []);

  useLayoutEffect(measure, [value, measure]);

  useEffect(() => {
    const observer = new ResizeObserver(measure);
    observer.observe(rootRef.current);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [measure]);

  const release = () => setPressed(false);

  return (
    <div
      ref={rootRef}
      className="seg"
      role="radiogroup"
      aria-label={label}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
    >
      <div
        className={pressed ? 'seg__pill is-pressed' : 'seg__pill'}
        style={{ width: pill.w, height: pill.h, transform: `translate(${pill.x}px, ${pill.y}px)` }}
      />
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            className={active ? 'seg__opt is-active' : 'seg__opt'}
            onPointerDown={() => active && setPressed(true)}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
