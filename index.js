var bird = {
    skyPosition: 0,
    skySpeed: 2,
    birdTop: 220,
    birdDropY: 0,
    beginStyle: 'blue',
    ifBegin: false,
    minTop: 0,
    maxTop: 570,
    score:0,
    pipeLength:7,
    pipeLastIndex:6,
    pipeArr:[],
    // 初始化函数
    init: function () {
        this.initData();
        this.animation();
        this.handle();
    },
    // 初始化数据
    initData: function () {
        this.el = document.getElementById("fly-bird");
        this.oBird = this.el.getElementsByClassName("bird")[0];
        this.oStart = this.el.getElementsByClassName("start")[0];
        this.oScore = this.el.getElementsByClassName("score")[0];
        this.oMask = this.el.getElementsByClassName("mask")[0];
        this.oEnd = this.el.getElementsByClassName("end")[0];
        this.oFinalScore = this.oEnd.getElementsByClassName('final-score')[0];
    },
    // 动画函数
    animation: function () {
        var self = this;
        var count = 0;
        this.timer = setInterval(function () {
            self.skyMove();
            if (self.isBegin) {
                self.birdDrop();
                self.pipeMove();
            }
            if (++count % 10 === 0) {
                if (!self.isBegin) {
                    self.birdJump();
                    self.startAnimate();
                }
            }
            self.birdFly(count);
        }, 30)
    },
    // 移动天空
    skyMove: function () {
        // console.log(this.el.backgroundPositionX)
        this.skyPosition -= this.skySpeed;
        this.el.style.backgroundPositionX = this.skyPosition + 'px';
    },
    // 小鸟跳
    birdJump: function () {
        // console.log(this.oBird)
        // this.oBird.style.top = this.birdTop + 'px';
        this.birdTop = this.birdTop === 220 ? 260 : 220;
        this.oBird.style.top = this.birdTop + 'px';
    },
    // 小鸟坠落
    birdDrop: function () {
        this.birdTop += ++this.birdDropY;
        this.oBird.style.top = this.birdTop + 'px';
        this.judge();
        this.addScore();
    },
    // 小鸟飞
    birdFly: function (count) {
        this.oBird.style.backgroundPositionX = (count % 3) * -30 + 'px';
    },
    // 开始游戏文字动画
    startAnimate: function () {
        var preColor = this.beginStyle;
        this.beginStyle = this.beginStyle === 'blue' ? 'white' : 'blue';
        this.oStart.classList.remove(preColor);
        this.oStart.classList.add(this.beginStyle);
    },
    // 判断函数
    judge: function () {
        this.judgebian();
        this.judgePipe();
    },
    addScore:function(){
        var index = this.score % this.pipeLength;
        var pipeX = this.pipeArr[index].up.offsetLeft;
        if(pipeX < 13){
            this.oScore.innerText = ++ this.score;
        }
    },
    // 判断是否超出临界
    judgebian: function () {
        if (this.birdTop < this.minTop || this.birdTop > this.maxTop) {
            this.failGame();
        }
    },
    // 判断是否碰到柱子
    judgePipe: function () {
        var index = this.score % this.pipeLength;
        var pipeX = this.pipeArr[index].up.offsetLeft;
        var pipeY = this.pipeArr[index].y
        var birdY = this.birdTop

        if((pipeX <= 95 && pipeX >= 13) && (birdY <= pipeY[0] || birdY >=pipeY[1])){
            this.failGame();
        }
    },
    // 事件处理函数
    handle: function () {
        this.beginGame();
        this.birdClick();
    },
    // 开始游戏
    beginGame: function () {
        var self = this;
        this.oStart.onclick = function () {
            self.isBegin = true;
            this.style.display = "none";
            self.oScore.style.display = "block";
            self.skySpeed = 5;
            self.oBird.style.left = "80px";
            self.oBird.style.transition = "none";
            // console.log(this);
            // clearInterval(self.timer);
            for(var i = 0 ;i < self.pipeLength ;i++){
                self.createPipe(300 * (i + 1));
            }
        }
    },
    pipeMove:function(){
        for(var i = 0;i < this.pipeLength;i++){
            var oUpPipe = this.pipeArr[i].up;
            var oDownPipe = this.pipeArr[i].down;
            var x = oUpPipe.offsetLeft - this.skySpeed;

            if(x < -52){
                var lastPipeLeft = this.pipeArr[this.pipeLastIndex].up.offsetLeft;
                oUpPipe.style.left = lastPipeLeft + 300 + 'px';
                oDownPipe.style.left = lastPipeLeft + 300 + 'px';
                this.pipeLastIndex = ++ this.pipeLastIndex % this.pipeLength;

                // var upHeight = 50 + Math.floor(Math.random() * 175);
                // var downHeight = 450 - upHeight;
                // var height = this.getPipeHeight();

                // oUpPipe.style.height = upHeight + 'px';
                // oDownPipe.style.height = downHeight + 'px';


                continue;
            }

            oUpPipe.style.left = x + 'px';
            oDownPipe.style.left = x + 'px';
        }
    },
    getPipeHeight:function(){
        var upHeight = 50 + Math.floor(Math.random() * 175);
        var downHeight = 450 - upHeight;

        return{
            up:upHeight,
            down:downHeight
        }
    },
    // 点击小鸟上升
    birdClick: function () {
        var self = this;
        this.el.onclick = function (e) {
            if (!e.target.classList.contains("start")) {
                self.birdDropY = -10;
            }
        }
    },
    // 游戏结束
    failGame: function () {
        clearInterval(this.timer)
        this.oEnd.style.display = "block";
        this.oMask.style.display = "block";
        this.oScore.style.display = "none";
        this.oBird.style.display = "none";
        this.oFinalScore.innerText = this.score;
    },
    createPipe:function(x){
        var height = this.getPipeHeight();
        
        var oUpPipe = creatEle('div',['pipe','up'],{
            height: height.up +'px',
            left: x + 'px',
        })

        var oDownPipe = creatEle('div',['pipe','down'],{
            height: height.down +'px',
            left: x + 'px',
        })

        this.el.appendChild(oUpPipe);
        this.el.appendChild(oDownPipe);

        this.pipeArr.push({
            up: oUpPipe,
            down: oDownPipe,
            y:[height.up , height.up + 150]
        })
    }
}