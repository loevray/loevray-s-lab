import raffle from "./raffle";

let raffleRange = {low:1, high:860}

describe('raffle with low number', () => {
    beforeEach(() => {
      window.Math.random = jest.fn().mockImplementation(() => 0);
    })
    
    afterEach(() => {
      jest.restoreAllMocks()
    })  
    
    test('get sigle winner from raffle', () => {
      expect(raffle({...raffleRange})).toEqual([raffleRange.low]);
    })
})

