import getTruncateText from "./getTruncateText"

test('get truncate text with ellipsis', () => {
  expect(getTruncateText('아에이오우',3)).toBe('아에이...')
})
