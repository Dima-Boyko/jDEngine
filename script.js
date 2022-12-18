

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
    
    if(key.IsDown('a') && !jDE.IsWall(player,'left')){
      x=speed;
    }

    if(key.IsDown('d') && !jDE.IsWall(player,'right')){
      x=-speed;
    }

    if(key.IsDown('w') && !jDE.IsWall(player,'top')){
      y=speed;
    }

    if(key.IsDown('s') && !jDE.IsWall(player,'bottom')){
      y=-speed;
    }

    if(x!=0 || y!=0){
      playr_step.Play();
    }
    jDE.MoveAll(x,y);

  });

  jDE.Start();




