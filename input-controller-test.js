
let testObject = {
  "left": {
    keys: [37],
    enabled: false
  },
  "right": {
    keys: [39]
  },
}

let testObject2 = {
  "left": {
    keys: [65],
    enabled: true
  },
  "right": {
    keys: [68],
    enabled: true
  },
  "jump": {
    keys: [32]
  }
}

let testTarget = document.getElementById('testDiv');
let box = document.getElementById('box');

// let inputController = new InputController(testObject, testTarget);

let inputController = new InputController();
inputController.bindActions( testObject );

inputController.attach( testTarget, !false );

// inputController.attach( testTarget );
// inputController.enabled = false;


var is_jumping;
var current_jump_altitude = 0;
var jump_step_default = 4;
var jump_step;

setInterval(function(){
  
  var xs, ys;
  if( inputController.isActionActive("left")){
    xs = -1;
  }else if( inputController.isActionActive("right")){
    xs = 1;
  }
  // xs = Math.random() > .5 ? 1 : -1;
  if( xs !== undefined ){
    box.style.left = parseInt( box.style.left ) + xs + "%";
  }

  
  if( inputController.isActionActive("jump") && !is_jumping ){
    is_jumping = true;
    current_jump_altitude = jump_step_default;
    jump_step = jump_step_default;
    box.style.backgroundColor = "black";
  }

  if(is_jumping) {
    console.log(current_jump_altitude);
    

    current_jump_altitude += jump_step;
    // if( jump_step > -jump_step_default ) 
      jump_step -= .2;

    /*
    if( current_jump_altitude >= 20 ){
      jump_step = -jump_step_default;
    }
    */

    if( current_jump_altitude <= 0 ){

      current_jump_altitude = 0;
      jump_step = - jump_step/2;

      if( jump_step < .8 ){
        is_jumping = false;
        box.style.backgroundColor = "red";
      }
    }

    box.style.top = (50 - current_jump_altitude) + "%";
    
/*
    if(jumpFinish) {
      current_jump_altitude-= 3;
    } else {
      current_jump_altitude+= 3;
      if(current_jump_altitude >= 20) {
        jumpFinish = true;
      }
    }
    if(current_jump_altitude <= -3) {
      console.log(current_jump_altitude);
      jump = false;
      box.style.backgroundColor = "red";
    }
    */
  }

}, 40);


setInterval(function() {
  console.log(inputController.isKeyPressed(39));
}, 2000);



// >>> BUTTON >>>
function addElement( name, type, id ){
  var buttons = document.getElementsByClassName('buttons')[0];
  // console.log('buttons:', buttons);
  var element = document.createElement('input');
  buttons.appendChild( element );
  element.value = name;
  element.type = type;
  element.id = id;
  return element;
}

function addInput( id, value ){
  var input = addElement( value, 'text', id );
}

function addButton( name, onClick, get_value_form ){
  var button = addElement( name, 'button' );
  if( get_value_form ){
    var target = document.getElementById(get_value_form);
    button.onclick = function(){
      onClick( target.value );
    }
  }else{
    button.onclick = onClick;
  }
}




//
addButton( 'Log inputController.actions', function(){
  console.log( inputController.actions );
});

//
addButton( 'bindActions', function(){
  inputController.bindActions( testObject2 );
});

//
addButton( 'attach', function(){
  inputController.attach(testTarget, false);
});

//
addButton( 'detach', function(){
  inputController.detach();
});

//
addInput( 'actionField', 'action' );

//
addButton( 'enableAction', function( target_value ){
  // console.log('enableAction: ', target_value );
  inputController.enableAction(target_value);
}, 'actionField' );

//
addButton( 'disableAction', function( target_value ){
  inputController.disableAction(target_value);
}, 'actionField' );



// <<< BUTTON <<<
// console.log(a.actionsToBind);
// a.bindActions = testObject2;
// console.log(a.actionsToBind);