// global variables
// today variable
var dayname = document.querySelector("#today");
var numbername = document.querySelector("#numberday");
var monthNamecardone = document.querySelector("#monthdatacardone");
var monthname = document.querySelector(".title-card-one span");
var cunteryname = document.querySelector("#cuntery");
var tembertornamecardone = document.querySelector("#card-one-temborter");
var imgcardone = document.querySelector("#card-one-img");
var cardonesunny = document.querySelector("#card-one-sunny");
var cardoneparsent = document.querySelector("#parsent-card-one");
var cardonekilemiter = document.querySelector("#card-one-kilemiter");
var cardoneEsat = document.querySelector("#card-one-East");
// naxt day variable
var nextday = document.querySelector(".nextday");
var imagecardtwo = document.querySelector("#img-card-two");
var cardtwoslayses = document.querySelector("#card-two-slayses");
var caedtwotempoter = document.getElementById("tempoter-card-two");
var cardtwoweather = document.getElementById("card-two-weather");
// Nex three day variable
var cardthreetempoter = document.querySelector("#tempoter-card-three");
var cardthreeweather = document.getElementById("card-three-weather");
var cardtwoslaysess = document.querySelector("#card-two-slaysess");
var imagecardthree = document.querySelector("#img-card-three");
var nextdaythree = document.querySelector(".nextdays");
// search input
var searchinput = document.querySelector("#search");
// Function Gps
function getCurrentWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      getweatherdata(
        [position.coords.latitude, position.coords.longitude].join(",")
      );
    });
  }
}
// If else Gps
if (searchinput.value === "") {
  getCurrentWeather();
} else if (searchinput.value !== "") {
  getweatherdata(searchinput.value);
}
// Function Api Weather
async function getweatherdata(location = "Cairo") {
  var weatherreaspone = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=2cafcd22b9fb41c6b48144246231608&q=${location}&days=3`
  );
  var weatherdata = await weatherreaspone.json();
  return weatherdata;
}
// Function today Date
function getdisplaydatatoday(data) {
  var todaydata = new Date();
  numbername.innerHTML = todaydata.getDate();
  dayname.innerHTML = todaydata.toLocaleDateString("en-us", {
    weekday: "long",
  });
  monthNamecardone.innerHTML = todaydata.toLocaleDateString("en-us", {
    month: "long",
  });
  cunteryname.innerHTML = data.location.name;
  tembertornamecardone.innerHTML = data.current.temp_c + "";
  imgcardone.setAttribute("src", data.current.condition.icon);
  cardonesunny.innerHTML = data.current.condition.text;
  cardoneparsent.innerHTML = data.current.humidity + "%";
  cardonekilemiter.innerHTML = data.current.wind_kph + "KM/h";
  cardoneEsat.innerHTML = data.current.wind_dir;
}
// Function Next Day and three Day Date
function getdisplaydatanextday(data) {
  var focasdata = data.forecast.forecastday;
  cardtwoslayses.innerHTML = data.forecast.forecastday[0].day.maxtemp_c;
  cardtwoslaysess.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
  caedtwotempoter.innerHTML = data.forecast.forecastday[0].day.mintemp_c;
  cardthreetempoter.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
  imagecardtwo.setAttribute(
    "src",
    data.forecast.forecastday[0].day.condition.icon
  );
  imagecardthree.setAttribute(
    "src",
    data.forecast.forecastday[1].day.condition.icon
  );
  cardtwoweather.innerHTML = data.forecast.forecastday[0].day.condition.text;
  cardthreeweather.innerHTML = data.forecast.forecastday[1].day.condition.text;
  var Nextdata = new Date(focasdata[1].date);
  var Nextdataa = new Date(focasdata[2].date);
  nextday.innerHTML = Nextdata.toLocaleString("en-us", { weekday: "long" });
  nextdaythree.innerHTML = Nextdataa.toLocaleString("en-us", {
    weekday: "long",
  });
}
// Functio StartApp
async function startAppliction(city = "Cairo") {
  var weatherdata = await getweatherdata(city);
  if (!weatherdata.erro) {
    getdisplaydatatoday(weatherdata);
    getdisplaydatanextday(weatherdata);
  }
}
startAppliction();
// Function Search in Websit 
searchinput.addEventListener("input", function () {
  startAppliction(searchinput.value);
});
