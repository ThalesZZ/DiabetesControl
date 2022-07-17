interface Entry {
    date: Date
    glucose: number | '#'
    cho: number
    insulin: number | '#'
    comment: string
}

type EntryMap = Map<string, Array<Entry>>