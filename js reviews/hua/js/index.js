/*
* @Author: acer
* @Date:   2017-10-10 14:59:20
* @Last Modified by:   acer
* @Last Modified time: 2017-10-12 14:39:22
*/
window.onload=function(){
	let canvas=document.querySelector('canvas');
	let ctx=canvas.getContext("2d");
	let tools=document.querySelector('.tools');
	let tool=tools.querySelectorAll('li');
	let chexiao=document.querySelector('.chexiao');
	let opacity=document.querySelector('.opacity');
	// let eraser=document.querySelector('.eraser');
	let eraser_box=document.querySelector('.eraser-box');
	let colors=document.querySelector('.color');
	let color=colors.querySelectorAll('li');
	let input=document.querySelector('input');
	let text=document.querySelector('.text');
	let clip=document.querySelector('.clip');
	let clip_box=document.querySelector('.clip-box');
	let save=document.querySelector('.save');
	let clearAll=document.querySelector('.clearAll');
	let newfile=document.querySelector('.newfile');
	let reserve=document.querySelector('.reserve')
	let hua=new huatu(canvas,ctx,opacity);
	///////////////工具
	tool.forEach((element,index)=>{
		element.onclick=function(){
			let num=0;
			for(let i=0;i<tool.length;i++){
				tool[i].style.background='#cacaca';
			}
			tool[index].style.background='#b2d7fd';
			if(this.className=='pencil'){
				hua.pencil();
				return;
			}
			if(this.className=='eraser'){
				hua.cachu(eraser_box);
				return;
			}
			if(this.className=='text'){
				hua.text();
				return;
			}
			if(this.className=='clip'){
				hua.clip(clip_box);
				return;
			}
			if(this.className=='polyJ'||this.className=='poly'){
				 num=prompt('请输入边数',5);
			}			
			hua.draw(this.className,num);
		}
	})
	/////////////撤销按钮
	chexiao.onclick=function(){
		hua.chexiao();
	}
	///////颜色按钮
	color.forEach((element)=>{		
		element.onclick=function(){
			hua.bian(element,input);
			 for(let i=0;i<color.length;i++){
				 color[i].style.background='#cacaca';
			  }
			  element.style.background='#b2d7fd';
		   }
	})
	
	//////////////保存
	save.onclick=function(){
		let data=canvas.toDataURL('img/png');///把画板里面的内容保存为图片格式
		save.href=data;
		let flag=confirm('确认要保存吗？');
		if(flag){
           save.download='tu.png';
		}else{
			hua.clearAll();
		}	
	}
	/////////////////清空
	clearAll.onclick=function(){
		hua.clearAll();
	}
	////////////////新建
	newfile.onclick=function(){
        save.onclick();
	}
	/////////////////反向
	reserve.onclick=function() {
		hua.reserve();
	}	
}
		
	
