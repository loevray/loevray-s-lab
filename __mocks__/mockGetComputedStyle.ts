

export const mockGetComputedStyle = (fontSize:number) => {
  window.getComputedStyle = jest.fn().mockImplementation(() => ({
    fontSize,
  }));
};

