export const ADD_PROJECTEXP = 'ADD_PROJECTEXP'
export const UPDATE_PROJECTEXP = 'UDPATE_PROJECTRXP'
export const DELETE_PROJECTEXP = 'DELETE_PROJECTEXP'

export const addProjectExp = obj => {
    return {
        type: ADD_PROJECTEXP,
        payload: obj
    }
}
export const updateProjectExp = obj => {
    return {
        type: UPDATE_PROJECTEXP,
        payload: obj
    }
}
export const deleteProjectExp = ()=>{
    return {
        type: DELETE_PROJECTEXP
    }
}