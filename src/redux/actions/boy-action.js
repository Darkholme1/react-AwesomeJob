export const ADD_BOY = 'ADD_BOY'
export const DELETE_BOY = 'DELETE_BOY'
export const UPDATE_BOY = 'UPDATE_BOY'
export const addBoy = function(name, say) {
    return {
        type: ADD_BOY,
        payload: {
            name,
            say
        }
    }
}
export const deleteBoy = function(name){
    return {
        type: DELETE_BOY,
        payload: {
            name
        }
    }
}
export const updateBoy = function(name,say){
    return {
        type: UPDATE_BOY,
        payload: {
            name,
            say
        }
    }
}