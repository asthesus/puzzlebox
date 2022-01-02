const html_canvas = document.getElementById(`canvas`);
const ctx = html_canvas.getContext(`2d`);

if(window.innerWidth > window.innerHeight) {wide_window = true} else wide_window = false;

cursor = {};
cursor.x = 0;
cursor.y = 0;

// ctx.translate(0.5, 0.5);

html_canvas.center = {};
html_canvas.background = () => {ctx.fillStyle = `#000`; ctx.fillRect(0, 0, html_canvas.width, html_canvas.height)};
html_canvas.fit = () => {
    html_canvas.background();
    html_canvas.width = window.innerWidth;
    html_canvas.height = window.innerHeight;
    html_canvas.center.x = html_canvas.width / 2;
    html_canvas.center.y = html_canvas.height / 2;
    if(window.innerWidth > window.innerHeight) {wide_window = true} else wide_window = false;
}

puzzlebox = {};
puzzlebox.stage = 0;
puzzlebox.operate = () => {
    x = window.innerWidth / 3;
    x_two = x / 2;
    x_four = x / 4;
    x_eight = x / 8;
    x_sixteen = x / 16;
    y = window.innerHeight / 6;
    ctx.fillStyle = `#808`;
    ctx.fillRect(x, y, x, x);
    ctx.fillStyle = `#000`;
    ctx.fillRect(x + x_eight, y + x_eight, x - x_four, x - x_four);
    if(puzzlebox.stage === 0 &&
    cursor.x >= x + x_two - x_sixteen
    && cursor.x <= x + x_two + x_eight - x_sixteen
    && cursor.y >= y + x_two - x_sixteen
    && cursor.y <= y + x_two + x_eight - x_sixteen) {
        puzzlebox.stage = 1;
    }
    if(puzzlebox.stage === 1) {
        // left border
        if(cursor.x >= x - x_sixteen && cursor.x <= x + x_eight + x_sixteen && cursor.y >= y - x_sixteen && cursor.y <= y + x + x_sixteen) puzzlebox.stage = 0;
        // right border
        if(cursor.x >= x + x - x_eight - x_sixteen && cursor.x <= x + x + x_sixteen && cursor.y >= y - x_sixteen && cursor.y <= y + x + x_sixteen) puzzlebox.stage = 0;
        // top border
        if(cursor.x >= x - x_sixteen && cursor.x <= x + x + x_sixteen && cursor.y >= y - x_sixteen && cursor.y <= y + x_eight + x_sixteen) puzzlebox.stage = 0;
        // bottom border
        if(cursor.x >= x - x_sixteen && cursor.x <= x + x + x_sixteen && cursor.y >= y + x - x_eight - x_sixteen && cursor.y <= y + x + x_eight + x_sixteen) puzzlebox.stage = 0;
    }
    if(puzzlebox.stage === 0) {
        ctx.fillStyle = `#f80`;
        ctx.fillRect(x + x_two - x_sixteen, y + x_two - x_sixteen, x_eight, x_eight);
    } else if(puzzlebox.stage === 1) {
        ctx.fillStyle = `#f80`;
        ctx.fillRect(cursor.x - x_sixteen, cursor.y - x_sixteen, x_eight, x_eight);
        if(cursor.x < x - x_sixteen || cursor.x > x + x + x_sixteen || cursor.y < y - x_sixteen || cursor.y > y + x + x_sixteen) {
            puzzlebox.stage = 2;
        }
    } else if(puzzlebox.stage === 2) {
        ctx.fillStyle = `#0f0`;
        ctx.fillRect(cursor.x - x_sixteen, cursor.y - x_sixteen, x_eight, x_eight);
        if(cursor.x === Math.round(x + x_two) && cursor.y === Math.round(y + x_two)) puzzlebox.stage = 3;
    } else if(puzzlebox.stage === 3) {
        ctx.fillStyle = `#00f`;
        ctx.fillRect(x + x_two - x_sixteen, y + x_two - x_sixteen, x_eight, x_eight);
    }
}

time = () => {window.requestAnimationFrame(time); sub_time()};
sub_time = () => {
    html_canvas.background();
    puzzlebox.operate();
    // ctx.fillStyle = `#fff`;
    // ctx.fillText(`${cursor.x}, ${cursor.y}`, cursor.x, cursor.y);
}

window.addEventListener(`resize`, html_canvas.fit, false);
html_canvas.addEventListener(`mousemove`, e => {cursor.x = e.clientX; cursor.y = e.clientY});

html_canvas.fit();
time();