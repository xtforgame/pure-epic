let deprecationsSeen : any = {};
export const resetDeprecationsSeen = () => {
  deprecationsSeen = {};
};

const consoleWarn = (typeof console === 'object' && typeof console.warn === 'function')
  ? (...args : any[]) => console.warn(...args)
  : () => { };

export const deprecate = (msg : any) => {
  if (!deprecationsSeen[msg]) {
    deprecationsSeen[msg] = true;
    consoleWarn(`redux-observable | DEPRECATION: ${msg}`);
  }
};

export const warn = (msg : any) => {
  consoleWarn(`redux-observable | WARNING: ${msg}`);
};
