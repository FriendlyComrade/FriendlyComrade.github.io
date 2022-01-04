
const debounce = (callback: Function, delay: number) => {
    let timerID: number;
    return function (this: any, ...args: any[]) {
      if (timerID) {
        window.clearTimeout(timerID);
      }
      timerID = window.setTimeout(() => callback.apply(this, args), delay);
    };
  };
  
export {debounce}