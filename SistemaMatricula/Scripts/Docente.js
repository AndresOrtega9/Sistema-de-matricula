$("#datepicker").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
);
$.get("Docente/LlenarComboModalidadContrato", function (data) {
    LlenarCombo(data, document.getElementById("modalidadContrato"), true)
    LlenarCombo(data, document.getElementById("cboModalidadPopUp"), true)
});

$.get("Docente/ObtenerListaSexo", function (data) {
    LlenarComboSexo(data, document.getElementById("cboSexoPopUp"), true)
});

function LlenarComboSexo(data, control, primerElemento) {
    var contenido = "";
    if (primerElemento == true) {
        contenido += "<option value=''>--Seleccione--</option>";
    }
    var cantidadDeElementos = data.length;
    for (var i = 0; i < cantidadDeElementos; i++) {

        contenido += "<option value='" + data[i].IIDSEXO + "'>";
        contenido += data[i].NOMBRE;
        contenido += "</option>";
    }
    control.innerHTML = contenido;
};

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
    if (idModalidad == "") {
        ObtenerDocentes();
    } else {
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
    contenido += "<td>FOTO</td>";
    contenido += "<td>NOMBRE</td>";
    contenido += "<td>PRIMER APELLIDO</td>";
    contenido += "<td>SEGUNDO APELLIDO</td>";
    contenido += "<td>TELEFONO</td>";
    contenido += "<td>CELULAR</td>";
    contenido += "<td>EMAIL</td>";
    contenido += "<td>FECHA DE CONTRATO</td>";
    contenido += "<td>OPCIONES</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    var cantidadDeElmentos = data.length;
    contenido += "<tbody>";
    for (var i = 0; i < cantidadDeElmentos; i++) {
        let FOTO;
        FOTO.src = "data:image/png;base64," + data[i].FOTO
        contenido += "<tr>";
        contenido += "<td>" +FOTO+ "</td>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";
        contenido += "<td>" + data[i].APPATERNO + "</td>";
        contenido += "<td>" + data[i].APMATERNO + "</td>";
        contenido += "<td>" + data[i].TELEFONOFIJO + "</td>";
        contenido += "<td>" + data[i].TELEFONOCELULAR + "</td>";
        contenido += "<td>" + data[i].EMAIL + "</td>";
        contenido += "<td>" + data[i].FECHACONTRATO + "</td>";
        contenido += "<td>";
        contenido += "<button onclick='abrirModal(" + data[i].IIDDOCENTE + ")' data-bs-toggle='modal' data-bs-target='#myModal' class='btn btn-warning'><i class='glyphicon glyphicon-edit'></i></button> "
        contenido += "<button onclick='eliminar(" + data[i].IIDDOCENTE + ")' class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button>"
        contenido += "</td>";
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
function abrirModal(id) {
    let campos = document.getElementsByClassName("requerido");
    let numeroDeCampos = campos.length;
    for (let i = 0; i < numeroDeCampos; i++) {
        campos[i].parentNode.classList.remove("error");
    }
    if (id == 0) {
        limpiarPopUp();
    } else {
        $.get("Docente/RecuperarDatos?id=" + id, function (data) {
            document.getElementById("txtIdDocente").value = data[0].IIDDOCENTE;
            document.getElementById("txtNombreDocente").value = data[0].NOMBRE;
            document.getElementById("txtPrimerApellido").value = data[0].APPATERNO;
            document.getElementById("txtSegundoApellido").value = data[0].APMATERNO;
            document.getElementById("txtDireccion").value = data[0].DIRECCION;
            document.getElementById("txtNumeroTelefono").value = data[0].TELEFONOFIJO;
            document.getElementById("txtNumeroCelular").value = data[0].TELEFONOCELULAR;
            document.getElementById("txtCorreo").value = data[0].EMAIL;
            document.getElementById("cboSexoPopUp").value = data[0].IIDSEXO;
            document.getElementById("datepicker").value = data[0].FECHACONTRATO;
            document.getElementById("cboModalidadPopUp").value = data[0].IIDMODALIDADCONTRATO;
            document.getElementById("idFoto").src = "data:image/png;base64," + data[0].FOTO;
        });
    }
}
function btnAceptar() {
    if (camposRequeridos() == true) {
        let form = new FormData();
        let id = document.getElementById("txtIdDocente").value;
        let nombre = document.getElementById("txtNombreDocente").value;
        let primerApellido = document.getElementById("txtPrimerApellido").value;
        let segundoApellido = document.getElementById("txtSegundoApellido").value;
        let email = document.getElementById("txtCorreo").value;
        let fechaContrato = document.getElementById("datepicker").value;
        let numeroCelular = document.getElementById("txtNumeroCelular").value;
        let numeroTelefono = document.getElementById("txtNumeroTelefono").value;
        let modalidadContrato = document.getElementById("cboModalidadPopUp").value;
        let direccion = document.getElementById("txtDireccion").value;
        let sexo = document.getElementById("cboSexoPopUp").value;
        let foto = document.getElementById("idFoto").src.replace("data:image/png;base64,", "");

        form.append("IIDDOCENTE", id);
        form.append("NOMBRE", nombre);
        form.append("APPATERNO", primerApellido);
        form.append("APMATERNO", segundoApellido);
        form.append("EMAIL", email);
        form.append("FECHACONTRATO", fechaContrato);
        form.append("TELEFONOCELULAR", numeroCelular);
        form.append("TELEFONOFIJO", numeroTelefono);
        form.append("IIDMODALIDADCONTRATO", modalidadContrato);
        form.append("DIRECCION", direccion);
        form.append("IIDSEXO", sexo);
        form.append("cadenaFoto", foto);
        form.append("BHABILITADO", 1);
        if (confirm("¿Desea guardar datos?") == 1) {
            $.ajax({
                type: "POST",
                url: "Docente/Guardar",
                data: form,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data != 0) {
                        alert("Se ha creado el registro!");
                        document.getElementById("btnCancelar").click();
                        ObtenerDocentes();
                    } else {
                        alert("Ocurrió un error");
                    };
                }
            });
        };
    };
};
function camposRequeridos() {
    let exito = true;
    let campo = document.getElementsByClassName("requerido");
    let numeroDeCamposRequeridos = campo.length;
    for (let i = 0; i < numeroDeCamposRequeridos; i++) {
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
    let campos = document.getElementsByClassName("limpiar");
    let numeroDeCampos = campos.length;
    for (let i = 0; i < numeroDeCampos; i++) {
        campos[i].value = "";
    }
}
function eliminar(id) {
    let form = new FormData;
    form.append("IIDDOCENTE", id);
    if (confirm("¿Realmente desea eliminar el registro?") == 1) {
        $.ajax({
            type: "POST",
            url: "Docente/Eliminar",
            data: form,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data != 0) {
                    alert("Registro eliminado!");
                    ObtenerDocentes();
                } else {
                    alert("Ocurrió un error");
                }
            }
        });
    }
}

let btnFoto = document.getElementById("btnFoto");
btnFoto.onchange = function () {
    let archivo = document.getElementById("btnFoto").files[0];
    let leer = new FileReader();
    if (leer != null) {
        leer.onloadend = function () {
            if (archivo.type == "image/png") {
                let foto = document.getElementById("idFoto");
                foto.src = leer.result;
                alert(leer.result.replace("data:image/png;base64,", ""));
            } else {
                alert("Seleccione un archivo de tipo .png");
            }

        }
    }
    leer.readAsDataURL(archivo);
}



