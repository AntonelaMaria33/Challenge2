
// funcion getUser recibe como parametro que metodo va a usar para resolverse

const getUser = (method) => {
    // uso un switch, que va a alternar segun el metodo pasado como parametro
    switch (method) {
        case usingTryCatch:
            usingTryCatch()
            break;
        case usingThenCatch:
            usingThenCatch()
            break;
        default:
            console.log('Metodo no valido')
    }

}

// function getAlbum, recibe como parametro un id, y un metodo para resolverse
const getAlbum = (id, method) => {

    // uso el switch para alternar que metodo voy a usar y a ese metodo le paso el ID del usuario para obtener sus albums
    switch (method) {
        case usingTryCatch:
            usingTryCatch(id)
            break;
        case usingThenCatch:
            usingThenCatch(id)
            break;
        default:
            console.log('Metodo no valido')
    }

}



// en caso de recibir un ID como parametro, lo pasa a la funcion. la funcion async se maneja con Try{}catch{}. intenta
// la promesa con el Try, y en caso de que halla algun error va al catch en donde se maneja el error
const usingTryCatch = async (id) => {
    try {
        // primero pregunto si ingreso un ID como parametro, para determinar si estan llamando a la funcion getUser o getAlbum
        if (id) {
            // en caso de llamar al album, hago el fetch y muestro la informacion del ID seleccionado (console.log(data))
            const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
            const data = await resp.json()
            console.log(data)
        } else {
            // en caso de que no halla ID, significa que llame a getUser y en este caso hago el mismo proceso, uso el fetch
            // correspondiente pero llamo a la funcion Filtrar para poder desestructurar el objeto como pide la consigna. esta funcion 
            // retorna un console.log con el array de objetos ya filtrado
            const resp = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await resp.json()
            filtrar(data)
        }


    } catch (error) {  // en el caso de que falle el Try, se ejecuta el catch, en donde solicito se muestre el error en consola
        console.error(error)
    }
}



// en caso de recibir un ID como parametro, lo pasa a la funcion. . intenta el then una vez que cumple el fech que es una promesa
//y en caso de que halla algun error va al catch en donde se maneja el error
const usingThenCatch = (id) => {
    // pregunto si ingreso un ID primero, para determinar si es getUser o getAlbum
    if (id) {
        const resp = `https://jsonplaceholder.typicode.com/users/${id}/albums`
        fetch(resp).then(response => response.json()).then(data => { // llamo al fetch, despues al json, despues al data y muestro los albums del iduser
            console.log(data)
        }).catch(error => console.log(error))


    } else { //si no ingreso un id significa que llamo a la funcion getUser y hago lo mismo, pero data lo paso por la funcion filtrar
        // para recibir el objeto desestructurado
        const resp = 'https://jsonplaceholder.typicode.com/users'
        fetch(resp).then(response => response.json()).then(data => {
            filtrar(data)

        }).catch(error => console.log(error))


    }

}

// la funcion filtrar se encarga de recibir el data del .json(), recore cada lugar del array con un ciclo for, 
// crea una desestructuracion cada objeto y lo asignamos a un nuevo objeto que posee los parametros que necesitamos

const filtrar = (data) => {
    const array = []
    for (let i = 0; i < data.length; i++) {
        const { id, name, username, email, address: { street, suite, city }, website, company } = data[i]
        const dataFiltrada = {
            id: id,
            name: name,
            username: username,
            email: email,
            address: {
                street: street,
                suite: suite,
                city: city,
            },

            website: website,
            company: company
        }
        // una vez que crea el nuevo objeto filtrado, lo metemos en el array vacio nuevo con push
        array.push(dataFiltrada)
    }
    return console.log(array) // devolvemos el nuevo array filtrado
}
