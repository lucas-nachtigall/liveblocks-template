import getPresenceColor from '../../utils/getPresenceColor';
import styles from './styles.module.css';

export default function Cursor({ x, y, colorSeed = 0, name }) {
  const presenceColor = getPresenceColor(colorSeed);

  return (
    <div
      className={styles.cursor}
      style={{
        '--x': `${x}px`,
        '--y': `${y}px`,
        '--presence-color': presenceColor,
      }}
    >
      <svg
        width="12"
        height="18"
        viewBox="0 0 12 18"
        fill="none"
        stroke="black"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={presenceColor}
        />
      </svg>

      {name && (
        <span className={styles.cursorName}>
          {name}
        </span>
      )}
    </div>
  );
};
