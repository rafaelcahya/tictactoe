const boxes = document.querySelectorAll(".box")
const text = document.querySelector("#play")
const winStrategy = document.querySelector("#win")
const restart = document.querySelector("#restart")
const congrats = document.querySelector("#congrats")

let audio = document.querySelector("#audio")

const board = () => {
    boxes.forEach((box, i) => {
        box.addEventListener("click", boxClicked)
    })
}

const popupAnnounce = () => {
    var modal = document.getElementsByClassName("popupAnnounce")[0]
    modal.style.display = "block";
}

const closePopup = () => {
    var modal = document.getElementsByClassName("popupAnnounce")[0]
    modal.style.display = "none";
}

const restartPopup = () => {
    var modal = document.getElementsByClassName("popupAnnounce")[0]
    modal.style.display = "none";
    restartBtn()
}

const spaces = []
const tick_o = "O"
const tick_x = "X"
let currPlayer = tick_o

const boxClicked = (e) => {
    const id = e.target.id
    console.log(e)
    audio.play()
    if(!spaces[id]){
        console.log(spaces[id])
        spaces[id] = currPlayer
        e.target.innerText = currPlayer

        if(won()){
            text.innerText = `Player ${currPlayer} has won`
            popupAnnounce()
            return
        }

        if(draw()){
            return;
        }
        currPlayer = currPlayer === tick_o ? tick_x : tick_o
    }
}

const won = () => {
    if(spaces[0] === currPlayer){
        if(spaces[1] === currPlayer && spaces[2] === currPlayer && spaces[3] === currPlayer){
            winStrategy.innerText = `Player ${currPlayer} wins on top`
            return true
        }

        if(spaces[4] === currPlayer && spaces[8] === currPlayer && spaces[12] === currPlayer){
            winStrategy.innerText = `Player ${currPlayer} wins on the left`
            return true
        }

        if(spaces[5] === currPlayer && spaces[10] === currPlayer && spaces[15] === currPlayer){
            winStrategy.innerText = `Player ${currPlayer} wins diagonally`
            return true
        }
    }

    if(spaces[1] === currPlayer){
        if(spaces[5] === currPlayer && spaces[9] === currPlayer && spaces[13] === currPlayer){
            winStrategy.innerText = `Player ${currPlayer} wins in line 2`
            return true
        }
    }

    if(spaces[2] === currPlayer){
        if(spaces[6] === currPlayer && spaces[10] === currPlayer && spaces[14] === currPlayer){
            winStrategy.innerText = `Player ${currPlayer} wins in line 3`
            return true
        }
    }
    
    if(spaces[3] === currPlayer){
        if(spaces[7] === currPlayer && spaces[11] === currPlayer && spaces[15] === currPlayer){
            winStrategy.innerText = `Player ${currPlayer} wins on the right`
            return true
        }
        if(spaces[6] === currPlayer && spaces[9] === currPlayer && spaces[12] === currPlayer){
            winStrategy.innerText = `Player ${currPlayer} wins diagonally`
            return true
        }
    }

    if(spaces[4] === currPlayer){
        if(spaces[5] === currPlayer && spaces[6] === currPlayer && spaces[7] === currPlayer){
            winStrategy.innerText = `Player ${currPlayer} wins in row 2`
            return true
        }
    }

    if(spaces[8] === currPlayer){
        if(spaces[9] === currPlayer && spaces[10] === currPlayer && spaces[11] === currPlayer){
            winStrategy.innerText = `Player ${currPlayer} wins in row 3`
            return true
        }
    }

    if(spaces[12] === currPlayer){
        if(spaces[13] === currPlayer && spaces[14] === currPlayer && spaces[15] === currPlayer){
            winStrategy.innerText = `Player ${currPlayer} wins on bottom`
            return true
        }
    }
}

const draw = () => {
    let draw = 0
    spaces.forEach((space, i) => {
        if(spaces[i] !== null)
        draw++
    })

    if(draw === 16){
        congrats.innerText = `Oops`
        text.innerText = `Draw`
        popupAnnounce()
        restart()
    }
}

const restartBtn = () => {
    setTimeout(() => {
        spaces.forEach((space, i) => {
            spaces[i] = null
        })

        boxes.forEach((box) => {
            box.innerText = ""
        })

        winStrategy.innerText = ``
    }, 0)
}

restart.addEventListener("click", restartBtn)
restartBtn()
board()

const openRulesPopup = () => {
    var modal = document.getElementsByClassName("popupRules")[0]
    modal.style.display = "block";
}

const closeRulesPopup = () => {
    var modal = document.getElementsByClassName("popupRules")[0]
    modal.style.display = "none";
}