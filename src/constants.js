export const DIFFICULTIES = {
  facil: { label: 'Fácil', life: 2600, spawn: 950, max: 3 },
  medio: { label: 'Médio', life: 1900, spawn: 650, max: 4 },
  dificil: { label: 'Difícil', life: 1300, spawn: 450, max: 5 },
};

export const SCALES = {
  pequeno: { label: 'Pequeno', factor: 0.65 },
  medio: { label: 'Médio', factor: 1 },
  grande: { label: 'Grande', factor: 1.5 },
};

export const DURATIONS = [15, 30, 60, 120];

export const BASE_BALL_SIZE = 90;
export const MIN_BALL_SCALE = 0.15;

export const DEFAULT_CONFIG = { difficulty: 'facil', duration: 30, scale: 'medio' };

// Ordenado do maior para o menor (pontos por segundo).
export const RANKS = [
  { min: 45, label: 'Sniper' },
  { min: 28, label: 'Muito bom' },
  { min: 14, label: 'Bom começo' },
  { min: 0, label: 'Continue treinando' },
];
