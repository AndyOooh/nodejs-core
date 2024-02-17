// import fs from 'fs/promises';
import { watch } from 'node:fs/promises';

// const watcher =  await fs.watch('./text-file.txt', 'utf8');

const fileName = 'text-file.txt';
// const fileName = '';
const filePath = './src/file-system/';
// const fileName = 'text-file.txt';

const watchFile = async (filename: string, filePath: string) => {
  try {
    const completePath = `${filePath}/${filename}`;
    const watcher = watch(completePath, {
      encoding: 'utf8',
    });
    for await (const event of watcher) console.log(event);
  } catch (error: any) {
    if (error.name === 'AbortError') console.log('Watcher aborted', error);
    console.log('error: ', error);
    throw error;
  }
};

const fileWatcher = watchFile(fileName, filePath);
console.log('here')
const lala = 22
console.log('here2')
