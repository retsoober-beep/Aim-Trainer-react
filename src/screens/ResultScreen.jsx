import Button from '../components/Button';
import useCountUp from '../hooks/useCountUp';
import { DIFFICULTIES, SCALES } from '../constants';
import { getAccuracy, getRank } from '../utils/scoring';
import '../styles/Result.css';

export default function ResultScreen({ config, stats, onRetry, onHome }) {
  const accuracy = getAccuracy(stats);
  const score = useCountUp(stats.score);
  const accuracyShown = useCountUp(accuracy);

  const summary = [
    DIFFICULTIES[config.difficulty].label,
    `${config.duration}s`,
    SCALES[config.scale].label.toLowerCase(),
  ].join(' / ');

  const items = [
    { label: 'Acertos', value: stats.hits },
    { label: 'Perdidas', value: stats.misses },
    { label: 'Cliques errados', value: stats.strays },
    { label: 'Precisão', value: `${accuracyShown}%` },
  ];

  return (
    <section className="screen">
      <div className="wrap">
        <div className="top micro">
          <span>Resultado</span>
          <span>{summary}</span>
        </div>

        <div className="big">{score}</div>
        <div className="rank">{getRank(stats.score, config.duration)}</div>

        <div className="stats">
          {items.map(({ label, value }) => (
            <div className="stat" key={label}>
              <span className="micro">{label}</span>
              <b>{value}</b>
            </div>
          ))}
        </div>

        <div className="cta">
          <Button onClick={onRetry}>Jogar novamente</Button>
          <Button variant="secondary" icon="←" onClick={onHome}>Voltar</Button>
        </div>
      </div>
    </section>
  );
}
