

  var jDE=new jDEngine();
  var key=jDE.KeyControl;
  var cursor=jDE.CursorControl;
  jDE.BackgroundColor('black');



  var map=[];
  map[0]=[1,1,1,0,0,1];
  map[1]=[1,0,1,1,0,1];

  
  var _ObjectMap=[];

  map.forEach(function(row,y){
    row.forEach(function(value,i){
      let _x=(i+1)*50;
      let _y=(y+1)*50;
      let color='blue';
      if(value==1){
        color='green';
      }
      _ObjectMap.push(jDE.Rect({
          x:_x,
          y:_y,
          w:50,
          h:50,
          strokeColor:"back",
          lineWidth:1,
          fillColor:color,
          level:1,
          
        })
      );
    });
  });


  _ObjectMap.push(jDE.Rect({
    x:500,
    y:200,
    w:100,
    h:100,
    fillColor:"blue",
    strokeColor:"green",
    lineWidth:2,
    level:2,
    collision:true,
  }));

  _ObjectMap.push(jDE.Rect({
    x:100,
    y:50,
    w:100,
    h:100,
    fillColor:"red",
    strokeColor:"green",
    lineWidth:2,
    collision:true,
    level:1,
  }));
  /*_ObjectMap.push(jDE.Rect({
    x:-400,
    y:0,
    w:800,
    h:10,
    collision:true,
    fillColor:"yellow",
    level:3,
  }));*/
  _ObjectMap.push(jDE.Rect({
    x:880,
    y:0,
    w:10,
    h:500,
    collision:true,
    fillColor:"yellow",
    level:3,
  }));
  /*_ObjectMap.push(jDE.Rect({
    x:5,
    y:5,
    w:10,
    h:300,
    collision:true,
    fillColor:"yellow",
  }));*/

  _ObjectMap.push(jDE.Rect({
    x:200,
    y:200,
    w:10,
    h:300,
    strokeColor:"green",
  }));


  _ObjectMap.push(jDE.Image({
    x:300,
    y:300,
    w:100,
    h:100,
    level:50,
    collision:true,
    src:'texture/box.png'
  }));

  

  _ObjectMap.push(jDE.Image({
    x:-5000,
    y:-5000,
    w:10000,
    h:10000,
    repeat:true,
    level:0,
    src:'texture/grass.jpg'
  }));

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


  jDE.AddList(_ObjectMap);
  jDE.Add(player);


  player.DrowCollision();
  player.setFixed();

  var playr_step=jDE.Audio('sfx/player/pl_step1.wav');
  var shot=jDE.Audio('sfx/weapons/usp.wav');
  var speed= 10;

  cursor.click(function(){
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
      console.log(Collision);
    }

    player.direction(cursor.x,cursor.y);

    let x=0;
    let y=0;
    
    if(key.IsDown('a') && !Collision.left){
      x=speed;
    }

    if(key.IsDown('d') && !Collision.right){
      x=-speed;
    }

    if(key.IsDown('w') && !Collision.up ){
      y=speed;
    }

    if(key.IsDown('s') && !Collision.down){
      y=-speed;
    }

    if(x!=0 || y!=0){
      playr_step.Play();
    }
    jDE.MoveAll(x,y);

  });

  jDE.Start();




