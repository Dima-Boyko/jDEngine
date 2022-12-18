/*
Autor: Boyko Dmytro
Data: 08.11.2022
Version: 0.3
*/

class jDEngine{

	constructor(width=0,height=0){


		if(width==0)width=document.documentElement.clientWidth;
		if(height==0)height=document.documentElement.clientHeight;

		this.canvas;
		this.canvas_width=width;
		this.canvas_height=height;
		this.background_color='';
		this.ctx;
		this.id_interval_draw;
		this.id_interval_loop;
		this.Loops=[];
		this.ListObject=[];
		this.canvas_selector="";
		this.ListCollision=[];
		this.World={
			center: false,
			MoveX: 0,
			MoveY: 0,
		};
		this.KeyControl=new jDEngineKeyControl();
		this.CursorControl=new jDEngineCursorControl();

		
	}

	Initialization(){
		let t=this;
		document.addEventListener('DOMContentLoaded', function(){
			t.CreateCame();
		});
	}

	CreateCame(){
		let canvas = document.createElement('canvas');
		canvas.setAttribute("id", "jDEngine");
		canvas.setAttribute("width",this.canvas_width+'px');
		canvas.setAttribute("height",this.canvas_height+'px');
		document.body.append(canvas);
		this.GameCanvas("#jDEngine");
	}

	GameCanvas(_selector=""){
		this.canvas_selector=_selector;
		this.canvas=document.querySelector(_selector);
		if(this.canvas.getContext){
			this.ctx = this.canvas.getContext('2d');
			let t = this;
			this.id_interval_draw = setInterval(function(){
				t.DrawGame();
			},20);
			
		}else{
			console.log('Canvas Error');
		}
	}

	Start(){
		this.Initialization();
	}


	Loop(name,fun){
		this.Loops[name]=fun;
	}



	DrawGame(){


		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.BackgroundDraw();



		this.DoLoop();
		this.DrawObject();
	}


	DoLoop(){

		for(let key in this.Loops){
			this.Loops[key]();
		}

	}

	DrawObject(){
		
		let t=this;
		this.ListObject.forEach(function(level){
			for(let key in level){
				if(!level[key].p.fixed){
					level[key].move(t.World.MoveX,t.World.MoveY);
				}
				level[key].draw();
			}
		});

		this.MoveAll(0,0);
		
		
		
	}

