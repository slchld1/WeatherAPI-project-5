var icon = document.getElementById('icon')

$("#search-form").submit(function (e) { 
    e.preventDefault();
    var input = $('#search-bar').val()
    console.log(input)
    
    function weatherCity(cityName, sCode, cCode) {
        var key = 'b5d6abd64c1bcaf907e06b633fed6528';
        var cityName = input
        var cCode = ''
        var sCode = ''
        fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName +','+ sCode+ ',' + cCode + '&limit=5&appid=' + key)  
        .then(function(resp) { return resp.json() })
        .then(function(data) {
            function weatherFive(lat, lon) {
                var key = 'b5d6abd64c1bcaf907e06b633fed6528';
                var lat = data[0].lat
                var lon = data[0].lon
                fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon+ '&appid=' + key)  
                .then(function(resp) { return resp.json() }) 
                .then(function(data) {
                listWeather(data);
            })
            .catch(function() {
            });
        }
        weatherFive(data)
    })
    .catch(function() {
        // catch any errors
    });
}
function listWeather(d) {
    var fahrenheit = Math.round(((parseFloat(d.list[0].main.temp)-273.15)*1.8)+32); 
    document.getElementById('description').innerHTML = d.list[0].weather[0].description;
	document.getElementById('temp').innerHTML = fahrenheit + '&#8457;';
	document.getElementById('location').innerHTML = d.city.name;
    // document.getElementById('wind').innerHTML = 
    if( d.list[0].weather[0].id === 800) {
        $('#icon').addClass("wi-day-sunny");
    }
    
    console.log(d.list[0].weather[0])
}

weatherCity();
});