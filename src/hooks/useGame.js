import { useCallback, useEffect, useRef, useState } from 'react';
import { DIFFICULTIES } from '../constants';
import { calcPoints } from '../utils/scoring';

const emptyStats = () => ({ score: 0, hits: 0, misses: 0, strays: 0 });

/**
 * Lógica da partida. O crescimento das bolinhas é feito por CSS (ver Game.css);
 * o hook apenas cria/remove bolinhas, controla o tempo e acumula as estatísticas.
 */
export default function useGame({ difficulty, duration }, onFinish) {
  const { spawn, max } = DIFFICULTIES[difficulty];
  const [balls, setBalls] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);

  const stats = useRef(emptyStats());
  const nextId = useRef(0);
  const finishRef = useRef(onFinish);
  finishRef.current = onFinish;

  useEffect(() => {
    stats.current = emptyStats();
    nextId.current = 0;
    setBalls([]);
    setScore(0);
    setTimeLeft(duration);

    const startedAt = performance.now();
    const spawnBall = () => {
      const ball = { id: nextId.current++, x: Math.random(), y: Math.random(), born: performance.now() };
      setBalls((current) => (current.length >= max ? current : [...current, ball]));
    };

    spawnBall();
    const spawnTimer = setInterval(spawnBall, spawn);
    const clock = setInterval(() => {
      const left = Math.ceil(duration - (performance.now() - startedAt) / 1000);
      setTimeLeft(Math.max(0, left));
    }, 200);
    const endTimer = setTimeout(() => finishRef.current({ ...stats.current }), duration * 1000);

    return () => {
      clearInterval(spawnTimer);
      clearInterval(clock);
      clearTimeout(endTimer);
    };
  }, [duration, spawn, max]);

  const removeBall = useCallback((id) => setBalls((c) => c.filter((b) => b.id !== id)), []);

  const hitBall = useCallback((t) => {
    stats.current.hits += 1;
    stats.current.score += calcPoints(t);
    setScore(stats.current.score);
  }, []);

  const missBall = useCallback(
    (id) => {
      stats.current.misses += 1;
      removeBall(id);
    },
    [removeBall]
  );

  const registerStray = useCallback(() => {
    stats.current.strays += 1;
  }, []);

  return { balls, score, timeLeft, hitBall, missBall, removeBall, registerStray };
}
