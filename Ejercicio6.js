async function position() {
    try {
        const response = await fetch('http://api.open-notify.org/iss-now.json')
        const datos = await response.json()
        return datos.iss_position
    }
    catch (error) {
        return error
    }
}

async function mapa(button) {
    const mapa = await position()
    let map = L.map('map').setView([mapa.latitude, mapa.longitude],
        2);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 10
    }).addTo(map);
    L.control.scale().addTo(map);
    setInterval(() => {
        L.marker([mapa.latitude, mapa.longitude], { draggable: true }).addTo(map);
    }, 10000
    )
    button.addEventListener('click', () => {
        map.setView([mapa.latitude, mapa.longitude],
            2);
    })
   
}
let button = document.createElement('input')
document.body.appendChild(button)
button.setAttribute('type', 'button')
button.setAttribute('value', 'centrar')
mapa(button)