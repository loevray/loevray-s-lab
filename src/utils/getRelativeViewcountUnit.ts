const getRelativeViecountUnit = (number:number) => {
  const 십만 = 100000
  const 만 = 10000;
  const 천 = 1000;
  
  /* 
    억 단위는 아직 안다루겠음
    10만 이상은 소숫점 절삭
    1만이상 10만 미만은 소숫점 한자리로 절삭 ex) 4.1만회
    1천~1만 미만도 소숫점 한자리 절삭 ex) 3.7천회
    1천미만은 그대로 표시
  */
 
    if(number>=십만){
      return `${Math.floor(number/10000)}만회`
    }
    if(number>=만){
      return `${(number/10000).toFixed(1)}만회`
    }
    if(number>=천){
      return `${(number/1000).toFixed(1)}천회`
    }
    return `${number}회`
}

export default getRelativeViecountUnit
