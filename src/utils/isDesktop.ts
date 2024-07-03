const isDesktop = () => {
  if(typeof window !== undefined){
    if(window.matchMedia('(min-width: 768px)').matches) return true
    return false
  }
  throw new Error('window가 아직 없음')
}

export default isDesktop
