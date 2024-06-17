import convertToPx from "./convertToPx";

import { mockGetComputedStyle } from "../../../__mocks__/mockGetComputedStyle";

describe('getRemInPx',()=>{
  beforeEach(() => {
    mockGetComputedStyle(16)
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  })
  
  test("other values convert to pixel", () => {
    expect(convertToPx('1rem')).toBe(16)
  });
  
  test("other values convert to pixel", () => {
    expect(convertToPx(16)).toBe(16)
  });
});




