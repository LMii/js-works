/*
* @Author: acer
* @Date:   2017-09-28 14:36:23
* @Last Modified by:   acer
* @Last Modified time: 2017-10-20 09:33:24
*/
function Game(){
	//产生的字符
   this.charArr=[
   ['Q','img/Q.png'],
   ['W','img/W.png'],
   ['E','img/E.png'],
   ['R','img/R.png'],
   ['T','img/T.png'],
   ['Y','img/Y.png'],
   ['U','img/U.png'],
   ['U','img/U.png'],
   ['I','img/I.png'],
   ['O','img/O.png'],
   ['P','img/P.png'],
   ['A','img/A.png'],
   ['S','img/S.png'],
   ['D','img/D.png'],
   ['F','img/F.png'],
   ['F','img/F.png'],
   ['G','img/G.png'],
   ['H','img/H.png'],
   ['J','img/J.png'],
   ['K','img/K.png'],
   ['L','img/L.png'],
   ['Z','img/Z.png'],
   ['X','img/X.png'],
   ['C','img/C.png'],
   ['V','img/V.png'],
   ['B','img/B.png'],
   ['N','img/N.png'],
   ['M','img/M.png'],];
	//页面元素
   this.current=[];
   //下落的个数
   this.number=5;
   //速度
   this.speed=10;
   //位置
   this.position=[];
   //分数
   this.score=0;
   //生命值
   this.life=10;
   //关卡
   this.gk=10;
   //显示的分数
   this.scorevalue=document.querySelector('.score>span');
   console.log(typeof this.scorevalue)
   //显示的生命值
   this.lifevalue=document.querySelector('.life>span');
}
Game.prototype={
	start:function(){
		this.getchars();
    this.drop();
    this.key();
	},
	getchars:function(){
	  for(let i=0;i<this.number;i++){
		   this.getchar();
	  }
	},
	///////////////获得元素
	getchar:function(){
		let index=Math.floor(Math.random()*this.charArr.length);
		while(this.checkRepeat(this.charArr[index][0])){
        	index=Math.floor(Math.random()*this.charArr.length);
        }
		let divs=document.createElement('div');
		divs.classList.add('char');//添加类名
		divs.innerText=this.charArr[index][0];
        let tops=Math.random()*100;
        let lefts=Math.random()*(innerWidth-400)+200;
        while(this.checkPosition(lefts)){
        	lefts=Math.random()*(innerWidth-400)+200;
        }

        divs.style.left=`${lefts}px`;
        divs.style.top=`${tops}px`;
        divs.style.background=`url(${this.charArr[index][1]}) no-repeat center/cover`;
        divs.style.fontSize=0;
        document.body.appendChild(divs);
        this.current.push(divs);
        this.position.push(divs.offsetLeft);
        // console.log(this.position);        
        // console.log(this.current);
        
	},
	/////////////////掉落
	drop:function(){
		let that=this;
		this.t=setInterval(function(){
           that.current.forEach((element,index)=>{
           	let tops=element.offsetTop+that.speed;
           	element.style.top=`${tops}px`;
           	if(tops>=500){
           		document.body.removeChild(element);//移除元素节点
           		that.current.splice(index,1)
           		that.position.splice(index,1)
           		that.getchar();
           		that.life--;
              that.lifevalue.innerText=that.life;
           		if(that.life==0){
           			let re=confirm('确认要重新开始玩游戏吗？');
                    if(re){
                    	that.restar();
                    }else{
                    	close();////只关闭此页
                    }
           		}
           	}
           })
		},300)
	},
	//////////////按下按键消失
	key:function(){
		let that=this;		
		  document.onkeydown=function(e){
		  	that.current.forEach((element,index)=>{//f
		  	// console.log(element)
			if(element.innerText==String.fromCharCode(e.keyCode)){
				document.body.removeChild(element);//移除节点
           		that.current.splice(index,1)
           		that.position.splice(index,1)
           		that.getchar();
           		that.score+=2;
           		that.scorevalue.innerText=that.score;
           		if(that.score==that.gk){
           			that.next();
           		}
           		if(that.number==8){
           			that.next();
           			that.number=8;
           			that.speed+=5;
           		}
			}
		  })
		}
	},
	//////////////////////////去重复位置
	checkPosition:function(new_left){
       let flag=this.position.some((element)=>{
       	return Math.abs(element-new_left)<=83;
       })
         return flag;
	},
	////////////////////////去重复的字母
	checkRepeat:function(new_obj){
        let flag1=this.current.some((element)=>{
       	return element.innerText==new_obj;
       })
         return flag1;
	},
	////////////////////////下一关
	next:function(){
		clearInterval(this.t);
        this.current.forEach((element)=>
        	{return document.body.removeChild(element);})
        // document.body.innerHTML='';
		this.current.length=0;
		this.position.length=0;
		this.number++;
		this.gk+=10;
		this.start();
	},
	//////////////////////////重新开始
	restar:function(){
		// document.body.innerHTML='';
		clearInterval(this.t);
		this.current.forEach((element)=>
        	{return document.body.removeChild(element);alert(1)})		
		this.current.length=0;
    this.position.length=0;
    this.number=5;
    this.score=0;
    this.life=10;
    this.gk=10;
    this.scorevalue.innerText=0;
    this.lifevalue.innerText=10;
    this.start();

	},
}