export const ADD_USER = 'ADD_USER'
export const DELETE_USER = 'DELETE_USER'
export const UPDATE_USER = 'UPDATE_UER'

export const addUser = (obj)=>{
    return {
        type: ADD_USER,
        payload: obj
    }
}
export const deleteUser = ()=>{
    return {
        type: DELETE_USER
    }
}
export const updateUser = (obj)=>{
    return {
        type: UPDATE_USER,
        payload: obj
    }
}