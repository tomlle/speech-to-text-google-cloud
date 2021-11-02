/**
 * @brief  文字列にキーワードが含まれていると、指定した前後の文字数を含めて返却する
 *
 * @param
 *  keyword
 *  searchStr
 *  beforeTextNum
 *  afterTextNum
 *
 * @return
 *    message ・・　レスポンステキスト
 *    status  ・・　1は正常、0は異常
 *    data    ・・ エラー時は空配列[]
 *    data[n].text       ・・ キーワード検索結果、抽出文字
 *    data[n].fromIndex  ・・ 抽出文字の文字位置
 *
 * @note
 *   data[n].fromIndexで抽出文字の文字位置を返すことで、画面描写時にキーワードを目立たせることができる
 */
const extractionKeyword = (keyword, searchStr, beforeTextNum, afterTextNum) => {

  // 返却値の初期化
  const ret = {message: '', status: 1, data: []};

  if(searchStr.textLength === 0 || keyword.length === 0 || beforeTextNum.length === 0 || afterTextNum.length === 0) {
    ret.message = "引数の指定が間違っています。";
    ret.status = 0;
    return ret;
  }

  // 音声テキストの返却値に改行が含まれている場合パースする
  const searchStrArr = searchStr.split(/\r\n|\n/);
  // パースした文字列に対してキーワード検索
  searchStrArr.map((searchText)=>{
    // 末尾に指定文字数を含めるかの判断ライン
    const judgmentEndLine = searchText.length - afterTextNum;
    // キーワードの文字数
    const keywordLength = keyword.length;
    // キーワードが2文字以上の際に
    const addIndex = keywordLength - 1;

    let index = 0;
    let flg = true;
    let outputStr = "";
    let fromIndex;

    // 音声テキストから全てのキーワードを抽出するまでループ
    while(flg) {
      // キーワードの位置を取得
      index = searchText.indexOf(keyword, index);

      // キーワードに一致する文字列がなければループ処理を抜ける
      if(index === -1) {
        flg = false;
        continue;
      }

      // キーワードの前後に、指定した含みたい文字数がある場合
      if((index >= beforeTextNum) && (index + addIndex < judgmentEndLine)){
        console.log('case01');
        outputStr = searchText.substr(index-beforeTextNum, beforeTextNum+keywordLength) + searchText.substr(index+keywordLength, afterTextNum);
        fromIndex = beforeTextNum;
      }
      // キーワードより前は含みたい文字数があるが、後ろはその文字数未満の場合
      if((index >= beforeTextNum) && (index + addIndex >= judgmentEndLine)){
        console.log('case02');
        outputStr = searchText.substr(index-beforeTextNum, beforeTextNum+keywordLength) + searchText.substr(index+keywordLength, (searchText.length - 1) - index);
        fromIndex = beforeTextNum;
      }
      // キーワードより前は含みたい文字数未満だが、後ろ含みたい文字数がある場合
      if((index < beforeTextNum) && (index + addIndex < judgmentEndLine)){
        console.log('case03');
        outputStr = searchText.substr(0, index+keywordLength) + searchText.substr(index+keywordLength, afterTextNum);
        fromIndex = index;
      }
      // キーワードの前後が、指定した含みたい文字数未満の場合
      if((index < beforeTextNum) && (index + addIndex >= judgmentEndLine)){
        console.log('case04');
        outputStr = searchText.substr(0, index+keywordLength) + searchText.substr(index+keywordLength, (searchText.length - 1) - index);
        fromIndex = index;
      }
      // 次の検索開始位置
      index += 1;
      ret.data.push({
        text: outputStr,
        fromIndex: fromIndex
      });
    }
  });
  return ret;
}
export default extractionKeyword;