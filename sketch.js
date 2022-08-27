

const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";

let video;
let asciiDiv;
let textColor

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}



function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(90, 60);
  asciiDiv = createDiv();
}

function draw() {
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      const c = density.charAt(charIndex);
      textColor = rgbToHex(r,g,b)
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage +='<font color="'+textColor+'">' +c +'</font>';
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);
}
