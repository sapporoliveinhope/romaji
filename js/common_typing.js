const mondai = document.getElementById("mondai")
const input = document.getElementById("input")
const rand_btn = document.getElementById("rand_btn")
const best = document.getElementById("best")

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

function score_update() {
    completed = true
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000)
    const moji = genzai.length
    const score = moji / elapsedTime
    if (score > best_score) {
        best_score = score
        level = "初心者(10級)"
        if (score >= 3.00) {
            level = "プロ(初段)"
        } else if (score >= 2.00) {
            level = "習熟(1級)"
        } else if (score >= 1.00 && score < 2.00) {
            level = "実務(3級)"
        } else if (score >= 0.66 && score < 1.00) {
            level = "実用(5級)"
        } else if (score >= 0.33 && score < 0.66) {
            level = "初級者(7級)"
        }

        best.innerHTML = `${best_score.toFixed(2)} ${level}レベル`
    }
    mondai.innerHTML = `結果は、${score.toFixed(2)}(文字/秒)でした。次の問題に行きます。`
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
            mondai.innerHTML = genzai.replace(v, `<span>${v}</span>`)
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
