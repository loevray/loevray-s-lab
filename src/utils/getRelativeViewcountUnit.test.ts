import getRelativeViecountUnit from "./getRelativeViewcountUnit"

describe('get relative viecount unit in korean', () => {
  test('999 is 999회', () => {
    expect(getRelativeViecountUnit(999)).toBe('999회')
  })
  
  test('1329 is 1.3천회', () => {
    expect(getRelativeViecountUnit(1329)).toBe('1.3천회')
  })
  
  test('13290 is 1.3만회', () => {
    expect(getRelativeViecountUnit(13290)).toBe('1.3만회')
  })
  
  test('132900 is 13.2만회', () => {
    expect(getRelativeViecountUnit(132900)).toBe('13만회')
  })
  
  test('1329000 is 132만회', () => {
    expect(getRelativeViecountUnit(1329000)).toBe('132만회')
  })

  test('13290000 is 1320만회', () => {
    expect(getRelativeViecountUnit(13290000)).toBe('1329만회')
  })
})
