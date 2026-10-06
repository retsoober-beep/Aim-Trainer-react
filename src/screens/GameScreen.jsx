import Ball from '../components/Ball';
import useGame from '../hooks/useGame';
import { BASE_BALL_SIZE, DIFFICULTIES, SCALES } from '../constants';
import '../styles/Game.css';

export default function GameScreen({ config, onFinish }) {
  const { balls, score, timeLeft, hitBall, missBall, removeBall, registerStray } = useGame(config, onFinish);
  const { life } = DIFFICULTIES[config.difficulty];
  const size = Math.round(BASE_BALL_SIZE * SCALES[config.scale].factor);

  return (
    <section className="screen screen--game">
      <header className="hud">
        <div>
          <div className="micro">Pontos</div>
          <div className="hud__n">{score}</div>
        </div>
        <div className="hud__right">
          <div className="micro">Tempo</div>
          <div className="hud__n">{timeLeft}<small>s</small></div>
        </div>
        <div className="hud__bar" style={{ animationDuration: `${config.duration}s` }} />
      </header>

      <div
        className="arena"
        onPointerDown={registerStray}
        style={{ '--size': `${size}px`, '--life': `${life}ms` }}
      >
        {balls.map((ball) => (
          <Ball key={ball.id} ball={ball} life={life} onHit={hitBall} onMiss={missBall} onRemove={removeBall} />
        ))}
      </div>
    </section>
  );
}
