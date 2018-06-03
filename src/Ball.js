import PhysicsObject from './PhysicsObject'
import {rgba} from './helpers'
export default class Ball extends PhysicsObject {
  constructor(options){
    super(options)
    this.radius = options.radius
    this.adjustmentY = options.radius
    this.adjustmentX = options.radius
  }
  draw() {
    this.c.beginPath()
    this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    this.drawFill()
    this.c.closePath()
  }
}
