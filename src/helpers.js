export const rgba = (hex, alpha) => {
  let r = parseInt(hex.slice(1,3), 16);
  let g = parseInt(hex.slice(3,5), 16);
  let b = parseInt(hex.slice(5,7), 16);
  return 'rgba('+r+', '+g+', '+b+', '+alpha+')';
}

export const randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randomColor = (colors) => {
    return colors[Math.floor(Math.random() * colors.length)]
}

export const randomHex = () => {
    return '#'+Math.floor(Math.random()*16777215).toString(16)
}

export const distance = (x1, y1, x2, y2) => {
    const xDist = x2 - x1
    const yDist = y2 - y1
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}
