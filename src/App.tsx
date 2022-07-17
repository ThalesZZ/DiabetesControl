import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import Mapper from './api/mapper'
import { TIME_FORMAT } from './utils'

function App() {
  const [entryMap, setEntryMap] = React.useState<EntryMap>(new Map())

  const reader = React.useMemo(() => new FileReader(), [])
  React.useEffect(() => {
    reader.onload = e => {
      const csvText: string | undefined = e.target?.result?.toString()
      if (csvText?.length) setEntryMap(Mapper.entry.fromCSV(csvText.slice(csvText.indexOf('\n') + 1)))
    } 
  }, [reader])

  const onFileSelection = React.useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files ? e.target.files[0] : null
    if(!file) return

    reader.readAsText(file)
  }, [reader])

  return (
    <Container>
      <input type="file" onChange={onFileSelection} accept=".csv" />
        {Array.from(entryMap.keys()).map((key) => {
          const entries = entryMap.get(key)?.sort((e1, e2) => e1.date > e2.date ? 1 : -1)

          return (
            <table>
              <tr><th colSpan={entries?.length}>{key}</th></tr>
              <tr>{entries?.map(entry => (<td>{moment(entry.date).format(TIME_FORMAT)}</td>))}</tr>
              <tr>{entries?.map(entry => (<td>{entry.glucose}</td>))}</tr>
              <tr>{entries?.map(entry => (<td>{entry.cho}g</td>))}</tr>
              <tr>{entries?.map(entry => (<td>{entry.insulin}U</td>))}</tr>
            </table>
          )
        })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 15px;

  table {
    border: 1px solid black;
    th, td {
      text-align: center;
    }
  }
`

export default App
