$.get("Seccion/ObtenerListadoSeccion", function (data) {
    ListaDeSeccion(data);
});
function ListaDeSeccion(data) {
    var contenido = "";
    contenido += "<table  id='tabla-Seccion' class='table' >";
    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<td>NOMBRE</td>";
    contenido += "<td>OPCIONES</td>";
    contenido += "</tr>";
    contenido += "</thead>";

    contenido += "<tbody>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<tr>";
        contenido += "<td>" + data[i].IIDSECCION + "</td>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";
        contenido += "<td>";
        contenido += "<button data-bs-toggle='modal' data-bs-target='#myModal' class='btn btn-warning'><i class='glyphicon glyphicon-edit'></i></button> "
        contenido += "<button class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button>"
        contenido += "</td>";
        contenido += "</tr>";
    }

    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tablaSeccion").innerHTML = contenido;
    $("#tabla-Seccion").dataTable(
        {
            searching: false
        }
    );
}