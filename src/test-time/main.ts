import { startTime } from './start-time';

const timeLogTest = () => {
  console.time('time-test1');
  setTimeout(() => {
    console.log('Pausing 1 sec');
    console.timeEnd('time-test2');
  }, 1000);
  startTime();
};

timeLogTest();
