export const debounce = (fn, delay) => {
  let timer = null;
  if( fn === null || fn === undefined ) return;
  return function () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
