import React from 'react';
import styled from 'styled-components'
import Mapper from './api/mapper';

function App() {
  const [entries, setEntries] = React.useState<Array<Entry>>([])

  const reader = React.useMemo(() => new FileReader(), [])
  React.useEffect(() => {
    reader.onload = e => {
      const csvText: string | undefined = e.target?.result?.toString()
      if(csvText?.length) setEntries(Mapper.entry.fromCSV(csvText.slice(csvText.indexOf('\n') + 1)))
    } 
  }, [reader])

  function onFileSelection(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files ? e.target.files[0] : null
    if(!file) return

    reader.readAsText(file)
  }

  return (
    <Container>
      <input type="file" onChange={onFileSelection} accept=".csv" />
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
