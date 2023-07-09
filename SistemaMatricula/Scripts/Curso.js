ObtenerCursos();
function ObtenerCursos() {

    $.get("Curso/ObtenerCursos", function (data) {

        lista(data);
    });
}



var btnBuscarCursoPorNombre = document.getElementById("btnBuscar");
btnBuscarCursoPorNombre.onclick = function () {
   
    var nombreCurso = document.getElementById("txtNombre").value;

    $.get("Curso/ObtenerCursoPorNombre/?nombre=" + nombreCurso, function (data) {

       
        lista(data);
        
    });
}

function lista(data) {

    var contenido = "";
    contenido += "<table id='tabla-Paginado' class='table'>";
    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<td>ID</td>";
    contenido += "<td>NOMBRE</td>";
    contenido += "<td>DESCRIPCIÓN</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody>";
    for (var i = 0; i < data.length; i++) {

        contenido += "<tr>";
        contenido += "<td>" + data[i].IIDCURSO + "</td>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";
        contenido += "<td>" + data[i].DESCRIPCION + "</td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $("#tabla-Paginado").dataTable(
        {
            searching:false
        }
    );

}

var btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.onclick = function () {

    var txtNombre = document.getElementById("txtNombre").value;

    document.getElementById("txtNombre").value = "";
    ObtenerCursos();
}




