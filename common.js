(function() {
  'use strict';
  
  var _global = typeof window === 'object' && window.window === window ? window : typeof self === 'object' && self.self === self ? self : typeof global === 'object' && global.global === global ? global : void 0;
  
  var userDebug = true;
  
  function setDebug(status) {
    userDebug = status ? true : false;
  };
  
  function debugMsg(msg, key) {
    if (userDebug === false) { return; }
    key ?
      console.log(key + ': ' + msg) : console.log(msg);
  };
  
  _global.setDebug = setDebug;
  _global.debugMsg = debugMsg;
  
})();
