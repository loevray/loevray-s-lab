const getRelativeTime = (isoString:string) => {
  const inputDate = new Date(isoString);
  const currentDate = new Date();

  const KSTOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  const inputDateKST = new Date(inputDate.getTime() + KSTOffset);
  const currentDateKST = new Date(currentDate.getTime() + KSTOffset);

  const diff = currentDateKST.getTime() - inputDateKST.getTime(); // 밀리초 단위 시간 차이

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const rtf = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });

  if(seconds <= 30) return '방금 전'
  if (seconds < 60) return rtf.format(-seconds, 'second');
  if (minutes < 60) return rtf.format(-minutes, 'minute');
  if (hours < 24) return rtf.format(-hours, 'hour');
  return rtf.format(-days, 'day');
};

export default getRelativeTime
