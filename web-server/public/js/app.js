console.log("client side javascript file is loaded");

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data);
//     })
// })



const weatherForm = document.querySelector('form')
const formInput = document.querySelector('.form-input')
const sendInfo1 = document.querySelector('.info-1')
const sendInfo2 = document.querySelector('.info-2')

 

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = formInput.value

    sendInfo1.textContent = 'Loading...'
    sendInfo2.textContent = ''
    
    fetch(`http://localhost:3000/weather?address=${location}`).then(res => {
        res.json().then(data => {
            if (data.error) {
                sendInfo1.textContent = data.error;
            }else {
                sendInfo1.textContent = data.location
                sendInfo2.textContent = data.forecast
            }
        })
    })
   
    


})