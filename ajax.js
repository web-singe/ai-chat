function ajax(options){
    var url = options.url;
    var type = options.type.toUpperCase();
    var data = '';
    var async = options.async || true;
    if(typeof(options.data) == "object"){
        for(var prop in options.data){
            if(options.data.hasOwnProperty(prop)){
                data += prop + '=' + options.data[prop] + '&';
            }
        }
    }else if(typeof(options.data) == "string"){
        data = options.data;
    }else{
        data = '';
    }

    var xhr = null;
    if(XMLHttpRequest){
        xhr = new XMLHttpRequest;
    }else if(ActiveXObject){
        xhr = new ActiveXObject("Microsoft.XMLHttp");
    }else{
        alert('当前浏览器不支持XMLHttpRequest');
    }

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            options.cuccess(xhr.responseText);
        }
    }

    if(type == "GET"){
        xhr.open("GET",url + '?' + data,async);
        xhr.send();
    }else if(type == "POST"){
        xhr.open("POST",url,async);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
}