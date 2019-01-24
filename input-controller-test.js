
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
    enabled: false
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


var jump;
var jumpFinish;
var stepJump

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

  
  if( inputController.isActionActive("jump")){
    if(!jump) {
      jump = true;
      box.style.backgroundColor = "black";
      stepJump = 3;
      jumpFinish = false;
    }
  }

  if(jump) {
    console.log(stepJump);
    box.style.top = (50 - stepJump) + "%";
    if(jumpFinish) {
      stepJump-= 3;
    } else {
      stepJump+= 3;
      if(stepJump >= 20) {
        jumpFinish = true;
      }
    }
    if(stepJump <= -3) {
      console.log(stepJump);
      jump = false;
      box.style.backgroundColor = "red";
    }
  }

}, 40);


// setInterval(function() {
//   console.log(inputController.isKeyPressed(37));
// }, 2000);



// >>> BUTTON >>>
function addInput( name, type, onClick , id){
  var buttons = document.getElementsByClassName('buttons')[0];
  // console.log('buttons:', buttons);
  var button = document.createElement('input');
  buttons.appendChild( button );
  button.value = name;
  button.type = type;
  button.id = id;
  button.onclick = onClick;
}

//
addInput( 'Log inputController.actions', 'button', function(){
  console.log( inputController.actions );
});

//
addInput( 'bindActions', 'button',  function(){
  inputController.bindActions( testObject2 );
});

//
addInput( 'attach', 'button',  function(){
  inputController.attach(testTarget, false);
});

//
addInput( 'detach', 'button',  function(){
  inputController.detach();
});

//
addInput( 'action', 'text', undefined, 'actionField');

//
addInput( 'enableAction', 'button', function(){
  let actionField = document.getElementById("actionField");
  inputController.enableAction(actionField.value);
});

//
addInput( 'disableAction', 'button', function(){
  let actionField = document.getElementById("actionField");
  inputController.disableAction(actionField.value);
});



// <<< BUTTON <<<
// console.log(a.actionsToBind);
// a.bindActions = testObject2;
// console.log(a.actionsToBind);