/* obj: {
    //数据
    data,
    //判空验证
    required(), 
    //正则表达式
    RegExp: {
        value, //正则的规则
        callback //验证失败后执行的动作
    }
} */

const formvalidate = (arr) => {
    for (var i = 0; i < arr.length; i++) {
        //判空
        if (arr[i].required) {
            if (arr[i].data == null || arr[i].data == '') {
                arr[i].required()
                return 0
            }
        }
        //有正则但可空时返回1
        if(!arr[i].required&&arr[i].RegExp){
            if (arr[i].data == null || arr[i].data == '') {
                continue
            }
        }
        //正则表达式判断
        if (arr[i].RegExp && arr[i].RegExp.value.test(arr[i].data) === false) {
            arr[i].RegExp.callback()
            return 0
        }
        

    }
    return 1
}
export default formvalidate