import * as React from 'react';
import * as THREE from 'three';
import { createVariableStatement } from 'typescript';

class SnakeVis extends React.Component {
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
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    var light = new THREE.PointLight(0x22a221, 10, 100);
    light.position.set(1, 1, 1);
    scene.add(light);

    var light2 = new THREE.PointLight(0x68a391, 10, 100);
    light2.position.set(-1, -1, -1);
    scene.add(light2);

    var group = new THREE.Group();
    scene.add(group);

    let cubes = normDays.map(day => {
      let geometry = new THREE.BoxGeometry(0.2, 0.1, 0.2);
      let material = new THREE.MeshStandardMaterial({ color: '#433F81' });
      let cube = new THREE.Mesh(geometry, material);
      cube.position.y = day - 0.5;
      cube.rotation.y = (day * 3.14) / 30;
      return cube;
    });

    cubes.forEach(cube => group.add(cube));

    camera.position.z = 4;
    renderer.setClearColor('#f1f');
    renderer.setSize(width, height);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.group = group;
    this.cubes = cubes;

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
    

    var raycaster = new THREE.Raycaster(); // create once
    var mouse = new THREE.Vector2(this.state.x,this.state.y); // create once

    console.log(mouse)

    
    raycaster.setFromCamera( mouse, this.camera );
    
    var intersects = raycaster.intersectObjects( this.group.children );

    intersects.forEach(i=>i.object.rotation.z+=0.1);

    this.group.rotation.y += 0.01;
    this.camera.position.z = Math.sin(new Date().getTime() / 1000) * 0.05 + 5;
    let z = 0;
    this.cubes.forEach(cube => (cube.position.x = Math.sin((new Date().getTime() + 300 * z++) / 1000)));

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div ref={this.display} className="border" onMouseMove={e=>this.setState({ x: ((e.clientX-e.target.offsetLeft)/this.mount.clientWidth)*2-1, y: ((-e.clientY+e.target.offsetTop)/400)*2+1})} 
        style={{ width: '800px', height: '400px' }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default SnakeVis;
