import moment from "moment"
import { DATETIME_FORMAT, DATE_FORMAT } from "../utils"

const Mapper = {
    entry: {
        fromCSV: function (csvText: string): EntryMap {
            const entryMap: EntryMap = new Map()

            try {
                csvText
                    .split('\n')
                    .forEach(textRow => {
                        const row = textRow.split(',')
                        const date = moment(`${row[0]} ${row[1]}`, DATETIME_FORMAT).toDate()
                        const glucose = isNaN(+row[2]) ? '#' : parseFloat(row[2])
                        const cho = parseFloat(row[3])
                        const insulin = parseFloat(row[4])
                        const comment = row[5]

                        const key = moment(date).format(DATE_FORMAT)
                        entryMap.set(key, [...(entryMap.get(key) || []), { date, glucose, cho, insulin, comment }])
                    })            
            } catch(e) {
                alert('can\'t read this file')        
            }

            return entryMap
        }
    }
}

export default Mapper