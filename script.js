document.addEventListener('DOMContentLoaded', () => {
  const cityName = document.getElementById('city-input')
  const getWeatherBtn = document.getElementById('get-weather-btn')
  const weatherInfo = document.getElementById('weather-info')
  const cityNameDisplay = document.getElementById('city-name')
  const temperatureDisplay = document.getElementById('temperature')
  const descriptionDisplay = document.getElementById('description')
  const errorMessage = document.getElementById('error-message')
  const apikey = "d0fad22818683310f1793de4c45df34f" // save in env

  getWeatherBtn.addEventListener('click', async () => {
    const city = cityName.value.trim()
    if (!city) return
    // server may throw an error
    // server/database is alwayes in another continent
    // so, use try and catch with await
    try {
      const weatherData = await fetchWeatherData(city)
      displayWeatherData(weatherData)
    } catch (error) {
      showError()
    }

  })

  // get the data
  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("City Not Found")
    }

    const data = await response.json()
    return data
  }

  // display
  function displayWeatherData(data) {
    console.log(data);
    
    const {name, main, weather} = data
    cityNameDisplay.textContent = name
    temperatureDisplay.textContent = `Temperature: ${((main.temp)-273.15).toFixed()}`
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`

    weatherInfo.classList.remove('hidden')
    errorMessage.classList.add('hidden')
  } 

  // show error msg
  function showError() {
    errorMessage.classList.remove('hidden')
    weatherInfo.classList.add('hidden')
  }

})

