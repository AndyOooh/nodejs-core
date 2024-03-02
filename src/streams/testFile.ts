import { open } from 'node:fs/promises';
import fs from 'node:fs';

const mainAsync = async () => {
  console.time('writeToFile');
  const fileHandler = await open(__dirname + '/test.txt', 'a');
  const stream: fs.WriteStream = fileHandler.createWriteStream();

//   console.log(stream.writableHighWaterMark);
  const buff = Buffer.alloc(16383, 10);
  //   await fileHandler.write(buff);
  const lalala = stream.write(buff);
  console.log('🚀  lalala:', lalala)
  console.log(stream.writableLength);
  const lal = stream.write('Hrello');
  console.log('🚀  lal:', lal)
  console.log(stream.writableLength);

  stream.on('drain', () => {
    console.log('🟣 drain');
    console.log(stream.writableLength);
  });

  console.log('after drain listener');

  // const buff = Buffer.from(16, 'utf-8');

  //   for (let i = 0; i < 1e6; i++) {
  //     // await fileHandler.write(i + ' ');
  //     stream.write(buff);
  //   }
  //   await fileHandler.close();
  console.timeEnd('writeToFile');
};
mainAsync();
