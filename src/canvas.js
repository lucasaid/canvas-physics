/*
 *
 * Base from https://github.com/christopher4lis/canvas-boilerplate
 *
 */

import * as dat from 'dat.gui'
import Ball from './Ball'
import Square from './Square'
import {randomIntFromRange, randomColor, randomHex, distance} from './helpers'


// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

//const colors = ['#FDB014', '#CD8700', '#9D6100', '#723C00', '#4E1900']
const strokecolors = ['#FFFFFF', '#CD8700', '#9D6100', '#FDB014', '#4E1900']
const colors = ['#FFFFFF', '#8f98ff', '#ff5151', '#ffc48b', '#8bd7ff']
//const colors = ['#FFFFFF']

let shape = "ball"
let vars = {
  ygravity: 0,
  xgravity: 0,
  friction: 0.1,
  minSize: 0.1,
  maxSize: 1,
  speed: 10,
  shape: "ball",
  alphaDegrade: 0.01,
  add: () => { init() },
  toggle: () => { 
    if(shape == "ball") {
      shape = "square"
    } else {
      shape = "ball"
    }
  }
}
var obj = { };
const gui = new dat.GUI();
gui.add(vars, 'ygravity', -5, 5).step(0.01);
gui.add(vars, 'xgravity', -5, 5).step(0.01);
gui.add(vars, 'friction', 0.0, 1).step(0.01);
gui.add(vars, 'minSize', 0.1, 300).step(0.1);
gui.add(vars, 'maxSize', 0.1, 300).step(0.1);
gui.add(vars, 'speed', 0, 150).step(0.1);
gui.add(vars, 'alphaDegrade', 0, 0.1).step(0.0001);
gui.add(vars, 'add').name('Reset');
gui.add(vars, 'toggle').name('Toggle Shape');

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    init()
})
let mouseDownInterval = -1
addEventListener('mouseover', () => {
  if(mouseDownInterval == -1) {
    mouseDownInterval = setInterval(createRandomFromMouse, vars.speed);
  }
})
addEventListener('mouseup', () => {
  if(mouseDownInterval != -1) {
    clearInterval(mouseDownInterval)
    mouseDownInterval = -1
  }
})
addEventListener('mouseout', () => {
  if(mouseDownInterval != -1) {
    clearInterval(mouseDownInterval)
    mouseDownInterval = -1
  }
})

// Utility Functions
function createRandomFromMouse() {
  let width = randomIntFromRange(vars.minSize, vars.maxSize)
  let height = randomIntFromRange(vars.minSize, vars.maxSize)
  let radius = randomIntFromRange(vars.minSize, vars.maxSize)
  let x = randomIntFromRange(mouse.x-25, mouse.x+25)
  let y = randomIntFromRange(mouse.y-25, mouse.y+25)
  let dx = randomIntFromRange(-8, 8)
  let dy = randomIntFromRange(-8, 8)
  if(shape == "ball"){
    let color = randomColor(colors)
    let strokeColor = randomColor(colors)
    balls.push(new Ball({x, y, dx, dy, radius, color, strokeColor, stroke: true, canvas, ygravity: vars.ygravity, xgravity: vars.xgravity, friction: vars.friction, alphaDegrade: vars.alphaDegrade}));
  } else {
    let color = randomColor(strokecolors)
    let strokeColor = randomColor(strokecolors)
    balls.push(new Square({x, y, dx, dy, width, height, color, fill: false, stroke: true, canvas, ygravity: vars.ygravity, xgravity: vars.xgravity, friction: vars.friction, alphaDegrade: vars.alphaDegrade}));
  }
}

// Implementation
let balls
function init() {
    balls = []
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    balls.filter(o => !o.destroy).forEach(o => o.update());
}

init()
animate()
