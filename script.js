

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

  /*let player=jDE.Rect({
    x:700,
    y:200,
    w:50,
    h:50,
    fillColor:"green",
    strokeColor:"green",
    lineWidth:2,
    level:100,
  });*/


  
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
    

    if(key.IsDown('e') ){
      player.rotate(0.5);

    }
    if(key.IsDown('q')){
      player.rotate(-0.5);
    }
	
	
    let Collision = jDE.getCollision(player);
    if(key.IsDown('c')){
		jDE.ListCollision.forEach(function(box){
			console.log(jDE.CheckCollision(player,box));
		});
    
    }

    player.direction(cursor.x,cursor.y);

    let x=0;
    let y=0;
    
    if(key.IsDown('a') ){
      x=speed;
    }

    if(key.IsDown('d') ){
      x=-speed;
    }

    if(key.IsDown('w')){
      y=speed;
    }

    if(key.IsDown('s')){
      y=-speed;
    }

    if(x!=0 || y!=0){
      playr_step.Play();
    }
    jDE.MoveAll(x,y);

  });

  jDE.Start();




