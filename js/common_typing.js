const mondai = document.getElementById("mondai")
const input = document.getElementById("input")
const rand_btn = document.getElementById("rand_btn")
const best = document.getElementById("best")
const score = document.getElementById("score")
const body = document.body

let len, index, genzai, mode, startTime, completed
let best_score = 0

function init() {
    completed = false
    len = arr.length
    index = Math.floor(Math.random() * len)
    genzai = arr[index]
    mondai.innerHTML = genzai
    mode = false
    startTime = Date.now()
    input.value = ""
    body.style.backgroundImage = `url("./img/23583045.png")`
    input.focus()
}

function next() {
    completed = false
    if (index === len - 1) {
        index = 0
    } else {
        index++
    }
    genzai = arr[index]
    mondai.innerHTML = genzai
    mode = false
    startTime = Date.now()
    input.value = ""
    input.focus()
}

function level_check(score) {
    level = "10級"

    if (score >= 5.00) {
        level = "6段(最高段位)"
    } else if (score >= 4.5 && score < 5.0) {
        level = "5段"
    } else if (score >= 4.0 && score < 4.5) {
        level = "4段"
    } else if (score >= 3.5 && score < 4.0) {
        level = "3段"
    } else if (score >= 3.0 && score < 3.5) {
        level = "2段"
    } else if (score >= 2.5 && score < 3.0) {
        level = "初段"
    } else if (score >= 2.0 && score < 2.5) {
        level = "1級"
    } else if (score >= 1.5 && score < 2.0) {
        level = "2級"
    } else if (score >= 1.0 && score < 1.5) {
        level = "3級"
    } else if (score >= 0.8 && score < 1.0) {
        level = "4級"
    } else if (score >= 0.6 && score < 0.8) {
        level = "5級"
    } else if (score >= 0.4 && score < 0.6) {
        level = "6級"
    } else if (score >= 0.3 && score < 0.4) {
        level = "7級"
    } else if (score >= 0.2 && score < 0.3) {
        level = "8級"
    } else if (score >= 0.1 && score < 0.2) {
        level = "9級"
    }

    return level
}

function score_update() {
    completed = true
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000)
    const moji = genzai.length
    const now_score = moji / elapsedTime

    if (now_score > best_score) {
        best_score = now_score
        const level = level_check(now_score)
        best.innerHTML = `${now_score.toFixed(2)} ${level}レベル`
    }

    const level = level_check(now_score)
    score.innerHTML = `${now_score.toFixed(2)} ${level}レベル`

    mondai.innerHTML = `結果は【${level}】${now_score.toFixed(2)}(文字/秒)でした。次の問題に行きます。`
}

input.addEventListener('keydown', () => {
    if (completed) {
        return
    }

    let v = input.value
    // 全部入力していたら1秒間に何文字入力できたかを表示して次の問題に行く
    if (genzai === v) {
        score_update()
        setTimeout(() => {
            next()
        }, 5000)
    }
})

input.addEventListener('keyup', () => {
    if (completed) {
        return
    }

    let v = input.value
    if (!mode) {
        mondai.innerHTML = genzai
        if (genzai.startsWith(v)) {
            body.style.backgroundImage = `url("./img/23583045.png")`
            mondai.innerHTML = genzai.replace(v, `<span>${v}</span>`)
        } else {
            body.style.backgroundImage = `url("./img/23583228.png")`
        }
    }
})

// compositionstart イベントは、 IME などのテキスト変換システムが新しい変換セッションを開始した時に発生します
input.addEventListener('compositionstart', () => {
    mode = true
})

input.addEventListener('compositionend', () => {
    mode = false
})

rand_btn.addEventListener('click', () => {
    if (completed) {
        return
    }

    init()
})

// 初回読み込み
window.addEventListener('DOMContentLoaded', () => {
    init()
})

window.onload = function () {
    // プリロードする画像
    let images = "./img/23583228.png"
    // プリロード
    let img = document.createElement('img')
    img.src = images
}