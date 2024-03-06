import { innnerFunc } from './start-time';

const outerFunc = () => {
  console.time('time-test1');
  setTimeout(() => {
    console.log('Pausing 1 sec');
    console.timeEnd('time-test2');
  }, 1000);
  innnerFunc();
};

outerFunc();
