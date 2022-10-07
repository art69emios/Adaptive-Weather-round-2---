
let key = 'bf35cac91880cb98375230fb443a116f'
let searchInput = document.querySelector('.search')
let city = document.querySelector('.city')
let temper = document.querySelector('.teamper')
let img = document.querySelector('.img')
let wind = document.querySelector('.wind')
let weatherInfo = document.querySelector('.weather-info')
let direction = document.querySelector('.direction')
let windSpeed = document.querySelector('.wind-speed')
let pressure = document.querySelector('.pressure')
let sunrice = document.querySelector('.sunrice')
let sunset = document.querySelector('.sunset')
let errorMessage = document.querySelector('.error-message')
let searchBtn = document.querySelector('.search-btn')
let weatherMain = document.querySelector('.weather-main')
let forecastTable = document.querySelector('.forecast-7days')
let mainInfo = document.querySelector('.main-info')



searchBtn.addEventListener('click', getWeather)
document.addEventListener('keydown', function(e){
   if(e.key === 'Enter'){
      getWeather()
   }
})

let localStor = localStorage.getItem('weather')
if(localStor){
   searchInput.value = localStor
   getWeather()
}



function getWeather(){
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${key}`)
   .then(responce => responce.json())
   .then(json => {
      console.log(json);
      document.querySelector('.info-about-weather').style.display = 'flex'
      city.textContent = json.name
      temper.textContent = `${getTemperature()}°`
      weatherMain.textContent = json.weather[0].main
      direction.textContent = json.wind.deg
      windSpeed.textContent = json.wind.speed + ' km/h'
      pressure.textContent = json.main.pressure + ' hPa'
      sunrice.innerHTML = new Date(Number(json.sys.sunrise + '000')).toLocaleTimeString()
      sunset.innerHTML = new Date(Number(json.sys.sunset + '000')).toLocaleTimeString()

      if(json.weather[0].icon == '04n' || json.weather[0].icon == '04d' || json.weather[0].icon == '03n' || json.weather[0].icon == '03d' || json.weather[0].icon == '50n' || json.weather[0].icon == '50d'){
         document.body.style.backgroundImage = "url('photo/cloudy.jpg')"
      }
      if(json.weather[0].icon == '01n' || json.weather[0].icon == '02n'){
         document.body.style.backgroundImage = "url('photo/night.jpg')"
      }
      if(json.weather[0].icon == '09n' || json.weather[0].icon == '09d' || json.weather[0].icon == '10n' || json.weather[0].icon == '10d' || json.weather[0].icon == '11n' || json.weather[0].icon == '11d'){
         document.body.style.backgroundImage = "url('photo/rainy.jpg')"
      }
      if(json.weather[0].icon == '13n' || json.weather[0].icon == '13d'){
         document.body.style.backgroundImage = "url('photo/snow.jpg')"
      }
      if(json.weather[0].icon == '02d' || json.weather[0].icon == '01d'){
         document.body.style.backgroundImage = "url('photo/sunny.jpg')"
      }
      

      function getTemperature(){
         let getTemp = json.main.temp 
         let tempC = Math.floor(getTemp) - 273
         return tempC
      }
   })
   .catch(() => {
      document.querySelector('.info-about-weather').style.display = 'none'
      errorMessage.style.display = 'block'
      mainInfo.style.display = 'none'
      document.body.style.background = "url('photo/11.jpg') 0 0 /cover no-repeat"

   })
   errorMessage.style.display = 'none'
   mainInfo.style.display = 'flex'


   
   localStorage.setItem('weather', searchInput.value)
   forecastTable.style.display = 'none'
}
// localStorage.setItem('weather', searchInput.value)

let day1 = document.querySelector('.day1')
let day2 = document.querySelector('.day2')
let day3 = document.querySelector('.day3')
let day4 = document.querySelector('.day4')
let day5 = document.querySelector('.day5')

let temperature1 = document.querySelector('.temperature1')
let temperature2 = document.querySelector('.temperature2')
let temperature3 = document.querySelector('.temperature3')
let temperature4 = document.querySelector('.temperature4')
let temperature5 = document.querySelector('.temperature5')

let img1 = document.querySelector('.img1')
let img2 = document.querySelector('.img2')
let img3 = document.querySelector('.img3')
let img4 = document.querySelector('.img4')
let img5 = document.querySelector('.img5')



function getForecast(){
   fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&exclude=hourly&appid=${key}&units=metric`)
   .then(responce => responce.json())
   .then(json => {
      day1.innerHTML = new Date(Number(json.list[6].dt + '000')).toDateString()
      day2.innerHTML = new Date(Number(json.list[14].dt + '000')).toDateString()
      day3.innerHTML = new Date(Number(json.list[22].dt + '000')).toDateString()
      day4.innerHTML = new Date(Number(json.list[30].dt + '000')).toDateString()
      day5.innerHTML = new Date(Number(json.list[38].dt + '000')).toDateString()

      temperature1.innerHTML = Math.round(json.list[6].main.temp) + '°'
      temperature2.innerHTML = Math.round(json.list[14].main.temp) + '°'
      temperature3.innerHTML = Math.round(json.list[22].main.temp) + '°'
      temperature4.innerHTML = Math.round(json.list[30].main.temp) + '°'
      temperature5.innerHTML = Math.round(json.list[38].main.temp) + '°'

      img1.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.list[6].weather[0]['icon']}@2x.png">`
      img2.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.list[14].weather[0]['icon']}@2x.png">`
      img3.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.list[22].weather[0]['icon']}@2x.png">`
      img4.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.list[30].weather[0]['icon']}@2x.png">`
      img5.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.list[38].weather[0]['icon']}@2x.png">`
   })

   
}

let forecastBtn = document.querySelector('.forecast-btn__show-forecast')
forecastBtn.addEventListener('click', function(){
   
   getForecast()
   forecastTable.style.display = 'flex'
   window.scrollBy(0,170)

})