$(document).ready(function(){
  window.addEventListener("keypress", checkKeyPressed, false);

  var pizzaSnap = Snap('#pizza');
  var cheeseDropSnap = pizzaSnap.select('#cheese-drop');
  cheeseDropSnap.attr({transform: 't0 -180'});
  var cheeseDrop = $('#cheese-drop');
  
  function checkKeyPressed(e) {
    switch(e.keyCode){
      case 32:
        if (cheeseDrop.css('opacity') == '0'){
          cheeseDropSnap.animate({opacity: 1, transform: 't0 0'}, 350, function(){
            cheeseDropSnap.animate({d: cheeseDropIntermediate}, 200, function(){
              var cheeseFinalMask = pizzaSnap.path(cheeseDropMask).attr({id: 'cheese-mask', fill: '#ffffff'});
              var g = pizzaSnap.group(cheeseDropSnap);
              g.attr({mask: cheeseFinalMask});
              cheeseDropSnap.animate({transform: 's5.5'}, 800);
              cheeseAnimation(cheeseFinalMask);
            });
          });
        }
        break;
    }
  }
  
  function cheeseAnimation(){
    var cheeseMask = pizzaSnap.select('#cheese-mask');
    cheeseMask.animate({d: cheeseMaskAnimationRoute}, 1500, mina.easeinout, cheeseAnimationBackward); 

    function cheeseAnimationBackward(){
      cheeseMask.animate({d: cheeseDropMask}, 1500, mina.easeinout, cheeseAnimation); 
    }; 
  }
});

