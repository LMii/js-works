/*方法
直线，虚线，铅笔，矩形，圆，多边形，多角形，
描边，填充，
橡皮，文字 
*/
class huatu{
	constructor(canvas,ctx,opacity){
		this.canvas=canvas;
		this.ctx=ctx;
		this.opacity=opacity;
		///画布的宽和高
        this.cw=this.canvas.width;
        this.ch=this.canvas.height;
        ///设置填充还是描边
        this.style='stroke';
        ///样式
        this.lineWidth=5;//线的宽度
        this.strokeStyle='red';//描边颜色样式
        this.fillStyle='lightblue';//填充颜色样式

        ///历史记录
        this.history=[];
        //裁剪内容
        this.temp=null;
        
	}
	//////////////////////初始化样式
	init(){
		this.ctx.strokeStyle=this.strokeStyle;
		this.ctx.fillStyle=this.fillStyle;
	    this.ctx.lineWidth=this.lineWidth;
	    this.ctx.setLineDash([3,0]);
	}
	//////////////////////画图
	draw(type,n){
		this.opacity.onmousedown=function(e){
			e.preventDefault();
			let cx=e.offsetX,cy=e.offsetY;
			this.opacity.onmousemove=function(e){
				e.preventDefault();
				let ox=e.offsetX,oy=e.offsetY;
				this.ctx.clearRect(0, 0, this.cw, this.ch);
				if(this.history.length){
					this.ctx.putImageData(this.history[this.history.length-1],0,0)
				}
				this.init();//初始化
				this[type](cx,cy,ox,oy,n);//要画什么
			}.bind(this) 
		}.bind(this)
		this.opacity.onmouseup=function(){
			this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch))
			this.opacity.onmousemove=null;
		}.bind(this)

		document.onkeydown=function(e){
			if(e.ctrlKey&&e.keyCode==90){
				this.chexiao();
			}
		}.bind(this)
	};
	///////////////////////撤销
	chexiao(){
		this.history.pop();
	    this.ctx.clearRect(0, 0, this.cw, this.ch);
		this.ctx.putImageData(this.history[this.history.length-1],0,0);
	}
	//////////////////////画直线
	line(cx,cy,ox,oy){
		this.ctx.beginPath();
		this.ctx.moveTo(cx,cy);
		this.ctx.lineTo(ox,oy);	
		this.ctx.stroke();
		this.ctx.closePath();		
	};
	/////////////////画虚线
	dash(cx,cy,ox,oy){		
		this.ctx.beginPath();
		this.ctx.moveTo(cx,cy);
		this.ctx.lineTo(ox,oy);
		this.ctx.setLineDash([3,5]);
		this.ctx.stroke();		
		// this.ctx.closePath();	
	};
	/////////////////铅笔
	pencil(){
		this.opacity.onmousedown=function(e){
			e.preventDefault();
			let cx=e.offsetX,cy=e.offsetY;
			this.ctx.beginPath();
			this.ctx.moveTo(cx,cy);
			this.opacity.onmousemove=function(e){

				let ox=e.offsetX,oy=e.offsetY;
				this.ctx.clearRect(0, 0, this.cw, this.ch);
				if(this.history.length){
					this.ctx.putImageData(this.history[this.history.length-1],0,0)
				}
				this.init();//初始化
				this.ctx.lineTo(ox,oy)
				this.ctx.stroke();//怎么画，填充还是描边
			}.bind(this) 
		}.bind(this)
		this.opacity.onmouseup=function(){
			this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch))
			this.opacity.onmousemove=null;
		}.bind(this)

		document.onkeydown=function(e){
			if(e.ctrlKey&&e.keyCode==90){
				this.history.pop();
				this.ctx.clearRect(0, 0, this.cw, this.ch);
				this.ctx.putImageData(this.history[this.history.length-1],0,0);
			}
		}.bind(this)

	}
	
	/////////////////矩形
	ju(cx,cy,ox,oy){
		this.ctx.beginPath();
		let x=cx>=ox?ox:cx;
		let y=cy>=oy?oy:cy;
		this.ctx.rect(x,y, Math.abs(cx-ox), Math.abs(cy-oy));		
		this.ctx.closePath();
		this.ctx[this.style]();	
	};
	/////////////////画圆
	round(cx,cy,ox,oy){
		this.ctx.beginPath();
		let r=Math.sqrt(Math.pow(ox-cx,2)+Math.pow(oy-cy,2));
		this.ctx.arc(cx,cy,r,0,Math.PI*2);
		this.ctx[this.style]();
		this.ctx.closePath();
	}
	////////////////画多边形
	poly(cx,cy,ox,oy,n){
		this.ctx.beginPath();
		let rad=Math.PI*2/n;
		let r=Math.sqrt(Math.pow(ox-cx,2)+Math.pow(oy-cy,2));
		this.ctx.moveTo(cx+r,cy);
        for(let i=0;i<n;i++){
        	let x=cx+r*Math.cos(rad*i),
                y=cy+r*Math.sin(rad*i);
            this.ctx.lineTo(x,y);
        }
        this.ctx.closePath();
        this.ctx[this.style]();      
	};
	/////////////////画多角形
	polyJ(cx,cy,ox,oy,n){
		this.ctx.beginPath();
		let rad=Math.PI/n;
		let r=Math.sqrt(Math.pow(ox-cx,2)+Math.pow(oy-cy,2));
		this.ctx.moveTo(cx+r,cy);
        for(let i=0;i<2*n;i++){
        	let r1=(i%2==0)?r:r/2;
        	let x=cx+r1*Math.cos(rad*i),
                y=cy+r1*Math.sin(rad*i);
            this.ctx.lineTo(x,y);
        }
        this.ctx.closePath();
        this.ctx[this.style]();
        
	};

	////////////////橡皮擦
	cachu(eraser_box){
		this.opacity.onmousedown=function(e){
			e.preventDefault();
			eraser_box.style.display='block';
			this.opacity.onmousemove=function(e){
                let ew=parseInt(getComputedStyle(eraser_box,null).width);
                let eh=parseInt(getComputedStyle(eraser_box,null).height);
				let ox=e.offsetX-ew/2,oy=e.offsetY-eh/2;
				// console.log(eraser_box.width)
				if(ox<=0){
					ox=0;			
				}
				if(ox>=this.cw-ew){
					ox=this.cw-ew;	
				}
				if(oy<=0){
                    oy=0;
				}
				if(oy>=this.ch-eh){
					oy=this.ch-eh;	
				}
				
				eraser_box.style.left=`${ox}px`;
				eraser_box.style.top=`${oy}px`;
				this.ctx.clearRect(ox,oy,ew,eh)
			}.bind(this)
		}.bind(this)
		this.opacity.onmouseup=function(){
			this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch))
			this.opacity.onmousemove=null;
			eraser_box.style.display='none';
		}.bind(this)
	};
	//////////选择填充还是描边
	bian(element,input){
		this.style=element.className;
		
		input.onblur=function(){
		   this.strokeStyle=input.value;
           this.fillStyle=input.value;
		}.bind(this)		
	};

	/////////////文字
	text(){
		let that=this;
		this.opacity.onmousedown=function(e){
			
			this.onmousedown=null;
			let cx=e.offsetX,cy=e.offsetY;
			let divs=document.createElement('div');
		    divs.contentEditable='true';
		    divs.style.cssText=`width:300px; height:100px; border:1px dashed #ccc; 
		    position:absolute;top:${cy}px;left:${cx}px;cursor:move;`
		    this.appendChild(divs);	
		    let lefts=cx,tops=cy;	    
		    divs.onmousedown=function(e){
                let cx=e.clientX,cy=e.clientY;
                let left=divs.offsetLeft,top=divs.offsetTop;
                
                document.onmousemove=function(e){
                   let ox=e.clientX,oy=e.clientY; 
                   lefts=left+ox-cx;
                   tops=top+oy-cy;                  
                   if(lefts<=0){
					 lefts=0;					 			
				   }
			
					if(lefts>=that.cw-300){
						lefts=that.cw-300;	
					}
					if(tops<=0){
	                    tops=0;
					}
					if(tops>=that.ch-100){
						tops=that.ch-100;
						// alert(1)	
					}
					divs.style.left=`${lefts}px`;
                   divs.style.top=`${tops}px`;
	            }
                divs.onmouseup=function(){
                	document.onmousemove=null;
                }              
		    }.bind(this)
		    divs.onblur=function(){ 
		    	this.removeChild(divs);
		    	console.log(this);
		    	that.ctx.font='30px 微软雅黑'
		    	that.ctx.fillText(divs.innerText,lefts,tops);
		    	that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
		    }.bind(this)
		}		
	};
	///////////////裁切
	clip(clip_box){
		let that=this;
		let w,h,minX,minY;
		this.opacity.onmousedown=function(e){		
		    e.preventDefault();	
			clip_box.style.display='block';
			clip_box.style.width=0;
			clip_box.style.height=0;
			let cx=e.offsetX,cy=e.offsetY;
			this.opacity.onmousemove=function(e){
				e.preventDefault();
				let ox=e.offsetX,oy=e.offsetY;
				 minX=cx-ox>=0?ox:cx;
				 minY=cy-oy>=0?oy:cy;
				 w=Math.abs(cx-ox);
				 h=Math.abs(cy-oy);							
				if(minX<=0){
					minX=0;					 			
				}			
				if(minX>=that.cw-w){
					minX=that.cw-w;	
				}
				if(minY<=0){
                    minY=0;
				}
				if(minY>=that.ch-h){
					minY=that.ch-h;
				}
				clip_box.style.width=`${w}px`;
				clip_box.style.height=`${h}px`;	
				clip_box.style.left=`${minX}px`;
				clip_box.style.top=`${minY}px`;
			}
            this.opacity.onmouseup=function(){
            	this.onmousemove=null;    
                that.temp=that.ctx.getImageData(minX,minY,w,h);
                that.ctx.clearRect(minX,minY,w,h);
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.ctx.putImageData(that.temp,minX,minY);          
                that.drag(clip_box);
            }
		}.bind(this)
	};
	////////拖动裁剪的区域
	drag(clip_box){
		this.opacity.onmousedown=function(e){
            let cx=e.offsetX,cy=e.offsetY;                  
            this.opacity.onmousemove=function(e){
            	console.log(clip_box.style.width)
                   let ox=e.offsetX-parseInt(clip_box.style.width)/2,
                   oy=e.offsetY-parseInt(clip_box.style.height)/2;                    
                   clip_box.style.left=`${ox}px`;
                   clip_box.style.top=`${oy}px`;
                   // this.ctx.clearRect(0,0,this.cw,this.ch);
                   if(this.history.length){
                   	  this.ctx.putImageData(this.history[this.history.length-1],0,0);
                   }
                   this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
                   this.ctx.putImageData(this.temp,ox,oy);
                }.bind(this)
                this.opacity.onmouseup=function(){
                	clip_box.style.display='none';
                	this.opacity.onmousemove=null;
                	this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
                	this.temp=null;
                }.bind(this)              
		    }.bind(this)
	}
	////////////////清空
	clearAll(){
		this.ctx.clearRect(0,0,this.cw,this.ch); 
		this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));      
        // this.ctx.putImageData(this.history[this.history.length-1],0,0);       
	}
    //////////////////反向
    reserve(){
    	let imagedata=this.ctx.getImageData(0,0,this.cw,this.ch);
    	for(let i=0;i<imagedata.data.length;i+=4){
    		imagedata.data[i]=255-imagedata.data[i];
    		imagedata.data[i+1]=255-imagedata.data[i+1];
    		imagedata.data[i+2]=255-imagedata.data[i+2];
    	}
    	this.ctx.putImageData(imagedata,0,0);
    	this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
    }
	
}