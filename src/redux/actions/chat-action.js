export const UPDATE_COUNT = "UPDATE_COUNT"

export const updateCount = num => {
    return {
        type: UPDATE_COUNT,
        payload: num
    }
}