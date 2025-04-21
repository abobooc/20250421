let questions = [
  {
    question: "撲克牌中唯一沒有鬍子的老K是哪一張？",
    options: ["(A)梅花Ｋ", "(B)方塊Ｋ", "(C)紅心Ｋ", "(D)黑桃Ｋ"],
    answer: 2 // 索引從 0 開始，(C)紅心Ｋ
  },
  {
    question: "發現瓦斯外洩時的正確處理步驟？",
    options: ["(A)禁→關→推→離", "(B)關→禁→推→離", "(C)關→推→禁→離", "(D)推→禁→關→離"],
    answer: 0 // (A)禁→關→推→離
  },
  {
    question: "新台幣兩百元鈔票上的人物是下列何者？",
    options: ["(A)孫中山", "(B)蔣介石", "(C)蔣經國", "(D)鄭成功"],
    answer: 1 // (B)蔣介石
  },
  {
    question: "衣服沾到印泥時，用什麼清洗效果較佳？",
    options: ["(A)汽水", "(B)汽油", "(C)乳液", "(D)綠茶"],
    answer: 1 // (B)汽油
  }
];

let currentQuestion = 0;
let score = 0;
let showFeedback = false;
let feedbackText = "";
let feedbackTimer = 0;
let quizCompleted = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(255, 182, 193); // 淺粉色背景

  if (quizCompleted) {
    // 顯示總分及重來按鈕
    fill(0);
    textSize(24);
    text(`測驗結束！您的總分是: ${score}`, width / 2, height / 2 - 50);

    // 顯示重來按鈕
    fill(200);
    rect(width / 2 - 75, height / 2, 150, 50, 10);
    fill(0);
    textSize(20);
    text("重來", width / 2, height / 2 + 25);
  } else if (showFeedback) {
    // 顯示答對或答錯的反饋
    textSize(24);
    fill(feedbackText === "恭喜答對！" ? "green" : "red");
    text(feedbackText, width / 2, height / 2);

    // 計時器控制反饋顯示時間
    if (millis() - feedbackTimer > 800) {
      showFeedback = false;
      nextQuestion();
    }
  } else {
    // 顯示題目和選項
    displayQuestion();
  }

  // 顯示記分板
  fill(0);
  textSize(16);
  text(`分數: ${score}`, width - 60, 20);
}

function displayQuestion() {
  let q = questions[currentQuestion];

  // 顯示題目
  fill(0);
  textSize(20);
  text(q.question, width / 2, height / 4);

  // 顯示選項
  textSize(18);
  for (let i = 0; i < q.options.length; i++) {
    let y = height / 2 + i * 30;
    text(q.options[i], width / 2, y);
  }
}

function mousePressed() {
  if (quizCompleted) {
    // 檢查是否點擊重來按鈕
    if (
      mouseX > width / 2 - 75 &&
      mouseX < width / 2 + 75 &&
      mouseY > height / 2 &&
      mouseY < height / 2 + 50
    ) {
      resetQuiz();
    }
    return;
  }

  if (showFeedback) return;

  let q = questions[currentQuestion];
  for (let i = 0; i < q.options.length; i++) {
    let y = height / 2 + i * 30;
    if (mouseX > width / 4 && mouseX < (3 * width) / 4 && mouseY > y - 10 && mouseY < y + 10) {
      if (i === q.answer) {
        score += 25;
        feedbackText = "恭喜答對！";
      } else {
        feedbackText = `答錯了！正確答案是: ${q.options[q.answer]}`;
      }
      showFeedback = true;
      feedbackTimer = millis();
      break;
    }
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    // 測驗結束
    quizCompleted = true;
  }
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  quizCompleted = false;
}
