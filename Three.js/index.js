import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
//this is canvas element appdended to the dom 
//we could also do the other way that create a canvas element in the html and then append it to the dom
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;   //near clipping plane
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo =  new THREE.IcosahedronGeometry(1.0,2);
const mat = new THREE.MeshStandardMaterial({
    color: 0xfffffff,
    flatShading: true,
});

const mesh = new THREE.Mesh(geo, mat);

scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,

});

const wireMesh =new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001)
mesh.add(wireMesh);
//mesh pr add kiya naa ki scene pr
//as only mesh is rotating not the wireframe

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

function animate(t=0) {
    requestAnimationFrame(animate);
    // mesh.rotation.x += 0.01;
    //mesh.rotation.y += 0.01;
    // mesh.scale.setScalar(Math.sin(t*0.001)* 1);
    renderer.render(scene, camera);
    controls.update();
}
animate()

