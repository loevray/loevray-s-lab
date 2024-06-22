import relayFetch from './relayFetch';

describe('relayFetch function', () => {
  const mockFetchFn = jest.fn();
  mockFetchFn.mockImplementation((param: number) => {
    return Promise.resolve(param * 2); 
  });

  const initialParam = 1;
  const maxCount = 3;
  
  test('should fetch data for the specified number of times', async () => {
    const result = await relayFetch({
      initialParam,
      maxCount,
      fetchFn: mockFetchFn,
      nextParam: (response: number) => response + 1,
    });

    expect(result).toEqual([2, 6, 14]);  // 1*2, 2+1 * 2, 6+1 *2
    expect(mockFetchFn).toHaveBeenCalledTimes(3);
  });

  test('should handle errors thrown by fetchFn', async () => {
    mockFetchFn.mockImplementationOnce(() => {
      throw new Error('Fetch failed');
    });

    await expect(relayFetch({
      initialParam,
      maxCount,
      fetchFn: mockFetchFn,
      nextParam: (response: number) => response + 1,
    })).rejects.toThrow('Fetch failed');
  });

});
