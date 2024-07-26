const swap = <T,>(arr: T[], index1: number, index2: number) =>
  ([arr[index1], arr[index2]] = [arr[index2], arr[index1]]);

export default swap;
import parseVideoIdFromYoutubeLink from "./parseVideoIdFromYoutubeLink"

describe('parseVideoIdFromYoutubeLink', () => {
  const fullLink = 'https://www.youtube.com/watch?v=e9qpXDDnQDc';
  const fullLinkVideoId = 'e9qpXDDnQDc'
  const fullLinkWithTime = 'https://www.youtube.com/watch?v=e9qpXDDnQDc&t=10s'
  const fullLinkWithTimeVideoId = 'e9qpXDDnQDc'
  const shortsLink = 'https://www.youtube.com/shorts/TGr6nn7VMh0'
  const shortsLinkVideoId = 'TGr6nn7VMh0'
  const shortcutLink = 'https://youtu.be/e9qpXDDnQDc'
  const shortcutLInkVideoId = 'e9qpXDDnQDc'
  
  test('parse videoId from full youtube link', () => {
    expect(parseVideoIdFromYoutubeLink(fullLink)).toBe(fullLinkVideoId)
  })
  
  test('parse videoId from full youtube link with time', () => {
    expect(parseVideoIdFromYoutubeLink(fullLinkWithTime)).toBe(fullLinkWithTimeVideoId)
  })
  
  test('parse videoId from shorts youtube link', () => {
    expect(parseVideoIdFromYoutubeLink(shortsLink)).toBe(shortsLinkVideoId)
  })
  
  test('parse videoId from shortcut youtube link like youtu.be', () => {
    expect(parseVideoIdFromYoutubeLink(shortcutLink)).toBe(shortcutLInkVideoId)
  })
})
