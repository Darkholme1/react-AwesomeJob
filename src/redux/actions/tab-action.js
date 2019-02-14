export const CHANGE_TAB = "CHANGE_TAB"
export const changeTab = tab => {
    return {
        type: CHANGE_TAB,
        payload: tab
    }
}