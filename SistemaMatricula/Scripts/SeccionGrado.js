listarComboBox();
function listarComboBox() {
    $.get("SeccionGrado/listarSeccion", function (data) {
        LlenarComboBoxSeccion(data, document.getElementById("cboSeccion"), true);
    });
};
function LlenarComboBoxSeccion(data, control, primerElemento) {
    let contenido = "";
    if (primerElemento == true) {
        contenido += "<option value=''>--Seleccione--</option>";
    }
    let numeroDeElementos = data.length;
    for (let i = 0; i < numeroDeElementos; i++) {
        contenido += "<option value='" + data[i].IIDSECCION + "'> " + data[i].NOMBRE + " </option>";
    }

    control.innerHTML = contenido;
}


ObtenerSeccionGrado();
function ObtenerSeccionGrado() {
    $.get("SeccionGrado/ListarSeccionGrado", function (data) {
        lista(data);
    });
}
function lista(data) {
    var contenido = "";
    contenido += "<table id='tabla-Paginado' class='table'>";
    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<td>NOMBRE GRADO</td>";
    contenido += "<td>NOMBRE SECCION</td>";
    contenido += "<td>OPCIONES</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody>";
    let numeroDeElementos = data.length;
    for (let i = 0; i < numeroDeElementos; i++) {
        contenido += "<tr>";
        contenido += "<td>" + data[i].NOMBRESECCION + "</td>";
        contenido += "<td>" + data[i].NOMBREGRADO + "</td>";
        contenido += "<td>";
        contenido += "<button onclick='abrirModal(" + data[i].IID + ")' data-bs-toggle='modal' data-bs-target='#myModal' class='btn btn-warning'><i class='glyphicon glyphicon-edit'></i></button> "
        contenido += "<button onclick='eliminar(" + data[i].IID + ")' class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button>"
        contenido += "</td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $("#tabla-Paginado").dataTable(
        {
            searching: false
        }
    );
}