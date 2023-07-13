$("#datepickerInicio").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
);
$("#datepickerFin").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
);
ObtenerPeriodos();
function ObtenerPeriodos() {
    $.get("Periodo/ObtenerPeriodos", function (data) {
        ListaDePeriodos(data);
    });
}

var txtBuscar = document.getElementById("txtNombre");
txtBuscar.onkeyup = function () {

    var nombre = document.getElementById("txtNombre").value;
    $.get("Periodo/ObtenerPeriodosPorNombre/?nombre=" + nombre, function (data) {

        ListaDePeriodos(data);
    });

}

function ListaDePeriodos(data) {
    var contenido = "";
    contenido += "<table  id='tablaPeriodo' class='table' >";
    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<td>ID</td>";
    contenido += "<td>NOMBRE</td>";
    contenido += "<td>FECHA DE INICIO</td>";
    contenido += "<td>FECHA DE FIN</td>";
    contenido += "<td>OPCIONES</td>";
    contenido += "</tr>";
    contenido += "</thead>";

    contenido += "<tbody>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        contenido += "<td>" + data[i].IIDPERIODO + "</td>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";
        contenido += "<td>" + data[i].FECHAINICIO + "</td>";
        contenido += "<td>" + data[i].FECHAFIN + "</td>";
        contenido += "<td>";
        contenido += "<button onclick='abrirModal(0)' type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#myModal'><i class='glyphicon glyphicon-plus'></i></button> "
        contenido += "<button onclick=abrirModal(" + data[i].IIDPERIODO + ") data-bs-toggle='modal' data-bs-target='#myModal' class='btn btn-warning'><i class='glyphicon glyphicon-edit'></i></button> "
        contenido += "<button onclick=eliminar(" + data[i].IIDPERIODO + ") class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button>"
        contenido += "</td>";
        contenido += "</tr>";
    }

    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $("#tablaPeriodo").dataTable(
        {
            searching: false
        }
    );
}

function limpiarPopUp() {
    let control = document.getElementsByClassName("limpiar");
    let numeroDeControles = control.length;
    for (let i = 0; i < numeroDeControles; i++) {
        control[i].value = "";
    }
}

function datosRequeridos() {
    let exito = true;
    let controlRequerido = document.getElementsByClassName("requerido");
    let numeroDeContolesRequeridos = controlRequerido.length;
    for (let i = 0; i < numeroDeContolesRequeridos; i++) {
        if (controlRequerido[i].value == "") {
            exito = false;
            controlRequerido[i].parentNode.classList.add("error");
        } else {
            controlRequerido[i].parentNode.classList.remove("error");
        }
    }
    return exito;
}

function abrirModal(id) {
    let controles = document.getElementsByClassName("requerido");
    let numeroDeControles = controles.length;
    for (let i = 0; i < numeroDeControles; i++) {
        controles[i].parentNode.classList.remove("error");
    }
    if (id == 0) {
        limpiarPopUp();
    } else {

        $.get("Periodo/RecuperarDatos/?id=" + id, function (data) {
            document.getElementById("txtIdPeriodo").value = data[0].IIDPERIODO;
            document.getElementById("txtNombrePeriodo").value = data[0].NOMBRE;
            document.getElementById("datepickerInicio").value = data[0].FECHAINICIO;
            document.getElementById("datepickerFin").value = data[0].FECHAFIN;
        });
    }
}
function btnAceptar() {
    if (datosRequeridos() == true) {
        let form = new FormData();
        let id = document.getElementById("txtIdPeriodo").value;
        let nombre = document.getElementById("txtNombrePeriodo").value;
        let fechaInicio = document.getElementById("datepickerInicio").value;
        let fechaFin = document.getElementById("datepickerFin").value;

        form.append("IIDPERIODO", id);
        form.append("NOMBRE", nombre);
        form.append("FECHAINICIO", fechaInicio);
        form.append("FECHAFIN", fechaFin);
        form.append("BHABILITADO", 1);

        if (confirm("¿Desea crear este registro?") == 1) {

            $.ajax({
                type: "POST",
                url: "Periodo/Guardar",
                data: form,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data != 0) {
                        ObtenerPeriodos();
                        alert("Se ha guardado el registro con exito!");
                        document.getElementById("btnCancelar").click();
                    } else {
                        alert("Ocuriió un erro.");
                    }
                }
            });
        }
    }
}

function eliminar(id) {
    let form = new FormData();
    form.append("IIDPERIODO", id);
    if (confirm("¿Desea eliminar este registro?") == 1) {
        $.ajax({
            type: "POST",
            url: "Periodo/Eliminar",
            data: form,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data != 0) {
                    ObtenerPeriodos();
                    alert("Se ha eliminado el registro!");
                    document.getElementById("btnCancelar");
                } else {
                    alert("Error al elimiar el registro.");
                }
            }
        });
    }
}





