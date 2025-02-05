const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    base: "https://api.openweathermap.org/data/2.5/"
}


var searchbox=document.querySelector(".search-box");

searchbox.addEventListener("keypress",setquery);

function setquery(event){
    if(event.keyCode==13){  //Enter key
        getResult(searchbox.value);
    }
}

function getResult(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather=>{
        return weather.json();
    })
    .then(displayresult);
}

function displayresult(weather){
    let city=document.querySelector(".location .city");
    city.innerText=`${weather.name}, ${weather.sys.country}`;
    let date=document.querySelector(".location .date");
    const now = new Date(); 
    date.innerText=dateBuilder(now);// inbuit date object is now
    let temp=document.querySelector(".current .temp");
    temp.innerHTML=`${Math.round(weather.main.temp)}<span>°c</span>`;
    let weather_el=document.querySelector(".current .weather");
    weather_el.innerText=weather.weather[0].main;
    let hilow=document.querySelector(".hi-low");
    hilow.innerText=`${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

}

function dateBuilder(d){
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day=days[d.getDay()];
    var date=d.getDate();
    var month=months[d.getMonth()];
    var year=d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}