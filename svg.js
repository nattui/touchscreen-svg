var viewHeight = window.innerHeight;
var viewWidth = window.innerWidth;
// var svgHeight = parseInt(window.getComputedStyle(svgElement)['height']);
// var svgWidth = parseInt(window.getComputedStyle(svgElement)['width']);
// console.log(svgHeight);

const paragraph = document.getElementById("paragraph");
paragraph.innerHTML = "Width: " + viewWidth + ", Height: " + viewHeight;

const svg = document.getElementById("root2");
console.log(svg);

//
const defaultStyle = "fill: red; stroke: black; stroke-width: 10px;";

// {/* <line x1="210" y1="0" x2="210" y2="350" stroke="black" stroke-width="5"></line> */ }
const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
line.setAttributeNS(null, "x1", 350);
line.setAttributeNS(null, "y1", 350);
line.setAttributeNS(null, "x2", viewWidth / 2);
line.setAttributeNS(null, "y2", viewHeight / 2);
line.setAttributeNS(null, "style", `${defaultStyle}`);
svg.appendChild(line);

for (let i = 0; i < 105; i++) {
  let circle = createCircle();
  svg.appendChild(circle);
  addTouchEvent(circle);
}

function createCircle() {
  const colorArray = ["orange", "red", "blue", "lightgreen", "purple"];
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttributeNS(null, "cx", Math.floor(Math.random() * 1500 + 50));
  circle.setAttributeNS(null, "cy", Math.floor(Math.random() * 1500) + 50);
  circle.setAttributeNS(null, "r", 45);
  const color = colorArray[Math.floor(Math.random() * colorArray.length)];
  const defaultStyle = `fill: ${color}; stroke: black; stroke-width: 10px;`;
  circle.setAttributeNS(null, "style", `${defaultStyle}`);
  return circle;
}

function addTouchEvent(object) {
  // Touch Event
  object.addEventListener("touchstart", function(event) {
    if (event.cancelable) {
      event.preventDefault();
    }
    // event.stopPropagation();
    let dragTouchEvent = true;
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    const currentCircleX = parseInt(object.getAttribute("cx"));
    const currentCircleY = parseInt(object.getAttribute("cy"));

    object.addEventListener("touchmove", function(event) {
      if (dragTouchEvent) {
        const netMovementX = event.touches[0].clientX - touchX;
        const netMovementY = event.touches[0].clientY - touchY;
        paragraph.innerHTML =
          "Touch(X): " +
          parseInt(netMovementX) +
          ", Touch(Y): " +
          parseInt(netMovementY);
        object.setAttributeNS(null, "cx", netMovementX + currentCircleX);
        object.setAttributeNS(null, "cy", netMovementY + currentCircleY);
        line.setAttributeNS(null, "x2", netMovementX + currentCircleX);
        line.setAttributeNS(null, "y2", netMovementY + currentCircleY);
      }
    });

    object.addEventListener("touchend", function() {
      dragTouchEvent = false;
    });
  });

  // Mouse Events
  object.addEventListener("mousedown", function(event) {
    let dragEvent = true;
    const startMouseX = event.clientX;
    const startMouseY = event.clientY;
    const currentCircleX = parseInt(object.getAttribute("cx"));
    const currentCircleY = parseInt(object.getAttribute("cy"));

    window.addEventListener("mousemove", function(event) {
      if (dragEvent) {
        const netMovementX = event.clientX - startMouseX;
        const netMovementY = event.clientY - startMouseY;
        paragraph.innerHTML =
          "Mouse(X): " + netMovementX + ", Mouse(Y): " + netMovementY;
        object.setAttributeNS(null, "cx", netMovementX + currentCircleX);
        object.setAttributeNS(null, "cy", netMovementY + currentCircleY);
        line.setAttributeNS(null, "x2", netMovementX + currentCircleX);
        line.setAttributeNS(null, "y2", netMovementY + currentCircleY);
      }
    });

    window.addEventListener("mouseup", function() {
      dragEvent = false;
    });
  });
}
