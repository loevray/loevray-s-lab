

interface NotifyProps{
  eventType:ToastEventType; 
  message:string; 
  duration?:number
}

type Observer = ({eventType,message,duration}:NotifyProps) => void;


const createObserver = () => {
  const listeners = new Set<Observer>();
  const observe = (_notify:Observer) => {
    listeners.add(_notify);
    return () => listeners.delete(_notify);
  }
  const notify = ({eventType, message, duration}:NotifyProps) => {
    listeners.forEach((observer) => observer({eventType,message,duration}));
  }
  return {observe,notify}
}

export const observerInstance = createObserver();

export type ToastEventType = 'default'| 'warning' | 'error' | 'success';

const showToast = (eventType:ToastEventType, message:string, duration = 2500) => {
  observerInstance.notify({eventType,message,duration})
}

const toast = (message:string,duration?:number) => {
  const notify = () => showToast('default', message, duration);
  const warning = () => showToast('warning', message, duration);
  const error = () => showToast('error', message, duration);
  const success = () => showToast('success', message, duration);
  return {notify,warning,error,success}
}

export default toast;


