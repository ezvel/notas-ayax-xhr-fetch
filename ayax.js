(() => {
    //Instanciación del objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();

    $users = document.getElementById("users-xhr");
    $fragment = document.createDocumentFragment();


    //lógica de la programación -> construcción dinámica de la intefáz gráfica
    xhr.addEventListener("readystatechange", (e) => {//readystatechange detecta cambios de estado
        //Que el xhr se ejecute cuándo el readystate sea 4
        if(xhr.readyState !== 4) {
            return;
        };

        //Cuándo el status sea entre 200 y 300 ejecutar la lógica de programación
        if(xhr.status >= 200 && xhr.status < 300) {
            //lógica de programación
            const json = JSON.parse(xhr.responseText);
            json.forEach(elemento => {
                const $user = document.createElement("li");
                $user.innerHTML = `${elemento.name} -- ${elemento.email} -- ${elemento.phone}`;
                $fragment.appendChild($user);
            })
            $users.appendChild($fragment);
        //Si da un error monstrá un mensaje de error
        } else{
            //statustext es el mensaje de error 404
            let mensajeError = xhr.statusText || "Ocurrió un error";
            $users.innerHTML = "Error " + xhr.status + " " + mensajeError;
        }
        //abrir la petición
        xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

        //enviar la petición
        xhr.send();

    })
})();

(() => {
    $users = document.getElementById("users-fetch");
    $fragment = document.createDocumentFragment();
    
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
        //console.log(res) // ->  NO ES EN FORMATO JSON NI TEXT, ES UN OBJETO ReadableStream
        //res.text() -> convertir en formato texto
        if(res.ok) {
            return res.json(); 
        } else {
            return Promise.reject(res);
        }
    })
    .then( (json) => { //Recibo el json
        json.forEach(elemento => {
            const $user = document.createElement("li");
            $user.innerHTML = `${elemento.name} -- ${elemento.email} -- ${elemento.phone}`;
            $fragment.appendChild($user);
        })
        $users.appendChild($fragment);
    }) 
    .catch((err) => {
        let mensajeError = err.statusText || "Ocurrió un error";
        $users.innerHTML = "Error " + err.status + " " + mensajeError;
        
    })
    .finally(()=> {
        console.log("se ejecutará siempre");
    })//eliminar el loading
    
})();


(() => {
    $users = document.getElementById("users-fetch-async-await");
    $fragment = document.createDocumentFragment();

    async function getData() {
        try {
            let res =  await fetch("https://jsonplaceholder.typicode.com/users")
            let json = await res.json();

            json.forEach(elemento => {
                const $user = document.createElement("li");
                $user.innerHTML = `${elemento.name} -- ${elemento.email} -- ${elemento.phone}`;
                $fragment.appendChild($user);
            })

            $users.appendChild($fragment);

            if(!res.ok) {
                throw {status: res.status, statusText: res.statusText}
            }

        } catch(err) {
            let mensajeError = err.statusText || "Ocurrió un error";
            $users.innerHTML = "Error " + err.status + " " + mensajeError;
            
        } finally {
            console.log("se ejecutará siempre")
        }
    }


    getData();


})();