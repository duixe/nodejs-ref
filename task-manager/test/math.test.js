const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add} = require('../src/math');

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13);
    // if (total != 13) {
    //     throw new Error(`Total tip should be 13 got ${total}`);
    // }
});

test('should calculate with default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12);
});

test('should convert 32 F to 0 C', () => {
    const temp = fahrenheitToCelsius(32);
    expect(temp).toBe(0);
});

test('should convert 0 C to 32 F', () => {
    const temp = celsiusToFahrenheit(0);
    expect(temp).toBe(32);
});

// done is added as a parameter in order to make the async part of the test work. NB: "done" can be any word
// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2);
//         done();
//     }, 2000)
// })

// test('should add two numbers', (done) => {
//     add(2, 3).then((sum) => {
//         expect(sum).toBe(6);
//         done();
//     })
// });

// one can either use this👆 or this👇

test('should add two numbers async/await', async () => {
    const sum = await add(53, 60);
    expect(sum).toBe(110);
});