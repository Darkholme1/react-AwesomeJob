export default function ajax(obj) {
    //设置async默认为true
    if (obj.async == null) {
        obj.async = true;
    }

    //callback函数利用闭包访问obj和xhr对象
    function callback() {
        if (xhr.status === 200) {
            obj.success(xhr.responseText)
        } else {
            obj.error("error" + xhr.status)
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback();//利用闭包调用callback
        }
    };

    if (obj.data != null) {
        var uri = '?';
        for (let i in obj.data) {
            uri += i + "=" + obj.data[i] + "&";
        }
        uri = uri.substring(0, uri.length - 1);
    } else {
        var uri = '';
    }
    //get请求
    if (obj.method === 'get') {
        xhr.open("get", obj.url + uri, obj.async);
        xhr.send();
    }
    //post请求
    else if (obj.method === 'post') {
        uri = uri.substring(1, uri.length);
        xhr.open(obj.method, obj.url, obj.async);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(uri);
    }

}