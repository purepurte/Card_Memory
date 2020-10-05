cards = [
    ["織田信長カード.jpg", "織田信長の説明文.jpg"], //cards[0][0], [0][1]のセット
    ["真田幸村カード.jpg", "真田幸村の説明文.jpg"], //cards[1][0], [1][1]のセット
    ["豊臣秀吉カード.jpg", "豊臣秀吉の説明文.jpg"], //cards[2][0], [2][1]のセット
    ["上杉謙信カード.jpg", "上杉謙信の説明文.jpg"], //cards[3][0], [3][1]のセット
    ["徳川家康カード.jpg", "徳川家康の説明文.jpg"], //cards[4][0], [4][1]のセット
    ["武田信玄カード.jpg", "武田信玄の説明文.jpg"], //cards[5][0], [5][1]のセット
    ["伊達政宗カード.jpg", "伊達政宗の説明文.jpg"], //cards[6][0], [6][1]のセット
    ["明智光秀カード.jpg", "明智光秀の説明文.jpg"], //cards[7][0], [7][1]のセット
  ];

  shuffled_cards = [];

// すべてのカードをshuffled cardsに順番に追加
for (var i=0; i<8; i++) { // 人物番号
    for (var j=0; j<2; j++) { // 画像or文章の番号
      shuffled_cards.push(cards[i][j]); // カードをshuffled_cardsに追加
    }
  }
  //--- ここまで
  //--- カードのシャッフル処理
  shuffled_cards = shuffled_cards.sort(function() { return Math.random() - .5;  });

// グローバル
// div要素を格納
var cards = [];
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
    // 数字格納 一時配列
    var arr = [];
    
    for (var i = 0; i < 10; i++){
        // ペアの数字を8組
        arr.push(i);
        arr.push(i);
    }
    
    // シャッフル
    shuffle(arr);
    
    var panel = document.getElementById('panel');
    
    // div要素作成
    for (i = 0; i < 16; i++){
        var div = document.createElement('div');
        div.className = 'card back';
        div.index = i;
        div.number = arr[i];
        div.innerHTML = '';
        div.onclick = turn;
        panel.appendChild(div);
        cards.push(div);
    }
    // 開始時刻を取得
    startTime = new Date();
    // タイマー開始
    startTimer();
    
}

// シャッフル用関数
function shuffle(arr) {
    var n = arr.length;
    var temp, i;

    while (n) {
        i = Math.floor(Math.random() * n--);
        temp = arr[n];
        arr[n] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

// クリック時の処理
function turn(e){
    
    var div = e.target;
    
    // カードのタイマー処理が動作中は return
    if (backTimer) return;

    // 裏向きのカードをクリックした場合は数字を表示する
    if (div.innerHTML == ''){
        div.className = 'card';
        div.innerHTML = '<img src="test.png" />'; 
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
        if (cardFirst.number == div.number){
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
                div.className = 'card back';
                div.innerHTML = '';
                cardFirst.className = 'card back';
                cardFirst.innerHTML = '';
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
