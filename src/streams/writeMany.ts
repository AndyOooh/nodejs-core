import { open } from 'node:fs/promises';

const writeToFile = async (path: string, data: any) => {
  try {
    const fileHandler = await open(path, 'a');
    // await fileHandler.write(data + '\n');
    await fileHandler.write(data);
    await fileHandler.close();
  } catch (error) {
    console.log('🚀 File not found. writeToFile error:', error);
  }
};

const main = async () => {
  console.time('writeToFile');
  const arr = Array.from({ length: 1e5 }, (v, i) => i);
  await Promise.all(
    arr.map(async (ele: any) => {
      const path = __dirname + `/test.txt`;
      await writeToFile(path, ele);
    })
  );
  console.timeEnd('writeToFile');
};

const mainNew = async () => {
  console.time('writeToFile');
  const fileHandler = await open(__dirname + '/test.txt', 'a');
  for (let i = 0; i < 1e5; i++) {
    // await fileHandler.write(i + '\n');
    await fileHandler.write(i + ' ');
  }
  await fileHandler.close();
  console.timeEnd('writeToFile');
};

mainNew();
// main();
