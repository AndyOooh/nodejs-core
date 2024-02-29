const fs = require('node:fs/promises');

(async () => {
  console.time('writeToFile');
  // const fileHandler = await open(__dirname + '/test.txt', 'a');
  const fileHandler = await fs.open('test.txt', 'w');
  for (let i = 0; i < 1e5; i++) {
    // await fileHandler.write(i + '\n');
    await fileHandler.write(i + ' ');
  }
  // await fileHandler.close();
  console.timeEnd('writeToFile');
})();
