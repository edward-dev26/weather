const weatherForm = document.getElementById('weather-form');
const addressInput = document.querySelector('input[name="address"]');
const locationP = document.getElementById('location');
const forecastP = document.getElementById('forecast');
const errorP = document.getElementById('error');

const getForecast = (address) => {
    fetch(`/weather?address=${address}`)
        .then(response => {
            return response.json();
        })
        .then(({ error, location, forecast }) => {
            if (error) {
                locationP.textContent = '';
                forecastP.textContent = '';
                errorP.textContent = error;
            } else {
                locationP.textContent = location;
                forecastP.textContent = forecast;
                errorP.textContent = '';
            }
        })
        .catch(error => {
            console.error(error);
        })
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const address = addressInput.value.trim();

    if (address) {
        getForecast(address);
    }
});