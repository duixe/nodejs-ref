// object property shorthand
const name = "Sunday";
const userAge = 27

const user = {
    name,
    age: userAge,
    location: "accra"
}

console.log(user);

// object destructuring
// const product = {
//     label: "Bible",
//     price: 80,
//     stock: 201,
//     salePrice: undefined
// }

// const {label, stock} = product

// console.log(label);
// console.log(stock);

// object destructuring and also renaming a property
const product = {
    label: "Hand bag",
    price: '250',
    discount: 12,
    stock: 201,
    salePrice: undefined,
    rating: 4.2
}

// 👇 renaming label to productLabel and also giving rating a default value if not giving in the main obj
const {label: productLabel, price, stock, rating = 5} = product

console.log(productLabel);
console.log(price);
console.log(stock);
console.log(rating);

// 👇 applying destructuring in function
const transaction = (type, { label, stock }) => {
    console.log(type, label, stock);
}
transaction('order', product);
