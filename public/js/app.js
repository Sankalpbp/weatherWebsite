
// fetch the forecastData
// this has nothing to do with the backend
// this is a client side js, this will be executed on the 
// client's machine

// asynchronous request
// fetch data from this webstie and then do something




const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#first');
const messageTwo = document.querySelector('#second');


weatherForm.addEventListener('submit', (event) => {
    // it will allow us to do whatever we want instead of 
    // making its own assumptions of what we wonna do.
    event.preventDefault();
    const location = searchElement.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});