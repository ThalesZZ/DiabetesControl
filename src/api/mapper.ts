const Mapper = {
    entry: {
        fromCSV: function (csvText: string): Array<Entry> {
            const entries: Array<Entry> = []

            try {
                const rows = csvText.split('\n')
                for(let i = 0; i < rows.length; i++) {
                    const row = rows[i].split(',')
                    const date = new Date(`${row[0]} ${row[1]}`)
                    const glucose = parseFloat(row[2])
                    const cho = parseFloat(row[3])
                    const insulin = parseFloat(row[4])
                    const comment = row[5]

                    console.log(row)

                    entries.push({ date, glucose, cho, insulin, comment })
                    }
            } catch(e) {
                alert('can\'t read this file')
            }
            
            return entries
        }
    }
}

export default Mapper