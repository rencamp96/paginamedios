var controller = new ScrollMagic.Controller();
var box1 = document.getElementById('b1').offsetWidth;
var box2 = document.getElementById('b2').offsetWidth;
var box3 = document.getElementById('b3').offsetWidth;
var box4 = document.getElementById('b4').offsetWidth;
var cont = document.getElementById('container').offsetWidth;
var cont2 = document.getElementById('container2').offsetWidth;

var widthContainer = box1+box2+box3+box4+cont+cont2;
console.log(box1, box2, box3, box4, cont,cont2);
console.log(widthContainer);

var scrollHorizontal = new TimelineLite()
  scrollHorizontal.to("#container", 1, {x: -widthContainer})

var horizontalScroll = new ScrollMagic.Scene({
      triggerElement: "#container",
      triggerHook: 'onLeave',
      duration: 3000
    }).setPin("#container").setTween(scrollHorizontal).addTo(controller);
