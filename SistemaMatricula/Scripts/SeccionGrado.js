listarComboBox();
function listarComboBox() {
    $.get("SeccionGrado/listarSeccion", function (data) {
        LlenarComboBoxSeccion(data, document.getElementById("cboSeccion"), true);
    });

    $.get("SeccionGrado/listarGrado", function (data) {
        LlenarComboBoxGrado(data, document.getElementById("cboGrado"), true);
    });
};
function LlenarComboBoxGrado(data,control, primerContenido) {
    let contenido = "";
    if (primerContenido == true) {
        contenido += "<option value=''>--Seleccione--</option>";
    }
    let numeroDeRegistros = data.length;
    for (let i = 0; i < numeroDeRegistros; i++) {
        contenido += "<option value='" + data[i].IIDGRADO + "'>" + data[i].NOMBRE + "</option>";
    }

    control.innerHTML = contenido;
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
        contenido += "<td>" + data[i].NOMBREGRADO + "</td>";
        contenido += "<td>" + data[i].NOMBRESECCION + "</td>";
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

function abrirModal(id) {
    let campo = document.getElementsByClassName("requerido");
    let numeroDeCampos = campo.length;
    for (let i = 0; i < numeroDeCampos; i++) {
        campo[i].parentNode.classList.remove("error");
    }
    if (id == 0) {
        limpiarPopUp();
    } else {
        $.get("SeccionGrado/RecuperarInformacion/?id=" + id, function (data) {
            document.getElementById("txtIdGradoSeccion").value = data[0].IID;
            document.getElementById("cboGrado").value = data[0].IIDGRADO;
            document.getElementById("cboSeccion").value = data[0].IIDSECCION;
        });
    }
}

function datosRequeridos() {
    let exito = true;
    let campos = document.getElementsByClassName("requerido");
    let numeroCamposRequeridos = campos.length;
    for (let i = 0; i < numeroCamposRequeridos; i++) {
        if (campos[i].value == "") {
            exito = false;
            campos[i].parentNode.classList.add("error");
        } else {
            campos[i].parentNode.classList.remove("error");
        }
    }
    return exito;
}

function btnAceptar() {
    if (datosRequeridos() == true) {
        let form = new FormData();
        let id = document.getElementById("txtIdGradoSeccion").value;
        let cboGrado = document.getElementById("cboGrado").value;
        let cboSeccion = document.getElementById("cboSeccion").value;

        form.append("IID", id);
        form.append("IIDGRADO", cboGrado);
        form.append("IIDSECCION", cboSeccion);
        form.append("BHABILITADO", 1);

        if (confirm("¿Desea agregar un nuevo elemento?") == 1) {
            $.ajax({
                type: "POST",
                url: "SeccionGrado/Guardar",
                data: form,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data != 0) {
                        alert("El registro se creó correctamente!");
                        ObtenerSeccionGrado();
                        document.getElementById("btnCerrar").click();
                    } else {
                        alert("Error al crear el resgistro");
                    }
                }
            });
        }
    }
};

function eliminar(id) {
    let form = new FormData();
    form.append("IID", id);
    if (confirm("¿Realmente desea eliminar este registro?") == 1) {
        $.ajax({
            type: "POST",
            url: "SeccionGrado/Eliminar",
            data: form,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data != 0) {
                    alert("El registro fue eliminado!");
                    ObtenerSeccionGrado();
                } else {
                    alert("Ocurrió un error");
                }
            }

        });
    }
}

function datosRequeridos() {
    let exito = true;
    let campo = document.getElementsByClassName("requerido");
    let numeroDeCampos = campo.length;
    for (let i = 0; i < numeroDeCampos;i++) {
        if (campo[i].value == "") {
            exito = false;
            campo[i].parentNode.classList.add("error");
        } else {
            campo[i].parentNode.classList.remove("error");
        }
    }
    return exito;
}

function limpiarPopUp() {
    let campo = document.getElementsByClassName("limpiar");
    let numeroDeCampos = campo.length;
    for (let i = 0; i < numeroDeCampos; i++) {
        campo[i].value = "";
    }

}