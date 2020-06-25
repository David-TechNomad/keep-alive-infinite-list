export function throttle(fn, timeout = 10) {
  let timer;
  return function(...args) {
    if (timer) {
      timer = clearTimeout(timer);
    }
    timer = setTimeout(() => fn.apply(this, [...args]), timeout);
  };
}
