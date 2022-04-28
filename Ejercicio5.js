import fetch from 'node-fetch'

async function movesPokemon(nombre) {
    try {
        const response = await fetch(' https://pokeapi.co/api/v2/pokemon/' + nombre)
        const datos = await response.json()
        let movimientos = datos.moves.map(function (movimiento) {
            return movimiento.move.name
        })
        return movimientos.sort()
    }
    catch (error) {
        return 'Errrorrrrrrrrrr: ' + error
    }

}
movesPokemon('pikachu').then(res => { console.log(res) })
