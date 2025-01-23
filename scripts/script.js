const kelvin = 273.15;

const obtenerClima=()=> {
    let city = document.querySelector('#city').value;
    let country = document.querySelector('#country').value;

    if(city.trim()==='' || country.trim()==='') {
        mostrarError("#msj-error", "¡Debe completar los Campos!");
        return;
    }

    
    consultarAPI(city, country);
}

const consultarAPI= async(city, country) => {
    const APIkey ="7cb92f19d242468809c2b32ea0cbb6b6";
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIkey}`;
    // const url =`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;

    console.log(url);

    const answer = await fetch(url);
    const result = await answer.json();

    console.log(result);

    if(result.cod == "404") {
        mostrarError("#msj-error", "404 ¡No coincide la Ciudad con el País!");
    return;
    }

    const {name, main, weather} = result;
    if(!name) return null;

    const image = weather[0].icon;
    console.log(image);

    let answerWeather = document.querySelector("#answerWeather");
    answerWeather.innerHTML = `
    <div class="card">
    
        <div class="container">
            <div class="w100 center">
                <h2 class="blue-text">${name}</h2>
            </div>
            <div class="bg-img">
                <img src="https://openweathermap.org/img/wn/${image}.png" alt="Weather icon">
            </div>
        </div>
        
        <div class="center">
            <h1 class="pad10 orange-text">${ parseFloat(main.temp-kelvin, 10).toFixed(1) }°C</h1>
        </div>

        <div class="w100 pad-top10 container">
            <div class="center">
                <h4 class="blue-text">Temp. Máx:</h4>
                <h3 class="orange-text">${ parseFloat(main.temp_max-kelvin, 10).toFixed(1) }°C</h3>
            </div>

            <div class="center">
                <h4 class="blue-text">Temp. Mín:</h4>
                <h3 class="orange-text">${ parseFloat(main.temp_min-kelvin, 10).toFixed(1) }°C</h3>
            </div>
        </div>
        
        <div class="w100 pad-top10 container">
            <div class="center">
                <h4 class="blue-text">S. Térmica:</h4>
                <h3 class="orange-text">${ parseFloat(main.feels_like-kelvin, 10).toFixed(1) }°C</h3>
            </div>
            <div class="center">
                <h4 class="blue-text">Humedad:</h4>
                <h3 class="orange-text">${ main.humidity }%</h3>
            </div>
        </div>
    </div>`;

}

const mostrarError=(elemento, mensaje)=> {
    divError = document.querySelector(elemento);
    divError.innerHTML=`<p>${mensaje}</p>`;
    setTimeout(()=>{divError.innerHTML=``;}, 3000);
}

