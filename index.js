var bird = {
    skyPosition:0,
    skySpeed:2,
    birdTop:220,
    beginStyle:'blue',
    // 初始化函数
    init:function(){
        this.initData();
        this.animation();
    },
    // 初始化数据
    initData:function(){
        this.el = document.getElementById("fly-bird");
        this.oBird = this.el.getElementsByClassName("bird")[0];
        this.oStart = this.el.getElementsByClassName("start")[0];
    },
    // 动画函数
    animation:function(){
        var self = this;
        var count = 0;
        this.timer = setInterval(function() {
            self.skyMove();
            if(++ count % 10 === 0){
                self.birdJump();
                self.startAnimate();
            }
            self.birdFly(count);
        },30)
    },
    // 移动天空
    skyMove:function(){
        // console.log(this.el.backgroundPositionX)
        this.skyPosition -= this.skySpeed;
        this.el.style.backgroundPositionX = this.skyPosition + 'px';
    },
    // 小鸟跳
    birdJump:function(){
        // console.log(this.oBird)
        // this.oBird.style.top = this.birdTop + 'px';
        this.birdTop = this.birdTop === 220 ? 260 : 220;
        this.oBird.style.top = this.birdTop + 'px';
    },
    // 小鸟飞
    birdFly:function(count){
        this.oBird.style.backgroundPositionX = (count % 3) * 30 + 'px';
    },
    // 开始游戏文字动画
    startAnimate:function(){
        var preColor = this.beginStyle;
        this.beginStyle = this.beginStyle === 'blue' ? 'white' : 'blue';
        this.oStart.classList.remove(preColor);
        this.oStart.classList.add(this.beginStyle);
    }
}