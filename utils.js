function creatEle(elementName , classArr , styleObj){
    var dom = document.createElement(elementName);

    for(var i = 0;i < classArr.length;i++){
        dom.classList.add(classArr[i]);
    }

    for(var key in styleObj){
        dom.style[key] = styleObj[key];
    }

    return dom;
}