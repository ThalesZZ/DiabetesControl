import moment from 'moment'
import React from 'react'
import styled from 'styled-components'
import Mapper from './api/mapper'
import { TIME_FORMAT } from './utils'

function App() {
  const [entryMap, setEntryMap] = React.useState<EntryMap>(new Map())

  const times: Set<string> = React.useMemo<Set<string>>(() => {
    const times: Array<string> = []
    Array.from(entryMap.keys()).forEach(key => entryMap.get(key)?.forEach(entry => times.push(moment(entry.date).format(TIME_FORMAT))))
    return new Set<string>(times.sort((t1, t2) => t1 > t2 ? 1 : -1))
  },[entryMap])

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

  const makeRow = React.useCallback((entries: Array<Entry> | undefined, field: 'glucose' | 'cho' | 'insulin' ) => 
    Array.from(times).map(time => {
      const entry = entries?.find(entry => time === moment(entry.date).format(TIME_FORMAT))
      return <td>{entry ? entry[field] : ''}</td>
    }), [times]
  )

  return (
    <Container>
      <input type="file" onChange={onFileSelection} accept=".csv" />
      <table>
        <tr>
          {Array.from(times).map(time => {
            return (<th className='times' key={time}>{time}</th>)
          })}
        </tr>
        {Array.from(entryMap.keys()).map(key => {
          const entries = entryMap.get(key)?.sort((e1, e2) => e1.date > e2.date ? 1 : -1)

          return (
            <>
              <tr><th colSpan={times.size}>{key}</th></tr>
              <tr>{makeRow(entries, 'glucose')}</tr>
              <tr>{makeRow(entries, 'cho')}</tr>
              <tr>{makeRow(entries, 'insulin')}</tr>
            </>
          )
        })}
      </table>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: 15px;

  table {
    background-color: #293045;
    th, td {
      text-align: center;
      color: white;
    }
    th {
      background-color: #52596E;
    }
    .times {
      background-color: #293045;
    }
  }
`

export default App
