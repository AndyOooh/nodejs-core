import { innnerFunc } from './start-time';

/*
 * Testing console.time between two files
 * It works.
 * startedFirst: 0.674ms
 * Pausing 1000ms
 * startedSecond: 1.002s
 */
const outerFunc = () => {
  /* Starting time to be ended in another func in another file */
  console.time('startedFirst');
  const delay = 1000;
  setTimeout(() => {
    console.log(`Pausing ${delay}ms`);
    console.timeEnd('startedSecond');
  }, delay);
  innnerFunc();
};

outerFunc();
