/**
 * 数据类型
 */
const user = str => {
    switch (str) {
        case 'BOSS':
            return 1
        case '牛人':
            return 0
        default:
            return -1
    }
}
const exp = str => {
    switch (str) {
        case '工作经历':
            return 1
        case '项目经历':
            return 2
        case '教育经历':
            return 3
        default:
            return 0
    }
}
/* const resumeTouch = (str) => {
    switch (str) {
        case '个人信息':
            return 1
        case '求职期望':
            return 2
        default:
            return 0
    }
} */
module.exports = {
    user: user,
    exp: exp
    // resumeTouch: resumeTouch
}