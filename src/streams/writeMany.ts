import { open } from 'node:fs/promises';

const writeToFile = async (path: string, data: any) => {
  try {
    const fileHandler = await open(path, 'a');
    await fileHandler.write(data + '\n');
    await fileHandler.close();
  } catch (error) {
    console.log('🚀 File not found. writeToFile error:', error);
  }
};

const main = async () => {
  const arr = Array.from({ length: 1e4 }, (v, i) => i);
  console.log('before');
  await Promise.all(
    arr.map(async (ele: any) => {
      const path = __dirname + `/test.txt`;
      await writeToFile(path, ele);
    })
  );
  console.log('after');
};

main();
