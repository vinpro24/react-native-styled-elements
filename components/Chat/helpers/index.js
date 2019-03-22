
export const ObjectID = () => {
    const timestamp = (Date.now() / 1000).toString(16).substr(0, 8)
    return timestamp + 'xx'.replace(/[x]/g, () => Math.random().toString(16).substr(2, 8)).toLowerCase()
}