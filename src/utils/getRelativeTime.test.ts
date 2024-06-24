// timeUtils.test.js

import getRelativeTime from "./getRelativeTime";

describe('getRelativeTime', () => {
  test('should return "방금 전" for dates within the last 30 seconds', () => {
    const now = new Date();
    const oneSecondAgo = new Date(now.getTime() - 30 * 1000).toISOString();
    expect(getRelativeTime(oneSecondAgo)).toBe('방금 전');
  });
  
  test('should return "방금 전" for dates within the last minute but more than 30 seconds', () => {
    const now = new Date();
    const oneSecondAgo = new Date(now.getTime() - 31 * 1000).toISOString();
    expect(getRelativeTime(oneSecondAgo)).toBe('31초 전');
  });

  test('should return "x분 전" for dates within the last hour', () => {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
    expect(getRelativeTime(fiveMinutesAgo)).toBe('5분 전');
  });

  test('should return "x시간 전" for dates within the last day', () => {
    const now = new Date();
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString();
    expect(getRelativeTime(threeHoursAgo)).toBe('3시간 전');
  });

  test('should return "x일 전" for dates beyond the last day', () => {
    const now = new Date();
    const fourDaysAgo = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString();
    expect(getRelativeTime(fourDaysAgo)).toBe('4일 전');
  });

  test('should correctly handle different dates and times', () => {
    const now = new Date();
    const thirtySecondsAgo = new Date(now.getTime() - 30 * 1000).toISOString();
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000).toISOString();
    const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    expect(getRelativeTime(thirtySecondsAgo)).toBe('방금 전');
    expect(getRelativeTime(fifteenMinutesAgo)).toBe('15분 전');
    expect(getRelativeTime(twelveHoursAgo)).toBe('12시간 전');
    expect(getRelativeTime(sevenDaysAgo)).toBe('7일 전');
  });
});
