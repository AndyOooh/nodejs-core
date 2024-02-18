"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
const createFile = async (filename, filePath, data) => {
    const completePath = `${filePath}/${filename}`;
    try {
        const exitistingFileHandler = await (0, promises_1.open)(completePath, 'r');
        console.log(`file already exists ${completePath}`);
        exitistingFileHandler.close();
    }
    catch (error) {
        const newFileHandler = await (0, promises_1.open)(completePath, 'w');
        await newFileHandler.write(data);
        await newFileHandler.close();
    }
};
const deleteFile = async (filename, filePath) => {
    const completePath = `${filePath}/${filename}`;
    try {
        await (0, promises_1.unlink)(completePath);
    }
    catch (error) {
        console.log('error deleting file: ', error);
        throw error;
    }
};
const renameFile = async (filename, filePath, newFilename) => {
    const completePath = `${filePath}/${filename}`;
    const newCompletePath = `${filePath}/${newFilename}`;
    try {
        await (0, promises_1.rename)(completePath, newCompletePath);
        console.log(`Renamed ${completePath} to ${newCompletePath}`);
    }
    catch (error) {
        console.log('error renaming file: ', error);
        // throw error;
    }
};
const addToFile = async (filename, filePath, data) => {
    const completePath = `${filePath}/${filename}`;
    try {
        const fileHandler = await (0, promises_1.open)(completePath, 'a');
        await fileHandler.write(data);
        await fileHandler.close();
    }
    catch (error) {
        console.log('error adding to file: ', error);
        throw error;
    }
};
const watchFile = async (filename, filePath) => {
    try {
        const completePath = `${filePath}/${filename}`;
        const fileHandler = await (0, promises_1.open)(completePath, 'r');
        const watcher = (0, promises_1.watch)(completePath, {
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
    }
    catch (error) {
        if (error.name === 'AbortError')
            console.log('Watcher aborted', error);
        console.log('error: ', error);
        throw error;
    }
};
const fileName = 'text-file.txt';
const filePath = './src/file-system';
const fileWatcher = watchFile(fileName, filePath);
