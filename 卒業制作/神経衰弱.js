cards = [
  ["織田信長.png", "織田信長の説明文.png"], //cards[0][0], [0][1]のセット
  ["真田幸村.png", "真田幸村の説明文.png"], //cards[1][0], [1][1]のセット
  ["豊臣秀吉.png", "豊臣秀吉の説明文.png"], //cards[2][0], [2][1]のセット
  ["上杉謙信.png", "上杉謙信の説明文.png"], //cards[3][0], [3][1]のセット
  ["徳川家康.png", "徳川家康の説明文.png"], //cards[4][0], [4][1]のセット
  ["武田信玄.png", "武田信玄の説明文.png"], //cards[5][0], [5][1]のセット
  ["伊達政宗.png", "伊達政宗の説明文.png"], //cards[6][0], [6][1]のセット
  ["明智光秀.png", "明智光秀の説明文.png"], //cards[7][0], [7][1]のセット
];

// 開始時間
var startTime;
// 経過秒数用 タイマーID
var timer;
// カードめくり用 タイマーID
var backTimer;
// 1枚目かどうかのフラグ   1枚目: true   2枚目: false
var flgFirst = true;
// 1枚目のカードを格納
var cardFirst;
// そろえた枚数
var countUnit = 0;

window.onload = function(){
  shuffled_cards = [];

  // すべてのカードをshuffled cardsに順番に追加
  for (var i=0; i<cards.length; i++) { // 人物番号
    for (var j=0; j<cards[i].length; j++) { // 画像or文章の番号
      shuffled_cards.push(cards[i][j]); // カードをshuffled_cardsに追加
    }
  }
  //--- ここまで
  //--- カードのシャッフル処理
  shuffled_cards = shuffled_cards.sort(function() { return Math.random() - .5;  });


  var panel = document.getElementById('panel');

  // div要素作成
  for (i = 0; i < shuffled_cards.length; i++){
    var div = document.createElement('div');
    div.className = 'card back';
    div.innerHTML = '';
    div.onclick = turn;
    setCardDataToDiv(div, shuffled_cards[i]);
    panel.appendChild(div);
  }
  // 開始時刻を取得
  startTime = new Date();
  // タイマー開始
  startTimer();
}

function setCardDataToDiv(div, card) {
  var img = document.createElement('img');
  img.style.display = 'none';
  img.src = "./仮カード/" + card;
  div.appendChild(img);

  var span = document.createElement('span');
  span.style.display = 'none';
  span.innerHTML = card;
  div.appendChild(span);
}

// クリック時の処理
function turn(e){
  var div = e.target;

  // カードのタイマー処理が動作中は return
  if (backTimer) return;

  // 裏向きのカードをクリックした場合は数字を表示する
  if (div.className == 'card back'){
    div.className = 'card';
    var img = div.querySelector('img')
    img.style.display = "inline";
    img.style.width = div.clientWidth;
    img.style.height = div.clientHeight;
    console.info(div);
  }else{
    // 数字が表示されているカードは return
    return;
  }

  // 1枚目の処理
  if (flgFirst){
    // cardFirst は2枚目の処理のときに使う
    cardFirst = div;
    // フラグ変更
    flgFirst = false;

    // 2枚目の処理
  }else{
    // 数字が1枚目と一致する場合
    var firstCardImg = cardFirst.querySelector('img');
    var secondCardImg = div.querySelector('img');
    var firstCardImgFilename = cardFirst.querySelector('span').innerHTML.replace(/の説明文/, "");
    var secondCardImgFilename = div.querySelector('span').innerHTML.replace(/の説明文/, "");

    console.info(firstCardImgFilename, secondCardImgFilename);
    if (firstCardImgFilename.indexOf(secondCardImgFilename) == 0){
      countUnit++;
      // 見えない状態にする
      backTimer = setTimeout(function(){
        div.className = 'card finish';
        cardFirst.className = 'card finish';
        backTimer = NaN;

        if (countUnit == 10){
          clearInterval(timer);  // timer終了
        }
      }, 500)

      // 一致しない場合
    }else{
      // カードを裏側に戻す
      backTimer = setTimeout(function(){
        firstCardImg.style.display = 'none';
        secondCardImg.style.display = 'none';
        div.className = 'card back';
        cardFirst.className = 'card back';
        cardFirst = null;
        backTimer = NaN;
      }, 500);
    }

    flgFirst = true;
  }
}
// タイマー開始
function startTimer(){
  timer = setInterval(showSecond, 1000);
}

// 秒数表示
function showSecond(){
  var nowTime = new Date();
  var elapsedTime = Math.floor((nowTime - startTime) / 1000);
  var str = '経過秒数: ' + elapsedTime + '秒';

  var re = document.getElementById('result');
  re.innerHTML = str;
}
