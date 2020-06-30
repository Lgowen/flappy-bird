var bird = {
    skyPosition:0,
    skySpeed:2,
    birdTop:220,
    birdDropY:2,
    beginStyle:'blue',
    ifBegin:false,
    minTop:0,
    maxTop:570,
    // 初始化函数
    init:function(){
        this.initData();
        this.animation();
        this.handle();
    },
    // 初始化数据
    initData:function(){
        this.el = document.getElementById("fly-bird");
        this.oBird = this.el.getElementsByClassName("bird")[0];
        this.oStart = this.el.getElementsByClassName("start")[0];
        this.oScore = this.el.getElementsByClassName("score")[0];
        this.oMask = this.el.getElementsByClassName("mask")[0];
        this.oEnd = this.el.getElementsByClassName("end")[0];
    },
    // 动画函数
    animation:function(){
        var self = this;
        var count = 0;
        this.timer = setInterval(function() {
            self.skyMove();
            if(self.isBegin){
                self.birdDrop();
            }
            if(++ count % 10 === 0){
                if(!self.isBegin){
                    self.birdJump();
                    self.startAnimate();
                }
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
    birdDrop:function(){
        this.birdTop += ++ this.birdDropY;
        this.oBird.style.top = this.birdTop + 'px';
        this.judge();
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
    },
    // 判断函数
    judge:function(){
        this.judgebian();
        this.judgePipe();
    },
    // 判断是否超出临界
    judgebian:function(){
        if(this.birdTop < 0 || this.birdTop > 570){
            this.failGame();
        }
    },
    // 判断是否碰到柱子
    judgePipe:function(){

    },
    // 事件处理函数
    handle:function(){
        this.beginGame();
    },
    // 开始游戏
    beginGame:function(){
        var self = this;
        this.oStart.onclick = function(){
            self.isBegin = true;
            this.style.display = "none";
            self.oScore.style.display = "block";
            self.skySpeed = 5;
            self.oBird.style.left = "80px"
            // console.log(this);
            // clearInterval(self.timer);
        }
    },
    failGame:function(){
        clearInterval(this.timer)
        this.oEnd.style.display = "block";
        this.oMask.style.display = "block";
        this.oScore.style.display = "none";
        this.oBird.style.display = "none";
    }
}