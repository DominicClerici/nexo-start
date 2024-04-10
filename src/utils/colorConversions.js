const hexToTWValue = (hex) => {
  hex = hex.replace(/^#/, "")
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)
  return `${r} ${g} ${b}`
}

const TWValueToHex = (TWValue) => {
  let [r, g, b] = TWValue.split(" ").map(Number)
  let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  return hex
}

const TWValueToHSL = (TWValue) => {
  let [r, g, b] = TWValue.split(" ").map(Number)
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  h = Math.round(h * 360)
  s = Math.round(s * 100)
  l = Math.round(l * 100)

  return `hsl(${h}, ${s}%, ${l}%)`
}

const getHslDeg = (hslString) => {
  const regex = /hsl\((\d+),/
  const match = hslString.match(regex)
  if (match) {
    return parseInt(match[1])
  }
  return null
}

const rotateHsl = (hslString, degrees) => {
  const hslRegex = /hsl\((\d+), (\d+)%, (\d+)%\)/
  const match = hslString.match(hslRegex)
  if (match) {
    let h = parseInt(match[1])
    h = (h + degrees) % 360
    if (h < 0) {
      h += 360
    }
    return `hsl(${h}, ${match[2]}%, ${match[3]}%)`
  }
  return null
}

export { hexToTWValue, TWValueToHex, TWValueToHSL, getHslDeg, rotateHsl }
