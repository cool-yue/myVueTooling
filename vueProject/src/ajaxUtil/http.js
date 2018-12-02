const method = ["get","post","delete","put"];


// http优化,get请求可以缓存结果,最大数量设置10个

function http() {

}

http.prototype.get = function(url) {
    if (!XMLHttpRequest) throw new Error("your browser not support XMLHttpRequeset");
    if (!Promise) throw new Error("your browser not support Promise");
    return new Promise(function(resolve,reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET",url);
        xhr.onload = function() {
            if(xhr.responseText) {
                try {
                    var obj = JSON.parse(xhr.responseText);
                    resolve(obj);
                } finally {
                    resolve(xhr.responseText);
                };
            };
        };
        xhr.onerror = function() {
            reject(xhr.responseText);
        };
        xhr.onabort = function() {
            reject(xhr.responseText);
        };
        xhr.send(null);
    });
};

module.exports = new http(); 