const raffle = (range:{low:number,high:number},maxWinner:number) => {
  const {low,high} = range;
  
  const winners = new Set();
  while(winners.size<maxWinner){
    const randomRange = Math.floor(Math.random() * (high - low+1)) + low;
    winners.add(randomRange)
  }
  
  return Array.from(winners)
}

