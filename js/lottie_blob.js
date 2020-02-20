var animationData = bodymovin.loadAnimation({
container: document.getElementById('blob'),
renderer: 'svg',
loop: true,
autoplay: true,
path: 'js/data5.json',
name: "animScroll",
}), animScroll, tl;

var animScroll = bodymovin.loadAnimation({animationData: animationData.default})

// animScroll.addEventListener('DOMLoaded', function () {
//   tl = new TimelineMax({repeat: 0})
//   tl.to({frame: 0}, 1, {
//     frame: animScroll.totalFrames-1,
//     onUpdate: function() {
//       animScroll.goToAndStop(Math.round(this.target.frame), true)
//     },
//     Ease:Linear.easeNone
//   })
//
//
// var controller = new ScrollMagic.Controller();
//
// var scene = new ScrollMagic.Scene({
//   triggerElement: ".sec3",
//   offset: 300,
//   duration: 3000 }).setTween(tl).setPin("#bodymovin").addTo(controller);
//
// })
