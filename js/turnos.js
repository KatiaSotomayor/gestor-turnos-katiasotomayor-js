//iMPORTAR JSON CON LA INFO DE LOS EMPLEADOS
const url = "../db/data.json"

function f_turno(nom_ape, dia, entrada, salida) {
    this.nom_ape = nom_ape;
    this.dia = dia;
    this.entrada = entrada;
    this.salida = salida;
}


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

            const label_ultima_mod = document.getElementById('label_ultima_mod');

            if ((v_fecha > 29 && v_mes == "febrero") || (v_fecha > 30 && (v_mes == "abril" || v_mes == "junio" || v_mes == "septiembre" || v_mes == "noviembre"))) {
                Swal.fire({
                    icon: "error",
                    title: "Error: Debe elegir un día válido en el mes elegido. Por favor, vuelva a intentar",
                    confirmButtonColor: 'rgb(143, 173, 136)'
                });

            } else {
                //ALMACENAMIENTO DE DATOS EN UNA VARIABLE
                const turno = new f_turno(
                    v_nombre_ape,
                    v_fecha,
                    v_entrada,
                    v_salida
                );

                label_ultima_mod.innerText = `Agregando..`;
                //SE AGREGA A LA LISTA Y SE AGREGA EL NUEVO TURNO AL HTML
                let cargando = setTimeout(() => {
                    try {
                        //SE INTENTA AGREGAR AL HTML
                        json.turnos[v_mes].push(turno)
                        agregar_al_html(turno)
                        formulario.reset()
                        modificacion_date()
                        Swal.fire({
                            title: "Turno agregado con éxito!",
                            icon: "success",
                            draggable: true,
                            confirmButtonColor: 'rgb(143, 173, 136)'
                        });

                    } catch (error) {
                        //SI NO, MUESTRA QUE ERROR HAY
                        Swal.fire({
                            icon: "error",
                            title: "Error: No se ha podido añadir el turno",
                            text: error,
                            confirmButtonColor: 'rgb(143, 173, 136)'
                        });
                    } finally {

                    }

                }, 2000)

                //FUNCION PARA AGREGAR EL NUEVO TURNO A HTML
                function agregar_al_html(turno) {
                    const turno_agregado = document.getElementById(v_mes + "-dia" + turno.dia)

                    turno_agregado.innerHTML += `
                    <hr><li>${turno.nom_ape}: De ${turno.entrada} a ${turno.salida}</li>
                    `;
                }

                function modificacion_date() {
                    let fecha_mod = new Date();
                    label_ultima_mod.innerText = `Ultima modificación: ${fecha_mod}`;
                }
            }


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