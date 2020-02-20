import * as THREE from './lib/three.module.js';
import { GLTFLoader } from './lib/loaders/GLTFLoader.js';
import { DRACOLoader } from './lib/loaders/DRACOLoader.js';

var scene3d = document.getElementById("scene3d");
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 300;
var camera, mixer, controls, model, percent;

var scene = new  THREE.Scene();
var clock = new THREE.Clock();
var renderer = new THREE.WebGLRenderer( { alpha: true } );

function noScroll() {
  window.scrollTo(0, 0);
}

init();

function init() {

  setupTHREEObjects();
  ambientSetup();
  sceneObjects();
  window.addEventListener( 'wheel', onMouseWheel, false );

}

function setupTHREEObjects() {

  camera = new THREE.PerspectiveCamera( 70, (window.innerWidth/2) / window.innerHeight , 1, 10 );
  camera.position.z = 9;
  camera.position.y = .5;
  scene.add( camera );

  renderer.setClearColor( 0xFF787F, 0 );;
  renderer.setSize(window.innerWidth/2, window.innerHeight);
  scene3d.appendChild(renderer.domElement);

}

window.addEventListener('resize', function(){

  var width = window.innerWidth/2;
  var height = window.innerHeight;
  renderer.setSize(window.innerWidth/2, height);

  camera.aspect = window.innerWidth/2/height;
  camera.updateProjectionMatrix();

});

function ambientSetup(){

  var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.8 );
  scene.add( ambientLight );

  var pointLight = new THREE.PointLight( 0xFFC5CB, .8 );
  pointLight.position.copy( camera.position );
  scene.add( pointLight );

}

function sceneObjects(){

  const loadingManager = new THREE.LoadingManager( () => {
    const loadingScreen = document.getElementById( 'loading-screen');
    const video = document.getElementById( 'videoBG');
    loadingScreen.classList.add( 'fade-out' );
    video.play();

  } );


  // envmap
  var path = './assets/envmap/';
  var format = '.jpg';
  var envMap = new THREE.CubeTextureLoader(loadingManager).load( [
    path + 'posx' + format, path + 'negx' + format,
    path + 'posy' + format, path + 'negy' + format,
    path + 'posz' + format, path + 'negz' + format
  ] );

  var dracoLoader = new DRACOLoader(loadingManager);
  dracoLoader.setDecoderPath( 'js/libs/draco/gltf/' );

  var loader = new GLTFLoader(loadingManager);
  loader.setDRACOLoader( dracoLoader );
  loader.load( './assets/modelo/modelo_final.gltf', function ( gltf ) {

    var children = []

    model = gltf.scene;

    model.position.set( 0, 0, 5);
    model.scale.set( 0.001, 0.001, 0.001 );
    model.rotateY(-.4);
    model.traverse( function ( child ) {

      if ( child.isMesh ) child.material.envMap = envMap;

    });

    var newMaterialPurple = new THREE.MeshPhongMaterial( { color: 0xA2A0E8, specular: 0x000000, shininess: 0,  transparent: true } ) ;
    var newMaterialBlue = new THREE.MeshPhongMaterial( { color: 0x2C3EC8, specular: 0x000000, shininess: 0,  transparent: true } ) ;
    var newMaterialOrange = new THREE.MeshPhongMaterial( { color: 0xFFAD75, specular: 0x000000, shininess: 0,  transparent: true } ) ;
    var newMaterialYellow = new THREE.MeshPhongMaterial( { color: 0xECE67A, specular: 0x000000, shininess: 0,  transparent: true } ) ;
    var newMaterialGreen = new THREE.MeshPhongMaterial( { color: 0x00EFBF, specular: 0x000000, shininess: 0,  transparent: true } ) ;
    var newMaterialRed = new THREE.MeshPhongMaterial( { color: 0xFF787F, specular: 0x000000, shininess: 0,  transparent: true } ) ;

    gltf.scene.traverse( function ( child ) {
      if ( child.isMesh ) {
        children.push(child)
      }
    } );

    scene.add( model );

    children[1].traverse((o) => {
      if (o.isMesh) o.material = newMaterialBlue;
    });
    children[2].traverse((o) => {
      if (o.isMesh) o.material = newMaterialRed;
    });
    children[3].traverse((o) => {
      if (o.isMesh) o.material = newMaterialRed;
    });
    children[4].traverse((o) => {
      if (o.isMesh) o.material = newMaterialYellow;
    });
    children[7].traverse((o) => {
      if (o.isMesh) o.material = newMaterialPurple;
    });
    children[8].traverse((o) => {
        if (o.isMesh) o.material = newMaterialBlue;
    });
    children[9].traverse((o) => {
      if (o.isMesh) o.material = newMaterialPurple;
    });
    children[10].traverse((o) => {
      if (o.isMesh) o.material = newMaterialBlue;
    });
    children[11].traverse((o) => {
      if (o.isMesh) o.material = newMaterialGreen;
    });
    children[12].traverse((o) => {
      if (o.isMesh) o.material = newMaterialRed;
    });
    children[13].traverse((o) => {
      if (o.isMesh) o.material = newMaterialOrange;
    });
    children[14].traverse((o) => {
      if (o.isMesh) o.material = newMaterialPurple;
    });

    mixer = new THREE.AnimationMixer( model );
    mixer.clipAction( gltf.animations[ 0 ] ).play();

    animate();

    camera.lookAt(model.position.x-.3, model.position.y-.2, model.position.z );

  }, undefined, function ( e ) {
    console.error( e );
  } );


}

function animate() {

  requestAnimationFrame( animate );

  var delta = clock.getDelta();
  mixer.update( delta );

  renderer.render( scene, camera );
}

function onMouseWheel( event ) {

  var h = document.documentElement,
  b = document.body,
  st = 'scrollTop',
  sh = 'scrollHeight';
  var percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;

  var videoBGHeight = document.getElementById('videoBG').clientHeight;
  var carouselPosTop = document.getElementById('espacio_fondo').offsetTop;

  if(window.scrollY<videoBGHeight){
    model.rotation.set(0,.8,0);
  }

  if(window.scrollY>videoBGHeight && window.scrollY<carouselPosTop){
    model.rotation.y -= event.deltaY * 0.0025;
  }

  if(window.scrollY>carouselPosTop){
    model.rotation.set(0,4.2,0);
  }

}
