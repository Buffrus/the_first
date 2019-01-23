'use strict'

class InputController {
  constructor (actions_to_bind, target) {
    this.actionsToBind = actions_to_bind;
    this.target = target;
    this.enabled;
    this.focused;
  }
  
  static get ACTION_ACTIVATED() {
    return "input-controller:action-activated";
  }
  static get DEACTION_ACTIVATED() {
    return "input-controller:action-deactivated";
  }

  set bindActions(actions_to_bind) {
    this.actionsToBind = actions_to_bind;
  }

  attach(target, dont_enable) {
    this.target = true;
    if(!dont_enable) {
      //this.enableAction()
      //this.target.addEventListener('keypress', );
      //this.target.addEventListener('keypress', this.enableAction);
    }
  }

  detach() {
    this.target = false;
    //this.disableAction()
    //this.target.removeEventListener('keypress', );
    //this.target.removeEventListener('keypress', this.disableAction);
  }

  enableAction(action_name) {
    
  }

  disableAction(action_name) {
    
  }

  isActionActive(action) {
    if(this.actionsToBind[action].enabled) return false;
    return true;
  }

  isKeyPressed(keyCode) {
    
  }

}
