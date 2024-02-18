import { watch, open, unlink, rename } from 'node:fs/promises';

const createFile = async (filename: string, filePath: string, data: any) => {
  const completePath = `${filePath}/${filename}`;
  try {
    const exitistingFileHandler = await open(completePath, 'r');
    console.log(`file already exists ${completePath}`);
    exitistingFileHandler.close();
  } catch (error: any) {
    const newFileHandler = await open(completePath, 'w');
    await newFileHandler.write(data);
    await newFileHandler.close();
  }
};

const deleteFile = async (filename: string, filePath: string) => {
  const completePath = `${filePath}/${filename}`;
  try {
    await unlink(completePath);
  } catch (error: any) {
    console.log('error deleting file: ', error);
    throw error;
  }
};

const renameFile = async (filename: string, filePath: string, newFilename: string) => {
  const completePath = `${filePath}/${filename}`;
  const newCompletePath = `${filePath}/${newFilename}`;
  try {
    await rename(completePath, newCompletePath);
    console.log(`Renamed ${completePath} to ${newCompletePath}`);
  } catch (error: any) {
    console.log('error renaming file: ', error);
    // throw error;
  }
};

const addToFile = async (filename: string, filePath: string, data: any) => {
  const completePath = `${filePath}/${filename}`;
  try {
    const fileHandler = await open(completePath, 'a');
    await fileHandler.write(data);
    await fileHandler.close();
  } catch (error: any) {
    console.log('error adding to file: ', error);
    throw error;
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
        case 'Create a file':
          await createFile(fileName, filePath, fileData);
          console.log('File created');
          break;
        case 'Delete a file':
          await deleteFile(fileName, filePath);
          console.log('File deleted');
          break;
        case 'Rename file':
          await renameFile(fileName, filePath, fileData);
          console.log('File modified');
          break;
        case 'Add to file':
          await addToFile(fileName, filePath, fileData);
          console.log('File modified');
          break;

        default:
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
const filePath = './src/file-system';
const fileWatcher = watchFile(fileName, filePath);
