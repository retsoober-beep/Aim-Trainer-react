import Button from '../components/Button';
import SegmentedControl from '../components/SegmentedControl';
import { DIFFICULTIES, DURATIONS, SCALES } from '../constants';
import '../styles/Home.css';

const toOptions = (map) => Object.entries(map).map(([value, { label }]) => ({ value, label }));

const SETTINGS = [
  { key: 'difficulty', label: 'Dificuldade', options: toOptions(DIFFICULTIES) },
  { key: 'duration', label: 'Duração', options: DURATIONS.map((s) => ({ value: s, label: `${s}s` })) },
  { key: 'scale', label: 'Escala', options: toOptions(SCALES) },
];

export default function HomeScreen({ config, onConfigChange, onStart }) {
  return (
    <section className="screen">
      <div className="wrap">
        <div className="top micro">
          <span>Aim Trainer</span>
          <span><i>●</i> v.01</span>
        </div>

        <h1 className="mega">Mira<b>.</b></h1>
        <p className="lede">Acerte antes que cresçam. Quanto menor a bolinha no clique, mais pontos.</p>

        {SETTINGS.map(({ key, label, options }, i) => (
          <div className="row" key={key}>
            <div className="micro"><b>{String(i + 1).padStart(2, '0')}</b>{label}</div>
            <SegmentedControl
              label={label}
              options={options}
              value={config[key]}
              onChange={(value) => onConfigChange(key, value)}
            />
          </div>
        ))}

        <div className="cta">
          <Button onClick={onStart}>Jogar</Button>
        </div>
      </div>
    </section>
  );
}
