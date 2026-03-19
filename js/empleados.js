//iMPORTAR JSON CON LA INFO DE LOS EMPLEADOS
const url = "../db/data.json"
fetch(url)
    .then(response => response.json())
    .then(json => {

        //AUTORRELLENADO CON DATOS YA CARGADOS DE LOS EMPLEADOS
        const contenedor = document.getElementById("recuadro-turnos");
        json.empleados.forEach((empleados, incremento) => {
            contenedor.innerHTML += `
                <ul id="empleado${incremento + 1}" class="dia">
                    <h3>${empleados.nom_ape}</h3>
                    <li>Puesto: ${empleados.puesto}</li>
                    <li>Área: ${empleados.area}</li>
                    <li>Estado: ${empleados.estado}</li>
                </ul>
            `;
        });
    })
    .catch(error => {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error,
            confirmButtonColor: 'rgb(143, 173, 136)'
        });
    }
    )