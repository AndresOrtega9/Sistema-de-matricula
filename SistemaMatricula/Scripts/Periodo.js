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
        contenido += "<button class='btn btn-primary'><i class='glyphicon glyphicon-edit'></i></button> "
        contenido += "<button class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button>"
        contenido += "</td>";
        contenido += "</tr>";
    }

    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $("#tablaPeriodo").dataTable(
        {
            searching:false
        }
    );
}
