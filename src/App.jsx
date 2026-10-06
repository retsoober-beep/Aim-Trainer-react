import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';
import { DEFAULT_CONFIG } from './constants';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [stats, setStats] = useState(null);
  const [runId, setRunId] = useState(0); // força nova partida ao remontar o GameScreen

  const updateConfig = (key, value) => setConfig((c) => ({ ...c, [key]: value }));
  const play = () => {
    setRunId((n) => n + 1);
    setScreen('game');
  };
  const finish = (result) => {
    setStats(result);
    setScreen('result');
  };

  if (screen === 'game') return <GameScreen key={runId} config={config} onFinish={finish} />;
  if (screen === 'result') {
    return <ResultScreen config={config} stats={stats} onRetry={play} onHome={() => setScreen('home')} />;
  }
  return <HomeScreen config={config} onConfigChange={updateConfig} onStart={play} />;
}
