const isDesktop = () => {
  if(typeof window !== 'undefined'){
    if(window.matchMedia('(min-width: 768px)').matches) return true
    return false
  }
  return true;
}

export default isDesktop
