import { mockGetComputedStyle } from "../../__mocks__/mockGetComputedStyle";
import getRemInPx from "./getRemInPx";

describe('getRemInPx',()=>{
  beforeEach(() => {
    mockGetComputedStyle(16)
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  })
  
  test("get Rem In window fontsize", () => {
    expect(getRemInPx()).toBe(16)
  });
  
});


