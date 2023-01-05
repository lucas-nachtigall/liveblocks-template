import { LiveObject } from '@liveblocks/client';
import { ClientSideSuspense } from '@liveblocks/react'
import CounterPage from './components/CounterPage';
import { RoomProvider } from './liveblocks.config'

function App() {
  const initialPresence = {
    avatar: 'https://place.dog/100/100',
    username: 'user',
    cursor: null,
  };

  const initialStorage = {
    count: new LiveObject({ value: 0, a: 0 }),
  };

  return (
    <RoomProvider
      id='room-id'
      initialPresence={initialPresence}
      initialStorage={initialStorage}
    >
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => <CounterPage />}
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default App
