### Getting the context

    var canvas = document.getElementById('c');
    var c = canvas.getContext("2d");

### Basic drawing

    // x = 10, y = 20, width = 200, height = 100
    c.fillStyle = '#ff0000';
    c.strokeStyle = '#ff00ff';
    c.lineWidth = 5;
    c.lineCap = 'round';
    c.fillRect(10, 20, 200, 100);
    c.stroke();

### Image drawing

    c.drawImage(image, dx, dy, [dw, dh]);
    /* `image` can be HTML Image/Canvas/Video */

### Colors, styles shadows

    c.strokeStyle = '#ff00ff';
    c.fillStyle = '#ff00ff';

    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.shadowOffsetBlur = 3.0;
    c.shadowColor = 'rgba(0,0,0,0.2)';

### Gradients

    gr = c.createLinearGgadient(x0,y0,x1,y1)
    gr = c.createRadialGradient(x0,y0,r0,x1,y1,r1)
    pat = c.createPattern(image, 'repeat-x')

    c.fillStyle = gr

### Drawing

    c.beginPath()
    c.moveTo(x,y)
    c.lineTo(x,y)
    c.quadraticCurveTo(cpx,cpy,x,y)
    c.bezierCurveTo(cp1x,cp1y,cp2x,cp2y)
    c.arcTo(...)
    c.arc(...)
    c.closePath()

### Text



### Resources

  * [Canvas Cheatsheet PDF][cc]
[cc]: http://www.nihilogic.dk/labs/canvas_sheet/HTML5_Canvas_Cheat_Sheet.pdf

