var tittle = document.querySelector(".tittle");
var turn = "X";
var squares = [];

function checkWinner(num1, num2, num3) {
  tittle.innerHTML = `${squares[num1]} Winner`;
  document.getElementById('item' + num1).style.background = '#000';
  document.getElementById('item' + num2).style.background = '#000';
  document.getElementById('item' + num3).style.background = '#000';

  setInterval(function () { tittle.innerHTML += '.' }, 1000);
  setTimeout(function () { location.reload() }, 4000);
}

function winner() {
  for (var i = 1; i < 10; i++) {
    squares[i] = document.getElementById('item' + i).innerHTML;
  }
  if (squares[1] === squares[2] && squares[2] === squares[3] && squares[2] != '') {
    checkWinner(1, 2, 3)
  }
  if (squares[4] === squares[5] && squares[5] === squares[6] && squares[5] != '') {
    checkWinner(4, 5, 6)
  }
  if (squares[7] === squares[8] && squares[8] === squares[9] && squares[8] != '') {
    checkWinner(7, 8, 9)
  }

  if (squares[1] === squares[4] && squares[4] === squares[7] && squares[4] != '') {
    checkWinner(1, 4, 7)
  }
  if (squares[2] === squares[5] && squares[5] === squares[8] && squares[5] != '') {
    checkWinner(2, 5, 8)
  }
  if (squares[3] === squares[6] && squares[6] === squares[9] && squares[6] != '') {
    checkWinner(3, 6, 9)
  }

  if (squares[1] === squares[5] && squares[5] === squares[9] && squares[5] != '') {
    checkWinner(1, 5, 9)
  }
  if (squares[3] === squares[5] && squares[5] === squares[7] && squares[5] != '') {
    checkWinner(3, 5, 7)
  }
}

function game(id) {
  var element = document.getElementById(id);
  if (turn === "X" && element.innerHTML == "") {
    element.innerHTML = "X";
    turn = "O";
    tittle.innerHTML = "O";
  } else if (turn === "O" && element.innerHTML == "") {
    element.innerHTML = "O";
    turn = "X";
    tittle.innerHTML = "X";
  }
  winner()
}
