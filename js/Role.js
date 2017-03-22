(function(){
    var Role = window.Role = function(){
        this.x = game.canvas.width * 0.2;
        this.y = game.canvas.height * 0.7 - 21;
        // console.log(this.x,this.y);
        this.step = 1;
        //小帧号,用于上升和下落算法
        this.fno = 0;
        //是否拥有能量
        this.hasEnergy = false;
        this.isMove = false;
        this.B = this.y + 21;
        this.L = this.x - 15;
        this.R = this.x + 15;
        this.lock = false;
        this.mlock = false;
    }
    Role.prototype.update = function(voiceSize){
            //doSomething after you got voice size
            if(voiceSize > 25000){
                this.hasEnergy = true;
            }
            // 获得大能量
            if(this.hasEnergy && !this.lock){
                this.isMove = true;
                this.step =1;
                this.y -= parseInt((40-this.fno) * 0.53);
                if(this.fno > 40){
                    this.hasEnergy = false;
                    this.fno = 0;
                    this.step = 4;
                }
            }
            //初始状态
            else if(this.y == game.canvas.height * 0.7 - 21){
                this.fno = 0;
            }else{
                this.y += 4;
                this.fno % 3 == 0 && this.step++;
                if(this.step > 5){
                    this.step = 4;
                }
                // console.log(this.step);
                if(this.y >= game.canvas.height * 0.7 - 21){
                    this.step = 1;
                    this.isMove = false;
                }
            }
            this.fno ++;
            if(this.y >= game.canvas.height){
                this.y = game.canvas.height;
                // alert("Game Over");
                // console.log(game.timer);
                alert("Game Over！您的得分是" + game.score);
                clearInterval(game.timer)
            }
            //小帧号
            // game.ctx.fillStyle = "black";
            // game.ctx.fillText(this.fno,this.x,this.y - 20);
    }
    Role.prototype.render = function(){
        //保存状态
        game.ctx.save();
        //将坐标系拉到小鸟的中心点
        game.ctx.translate(this.x , this.y);
        //绘制
        // game.ctx.drawImage(game.R[this.step],100,100,61,86);
        game.ctx.drawImage(game.R[this.step],-15,-22,30,43);
        //恢复状态
        game.ctx.restore();
    }
})()