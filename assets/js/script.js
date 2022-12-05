var icon = document.getElementById('icon')
//update time live
$(function(){
function updateTime() {
    $('#today').html(moment().format('MMMM Do, YYYY'))
    $('#dayOne').html(moment().add(1, 'days').format('MMMM Do, YYYY'))
    $('#dayTwo').html(moment().add(2, 'days').format('MMMM Do, YYYY'))
    $('#dayThree').html(moment().add(3, 'days').format('MMMM Do, YYYY'))
    $('#dayFour').html(moment().add(4, 'days').format('MMMM Do, YYYY'))
    $('#dayFive').html(moment().add(5, 'days').format('MMMM Do, YYYY'))
    
}
updateTime()
setInterval(function() {
updateTime();
},60000);
});
//on submit input
$("#search-form").submit(function (e) { 
    e.preventDefault();
var input = $('#search-bar').val()

var history = { city: [] };
//save to local storage
function onLoad() {
if(localStorage.getItem('history')) {
    history = JSON.parse(localStorage.getItem('history'));
}
}

function addHistory(data) {
history.city.push(data);
localStorage.setItem('history',JSON.stringify(history));
}
onLoad()
addHistory(input)
//append buttons from search history
function addCity(){
    $('#search-history').empty()
    for(let i= history.city.length; i > (history.city.length-3); i--){
        console.log(history.city[i-1])
        var createButton = $('<input>').attr(
            {
                type: 'button', 
                class: 'historyBtn',
                id: 'historyBtn',
                value: history.city[i-1].toString(),
                
            })
                $('#search-history').append(createButton)
}
}
addCity();
//button function replaces input to recall search
$('#search-history').click(function (e) { 
    e.preventDefault();
    input = e.target.value 
    weatherCity()
});
//convert city name to location api
    function weatherCity(cityName, sCode, cCode) {
        var key = 'b5d6abd64c1bcaf907e06b633fed6528';
        var cityName = input
        var cCode = ''
        var sCode = ''
        fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName +','+ sCode+ ',' + cCode + '&limit=5&appid=' + key)  
        .then(function(resp) { return resp.json() })
        .then(function(data) {
            //retrieves the latitude and longitude of city to complete data response
            function weatherFive(lat, lon) {
                var key = 'b5d6abd64c1bcaf907e06b633fed6528';
                var lat = data[0].lat
                var lon = data[0].lon
                fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon+ '&appid=' + key)  
                .then(function(resp) { return resp.json() }) 
                .then(function(data) {
                listWeather(data);
                listWeatherOne(data);
                listWeatherTwo(data);
                listWeatherThree(data);
                listWeatherFour(data);
                listWeatherFive(data);
                console.log(data)
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
//weather data functions for current day ~ 5 day cards
function listWeather(d) {
    var fahrenheit = Math.round(((parseFloat(d.list[0].main.temp)-273.15)*1.8)+32); 
    document.getElementById('description').innerHTML = d.list[0].weather[0].description;
	document.getElementById('temp').innerHTML = fahrenheit + '&#8457;';
	document.getElementById('location').innerHTML = d.city.name;
    document.getElementById('wind').innerHTML = d.list[0].wind.speed + 'MPH'
    document.getElementById('humid').innerHTML = d.list[0].main.humidity + '%'
    //icon added for current day
    var id = d.list[0].weather[0].id
    if ( id >= 200 && id < 233) {
        $('#icon').addClass("wi-thunderstorm")
    }
    if ( id >= 300 && id < 322) {
        $('#icon').addClass("wi-showers")
    }
    if( id >= 500 && id < 532) {
        $('#icon').addClass("wi-rain")
    }
    if ( id >= 600 && id < 623) {
        $('#icon').addClass("wi-snow")
    }
    if( id > 700 && id < 772) {
        $('#icon').addClass("wi-smog")
    }
    if ( id === 781) {
        $('#icon').addClass("wi-tornado")
    }
    if ( id === 800) {
        $('#icon').addClass("wi-day-sunny");
    }
    if (id > 800 && id < 805) {
        $('#icon').addClass("wi-cloudy")
    }
}
//day 1
function listWeatherOne(d) {
    var fahrenheit = Math.round(((parseFloat(d.list[3].main.temp)-273.15)*1.8)+32); 
    document.getElementById('dOne').innerHTML = d.list[3].weather[0].description;
	document.getElementById('tOne').innerHTML = fahrenheit + '&#8457;';
    document.getElementById('wOne').innerHTML = d.list[3].wind.speed + 'MPH'
    document.getElementById('hOne').innerHTML = d.list[3].main.humidity + '%'
    //icon added for current day
    var id = d.list[3].weather[0].id
    if ( id >= 200 && id < 233) {
        $('#iconOne').addClass("wi-thunderstorm")
    }
    if ( id >= 300 && id < 322) {
        $('#iconOne').addClass("wi-showers")
    }
    if( id >= 500 && id < 532) {
        $('#iconOne').addClass("wi-rain")
    }
    if ( id >= 600 && id < 623) {
        $('#iconOne').addClass("wi-snow")
    }
    if( id > 700 && id < 772) {
        $('#iconOne').addClass("wi-smog")
    }
    if ( id === 781) {
        $('#iconOne').addClass("wi-tornado")
    }
    if ( id === 800) {
        $('#iconOne').addClass("wi-day-sunny");
    }
    if (801 < id < 805) {
        $('#iconOne').addClass("wi-cloudy")
    }
    console.log(d.list[3])
}
//day two
    function listWeatherTwo(d) {
        var fahrenheit = Math.round(((parseFloat(d.list[11].main.temp)-273.15)*1.8)+32); 
        document.getElementById('dOne').innerHTML = d.list[11].weather[0].description;
        document.getElementById('tOne').innerHTML = fahrenheit + '&#8457;';
        document.getElementById('wOne').innerHTML = d.list[11].wind.speed + 'MPH'
        document.getElementById('hOne').innerHTML = d.list[11].main.humidity + '%'
        //icon added for current day
        var id = d.list[11].weather[0].id
        if ( id >= 200 && id < 233) {
            $('#iconTwo').addClass("wi-thunderstorm")
        }
        if ( id >= 300 && id < 322) {
            $('#iconTwo').addClass("wi-showers")
        }
        if( id >= 500 && id < 532) {
            $('#iconTwo').addClass("wi-rain")
        }
        if ( id >= 600 && id < 623) {
            $('#iconTwo').addClass("wi-snow")
        }
        if( id > 700 && id < 772) {
            $('#iconTwo').addClass("wi-smog")
        }
        if ( id === 781) {
            $('#iconTwo').addClass("wi-tornado")
        }
        if ( id === 800) {
            $('#iconTwo').addClass("wi-day-sunny");
        }
        if (801 < id < 805) {
            $('#iconTwo').addClass("wi-cloudy")
        }
        console.log(d.list[11])
    }
//day 3
function listWeatherThree(d) {
    var fahrenheit = Math.round(((parseFloat(d.list[19].main.temp)-273.15)*1.8)+32); 
    document.getElementById('dThree').innerHTML = d.list[0].weather[0].description;
	document.getElementById('tThree').innerHTML = fahrenheit + '&#8457;';
    document.getElementById('wThree').innerHTML = d.list[19].wind.speed + 'MPH'
    document.getElementById('hThree').innerHTML = d.list[19].main.humidity + '%'
    //icon added for current day
    var id = d.list[19].weather[0].id
    if ( id >= 200 && id < 233) {
        $('#iconThree').addClass("wi-thunderstorm")
    }
    if ( id >= 300 && id < 322) {
        $('#iconThree').addClass("wi-showers")
    }
    if( id >= 500 && id < 532) {
        $('#iconThree').addClass("wi-rain")
    }
    if ( id >= 600 && id < 623) {
        $('#iconThree').addClass("wi-snow")
    }
    if( id > 700 && id < 772) {
        $('#iconThree').addClass("wi-smog")
    }
    if ( id === 781) {
        $('#iconThree').addClass("wi-tornado")
    }
    if ( id === 800) {
        $('#iconThree').addClass("wi-day-sunny");
    }
    if (id > 800 && id < 805) {
        $('#iconThree').addClass("wi-cloudy")
    }
    console.log(d.list[19])
}
//day 4
function listWeatherFour(d) {
    var fahrenheit = Math.round(((parseFloat(d.list[27].main.temp)-273.15)*1.8)+32); 
    document.getElementById('dFour').innerHTML = d.list[0].weather[0].description;
	document.getElementById('tFour').innerHTML = fahrenheit + '&#8457;';
    document.getElementById('wFour').innerHTML = d.list[27].wind.speed + 'MPH'
    document.getElementById('hFour').innerHTML = d.list[27].main.humidity + '%'
    //icon added for current day
    var id = d.list[27].weather[0].id
    if ( id >= 200 && id < 233) {
        $('#iconFour').addClass("wi-thunderstorm")
    }
    if ( id >= 300 && id < 322) {
        $('#iconFour').addClass("wi-showers")
    }
    if( id >= 500 && id < 532) {
        $('#iconFour').addClass("wi-rain")
    }
    if ( id >= 600 && id < 623) {
        $('#iconFour').addClass("wi-snow")
    }
    if( id > 700 && id < 772) {
        $('#iconFour').addClass("wi-smog")
    }
    if ( id === 781) {
        $('#iconFour').addClass("wi-tornado")
    }
    if ( id === 800) {
        $('#iconFour').addClass("wi-day-sunny");
    }
    if (id > 800 && id < 805) {
        $('#iconFour').addClass("wi-cloudy")
    }
    console.log(d.list[27])
}
//day 5
function listWeatherFive(d) {
    var fahrenheit = Math.round(((parseFloat(d.list[35].main.temp)-273.15)*1.8)+32); 
    document.getElementById('dFive').innerHTML = d.list[35].weather[0].description;
	document.getElementById('tFive').innerHTML = fahrenheit + '&#8457;';
    document.getElementById('wFive').innerHTML = d.list[35].wind.speed + 'MPH'
    document.getElementById('hFive').innerHTML = d.list[35].main.humidity + '%'
    //icon added for current day
    var id = d.list[35].weather[0].id
    if ( id >= 200 && id < 233) {
        $('#iconFive').addClass("wi-thunderstorm")
    }
    if ( id >= 300 && id < 322) {
        $('#iconFive').addClass("wi-showers")
    }
    if( id >= 500 && id < 532) {
        $('#iconFive').addClass("wi-rain")
    }
    if ( id >= 600 && id < 623) {
        $('#iconFive').addClass("wi-snow")
    }
    if( id > 700 && id < 772) {
        $('#iconFive').addClass("wi-smog")
    }
    if ( id === 781) {
        $('#iconFive').addClass("wi-tornado")
    }
    if ( id === 800) {
        $('#iconFive').addClass("wi-day-sunny");
    }
    if (id > 800 && id < 805) {
        $('#iconFive').addClass("wi-cloudy")
    }
    console.log(d.list[35])
}
//3,11,19,27,35
    weatherCity();
});
