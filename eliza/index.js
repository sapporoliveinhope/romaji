const btn = document.getElementById("btn")
const userInput = document.getElementById("userInput")
const chatOutput = document.getElementById("chatOutput")

let lastUserInput = ""


// ランダムに選択された返答を返す関数
function respond(input) {
    let responses = [
        "それはなぜですか？",
        "私に詳しく話してください。",
        "あなたが感じていることはどういうことですか？",
        "私が理解できるように、もう少し説明していただけますか？",
        "あなたが言いたいことが理解できません。",
        "それはあなたにとってどんな意味がありますか？",
        "どうしてそう感じるのですか？",
        "それはあなたにとって重要なことですか？",
        "もう少し具体的に話していただけますか？",
        "私にはよくわかりません。もう少し簡単に話していただけますか？",
        "それはあなたをどうして不安にさせるのですか？",
        "あなたが言っていることはとても興味深いです。もう少し話していただけますか？",
        "なぜそのように感じるのですか？",
        "私も同じように感じたことがあります。どうやって対処しましたか？",
        "それはあなたにとってどのような意味を持ちますか？",
        "もう少し具体的に話していただけますか？",
        "それはあなたにとってどんな意味がありますか？",
        "あなたが言っていることは私も理解できます。なぜそう思うのですか？",
        "あなたがそのように感じることは、一般的な感情だと思います。",
        "それはあなたの周りの人々にどう影響を与えているのですか？",
        "そのことについてもう少し話していただけますか？",
        "もっと大きな視点で見てみましょう。それは社会的な問題と関係がありますか？",
        "私はあなたの感情を理解しようとしています。もう少し話していただけますか？",
        "それはあなたにとって重要なことなのですね。",
        "あなたが言っていることは私にもよくわかります。なぜそう感じるのですか？",
        "それはあなたの人生にとってどのような意味を持ちますか？",
        "あなたの話はとても興味深いです。もう少し話していただけますか？",
        "そのことについてもっと掘り下げて話していただけますか？"
    ];

    let response = "";

    if (input.indexOf("こんにちは") !== -1 || input.indexOf("おはよう") !== -1 || input.indexOf("こんばんは") !== -1) {
        let greetings = ["こんにちは！", "おはようございます！", "こんばんは！"];
        let index = Math.floor(Math.random() * greetings.length);
        response = greetings[index];
    } else if (input.indexOf("疲れた") !== -1 || input.indexOf("疲れました") !== -1) {
        response = "お疲れ様です。休憩を取ってくださいね。";
    } else if (input.indexOf("好きな色は何ですか") !== -1) {
        response = "私には色覚がありませんが、あなたの好きな色は何ですか？";
    } else {
        let index = Math.floor(Math.random() * responses.length);
        response = responses[index];
    }

    return response;
}


// ユーザーが入力したテキストに対して返答を生成する関数
function elizaResponse() {
    let input = userInput.value
    let response = respond(input)

    chatOutput.innerHTML += "<br><b>ユーザー:</b> " + input
    chatOutput.innerHTML += "<br><b>Eliza:</b> " + response

    userInput.value = ""
}


btn.addEventListener("click", elizaResponse)

userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault()
        elizaResponse()
    }
})

