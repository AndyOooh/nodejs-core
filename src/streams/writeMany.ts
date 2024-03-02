import { open } from 'node:fs/promises';
import fs from 'node:fs';

/* Do this, saves memeory usage */
const streamAsync = async () => {
  console.time('writeToFile');
  const fileHandler = await open(__dirname + '/test.txt', 'w');
  const stream: fs.WriteStream = fileHandler.createWriteStream();
  let i = 0;
  const num = 1e6;

  const write = () => {
    while (i < num) {
      const buff = Buffer.from(i + ' ', 'utf-8');

      if (i === num - 1) {
        return stream.end();
      }

      if (!stream.write(buff)) {
        break;
      }

      i++;
    }
  };
  write();

  stream.on('drain', () => {
    console.log('Drained');
    write();
  });

  stream.on('finish', () => {
    console.log('🟢 finished');
    console.timeEnd('writeToFile');
    fileHandler.close();
  });
};
streamAsync();

/*
 * Don't do this, excessive memory usage
 * Promise API
 * 100k exec time: 15s
 * 1M exec time: 3m 14s
 * With stream:
 * 1M exec time: < 1s
 */
const mainAsync = async () => {
  console.time('writeToFile');
  const fileHandler = await open(__dirname + '/test.txt', 'a');
  const stream: fs.WriteStream = fileHandler.createWriteStream();
  for (let i = 0; i < 1e6; i++) {
    // await fileHandler.write(i + ' ');
    const buff = Buffer.from(i + ' ', 'utf-8');
    stream.write(buff);
  }
  await fileHandler.close();
  console.timeEnd('writeToFile');
  console.log('mainAsync done 1');
};
// mainAsync();

/*
 * Promise API IIF
 * 100k exec time: 16s
 */
// (async () => {
//   console.time('writeToFile');
//   const fileHandler = await open(__dirname + '/test.txt', 'w');
//   for (let i = 0; i < 1e5; i++) {
//     // await fileHandler.write(i + '\n');
//     await fileHandler.write(i + ' ');
//   }
//   // await fileHandler.close();
//   console.timeEnd('writeToFile');
// })();

/*
 * Callback API / sync API (switch between them)
 * 100k CB exec time: 0.3 - 0.4 s
 * 100k Sync exec time: 0.3 - 0.4 s
 * 1M CB exec time: 4 - 5 s
 * 1M Sync exec time: 3 - 4 s
 */
// fs.open(__dirname + '/test.txt', 'a', (err, fd) => {
//   console.time('writeToFile');
//   for (let i = 0; i < 1e6; i++) {
//     // fs.writeSync(fd, i + ' ');

//     /* Gets order wrong. Event loop cant keep track? */
//     fs.write(fd, i + ' ', err => {
//       if (err) console.log('error writing to file: ', err);
//     });
//   }
//   console.timeEnd('writeToFile');
// });
