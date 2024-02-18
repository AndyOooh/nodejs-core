// import fs from 'fs/promises';
import { watch, open } from 'node:fs/promises';

const watchFile = async (filename: string, filePath: string) => {
  try {
    const completePath = `${filePath}/${filename}`;
    const fileHandler = await open(completePath, 'r');
    const fileStats = await fileHandler.stat()
    console.log('🚀  fileStats:', fileStats)
    const fileSize = fileStats.size;
    console.log('🚀  fileSize:', fileSize)
    
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

const fileName = 'text-file.txt';
const filePath = './src/file-system/';
const fileWatcher = watchFile(fileName, filePath);
