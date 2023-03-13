import './style.css'

import * as THREE from 'three';

import { BoxLineGeometry } from 'three/addons/geometries/BoxLineGeometry.js';
import { Color } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import sphereWrap from './public/sphereTest.jpg'

let container;
let camera, scene, renderer;

let room;

const textureLoader = new THREE.TextureLoader();

const sphereGeo = new THREE.SphereGeometry(0.5, 64, 64);
const sphereMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sphereWrap)
});
const sphereOne = new THREE.Mesh( sphereGeo, sphereMat );
sphereOne.position.y = 1.7;

init();
animate();


function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000 );

  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 10 );
  camera.position.set( 0, 1.6, 3 );
  scene.add( camera );

  room = new THREE.LineSegments(
    new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
    new THREE.LineBasicMaterial( { color: 0x808080 } )
  );
  scene.add( room );

  // scene.add( new THREE.HemisphereLight( 0x606060, 0x404040 ) );

  // const light = new THREE.DirectionalLight( 0xffffff );
  // light.position.set( 1, 1, 1 ).normalize();
  // scene.add( light );

  const ambLight =  new THREE.AmbientLight( 0x404040 );
  scene.add( ambLight )


  renderer = new THREE.WebGLRenderer( { antialias: true, canvas: document.querySelector('#bg')} );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.xr.enabled = true;
  container.appendChild( renderer.domElement );

  // const orbitControls = new OrbitControls( camera, renderer.domElement );
  // orbitControls.update();

  scene.add( sphereOne );

}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );


}

window.addEventListener('resize', onWindowResize, false)

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene,camera);

  sphereOne.rotateY(0.003);
  
}

//NAVBAR CODE

const toggleButton = document.querySelector('.toggle-button')
const toggleButtonIcon = document.querySelector('.toggle-button i')
const dropDownMenu = document.querySelector('.dropdown-menu')

toggleButton.onclick = function () {
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open')

    toggleButtonIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
}