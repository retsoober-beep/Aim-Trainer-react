import { useState } from 'react';
import { MIN_BALL_SCALE } from '../constants';

/**
 * Bolinha. Cresce via animação CSS (`ball-grow`). Ao clicar, guardamos a escala
 * atual para a animação `ball-pop`; ao terminar `ball-fade` ela conta como perdida.
 */
export default function Ball({ ball, life, onHit, onMiss, onRemove }) {
  const [popScale, setPopScale] = useState(null);
  const popped = popScale !== null;

  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (popped) return;
    const t = Math.min(1, (performance.now() - ball.born) / life);
    setPopScale(MIN_BALL_SCALE + (1 - MIN_BALL_SCALE) * t);
    onHit(t);
  };

  const handleAnimationEnd = (e) => {
    if (e.animationName === 'ball-pop') onRemove(ball.id);
    if (e.animationName === 'ball-fade') onMiss(ball.id);
  };

  return (
    <div
      className={popped ? 'ball is-popped' : 'ball'}
      style={{ '--x': ball.x, '--y': ball.y, ...(popped && { '--s': popScale }) }}
      onPointerDown={handlePointerDown}
      onAnimationEnd={handleAnimationEnd}
    />
  );
}
