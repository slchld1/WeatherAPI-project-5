const btn = document.getElementById('click')
var city = 'newyork'
function getAPI() {
    fetch("api.openweathermap.org/data/2.5/forecast?q=newyork&appid={b5d6abd64c1bcaf907e06b633fed6528}")
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });
}
btn.addEventListener('click', getAPI)