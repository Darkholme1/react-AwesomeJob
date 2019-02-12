export const MSG_LIST = "MSG_LIST"

export const msgList = msgs => {
    return {
        type: MSG_LIST,
        payload: msgs
    }
}