	BackgroundDraw(){
		if(this.background_color!=''){
			this.ctx.fillStyle = this.background_color;
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}

	BackgroundColor(color){
		this.background_color=color;
	}

	Add(obj){
		let level = 0;
		if(obj.p.level)level=obj.p.level;
		if(!this.ListObject[level])this.ListObject[level]=[];
		this.ListObject[level].push(obj);
		if(obj.p.collision){
			this.ListCollision.push(obj);
		}
		
	}

	AddList(lstObj){
		let t=this;
		lstObj.forEach(function(val){
			t.Add(val);
		});
	}

	MoveAll(x=0,y=0){
		this.World.MoveX=x;
		this.World.MoveY=y;
	}

	Rect(p={}){
		let t =this;
		p['display']=true;
		p['rotate']=0;
		p['mx']=p.x+p.w;
		p['my']=p.y+p.h;
		p['fixed']=false;
		p['CollisionBox']=false;
		return {
			p,
			t,
			draw(){

				if(!p.display)return false;
				let x=p.x;
				let y=p.y;
				if(p.rotate!=0){
					let rx=0;
					let ry=0;
					t.ctx.save();
					rx=p.w/2+p.x;
					ry=p.h/2+p.y;
					t.ctx.translate(rx, ry);
					t.ctx.rotate(p.rotate);
					x=-p.w/2;
					y=-p.h/2;
				}

				t.ctx.beginPath();
	            t.ctx.rect(x, y, p.w, p.h);
	            t.ctx.closePath();

				if(p.fillColor){
					t.ctx.fillStyle = p.fillColor;
					t.ctx.fill();
				}
				
				if(p.lineWidth){
					t.ctx.lineWidth  = p.lineWidth;
				}
				if(p.strokeColor){
					 t.ctx.strokeStyle = p.strokeColor;
				}

	            t.ctx.stroke();

	            if(p.rotate!=0)t.ctx.restore();

	            if(p.CollisionBox)t.DrowCollisionBox(p);
			},
			move(x=0,y=0){
				p.x+=x;
				p.y+=y;
			},

			rotate(r=0){
				p.rotate+=r;
				
			},

			display(value=true){
				p.display=value;
			},
			DrowCollision(value=true){
				p.CollisionBox=value;
			},

			setFixed(value=true){
				p.fixed=value;
			}
		};
	}


	Image(p={}){
		let t = this;
		p['display']=true;
		p['rotate']=0;
		p['CollisionBox']=false;
		p['fixed']=false;
		let img = new Image();
		img.src=p.src;
		img.onload=function(){
			if(p.repeat){
				img=t.ImageRepeat(img,p.w,p.h);
			}

			if(!p.w)p.w=img.width;
			if(!p.h)p.h=img.height;

		}

		p['mx']=p.x+p.w;
		p['my']=p.y+p.h;

		return {
			p,
			t,
			img,
			draw(){

				if(!p.display)return false;
				
				
				let x=p.x;
				let y=p.y;
				if(p.rotate!=0){
					let rx=0;
					let ry=0;
					t.ctx.save();
					rx=img.width/2+p.x;
					ry=img.height/2+p.y;
					t.ctx.translate(rx, ry);
					t.ctx.rotate(p.rotate);
					x=-img.width/2;
					y=-img.height/2;
				}
				
				
				t.ctx.drawImage(img,x,y,p.w,p.h);

				if(p.rotate!=0)t.ctx.restore();

				if(p.CollisionBox)t.DrowCollisionBox(p);
			},
			move(x=0,y=0){
				p.x+=x;
				p.y+=y;
			},

			rotate(r=0){
				p.rotate+=r;
			},

			display(value=true){
				p.display=value;
			},
			DrowCollision(value=true){
				p.CollisionBox=value;
			},
			setFixed(value=true){
				p.fixed=value;
			},
			direction(x=0,y=0){
				let cX=p.x+p.w/2;
				let cY=p.y+p.h/2;
				let _cHeight=-(y-cY);
				let _cWidth=(x-cX);

				let _pG;

				if(x>cX)_pG=Math.PI/2-Math.atan(_cHeight/_cWidth);
				if(x<=cX && y>=cY)_pG=Math.PI+Math.atan(_cWidth/_cHeight);
				if(x<=cX && y<cY)_pG=Math.atan(_cWidth/_cHeight);


				p.rotate=_pG;
			}
		};
	}

	ImageRepeat(image,width,height){
		let canvas = new jDEngineCanvas(width,height);

		for (let w = 0; w < width; w += image.width){
			for (let h = 0; h < height; h += image.height){
				canvas.ctx.drawImage(image, w, h);
			}
		}

		return canvas.canvas;
	}



	DrowCollisionBox(p={}){
		this.ctx.beginPath();

		this.ctx.lineWidth  = 2;
		this.ctx.strokeStyle = 'yellow';
		this.ctx.setLineDash([16, 5]);
		this.ctx.strokeRect(p.x, p.y, p.w, p.h);
		this.ctx.moveTo(p.x+(p.w/2), p.y);
		this.ctx.lineTo(p.x+(p.w/2), p.y+p.h);
		this.ctx.moveTo(p.x, p.y+(p.h/2));
		this.ctx.lineTo(p.x+p.w,p.y+(p.h/2));
		this.ctx.setLineDash([]);
		this.ctx.stroke();
	}

	getCollision(CheckBox){


		let collision = {
			left:false,
			right:false,
			up:false,
			down:false,
			collision:false,
			box:false,
		};
		let X=CheckBox.p.x;
		let MX=X+CheckBox.p.w;
		let Y=CheckBox.p.y;
		let MY=Y+CheckBox.p.h;
		let veryial=false;
		let horizontal=false;

		this.ListCollision.forEach(function(box){
			

			if(box.p.x <= X && box.p.x+box.p.w >= X){
				horizontal=true;
				collision.left=true;
			}

			if(box.p.x <= MX && box.p.x+box.p.w >= MX){
				horizontal=true;
				collision.right=true;
			}

			if(box.p.y <= Y && box.p.y+box.p.h >= Y){
				veryial=true;
				collision.up=true;

			}
			if(box.p.y <= MY && box.p.y+box.p.h >= MY){
				veryial=true;
				collision.down=true;

			}

			if(horizontal && veryial){
				collision.collision=true;
				collision.box=box;
				return true;
			}
			veryial=false;
			horizontal=false;
			collision = {
				left:false,
				rught:false,
				up:false,
				down:false,
				collision:false,
				box:false,
			};
		});




		return collision;
	}


	Audio(File){
		let audio = new Audio();
		audio.src=File;
		audio.volume=0.05;

		return {
			audio,
			Play(){
				audio.play();
			},
			Volume(value=0.05){
				audio.volume=value;
			}
		};
	}


}

class jDEngineCanvas{
	constructor(width,height){
		this.canvas=document.createElement('canvas');
		this.canvas.width=width;
		this.canvas.height=height;
		this.ctx = this.canvas.getContext("2d");
	}
}

class jDEngineKeyControl{

	constructor(){

		this.KeyDown=[];
		this.KeyUP=[];
		let t=this;
		document.addEventListener('keydown', function(event) {
			if(t.KeyDown.indexOf(event.key)==-1){
				t.KeyDown.push(event.key);
			}
		});
		document.addEventListener('keyup', function(event) {
			if(t.KeyDown.indexOf(event.key)>-1){
				delete(t.KeyDown[t.KeyDown.indexOf(event.key)]);
			}

		});
	}



	IsDown(_key){
		if(this.KeyDown.indexOf(_key)>-1){
			return true;
		}else{
			return false;
		}
	}
}

class jDEngineCursorControl{
	constructor(){
		this.x=0;
		this.y=0;
		this.clickX=0;
		this.clickY=0;
		this.listClick=[];
		let t=this;
		document.addEventListener('mousemove', function(event) {
			t.x=event.clientX;
			t.y=event.clientY;
		});

		document.addEventListener('click', function(event) {
			this.clickX=event.clientX;
			this.clickY=event.clientY;
			t.eventClick();
		});
	}

	Where(){
		return {'x':this.x,y:this.y};
	}

	eventClick(){
		for(let key in this.listClick){
			this.listClick[key]();
		}

	}

	click(fun){
		this.listClick.push(fun);
	}
}

