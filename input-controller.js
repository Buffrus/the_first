'use strict'

class InputController {
  
  // CONSTANTS
  static get ACTION_ACTIVATED() {
    return "input-controller:action-activated";
  }
  static get DEACTION_ACTIVATED() {
    return "input-controller:action-deactivated";
  }



  constructor ( actions_to_bind, target ) {
    
    this.actions = {};

    /*
    BindedAction - class name
    bindedAction - class instance, method name
    binded_action - variable
    _binded_action - private variable
    BINDED_ACTION - constant
    $binded_action - JQuery object -> $('.binded_action')
    */

    this.enabled;
    this.focused;

    /*
    for (let action in actions_to_bind) {
      if(!('enabled' in actions_to_bind[action]))
      {
        this.actions[action].enabled = true;
      }
    }
    */

    if( actions_to_bind ) this.bindActions( actions_to_bind );
    if( target ) this.attach( target );
  }
  

  bindActions( actions_to_bind ) {

    for (let action_name in actions_to_bind) {

      var action_to_bind = actions_to_bind[action_name];
      var action = this.actions[action_name];

      // Добавить отсутствующие активности
      if(!action) {
        action = this.actions[action_name] = {};
        action.keys = [];
        action.enabled = true;
        action.active = false;
      }

      action.keys = [...action.keys, ...action_to_bind.keys];

      if( action_to_bind.enabled !== undefined ) action.enabled = action_to_bind.enabled;

    };

  }

  attach(target, dont_enable) {
    
    this.detach();

    this.target = target;
    if( dont_enable !== undefined )  this.enabled = dont_enable;
      
    //this.enableAction()
    //target.addEventListener('keypress', );
    //target.addEventListener('keypress', this.enableAction);
    if( !this.onKeyDown ){
      
      this.onKeyDown = (e) => {
        console.log("onKeyDown: ", e.keyCode);
        for (let action_name in this.actions) {
          let action = this.actions[action_name];
          if(action.keys.indexOf( e.keyCode ) != -1 && action.enabled) {
            action.active = true;          
          }
        }
        // }
      }

      this.onKeyUp = (e) => {
        console.log("onKeyUp: ", e.keyCode);
        for (let action_name in this.actions) {
          let action = this.actions[action_name]
          if(action.keys.indexOf( e.keyCode ) != -1 && action.enabled) {
            action.active = false;
          }
        }
        // }
      }

    }

    target.addEventListener( 'keydown', this.onKeyDown );
    target.addEventListener( 'keyup', this.onKeyUp );
    
  }

  detach() {
    
    if( !this.target ) return;

    this.enabled = false;
    this.target.removeEventListener( 'keydown', this.onKeyDown );
    this.target.removeEventListener( 'keyup', this.onKeyUp );
    this.target = undefined;
  }

  enableAction(action_name) {
    var action = this.actions[action_name];
    if( !action ) return;
    action.enabled = true;
  }

  disableAction(action_name) {
    var action = this.actions[action_name];
    if( !action ) return;
    action.enabled = false;
  }

  isActionActive(action_name) {
    var action = this.actions[action_name];
    if( !action ) return;
    return action.active;
  }

  isKeyPressed(keyCode) {
    for (let action_name in this.actions) {
      let action = this.actions[action_name]
      if(action.keys.indexOf( keyCode ) != -1 && action.active) {
        return true;
      }
    }
    return false;
  }

}
