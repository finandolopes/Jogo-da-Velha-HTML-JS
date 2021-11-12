let check = false;
let users = ["X", "O"];
let userX = [];
let userO = [];
let user;
let winner;

let rules = {
    "line1": [1, 2, 3],
    "line2": [4, 5, 6],
    "line3": [7, 8, 9],
    "col1": [1, 4, 7],
    "col2": [2, 5, 8],
    "col3": [3, 6, 9],
    "diag1": [1, 5, 9],
    "diag2": [3, 5, 7]
}

let selectUser = () => {
    user = Math.floor(Math.random() * 2);
    user = users[user]
    document.querySelector("#player").innerHTML = user;
}

let changePlayer = () => {
    user = user === "X" ? "O" : "X";
    document.querySelector("#player").innerHTML = user;
}

let checkPlayerX = (value, idx, arr) => {
    return userX.includes(value);
}

let checkPlayerO = (value, idx, arr) => {
    return userO.includes(value);

}
let restart = () => {
    check = false;
    userX = [];
    userO = [];
    user = "";
    winner = "";
    let grid = document.querySelector(".content").children;
    for (let i = 0; i < grid.length; i++) {
        grid[i].innerHTML = "";
    }
    selectUser();
    document.getElementById("result").style.display = 'none';

}

let checkGame = (user) => {
    let grid = document.querySelector(".content").children;
    let result = document.getElementById("result");

    for (let i = 0; i < Object.keys(rules).length; i++) {
        let rule = rules[Object.keys(rules)[i]]

        if (user === "X") {
            check = rule.every(checkPlayerX);
            winner = user;

        } else {
            check = rule.every(checkPlayerO);
            winner = user;

        }
        if (check) {
            result.innerHTML = `Player "${winner}" WIN`;
            result.innerHTML += `<button type="button" onclick="restart()">OK</button>`
            result.style.display = "block";
            break;
        }

    }
    if (!check && userX.length + userO.length === grid.length) {
        result.innerHTML = `GAME DRAW!!!`;
        result.innerHTML += `<button type="button" onclick="restart()">OK</button>`
        result.style.display = "block";
    }
    changePlayer();
}

let selectElement = (id) => {
    if (!check) {
        if (user === "X") {
            userX.push(parseInt(id));
        } else {
            userO.push(parseInt(id))
        }
        let el = document.getElementById(id);
        if (el.innerHTML === "") {
            el.innerHTML = user;
            checkGame(user);
        }
    }
}
let start = () => {
    document.getElementById("cover").style.display = "none";
    selectUser();
}