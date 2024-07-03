

interface NotifyProps{
  eventType:ToastEventType; 
  message:string; 
  duration:number
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

const showToast = ({eventType, message, duration}:NotifyProps) => {
  observerInstance.notify({eventType,message,duration})
}

const toast = ({eventType = 'default',message,duration = 3000}:{eventType?:ToastEventType;message:string;duration?:number}) => showToast({eventType,message,duration});
  

export default toast;


