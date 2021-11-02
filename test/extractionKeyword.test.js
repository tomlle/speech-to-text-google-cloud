import extractionKeyword from '../app/extractionKeyword';

let searchStr = '恥の多い生涯を送って来ました。自分には、人間の生活というものが、見当つかないのです。自分は東北の田舎に生れましたので、汽車をはじめて見たのは、よほど大きくなってからでした。';
let keyword;
let beforeTextNum;
let afterTextNum;
describe('キーワード文字数のチェック', () => {
  test('キーワードが1文字', () => {
    keyword = '自';
    beforeTextNum = 1;
    afterTextNum = 1;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].text).toBe("。自分");
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[1].text).toBe("。自分");
  });
  test('キーワードが2文字', () => {
    keyword = '自分';
    beforeTextNum = 1;
    afterTextNum = 1;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].text).toBe("。自分に");
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[1].text).toBe("。自分は");
  });
  test('キーワードが5文字', () => {
    keyword = '人間の生活';
    beforeTextNum = 1;
    afterTextNum = 1;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].text).toBe("、人間の生活と");
  });
});

describe('キーワードの出現位置チェック', () => {
  test('キーワードが文章の初めに出現', () => {
    keyword = '恥';
    beforeTextNum = 1;
    afterTextNum = 1;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].text).toBe("恥の");
  });
  test('キーワードが文章の終わりに出現', () => {
    keyword = 'でした。';
    beforeTextNum = 1;
    afterTextNum = 1;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].text).toBe("らでした。");
  });
  test('キーワードが文章中に出現', () => {
    keyword = '人間の生活';
    beforeTextNum = 1;
    afterTextNum = 1;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].text).toBe("、人間の生活と");
  });
});

describe('キーワードのマッチ回数チェック', () => {
  test('マッチ回数0回', () => {
    keyword = '俺';
    beforeTextNum = 1;
    afterTextNum = 1;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data).toEqual([]);
  });
  test('マッチ回数1回', () => {
    keyword = '人間';
    beforeTextNum = 1;
    afterTextNum = 1;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].text).toBe("、人間の");
  });
  test('マッチ回数2回', () => {
    keyword = '自分';
    beforeTextNum = 1;
    afterTextNum = 1;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].text).toBe("。自分に");
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[1].text).toBe("。自分は");
  });
});

describe('前の文字数のチェック', () => {
  test('前の文字数が0文字', () => {
    keyword = '東北の田舎';
    beforeTextNum = 0;
    afterTextNum = 5;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].text).toBe("東北の田舎に生れまし");
  });
  test('前の文字数が1文字', () => {
    keyword = '東北の田舎';
    beforeTextNum = 1;
    afterTextNum = 5;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].text).toBe("は東北の田舎に生れまし");
  });
  test('前の文字数が5文字', () => {
    keyword = '東北の田舎';
    beforeTextNum = 5;
    afterTextNum = 5;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].text).toBe("す。自分は東北の田舎に生れまし");
  });
});
describe('後の文字数のチェック', () => {
  test('後の文字数が0文字', () => {
    keyword = '東北の田舎';
    beforeTextNum = 5;
    afterTextNum = 0;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].text).toBe("す。自分は東北の田舎");
  });
  test('後の文字数が1文字', () => {
    keyword = '東北の田舎';
    beforeTextNum = 5;
    afterTextNum = 1;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].text).toBe("す。自分は東北の田舎に");
  });
  test('後の文字数が5文字', () => {
    keyword = '東北の田舎';
    beforeTextNum = 5;
    afterTextNum = 5;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].text).toBe("す。自分は東北の田舎に生れまし");
  });
});

describe('抽出文字の文字位置チェック', () => {
  test('抽出文字の文字位置が1', () => {
    keyword = '自分';
    beforeTextNum = 1;
    afterTextNum = 1;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].text).toBe("。自分に");
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].fromIndex).toBe(1);
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[1].text).toBe("。自分は");
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[1].fromIndex).toBe(1);
  });
  test('抽出文字の文字位置が15', () => {
    keyword = '自分';
    beforeTextNum = 15;
    afterTextNum = 15;
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].text).toBe("恥の多い生涯を送って来ました。自分には、人間の生活というものが、");
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[0].fromIndex).toBe(15);
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[1].text).toBe("うものが、見当つかないのです。自分は東北の田舎に生れましたので、");
    expect(extractionKeyword(keyword, searchStr, beforeTextNum, afterTextNum).data[1].fromIndex).toBe(15);
  });
});