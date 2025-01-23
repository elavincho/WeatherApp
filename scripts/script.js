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

// Contraseña OpenWeather = OpenWeather123

// Contraseña AccuWeather = AccuWeather123

const consultarAPI= async(city, country) => {
    const APIkey ="7cb92f19d242468809c2b32ea0cbb6b6";
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIkey}`;
    // const url =`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;

    console.log(url);

    const answer = await fetch(url);
    const result = await answer.json();

    console.log(result);

if(result.cod == "404") {
    mostrarError("#msj-error", "Error 404. ¡No hay Respuesta!");
    return;
}

const {name, main} = result;
if(!name) return null;

let answerWeather = document.querySelector("#answerWeather");
answerWeather.innerHTML = `
<div class="card">
    <div>
        <h2 class="center black-text">${name}</h2>
        <br>
        <h1 class="center orange-text">${ parseFloat(main.temp-kelvin, 10).toFixed(2) } °C</h1>
    </div>
</div>`;

}

const mostrarError=(elemento, mensaje)=> {
    divError = document.querySelector(elemento);
    divError.innerHTML=`<p>${mensaje}</p>`;
    setTimeout(()=>{divError.innerHTML=``;}, 3000);
}

