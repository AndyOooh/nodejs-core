"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
const writeToFile = async (path, data) => {
    try {
        const fileHandler = await (0, promises_1.open)(path, 'a');
        await fileHandler.write(data + '\n');
        await fileHandler.close();
    }
    catch (error) {
        console.log('🚀 File not found. writeToFile error:', error);
    }
};
const main = async () => {
    const arr = Array.from({ length: 1e4 }, (v, i) => i);
    console.log('before');
    await Promise.all(arr.map(async (ele) => {
        const path = __dirname + `/test.txt`;
        await writeToFile(path, ele);
    }));
    console.log('after');
};
main();
