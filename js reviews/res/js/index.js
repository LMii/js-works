/*
* @Author: acer
* @Date:   2017-09-11 10:47:50
* @Last Modified by:   acer
* @Last Modified time: 2017-10-26 08:53:59
*/
$(function(){
	/////////////////轮播
	let now=0;
    let next=0;
	let t=setInterval(move, 3000)
	function move(){
		next++;
		if(next==$('.banner-pic>li').length){
        	next=0;
        }  
		$(`.banner-pic>li`).eq(`${next}`).css({left:'1349px'});
		$(`.banner-pic>li`).eq(`${now}`).animate({left:'-1349px'});
		$(`.banner-pic>li`).eq(`${next}`).animate({left:0});
		now=next;
	}
	function moveL(){
		next--;
		if(next==-1){
        	next=$(`.banner-pic>li`).length-1;
        }  
		$(`.banner-pic>li`).eq(`${next}`).css({left:'-1349px'});
		$(`.banner-pic>li`).eq(`${now}`).animate({left:'1349px'});
		$(`.banner-pic>li`).eq(`${next}`).animate({left:0});
		now=next;
	}
	///////点击右按钮轮播
	$('.btn-right').click(function(){
		console.log(next)
		move();
	})
	///////点击左按钮轮播
	$('.btn-left').click(function(){
		moveL();
	})
	/////移入停止
	$('main').mouseover(function(){
		clearInterval(t);
	})
	/////移出开始
	$('main').mouseout(function(){
		t=setInterval(move,3000);
	})
	///////////////菜品推荐效果
	let newImg=$('.new-main>li');
	let newview=$('.newmain-zhe>a')
	let new_mask=$('.new-mask');
	let new_chupic=$('.new-chupic');
	let img=$('.new-img');
	let close=$('.close');
	let newmain_zhe=$('.newmain-zhe')
	let new_btnL=$('.icon-youfanye1');//菜品推荐左按钮
	let new_btnR=$('.icon-youfanye');//菜品推荐右按钮	
	let i;//记录第几张
	//////////移入效果遮罩出现	
	newImg.on('mouseover',function(){
		$('.newmain-zhe',this).css('opacity','1');
	})
	newImg.on('mouseover',function(){
		$('.newmain-zhe',this).addClass('active-1');
	})
	newImg.on('mouseout',function(){
		$('.newmain-zhe',this).css('opacity','0');
	})
	newImg.on('mouseout',function(){
		$('.newmain-zhe',this).removeClass('active-1');
	})
	//////////点击图片出现大图片
	newImg.on('click',newview,function(){
		i=$(this).index();
		let imgsrc=$('img',this).prop('src');////必须要用this，点击哪个，那个出现
		console.log(imgsrc)
		new_mask.addClass('active'); 
		new_chupic.addClass('active');
		img.prop('src',imgsrc);  //改变img的路径  
	})
	////////////也可用事件委派写
	/*$(document).on('click',function(){
		let element=e.target;
		if(element.nodeName='IMG'){
			///执行主要代码
			console.log(this)//this指向document（事件源）
		}
	})*/
	//////////关闭按钮
	close.click(function(){
		new_mask.removeClass('active'); 
		new_chupic.removeClass('active');
	})
	//////////右按钮点击
	new_btnR.click(function(){
		i++;
		if(i==newImg.length){
			i=0;
		}
		let imgsrc1=$('img',newImg).eq(i).prop('src');
		img.prop('src',imgsrc1);
	})
	//////////左按钮点击
	new_btnL.click(function(){
		i--;
		if(i==-1){
			i=newImg.length-1;
		}
		let imgsrc2=$('img',newImg).eq(i).prop('src');
		img.prop('src',imgsrc2);
	})

    /////////////关于我们效果
    let about=$('.about-center>a');
	let a_imgs=$('.about-zhe>img');
	console.log(a_imgs)
    about.on('click',function(){
    	for(let i=0;i<about.length;i++){
    		about.eq(i).css({background:'none'})
		}
    	$(this).css({background:'#108e64'});
		let j=$(this).index();
		console.log(j)
    	$('.about-zhe').css({opacity:'1'});
    	$('.about-zhe>img').eq(`${j-1}`).css({transform:'scale(1,1)'});
    })
	////////////关闭按钮
	let a_close=$('.about-zhe>div');
	a_close.on('click',function(){
        $('.about-zhe').css({opacity:'0'});
        $('.about-zhe>img').css({transform:'scale(0,0)'});
	})
	////////////滑动事件
	/*let flag=false;
	$(window).scroll(function(){
		let scrollTop=document.documentElement.scrollTop;		
		if(scrollTop>=96){
			if(flag){
				$('header').addClass('nav-active').animate({top:0},function(){
				  flag=true;
			   });
				flag=false;
			}
			
		}
		if(scrollTop<=96){
			// alert(1)
			$('header').removeClass('nav-active');
		}
	})*/
})