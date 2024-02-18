// import fs from 'fs/promises';
import { watch, open } from 'node:fs/promises';

const createFile = async (filename: string, filePath: string, data: any) => {
  const completePath = `${filePath}/${filename}`;
  try {
    await open(completePath, 'r');
    console.log(`file already exists ${completePath}`);
  } catch (error: any) {
    // console.log('error: ', error);
    const newFileHandler = await open(completePath, 'w');
    // await newFileHandler.write(data, 20, 'utf8');
    await newFileHandler.write(data);
    await newFileHandler.close();
    // throw error;
  }
};

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
      //   console.log('🚀  fileStats:', fileStats);
      const fileSize = fileStats.size; // in bytes or elements? I think elements
      console.log('🚀  fileSize:', fileSize);

      const buffer = Buffer.alloc(fileSize);
      console.log('🚀  buffer:', buffer);

      await fileHandler.read({
        buffer,
        offset: 0,
        // length: fileSize,
        position: 0,
      });

      const fileContent = buffer.toString('utf8');
      const indexOfFirstNewLine = fileContent.indexOf('\n');
      console.log('🚀  indexOfFirstNewLine:', indexOfFirstNewLine);
      const indexOfSecondNewLine = fileContent.lastIndexOf('\n');
      console.log('🚀  indexOfSecondNewLine:', indexOfSecondNewLine);
      const command = fileContent.slice(0, indexOfFirstNewLine);
      const fileName = fileContent.slice(indexOfFirstNewLine + 1, indexOfSecondNewLine);
      const fileData = fileContent.slice(indexOfSecondNewLine + 1);

      switch (command) {
        case 'Create a new file':
          await createFile(fileName, filePath, fileData);
          console.log('File created');
          break;
        case 'Modify a file':
          console.log('File modified');
          break;

        default:
          const a = 1;
          console.log('Invalid command');
      }
    }
    fileHandler.close();
  } catch (error: any) {
    if (error.name === 'AbortError') console.log('Watcher aborted', error);
    console.log('error: ', error);
    throw error;
  }
};

const fileName = 'text-file.txt';
const filePath = './src/file-system/';
const fileWatcher = watchFile(fileName, filePath);
