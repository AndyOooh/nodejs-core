"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import fs from 'fs/promises';
const promises_1 = require("node:fs/promises");
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
            const content = await fileHandler.read({
                buffer,
                offset: 0,
                // length: fileSize,
                position: 0,
            });
            console.log('🚀  buffer:', buffer.);
            console.log('🚀  content:', content, content.buffer.toString());
            console.log('🚀  content2:', content.buffer[0], content.buffer[5].toString());
        }
    }
    catch (error) {
        if (error.name === 'AbortError')
            console.log('Watcher aborted', error);
        console.log('error: ', error);
        throw error;
    }
};
const fileName = 'text-file.txt';
const filePath = './src/file-system/';
const fileWatcher = watchFile(fileName, filePath);
