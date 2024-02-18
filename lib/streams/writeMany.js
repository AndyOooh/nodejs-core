"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
const node_fs_1 = __importDefault(require("node:fs"));
/*
 * Promise API
 * Exec time: 22s
 */
const mainAsync = async () => {
    console.time('writeToFile');
    const fileHandler = await (0, promises_1.open)(__dirname + '/test.txt', 'a');
    for (let i = 0; i < 1e5; i++) {
        // await fileHandler.write(i + '\n');
        await fileHandler.write(i + ' ');
    }
    await fileHandler.close();
    console.timeEnd('writeToFile');
};
// mainAsync();
/*
 * Callback API
 * Exec time: 20.4s
 */
node_fs_1.default.open(__dirname + '/test.txt', 'a', (err, fd) => {
    console.time('writeToFile');
    for (let i = 0; i < 1e5; i++) {
        node_fs_1.default.write(fd, i + ' ', err => {
            if (err)
                console.log('error writing to file: ', err);
        });
    }
    console.timeEnd('writeToFile');
});
