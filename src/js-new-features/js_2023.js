// await Promise.resolve(console.log('Hello World'));
// //   const result = Object.groupBy()

// export {};


/* Object.groupBy(items, callbackFn) */

// const inventory = [
//     { name: "asparagus", type: "vegetables", quantity: 5 },
//     { name: "bananas", type: "fruit", quantity: 0 },
//     { name: "goat", type: "meat", quantity: 23 },
//     { name: "cherries", type: "fruit", quantity: 5 },
//     { name: "fish", type: "meat", quantity: 22 },
//   ];

//   const result = Object.groupBy(inventory, ({ type }) => type);
// //   const result = Object.groupBy(inventory, ({ type }) => type);

const array = [0, 1, 2, 3, 4, 5];

const myObj = Object.groupBy(array, (num, index) => {
    return num % 2 === 0 ? "even": "odd";
});
console.log('🚀  myObj:', myObj)
