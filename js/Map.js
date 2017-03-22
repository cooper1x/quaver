(function(){
    var Map = window.Map = function(x,y,w,gap){
        this.x = x;
        this.y = y;
        this.w = w;
        this.gap = gap;
        game.mapArr.push(this);
    }
    Map.prototype.render = function(){
        game.ctx.save();
        game.ctx.fillStyle = "black";
        game.ctx.fillRect(this.x,this.y,this.w,game.canvas.height * 0.3);
        game.ctx.restore();
    }
    Map.prototype.update = function(isMove,voiceSize){
        //当声音大于10000开始向右移动
        if(voiceSize > 8000 && !game.r.mlock){
            this.x -= 3;
            game.fno %30 == 0 && game.score++;
            //如果角色不在空中,则可以向右移动
            if(!isMove){
               game.r.step++;
               if(game.r.step > 3){
                   game.r.step = 1;
               }
            }
        }
        // console.log(game.r.B,this.y)
        if(!isMove){
            // 不在间隙内
            if(game.r.L > this.x && game.r.R < this.x + this.w){
                if(game.r.B >= this.y && game.r.R <= this.x + this.w){
                    game.r.y = game.r.B - 21;
                    // console.log("buzai",game.r.y);
                }
            // 在间隙内
            }else if(game.r.L > this.x + this.w && game.r.R < this.x + this.w + this.gap){
                // console.log("zai",game.r.y);
                game.r.lock = true;
                game.r.y += 4;
                //不写这一句B的值是不变的
                game.r.B = game.r.y + 21;
            }
        }
        //如果角色右边碰到地图的左边,则停止向右移动
        //
        if(game.r.B > this.y && game.r.R >= this.x + this.w + this.gap - 16){
            game.r.mlock = true;
            // alert(111)
            game.r.x = game.r.R - 15;
            // console.log(game.r.R,this.mlock);
        }
        // console.log(game.r.B);


        // 地图出视口移除自己
        // if(this.x + this.w + this.gap < 0){
        //     for (var i = 0; i < game.mapArr.length; i++) {
        //         if(game.mapArr[i] === this){
        //             game.mapArr[i].splice(i,1);
        //         }
        //     };
        // }
    }
})()