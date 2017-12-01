/*
* @Author: acer
* @Date:   2017-09-29 16:20:50
* @Last Modified by:   acer
* @Last Modified time: 2017-09-30 09:28:54
*/
function snakegame(){
	//蛇的位置
	this.snake=['0_0','0_1','0_2'];
	//scene
	this.scene=document.querySelector('.scene');
    //方向
    this.direction=39;
    //判断
    this.flag={'0_0':true,'0_1':true,'0_2':true};
    //食物
    this.food='';

}
	snakegame.prototype={

       start:function(){
       	 this.drawline();
       	 this.drawsnake();
       	 this.move();
       	 this.key();
       	 this.dropfood();
       },
       ////////////创建格子////
       drawline:function(){
       	 for(let i=0;i<20;i++){
       	 	for(let j=0;j<20;j++){
       	 		// let divs=document.createElement('div');
       	 		this.scene.innerHTML+=`<div class='block' id='${i}_${j}'></div>`;
       	 		/*this.scene.appendChild(divs);*/
       	 	}
       	 }
       },
       /////将相邻三个个字染色即为蛇
       drawsnake:function(){
          this.snake.forEach((element)=>{
          	document.getElementById(element).classList.add('color');
          })
       },
       /////按键将移动蛇
       move:function(){
         let that=this;       	    
       	this.t=setInterval(function(){
       	  let oldhead=that.snake[that.snake.length-1];//0_2字符串      	  
          let arr=oldhead.split('_'); ////'0' '2'存在数组中      
       	  let newhead='';
       	  console.log(arr[0])      	  
       	  if(that.direction==38){
       	  	 newhead=`${arr[0]*1-1}_${arr[1]*1}`;       	    
       	  }else if(that.direction==39){
       	     newhead=`${arr[0]*1}_${arr[1]*1+1}`;
       	  }else if(that.direction==40){ 
       	     newhead=`${arr[0]*1+1}_${arr[1]*1}`;
       	  }else if(that.direction==37){
       	  	 newhead=`${arr[0]*1}_${arr[1]*1-1}`;
       	  }      	   
       	    // console.log(newhead)
       	    let newarr=newhead.split('_')
       	    if(newarr[0]==20||newarr[1]==20){
       	    	clearInterval(that.t);
       	    	alert('游戏结束');
       	    	return;       	    	    
       	    } 
       	    if(newarr[0]<0||newarr[1]<0||that.flag[newhead]){
       	    	clearInterval(that.t);
       	    	alert('游戏结束');
       	    	return;       	    	    
       	    }
            if(newhead==that.food){
              that.snake.push(newhead);
              that.flag[newhead]=true;
              document.getElementById(that.food).style.background='#fff';
              that.dropfood();
            }else{
         	    that.snake.push(newhead);
         	    that.flag[newhead]=true;
         	    let end=that.snake.shift();
              delete that.flag[end];
         	    document.getElementById(end).classList.remove('color');
         	    that.drawsnake();
          } 
       	},1000)     	  	       	          	    
       },
       key:function(){
       	let that=this;
          document.onkeydown=function(e){
          	if(Math.abs(e.keyCode-that.direction)==2){
          		return;
          	}
           /* if(e.keyCode!=37||e.keyCode!=38||e.keyCode!=39||e.keyCode!=40){
              return;
            }*/
          	that.direction=e.keyCode;         
       }
	},
	////////掉落食物
	dropfood:function(){
		let x=Math.floor(Math.random()*20);
		let y=Math.floor(Math.random()*20);
		do{
           x=Math.floor(Math.random()*20);
           y=Math.floor(Math.random()*20);
		}while(this.flag[`${x}_${y}`])
    this.food=`${x}_${y}`;
        document.getElementById(this.food).style.background='red';
	},
}