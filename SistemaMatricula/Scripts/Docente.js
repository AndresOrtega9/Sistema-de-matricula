$.get("Docente/LlenarComboModalidadContrato", function (data) {
    LlenarCombo(data, document.getElementById("modalidadContrato"), true)
});

function LlenarCombo(data, control, primerElemento) {
    var contenido = "";
    if (primerElemento == true) {
        contenido += "<option value=''>--Seleccione--</option>";
    }
    var cantidadDeElemntos = data.length;
    for (var i = 0; i < cantidadDeElemntos; i++) {

        contenido += "<option value='" + data[i].IIDMODALIDADCONTRATO + "'>";
        contenido += data[i].NOMBRE;
        contenido += "</option>";
    }
    control.innerHTML = contenido;
};

var cboTipoModalidad = document.getElementById("modalidadContrato");
cboTipoModalidad.onchange = function () {

    var idModalidad = document.getElementById("modalidadContrato").value;
    if (idModalidad == ""){
        ObtenerDocentes();
    }else {
        $.get("Docente/FiltrarDocentePorTipoModalidad/?idModalidad=" + idModalidad, function (data) {
            ListarDocentes(data);
        });
    }
};

ObtenerDocentes();
function ObtenerDocentes() {
    $.get("Docente/ObtenerDocentes", function (data) {

        ListarDocentes(data);
    });
};

function ListarDocentes(data) {
    var contenido = "";
    contenido += "<table id='tabla-docente' class='table'>";
    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<td>NOMBRE</td>";
    contenido += "<td>PRIMER APELLIDO</td>";
    contenido += "<td>SEGUNDO APELLIDO</td>";
    contenido += "<td>EMAIL</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    var cantidadDeElmentos = data.length;
    contenido += "<tbody>";
    for (var i = 0; i < cantidadDeElmentos; i++) {
        contenido += "<tr>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";
        contenido += "<td>" + data[i].APPATERNO + "</td>";
        contenido += "<td>" + data[i].APMATERNO + "</td>";
        contenido += "<td>" + data[i].EMAIL + "</td>";
        contenido += "</tr>";
    }
    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tablaDocente").innerHTML = contenido;
    $("#tabla-docente").dataTable(
        {
            searching: false
        });
};


