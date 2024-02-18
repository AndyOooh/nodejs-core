// import fs from 'fs/promises';
import { watch, open } from 'node:fs/promises';

const watchFile = async (filename: string, filePath: string) => {
  try {
    const completePath = `${filePath}/${filename}`;
    const fileHandler = await open(completePath, 'r');

    const watcher = watch(completePath, {
      encoding: 'utf8',
    });

    for await (const event of watcher) {
      console.log(event);
      const fileStats = await fileHandler.stat();
      console.log('🚀  fileStats:', fileStats);
      const fileSize = fileStats.size; // in bytes or elements? I think elements
      console.log('🚀  fileSize:', fileSize);

      const content = await fileHandler.read({
        buffer: Buffer.alloc(fileSize),
        // offset: 0,
        // length: fileSize,
        // position: 0,
      });
      console.log('🚀  content:', content);
    }
  } catch (error: any) {
    if (error.name === 'AbortError') console.log('Watcher aborted', error);
    console.log('error: ', error);
    throw error;
  }
};

const fileName = 'text-file.txt';
const filePath = './src/file-system/';
const fileWatcher = watchFile(fileName, filePath);
