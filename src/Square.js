import PhysicsObject from './PhysicsObject'
import {rgba} from './helpers'
export default class Square extends PhysicsObject {
  constructor(options){
    super(options)
    this.width = options.width
    this.height = options.height
    this.adjustmentX = options.width
    this.adjustmentY = options.height
  }
  draw() {
    this.c.beginPath()
    this.c.rect(this.x, this.y, this.width, this.height)
    this.drawFill()
    this.c.closePath()
  }
}
