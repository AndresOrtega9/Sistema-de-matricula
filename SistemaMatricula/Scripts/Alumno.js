$.get("Alumno/LlenarComboBoxSexo", function (data) {
    LlenarCombo(data, document.getElementById("cboSexo"),true)
});

function LlenarCombo(data, control, primerElemento) {
    var contenido = "";
    if (primerElemento == true) {
        contenido += "<option value=''>--Seleccione--</option>";
    }
    var cantidadDeElemntos = data.length;
    for (var i = 0; i < cantidadDeElemntos; i++) {

        contenido += "<option value='" + data[i].ID + "'>";
        contenido += data[i].NOMBRE;
        contenido += "</option>";
    }
    control.innerHTML = contenido;
}

var btnBuscar = document.getElementById("btnBuscar");
btnBuscar.onclick = function () {
    var valueCboSexo = document.getElementById("cboSexo").value;
    if (valueCboSexo == "") {
        ObtenerAlumnos();
    } else {
        $.get("Alumno/BuscarAlumnoPorSexo/?IdSexo=" + valueCboSexo, function (data) {
            ListarAlumnos(data);
        });
    } 
}

var btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.onclick = function () {
    ObtenerAlumnos();
}

ObtenerAlumnos();
function ObtenerAlumnos() {
    $.get("Alumno/ObtenerAlumnos", function (data) {

        ListarAlumnos(data);
    });
}

function ListarAlumnos(data) {
    var contenido = "";
    contenido += "<table id='tabla-alumno' class='table'>";
    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<td>ID</td>";
    contenido += "<td>NOMBRE</td>";
    contenido += "<td>PRIMER APELLIDO</td>";
    contenido += "<td>SEGUNDO APELLIDO</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    var cantidadDeElmentos = data.length;
    contenido += "<tbody>";
    for (var i = 0; i < cantidadDeElmentos; i++) {
        contenido += "<tr>";
        contenido += "<td>" + data[i].IIDALUMNO + "</td>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";
        contenido += "<td>" + data[i].APPATERNO + "</td>";
        contenido += "<td>" + data[i].APMATERNO + "</td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tablaAlumno").innerHTML = contenido;
    $("#tabla-alumno").dataTable(
        {
            searching:false
        });
};

