import * as React from 'react';
import * as THREE from 'three';
import { createVariableStatement } from 'typescript';
import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three';
import SimplexNoise from "simplex-noise";

class SnakeVis2 extends React.Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);

    this.display = React.createRef();

    this.state = { x: 0, y: 0 };
  }

  componentDidMount() {
    let days = Object.keys(this.props.dateLog).map(d => d / (60 * 60 * 24));

    days = days.map(d => d - days[0]);

    const duration = days[days.length - 1] - days[0];

    const normDays = days.map(day => day / duration);

    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    camera.position.z = 30;
    camera.position.y = 0;
    camera.rotation.z += 1.57;

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    let lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 4, 0);
    lights[1] = new THREE.PointLight(0xffffff, 4, 0);
    lights[2] = new THREE.PointLight(0xffffff, 4, 0);

    lights[0].position.set(0, 0, 200);
    lights[1].position.set(50, 50, 20);
    lights[2].position.set(-10, -200, -10);

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

    var mesh = initBones(days.length * 4);
    scene.add(mesh);

    this.mesh = mesh;

    var cube=new THREE.Mesh(
      new THREE.BoxGeometry(20,20,20),
      new THREE.MeshBasicMaterial({map:buildBumpMap()})
    )

    scene.add(cube);

    //////

    renderer.setClearColor('#fff');
    renderer.setSize(width, height);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    // var raycaster = new THREE.Raycaster(); // create once
    // var mouse = new THREE.Vector2(this.state.x, this.state.y); // create once

    // raycaster.setFromCamera(mouse, this.camera);

    // var intersects = raycaster.intersectObjects(this.mesh);

    // intersects.forEach(i => (i.object.rotation.y += 0.1));

    // this.crate.rotation.x+=0.01;
    // this.crate.rotation.z+=0.01;

    let z = 0;

    this.mesh.skeleton.bones.forEach(bone => {
      let offset = Math.sin((new Date().getTime() + 300 * z++) / 1000);
      bone.position.x = offset;
      // bone.position.z=offset/4;
    });

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        ref={this.display}
        className="border"
        onMouseMove={e =>
          this.setState({
            x: ((e.clientX - e.target.offsetLeft) / this.mount.clientWidth) * 2 - 1,
            y: ((-e.clientY + e.target.offsetTop) / 400) * 2 + 1,
          })
        }
        style={{ width: '800px', height: '400px' }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

function createGeometry(sizing) {
  var geometry = new THREE.CylinderBufferGeometry(
    3, // radiusTop
    0.3, // radiusBottom
    sizing.height, // height
    32, // radiusSegments
    sizing.segmentCount * 3, // heightSegments
    false // openEnded
  );

  var position = geometry.attributes.position;

  var vertex = new THREE.Vector3();

  var skinIndices = [];
  var skinWeights = [];

  for (var i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);

    var y = vertex.y + sizing.halfHeight;

    var skinIndex = Math.floor(y / sizing.segmentHeight);
    var skinWeight = (y % sizing.segmentHeight) / sizing.segmentHeight;

    skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
  }

  geometry.addAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
  geometry.addAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));

  return geometry;
}

function createBones(sizing) {
  let bones = [];

  var prevBone = new THREE.Bone();
  bones.push(prevBone);
  prevBone.position.y = -sizing.halfHeight;

  for (var i = 0; i < sizing.segmentCount; i++) {
    var bone = new THREE.Bone();
    bone.position.y = sizing.segmentHeight;
    bones.push(bone);
    prevBone.add(bone);
    prevBone = bone;
  }

  return bones;
}

function createMesh(geometry, bones) {
  var texture = new THREE.TextureLoader().load('textures/scales.jpg');
  texture.wrapT = THREE.RepeatWrapping;
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.set(100, 100);

  var material = new THREE.MeshPhongMaterial({
    skinning: true,
    //emissive:0x777777,
     color:0xfff,
    side: THREE.FrontSide,
    // map: buildMap(),
    displacementMap:buildBumpMap(),
    displacementScale:0.5,
    bumpMap:buildBumpMap()
  });

  var mesh = new THREE.SkinnedMesh(geometry, material);
  var skeleton = new THREE.Skeleton(bones);

  mesh.add(bones[0]);

  mesh.bind(skeleton);

  return mesh;
}

function initBones(segments) {
  var segmentHeight = 2;
  var segmentCount = segments;
  var height = segmentHeight * segmentCount;
  var halfHeight = height * 0.5;

  var sizing = {
    segmentHeight: segmentHeight,
    segmentCount: segmentCount,
    height: height,
    halfHeight: halfHeight,
  };

  var geometry = createGeometry(sizing);
  var bones = createBones(sizing);
  let mesh = createMesh(geometry, bones);

  mesh.scale.multiplyScalar(1);
  return mesh;
}

function buildMap() {
  // create a buffer with color data
 // create a buffer with color data
 var width=40;
 var height=200;
 var size = width * height;
 var data = new Uint8Array(3 * size);
 var color={r:0.9,g:0.01,b:0.01};

 var r = Math.floor(color.r * 255);
 var g = Math.floor(color.g * 255);
 var b = Math.floor(color.b * 255);

 var simplex=new SimplexNoise();

 for (var i = 0; i < height; i++) {
   for (var j = 0; j < width; j++) {
    let stride=(i*width+j)*3;
    let res=10;
    let value=255-(125/(res)*(((i+j)/2%res))+125/(res)*(((((i-j+width+height)/2))%res)))+simplex.noise2D(i/100,j/100)*40;
    data[stride] = value;
    data[stride+1] = 0;
    data[stride+2] =  255-value;

   }
 }

 // used the buffer to create a DataTexture

 var texture = new THREE.DataTexture(data, width, height, THREE.RGBFormat);
 texture.needsUpdate = true;
 return texture;
}

function buildBumpMap() {
  // create a buffer with color data
 // create a buffer with color data
 var width=40;
 var height=200;
 var size = width * height;
 var data = new Uint8Array(3 * size);
 var color={r:0.9,g:0.01,b:0.01};

 var r = Math.floor(color.r * 255);
 var g = Math.floor(color.g * 255);
 var b = Math.floor(color.b * 255);

 var simplex=new SimplexNoise();

 for (var i = 0; i < height; i++) {
   for (var j = 0; j < width; j++) {
    let stride=(i*width+j)*3;
    let res=10;
    let value=255-(125/(res)*(((i+j)/2%res))+125/(res)*(((((i-j+width+height)/2))%res)))+simplex.noise2D(i/100,j/100)*40;
    data[stride] = value;
    data[stride+1] = value;
    data[stride+2] =  value;

   }
 }

 // used the buffer to create a DataTexture

 var texture = new THREE.DataTexture(data, width, height, THREE.RGBFormat);
 texture.needsUpdate = true;
 return texture;
}

export default SnakeVis2;
