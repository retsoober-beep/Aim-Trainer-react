import { RANKS } from '../constants';

/** t = 0 (bolinha acabou de nascer) até 1 (tamanho máximo). Menor = mais pontos. */
export const calcPoints = (t) => 10 + Math.round(90 * (1 - t));

export function getAccuracy({ hits, misses, strays }) {
  const total = hits + misses + strays;
  return total ? Math.round((hits / total) * 100) : 0;
}

export function getRank(score, duration) {
  const perSecond = score / duration;
  return RANKS.find((r) => perSecond >= r.min).label;
}
