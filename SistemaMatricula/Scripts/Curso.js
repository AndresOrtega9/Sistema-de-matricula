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
    contenido += "<td>OPCIONES</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody>";
    for (var i = 0; i < data.length; i++) {

        contenido += "<tr>";
        contenido += "<td>" + data[i].IIDCURSO + "</td>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";
        contenido += "<td>" + data[i].DESCRIPCION + "</td>";
        contenido += "<td>";
        contenido += "<button onclick='abrirModal(" + data[i].IIDCURSO + ")' data-bs-toggle='modal' data-bs-target='#myModal' class='btn btn-warning'><i class='glyphicon glyphicon-edit'></i></button> "
        contenido += "<button onclick='eliminar(" + data[i].IIDCURSO + ")' class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button>"
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

var btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.onclick = function () {
    document.getElementById("txtNombre").value = "";
    ObtenerCursos();
}

function abrirModal(id) {
    let control = document.getElementsByClassName("requerido");
    let numeroDeControles = control.length;
    for (let i = 0; i < numeroDeControles; i++) {
        control[i].parentNode.classList.remove("error");
    }
    if (id == 0) {
        limpiarPopUp();
    } else {
        $.get("Curso/RecuperarDatos/?id=" + id, function (data) {
            document.getElementById("txtIdCurso").value = data[0].IIDCURSO;
            document.getElementById("txtNombreCurso").value = data[0].NOMBRE;
            document.getElementById("txtDescripcionCurso").value = data[0].DESCRIPCION;
        });
    }
}

function limpiarPopUp() {
    let control = document.getElementsByClassName("limpiar");
    let numeroDeControles = control.length;
    for (let i = 0; i < numeroDeControles; i++) {
        control[i].value = "";
    }
}

function btnAceptar() {
    if (datosRequeridos() == true) {
        let form = new FormData();
        let id = document.getElementById("txtIdCurso").value;
        let nombre = document.getElementById("txtNombreCurso").value;
        let descripcion = document.getElementById("txtDescripcionCurso").value;
        form.append("IIDCURSO", id);
        form.append("NOMBRE", nombre);
        form.append("DESCRIPCION", descripcion);
        form.append("BHABILITADO", 1);
        if (confirm("¿Desea realmente agregar un registro?") == 1) {
            $.ajax({
                type: "POST",
                url: "Curso/Guardar",
                data: form,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data != 0) {
                        ObtenerCursos();
                        alert("Se guardó correctamente!");
                        document.getElementById("btnCancelar").click();
                    } else {
                        alert("Ha ocurido un error.");
                    }
                }
            });
        }

    } else {

    }
}
function datosRequeridos() {
    let exito = true;
    let controlRequerido = document.getElementsByClassName("requerido");
    let numeroDeControles = controlRequerido.length;
    for (let i = 0; i < numeroDeControles; i++) {
        if (controlRequerido[i].value == "") {
            exito = false;
            controlRequerido[i].parentNode.classList.add("error")
        } else {
            controlRequerido[i].parentNode.classList.remove("error");
        }
    }
    return exito;

}

function eliminar(id) {
    let form = new FormData();
    form.append("IIDCURSO", id);
    if (confirm("¿Desea eliminar el registro?")==1) {
        $.ajax({
            type: "POST",
            url: "Curso/Eliminar",
            data: form,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data != 0) {
                    alert("Se ha eliminado el registro!");
                    ObtenerCursos();
                } else {
                    alert("Ocurrió un error.");
                }
            }
        });
    }


}





