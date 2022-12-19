

  var jDE=new jDEngine();
  var key=jDE.KeyControl;
  var cursor=jDE.CursorControl;
  jDE.BackgroundColor('black');


	map();
  let player=jDE.Image({
    x:700,
    y:200,
    level:100,
    src:'texture/pers.png'
  });




  
  jDE.Add(player);
  player.DrowCollision();
  player.setFixed();

  var playr_step=jDE.Audio('sfx/player/pl_step1.wav');
  var shot=jDE.Audio('sfx/weapons/usp.wav');
  var speed= 10;

  cursor.click(function(){
    shot.Stop();
    shot.Play();
  });
  

  jDE.Loop('main',function(){ 

    player.direction(cursor.x,cursor.y);

    let x=0;
    let y=0;
    
    if(key.IsDown('a')){
  		if(jDE.IsWall(player,'left')){
  			x=jDE.GetCloserHorizontal(player,jDE.LastWall);
  		}else{
  			x=speed; 
  		}
    }

    if(key.IsDown('d')){
  		if(jDE.IsWall(player,'right')){
  			x=-jDE.GetCloserHorizontal(jDE.LastWall,player);
  		}else{
  			x=-speed; 
  		}
    }

    if(key.IsDown('w')){
      if(jDE.IsWall(player,'top')){
        y=jDE.GetCloserVertical(jDE.LastWall,player);
      }else{
        y=speed;
      }
      
    }

    if(key.IsDown('s')){
      if(jDE.IsWall(player,'bottom')){
        y=-jDE.GetCloserVertical(player,jDE.LastWall);
      }else{
        y=-speed;
      }
      
    }

    if(x!=0 || y!=0){
      playr_step.Play();
    }
    jDE.MoveAll(x,y);

  });

  jDE.Start();




