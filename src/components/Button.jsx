import '../styles/Button.css';

export default function Button({ variant = 'primary', icon = '→', children, ...rest }) {
  const className = variant === 'secondary' ? 'btn btn--secondary' : 'btn';
  return (
    <button className={className} {...rest}>
      <span>{children}</span>
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}
