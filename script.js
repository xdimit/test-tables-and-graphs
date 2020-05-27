'use strict'

let graphics = [];
let table = document.querySelector('.data');
let cover = document.querySelector('.cover');
let container = document.getElementById('container');
let button = document.querySelector('.headline');

button.addEventListener('click', checkDataTable);

function clearArr() {
    let cell = table.getElementsByTagName('td');
    for (let i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
    }
    graphics = [];
};

function fillAnArray() {
    for (let i = 0; i < 4; i++) {
        let newArr = [];
        for (let j = 0; j < 10; j++) {
            let rond = Math.round(Math.random() * (35 - 1) + 1);
            newArr.push(rond);
        }
        graphics.push(newArr);
    }
};

function fillTable() {
    for (let i = 0; i < graphics.length; i++) {
        for (let j = 0; j < graphics[i].length; j++) {
            table.rows[i + 1].cells[j + 1].innerHTML = graphics[i][j];
        }
    }
};

function checkDataTable() {
    if (table.rows[1].cells[1].firstChild != null) {
        clearArr();
        clearDraw();
    }
    fillAnArray();
    fillTable();
    draw();
};

function createCanvas() {
    let html = '<canvas class="graph" width="500" height="400">Текст внутри</canvas>';
    cover.innerHTML += html;
};
function clearDraw() {
    let graph = document.querySelector('canvas.graph');
    cover.removeChild(graph);
    createCanvas();
};

function draw() {
    let graph = document.querySelector('canvas.graph');
    let gr = graph.getContext("2d");
    let colors = ['#f00', '#0f0', '#00f', '#0ff'];
    let maxCount = 40;
    let x0, y0;
    x0 = y0 = 30;
    let width = graph.width - 80;
    let height = graph.height - 80;
    let stepY = Math.round(height / maxCount);
    let stepX = Math.round(width / 10);

    gr.beginPath();
    gr.moveTo(x0, y0);
    gr.lineTo(x0, height + y0);
    gr.lineTo(width + x0 + 20, height + y0);
    let m = 0;
    let x_max = 10;

    for (let i = x0; m < x_max; i += stepX) {
        m++;
        gr.moveTo(i, height + y0);
        gr.lineTo(i, height + y0 + 15);
        gr.fillText(m, i + 3, height + y0 + 25);
    }
    gr.lineWidth = 2;
    gr.stroke();
    gr.closePath();

    let nr_color = 0;
    for (let i = 0; i < graphics.length; i++) {

        gr.beginPath();

        for (let j = 0; j < graphics[i].length; j++) {

            let count = graphics[i][j];
            let x = x0 + (j * stepX);
            let y = y0 + (height - count * stepY);

            if (j < 0) {
                gr.moveTo(x, y);
            }
            gr.lineTo(x, y);

            gr.arc(x, y, 2, 0, 2 * Math.PI, false);
            gr.fillText(count, x - 5, y - 5);
            gr.fillText(count, x0 - 15, y);
        }

        gr.strokeStyle = colors[nr_color];
        nr_color++;
        gr.lineWidth = 1;
        gr.stroke();
    }

};