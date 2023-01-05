import { useRef } from 'react';
import { useMutation, useOthers, useStorage, useUpdateMyPresence } from '../../liveblocks.config';
import Avatar from '../Avatar';
import Cursor from '../Cursor';
import styles from './styles.module.css';

export default function CounterPage() {
  const others = useOthers();
  const count = useStorage((root) => root.count);
  const updateMyPresence = useUpdateMyPresence();
  const cursorsContainer = useRef();

  const updateCount = useMutation(({ storage }, changeValue) => {
    const mutableCount = storage.get('count');
    mutableCount.set('value', mutableCount.get('value') + changeValue)
  }, []);

  const decrement = () => updateCount(-1);
  const increment = () => updateCount(+1);

  const handlePointerLeave = () => updateMyPresence({ cursor: null });
  const handlePointerMove = (e) => {
    if (!cursorsContainer.current) return;

    const {
      top: topOffset,
      left: leftOffset,
    } = cursorsContainer.current.getBoundingClientRect();

    updateMyPresence({
      cursor: {
        x: e.clientX - leftOffset,
        y: e.clientY - topOffset,
      }
    });
  };

  return(
    <div
      className={styles.pageWrapper}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <main className={styles.pageMain}>
        <h1>Collaborative Counter</h1>
        <div className={styles.card}>
          <button onClick={decrement}>
            -
          </button>
          <span className={styles.counterValue}>
            count is {count?.value ?? 0}
          </span>
          <button onClick={increment}>
            +
          </button>
        </div>
        <p>There are {others.length} other users counting with you:</p>
        <ul className={styles.avatars}>
          {others.map((other) => <Avatar key={other.connectionId} other={other} />)}
        </ul>

        <div
          ref={cursorsContainer}
          className={styles.cursors}
        >
          {others.map((other) => other.presence.cursor && (
            <Cursor
              key={other.connectionId}
              x={other.presence.cursor.x}
              y={other.presence.cursor.y}
              colorSeed={other.connectionId}
              name={other.presence.username}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
