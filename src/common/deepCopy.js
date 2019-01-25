const deepCopy = obj => {
    let copy = Array.isArray(obj) === true ? [] : {}
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                copy[key] = deepCopy(obj[key])
            } else {
                copy[key] = obj[key]
            }
        }
    }
    return copy
}

module.exports =  deepCopy