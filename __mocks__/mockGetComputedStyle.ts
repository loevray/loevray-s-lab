import mocked from 'ts-jest'


export const mockGetComputedStyle = (fontSize:number) => {
  window.getComputedStyle = jest.fn().mockImplementation(() => ({
    fontSize,
  }));
};

