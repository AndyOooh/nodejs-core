export const innnerFunc = () => {
  /* starting timer */
  console.time('startedSecond');

  /* This is started in another file */
  console.timeEnd('startedFirst');
};
