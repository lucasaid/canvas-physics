import {rgba} from './helpers'
export default class PhysicsObject {
  constructor(options) {
    this.x = options.x
    this.y = options.y
    this.dx = options.dx
    this.dy = options.dy
    this.color = options.color
    this.canvas = options.canvas
    this.c = this.canvas.getContext('2d')
    this.ygravity = options.ygravity
    this.xgravity = options.xgravity
    this.friction = options.friction
    this.alpha = 1
    this.alphaDegrade = options.alphaDegrade || 0
    this.destroy = false;
    this.adjustmentY = options.adjustmentY || 0
    this.adjustmentX = options.adjustmentX || 0
    this.fill = typeof options.fill !== 'undefined' ? options.fill : true
    this.fillColor = options.fillColor || this.color
    this.stroke = typeof options.stroke !== 'undefined' ? options.stroke : true
    this.strokeColor = options.strokeColor || this.color
    this.strokeWidth = options.strokeWidth || 3
  }
  update() {
    if(this.y + this.adjustmentY + this.dy > this.canvas.height || this.y - this.adjustmentY + this.dy < 0){
      this.dy = -this.dy * this.friction
    } else {
      this.dy += this.ygravity
    }
    if(this.x + this.adjustmentX + this.dx > this.canvas.width || this.x - this.adjustmentX + this.dx < 0){
      this.dx = -this.dx * this.friction
    } else {
      this.dx += this.xgravity
    }
    this.alpha -= this.alphaDegrade 
    if(this.alpha <= 0){
      this.destroy = true
    }
    this.y += this.dy
    this.x += this.dx
    this.draw()
  }
  draw() {
  }
  drawFill() {
    if (this.fill) {
      this.c.fillStyle = rgba(this.fillColor, this.alpha)
      this.c.fill()
    }
    if (this.stroke) {
      this.c.strokeStyle = rgba(this.strokeColor, this.alpha) 
      this.c.lineWidth = this.strokeWidth
      this.c.stroke()
    }
  }
}

