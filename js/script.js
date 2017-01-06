$(document).ready(function(){
  window.addEventListener("keypress", checkKeyPressed, false);
  
  var pizzaSnap = Snap('#pizza');
  
  var sauceSnap = pizzaSnap.select('#sauce-drop');
  sauceSnap.attr({transform: 't0 -180'});
  var sauceSnapGroup = pizzaSnap.group(sauceSnap);
  
  var cheeseSnap = pizzaSnap.select('#cheese-drop');
  cheeseSnap.attr({transform: 't0 -180'});
  var cheeseSnapGroup = pizzaSnap.group(cheeseSnap);
  cheeseSnapGroup.before(sauceSnapGroup);
  
  var pepperoniSnapArr = pizzaSnap.selectAll('path[class^="pepperoni"]');
  pepperoniSnapArr.attr({transform: 't0 -180'});
  var pepperoniSnapGroup = pizzaSnap.group(pepperoniSnapArr);
  pepperoniSnapGroup.before(cheeseSnapGroup);
  
  function checkKeyPressed(e) {
    switch(e.keyCode){
      case 32:
        if (sauceSnap.attr('opacity') == '0'){
          sauceSnap.animate({opacity: 1, transform: 't0 0'}, 350, function(){
            sauceSnap.animate({d: dropIntermediatePath}, 200, function(){
              var sauceMaskSnap = pizzaSnap.path(sauceMask).attr({id: 'sauce-mask', fill: '#ffffff'});
              sauceSnapGroup.attr({mask: sauceMaskSnap});
              sauceSnap.animate({transform: 's3'}, 800);
            });
          });
        }
        else if (cheeseSnap.attr('opacity') == '0'){
          cheeseSnap.animate({opacity: 1, transform: 't0 0'}, 350, function(){
            cheeseSnap.animate({d: dropIntermediatePath}, 200, function(){
              var cheeseMaskSnap = pizzaSnap.path(cheeseMask).attr({id: 'cheese-mask', fill: '#ffffff'});
              cheeseSnapGroup.attr({mask: cheeseMaskSnap});
              cheeseSnap.animate({transform: 's5.5'}, 1200);
              cheeseAnimation(cheeseMaskSnap);
            });
          });
        }
        else if (pepperoniSnapArr[0].attr('opacity') == '0'){
          pepperoniSnapArr.animate({opacity: 1, transform: 't0 0'}, 500);
        }
        break;
    }
  }
  
  function cheeseAnimation(){
    var cheeseMaskSnap = pizzaSnap.select('#cheese-mask');
    cheeseMaskSnap.animate({d: cheeseMaskRoute}, 1500, mina.easeinout, cheeseAnimationBackward); 

    function cheeseAnimationBackward(){
      cheeseMaskSnap.animate({d: cheeseMask}, 1500, mina.easeinout, cheeseAnimation); 
    }; 
  }
});

