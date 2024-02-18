import { open } from 'node:fs/promises';
import fs from 'node:fs';

/*
 * Promise API
 * Exec time: 22s
 */
const mainAsync = async () => {
  console.time('writeToFile');
  const fileHandler = await open(__dirname + '/test.txt', 'a');
  for (let i = 0; i < 1e5; i++) {
    // await fileHandler.write(i + '\n');
    await fileHandler.write(i + ' ');
  }
  await fileHandler.close();
  console.timeEnd('writeToFile');
};
// mainAsync();

/*
 * Callback API
 * Exec time: 20.4s
 */
fs.open(__dirname + '/test.txt', 'a', (err, fd) => {
  console.time('writeToFile');
  for (let i = 0; i < 1e5; i++) {
    fs.write(fd, i + ' ', err => {
      if (err) console.log('error writing to file: ', err);
    });
  }
  console.timeEnd('writeToFile');
});
