interface RelayFetchProps<T, K> {
  initialParam: T;
  maxCount: number;
  fetchFn: (param: T) => Promise<K>; // fetchFn이 Promise를 반환한다는 것을 명시
  nextParam: (response: K) => T;
}

const relayFetch = async <T, K>({ fetchFn, maxCount, initialParam, nextParam }: RelayFetchProps<T, K>) => {
  const iteration = Array(maxCount).fill(0).map((_, i) => i);
  const result: K[] = [];
  let response: Awaited<K> | undefined;
  
  for await (const count of iteration) {
    try{
      const _nextParam = response === undefined ? initialParam : nextParam(response);
      
      if(_nextParam === undefined) break;
      response = await fetchFn(_nextParam); 
      result.push(response);
    } catch(e) {
      console.log('relayFetch error', e);
      throw e
    }
  }
  
  return result;
};

export default relayFetch
