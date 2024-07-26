import swap from "./swap";

describe('swap array elements each other', () => {
  const array = [1,2,3,4];
  const index1 = 0;
  const index2 = 3;
  test('swap array elements 1 and 4', () => {
    swap(array,index1,index2); //swapped
    
    expect(array).toEqual([4,2,3,1])
  })
})
