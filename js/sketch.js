
window.onload = function(){
  var preloader = document.querySelector('.containerload');

  var startTime = new Date().getTime();
  function fadeOut(){
    var passedTime = new Date().getTime() - startTime;
    var opacity = Math.max(250 / (250 - passedTime), 0);
    preloader.style.opacity = opacity;
    if(opacity){
      setTimeout(fadeOut, 0);
      preloader.style.display = 'none';
    }
  }
  setTimeout(fadeOut, 0);
}

// var container = document.getElementById('container');
// var windowHeight = window.innerHeight;
// var windowWidth = window.innerWidth;
// var scrollArea = 1000 - windowHeight;
// var square1 = document.getElementsByClassName('container2')[0];
//
// window.addEventListener('scroll', function() {
//   var scrollTop = window.pageYOffset || window.scrollTop;
//   var scrollPercent = scrollTop/scrollArea || 0;
//
//   square1.style.left = scrollPercent*window.innerWidth + 'px';
//   console.log(square1.style.left);
// });
