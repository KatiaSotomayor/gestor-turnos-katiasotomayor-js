//iMPORTAR JSON CON LA INFO DE LOS EMPLEADOS
const url = "../db/data.json"
fetch(url)
    .then(response => response.json())
    .then(json => {
        console.log(json);

        const select_nom_ape = document.getElementById("select-nombre-apellido");


        //AUTOLLENADO DE <OPTION> PARA QUE SOLO SE PUEDAN ELEGIR A LOS EMPLEADOS EXISTENTES PARA AÑADIRLE UN TURNO
        json.empleados.forEach(empleado => {
            select_nom_ape.innerHTML += `
            <option value="${empleado.nom_ape}">${empleado.nom_ape}</option>
            `;
        });

        const formulario = document.getElementById("form-turnos")

        //TOMA DE VALORES DEL FORM AL HACER CLICK EN EL BTN SUBMIT
        formulario.addEventListener("submit", function (event) {
            event.preventDefault()

            const v_nombre_ape = document.getElementById("select-nombre-apellido").value
            const v_fecha = document.getElementById("fecha").value
            const v_entrada = document.getElementById("horario-entrada").value
            const v_salida = document.getElementById("horario-salida").value
            const v_mes = document.getElementById("mes").value.toLowerCase();

            //ALMACENAMIENTO DE DATOS EN UNA VARIABLE
            const turno = {
                nom_ape: v_nombre_ape,
                dia: v_fecha,
                entrada: v_entrada,
                salida: v_salida,
            }

            //SE AGREGA A LA LISTA Y SE AGREGA EL NUEVO TURNO AL HTML
            json.turnos[v_mes].push(turno)
            agregar_al_html(turno)
            formulario.reset()
        });


        //FUNCION PARA AGREGAR EL NUEVO TURNO A HTML
        function agregar_al_html(turno) {
            const turno_agregado = document.getElementById("dia" + turno.dia)

            turno_agregado.innerHTML += `
            <hr><li>${turno.nom_ape}: De ${turno.entrada} a ${turno.salida}</li>
            `;
        }
    });