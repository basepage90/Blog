// 바이트 계산 함수 : 한글은 2, 그외 영문숫자 특수문자는 1로 취급
// 다만,utf8에서한글은 3이며, 사실 현재 바이트를 구하기 위함이 아니다.
export const CountByteLength = (str) => {
    let b = 0;
    let i = 0;
    let c = 0;
    for(i=0; i < str.length; i++){
      c = str.charCodeAt(i);
      b = b + (c >> 7 ? 2 : 1);
    }
    return b;
};

// 바이트 단위로 substring 하는 함수
export const CutByLen = (str,maxByte) => {
    let b = 0;
    let i = 0;
    let c = 0;
    for(i=0; i < str.length; i++) {
      c = str.charCodeAt(i);
      b = b+ (c >> 7 ? 2 : 1) ;
      if (b >= maxByte){
        return str.substring(0,i);
      }
    }
    return str.substring(0,i);
};