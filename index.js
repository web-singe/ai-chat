var sendInput = document.getElementById('sendInput');
var sendButton = document.getElementById('sendButton');
var contentDom = document.getElementsByClassName('content')[0];
var sunImg = document.getElementsByClassName('sun')[0];
var nextTime = null; 
sendButton.onclick = function () {
    var val = sendInput.value
    if (val) {
        renderDom('self', val);
        sendInput.value = '';
        sendButton.innerText = ''
        startMove(sendButton,{width:0},function(){
            sendInput.style.width = 'calc(100% - 216px)';
            sunImg.style.display = 'block';
        });
        ajax({
            // url: 'http://localhost:3000/chat',
            url: 'https://developer.duyiedu.com/edu/turing/chat',
            type: 'get',
            data: {
                text: val,
            },
            async: true,
            cuccess: function (res) {
                var data = JSON.parse(res);
                renderDom('others', data.text)
            }
        })
    } else {
        return;
    }
}

function renderDom(figure, text) {
    var timer = new Date();
    var lastTime = timer.getTime()
    if(lastTime - nextTime >= 60000){
        var timeDiv = document.createElement('div');
        timeDiv.className = 'date';
        timeDiv.innerHTML = `
        ${timer.getMonth() + 1}月${timer.getDate()}日 ${timer.getHours()}:${timer.getMinutes() < 10 ? '0'+timer.getMinutes():timer.getMinutes()}
        `
        contentDom.appendChild(timeDiv);
    }
    var div = document.createElement('div');
    div.className = figure;
    div.innerHTML = `
        <div class="headPor">
            <img src= ${figure == 'self' ? "./image/dog1.jpg" : "./image/3.png"}>
        </div>
        <div class="chatBox">
            <p class="chat">${text}</p>
        </div>
    `
    contentDom.appendChild(div);
    getTime();
    contentDom.scroll(0, contentDom.scrollHeight);
}

sendInput.onkeyup = function (e) {
    var event = e || window.event
    if (event.keyCode == 13) {
        sendButton.click();
    }
}

function getTime(){
    var timer = new Date();
    nextTime = timer.getTime();
}

function getStyle(elem,prop){
    if(window.getComputedStyle){
        return window.getComputedStyle(elem,null)[prop];
    }else{
        return elem.currentStyle[prop];
    }
}

function startMove(dom,packet,callBack){
    clearInterval(dom.timer);
    var entity = null,
        iSpeed = null;
    dom.timer = setInterval(function(){
        var key = true;
        for(var sty in packet){
            var target = packet[sty];
            if(sty == 'opacity'){
                entity = parseFloat(getStyle(dom,sty)) * 100;
            }else{
                entity = parseInt(getStyle(dom,sty))
            }
            iSpeed = (target - entity) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if(sty == 'opacity'){
                dom.style[sty] = (entity + iSpeed) / 100;
                console.log(entity)
            }else{
                dom.style[sty] = entity + iSpeed + 'px';
            }
            if(entity != target){
                key = false;
            }
        }
        if(key){
            clearInterval(dom.timer);
            typeof(callBack) == 'function' && callBack();
        }
    },10)
}

sendInput.oninput = function(){
    if(sendInput.value != ''){
        sunImg.style.display = 'none';
        sendInput.style.width = 'calc(100% - 250px)';
        startMove(sendButton,{width:90},function(){
            sendButton.innerText = '发送'
        });
    }else{
        sendButton.innerText = ''
        startMove(sendButton,{width:0},function(){
            sendInput.style.width = 'calc(100% - 216px)';
            sunImg.style.display = 'block';
        });
    }
}