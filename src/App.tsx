import React from 'react';
import styled from 'styled-components'
import { fetchEntries } from './api/api';

function App() {
  const [entries, setEntries] = React.useState<Array<Entry>>([])

  React.useEffect(function () {
    fetchEntries()
  }, [])

  return (
    <Container>
      <ul>
        {entries.map(entry => <li>
          {entry.date.toString()}, {entry.glucose}
        </li>)}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  
`

export default App;
