// src/components/ui/Button.jsx
export default function Button({ children, onClick, variant = 'primary', disabled = false, style = {}, ...rest }) {
  const base = {
    padding: '0.6em 1.4em',
    borderRadius: 4,
    fontFamily: 'var(--font-ui)',
    fontSize: '0.95rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    letterSpacing: '0.02em',
    transition: 'filter 120ms ease, transform 80ms ease',
    opacity: disabled ? 0.4 : 1,
  };
  const variants = {
    primary: {
      background: 'var(--accent-primary)',
      color: 'var(--ink-black)',
      border: '1px solid var(--accent-primary)',
      fontWeight: 600,
    },
    secondary: {
      background: 'transparent',
      color: 'var(--accent-primary)',
      border: '1px solid var(--accent-primary)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--ink-white)',
      border: '1px solid rgba(255,255,255,0.2)',
    },
  };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.filter = 'brightness(1.2)')}
      onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
      {...rest}
    >
      {children}
    </button>
  );
}
