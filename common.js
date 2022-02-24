(function() {
  'use strict';
  var userDebug = true;
  
  function setDebug(status) {
    userDebug = status ? true : false;
  };
  
  function debugMsg(msg, key) {
    if (userDebug === false) { return; }
    key ?
      console.log(key + ': ' + msg) : console.log(msg);
  };
  
})();
