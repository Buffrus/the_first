'use strict'

class InputController {
  
  // CONSTANTS
  static get ACTION_ACTIVATED() {
    return "input-controller:activate";
  }
  static get ACTION_DEACTIVATED() {
    return "input-controller:deactivated";
  }



  constructor ( config, target ) {
    
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

    this.actions_by_gesture = {};
    this.actions_by_keycode = {};
    this.pressed_keys = {};
    
    var default_devices = {
      keyboard: {
        controller_class: KeyboardInputController,
        // enabled: true,
      },
      mouse: {
        controller_class: MouseInputController,
        // enabled: true,
      },
      // touch: {
      //   // controller_class: TouchInputController,
      //   enabled: true,
      // }
    };


    /*
    for (let action in actions_to_bind) {
      if(!('enabled' in actions_to_bind[action]))
      {
        this.actions[action].enabled = true;
      }
    }
    */

    if( config.actions ) this.bindActions( config.actions );
    if( target ) this.attach( target );
  }
  

  testEvent() {

  }


  bindActions( actions_to_bind ) {

    for (let action_name in actions_to_bind) {

      var action_to_bind = actions_to_bind[action_name];
      var action = this.actions[action_name];

      // Добавить отсутствующие активности
      if(!action) {
        action = this.actions[action_name] = {};
        action.name = action_name;
        // action.keys = [];
        action.enabled = true;
        action.active = false;
      }
      // Записываем кнопки клавиатуры
      if( action_to_bind.keys ) {
          for(let key_code of action_to_bind.keys) {
          this.actions_by_keycode[key_code] = action;
        }
      }
      // Записываем жесты
      if( action_to_bind.gestures ) {
          for(let gest of action_to_bind.gestures) {
          this.actions_by_gesture[gest] = action;
        }
      }


      // action.keys = [...action.keys, ...action_to_bind.keys];

      if( action_to_bind.enabled !== undefined ) action.enabled = action_to_bind.enabled;

    };

  }

  attach(target, dont_enable) {
    
    
    // Перенести в конструктор
    function detectMob() { 
      if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
      ){
        return true;
      } else {
        return false;
      }
    }


    // function addCustomEvent(custom_event_name, event_detail, action_title) {
    //   var custom_event = new CustomEvent(action_title, {
    //     detail: event_detail
    //   }); 
    //   target.dispatchEvent(custom_event);
    // }


    // Переименовать метод
    function customEventActive(action) {
      var event_active = new CustomEvent( InputController.ACTION_ACTIVATED, {
        detail: action.name
      });
      action.active = true;   
      target.dispatchEvent(event_active);
      console.log(activated_action);
    }

    function customEventDeactive(action) {
      var event_deactive = new CustomEvent( InputController.ACTION_DEACTIVATED, {
        detail: action.name
      });
      action.active = false;   
      target.dispatchEvent(event_deactive);
      console.log(deactivated_action);
    }

    var scope = this;

    this.detach();

    this.target = target;
    if( dont_enable !== undefined )  this.enabled = !dont_enable;
      
    // Клавиатура
    if( !this.onKeyDown ){
      this.onKeyDown = function(e) {
        // console.log("onKeyDown: ", e.keyCode);
        // for (let action_name in this.actions) {
          scope.pressed_keys[e.keyCode] = true;
          if( !scope.enabled ) return;
          // let action = scope.actions[action_name];
          let action = scope.actions_by_keycode[e.keyCode];''
          // let action = scope.actions[action_name];
          if( action && action.enabled && !action.active) {
            // if(action.keys.indexOf( e.keyCode ) != -1 && action.enabled) {
              // var event_active = new CustomEvent(InputController.ACTION_ACTIVATED, {
              //   detail: action.name
              // });
              // action.active = true;   
              // target.dispatchEvent(event_active);
              // console.log(InputController.ACTION_ACTIVATED);
            customEventActive(InputController.ACTION_ACTIVATED, action);
            // }
          }
        // }
        // }
      }

      this.onKeyUp = function(e) {
        // console.log("onKeyUp: ", e.keyCode);

        // for (let action_name in this.actions) {
        //   let action = this.actions[action_name]
        //   if(action.active) {
        //     if(action.keys.indexOf( e.keyCode ) != -1 && action.enabled) {
        //       action.active = false;
        //       console.log(InputController.DEACTION_ACTIVATED);
        //     }
        //   }
        // }
          //scope.pressed_keys[e.keyCode] = false;
          delete scope.pressed_keys[e.keyCode];
          if ( !scope.enabled ) return;
          let action = scope.actions_by_keycode[e.keyCode];
          // console.log(scope.actions_by_keycode[e.keyCode]);
          if(action && action.active && action.enabled) {
            
            // var event_deactive = new CustomEvent(InputController.ACTION_DEACTIVATED, {
            //   detail: action.name
            // });
            // action.active = false;
            // target.dispatchEvent(event_deactive);
            // console.log(InputController.ACTION_DEACTIVATED);
            customEventDeactive(InputController.ACTION_DEACTIVATED, action);
          }
      }
    }
    target.addEventListener( 'keydown', this.onKeyDown );
    target.addEventListener( 'keyup', this.onKeyUp );
    
    // Тачпад
    if(detectMob()) {

      function getGestureSwipe(x, y, min_distance, max_distance) {
        if( (min_distance===undefined || (Math.abs(x) >= min_distance) || (Math.abs(y) >= min_distance) ) 
          && (max_distance===undefined || (Math.abs(x) <= max_distance && Math.abs(y) <= max_distance))
          ) {
          if(Math.abs(x) > Math.abs(y)) {
            if(x > 0) {
              return "swipe-right";
            } else {
              return "swipe-left";
            }
          } else {
            if(y > 0) {
              return "swipe-down";
            } else {
              return "swipe-up";
            }
          }
        }
      }

      let touch_point;
      let shift_koord;

      if( !this.onTouchStart ) {
        this.onTouchStart = function(e) {
          console.log('Касание старт');
          let touch = e.changedTouches[0];
          touch_point = [touch.screenX, touch.screenY];
        }

        this.onTouchEnd = function(e) {
          console.log('Касание закончено');
          let touch = e.changedTouches[0];
          shift_koord = [touch.screenX - touch_point[0], touch.screenY - touch_point[1]];
          let gesture = getGestureSwipe(shift_koord[0], shift_koord[1], 50, 150);
          console.log(gesture);
          
          
          if(gesture) {
            let action = scope.actions_by_gesture[gesture];
            if(action && action.enabled) {
              customEventActive(InputController.ACTION_ACTIVATED, action);
            }
          }
        }
      }

      target.addEventListener( 'touchstart' , this.onTouchStart);
      target.addEventListener( 'touchend' , this.onTouchEnd);
    } else {
      // Не смартфон
    }
  }

  detach() {
    
    if( !this.target ) return;

    this.enabled = false;
    this.target.removeEventListener( 'keydown', this.onKeyDown );
    this.target.removeEventListener( 'keyup', this.onKeyUp );
    this.target.removeEventListener( 'touchstart' , this.onTouchStart);
    this.target.removeEventListener( 'touchend' , this.onTouchEnd);
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
    return this.pressed_keys[keyCode];
  }

}
