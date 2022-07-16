
export async function fetchEntries(): Promise<Array<Entry>> {

    return Promise.resolve([{
        date: new Date(),
        glucose: 100,
        insulin: 5,
        cho: 50,
        comment: ''
    }])
}