const pieces = document.querySelectorAll('.piece');
const squares = document.querySelectorAll('.square');
const win = document.querySelector('.win');
const winner = document.querySelector('.winner');
const reset = document.querySelector('h4');
var exArray = [];
var ohArray = [];

pieces.forEach(piece => {
    piece.addEventListener('dragstart', dragStart);
})

setSquares();

function dragStart(e){
    e.dataTransfer.setData('text/plain', e.target.id);
}

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.querySelector('.pieces > #' + id);
    const inverse = document.querySelector('.pieces > div:not([id="' + id + '"])');
    const clone = draggable.cloneNode(true);

    e.target.classList.remove('drag-over');

    e.target.appendChild(clone).setAttribute('draggable', false);

    e.target.removeEventListener('dragenter', dragEnter);
    e.target.removeEventListener('dragover', dragOver);
    e.target.removeEventListener('dragleave', dragLeave);
    e.target.removeEventListener('drop', drop);

    if (id == 'ex'){
        exArray.push(e.target.id);
    } else {
        ohArray.push(e.target.id);
    }

    if (winCheck() == true) {
        win.showModal();
    }

    draggable.setAttribute('draggable', false);
    inverse.setAttribute('draggable', true);
}

function arrayEvaluator(x) {
    if (x.includes('1')) {
        if (x.includes('2') && x.includes('3') || x.includes('4') && x.includes('7') || x.includes('5') && x.includes('9')) {
            return true;
        }
    } else if (x.includes('3')) {
        if (x.includes('6') && x.includes('9') || x.includes('5') && x.includes('7')) {
            return true;
        }
    } else if ((x.includes('2') && x.includes('5') && x.includes('8')) || (x.includes('4') && x.includes('5') && x.includes('6')) || (x.includes('7') && x.includes('8') && x.includes('9'))) {
        return true;
    }
}

function winCheck() {
    if (arrayEvaluator(exArray) == true) {
        winner.innerText = '❌ Wins!';
        return true;
    } else if (arrayEvaluator(ohArray) == true) {
        winner.innerText = '⭕ Wins!';
        return true;
    } else if (ohArray.length + exArray.length == 9) {
        winner.innerText = 'Draw!';
        return true;
    }
}

reset.addEventListener('click', () => {
    pieces.forEach(piece => {
        piece.setAttribute('draggable', true);
    })
    fullReset(exArray);
    fullReset(ohArray);
    setSquares();
    win.close();
})

function fullReset(x) {
    while (x.length > 0) {
        var z = document.getElementById(x.pop());
        z.removeChild(z.firstChild);
    }
}

function setSquares() {
    squares.forEach(square => {
        square.addEventListener('dragenter', dragEnter);
        square.addEventListener('dragover', dragOver);
        square.addEventListener('dragleave', dragLeave);
        square.addEventListener('drop', drop);
    })
};