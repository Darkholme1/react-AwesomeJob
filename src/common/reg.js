/**
 * 正则表达式
 */
export const regUsername = /^[\w\d\u4e00-\u9fa5_]{3,10}$/
export const regPassword = /^[\w\d_]{6,16}$/
export const regNickname = /^[\w\d\u4e00-\u9fa5_]{2,10}$/
export const regCompany = /^[\w\u4e00-\u9fa5_]{3,20}$/
export const regAddress = /^[\w\d\u4e00-\u9fa5_]{3,50}$/
export const regMobile = /^\d{11}$/
export const regEmail = /^[\w\d_]+@{1}[\w\d_]+[.]{1}[a-z]{2,4}$/