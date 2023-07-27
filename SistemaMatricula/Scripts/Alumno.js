$("#datepicker").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
);

listarComboBox();
function listarComboBox() {
    $.get("Alumno/LlenarComboBoxSexo", function (data) {
        LlenarComboBoxSexo(data, document.getElementById("cboSexo"), true);
        LlenarComboBoxSexo(data, document.getElementById("cboSexoPopUp"), true);
    });
};
function LlenarComboBoxSexo(data, control, primerElemento) {
    let contenido = "";
    if (primerElemento == true) {
        contenido += "<option value=''>--Seleccione--</option>";
    }
    let numeroDeElementos = data.length;
    for (let i = 0; i < numeroDeElementos; i++){
        contenido += "<option value='" + data[i].IIDSEXO + "'> " + data[i].NOMBRE + " </option>";
    }

    control.innerHTML = contenido;
}

function BuscarPorSexo(){
    let valor = document.getElementById("cboSexo").value;
    if (valor == "") {
        ObtenerAlumnos();
    } else {
        $.get("Alumno/BuscarAlumnoPorSexo?idSexo=" + valor, function (data) {
            lista(data);
        });
    }
}

ObtenerAlumnos();
function ObtenerAlumnos() {
    $.get("Alumno/ListarAlumnos", function (data) {
        lista(data);
    });
}
function lista(data) {
    var contenido = "";
    contenido += "<table id='tabla-Paginado' class='table'>";
    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<td>NOMBRE</td>";
    contenido += "<td>PRIMER APELLIDO</td>"
    contenido += "<td>SEGUNDO APELLIDO</td>";
    contenido += "<td>FECHA NACIMIENTO</td>";
    contenido += "<td>TELEFONO ACUDIENTE</td>";
    contenido += "<td>OPCIONES</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody>";
    let numeroDeElementos = data.length;
    for (let i = 0; i < numeroDeElementos; i++) {
        contenido += "<tr>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";
        contenido += "<td>" + data[i].APPATERNO + "</td>";
        contenido += "<td>" + data[i].APMATERNO + "</td>";
        contenido += "<td>" + data[i].FECHANACIMIENTO + "</td>";
        contenido += "<td>" + data[i].TELEFONOPADRE + "</td>"
        contenido += "<td>";
        contenido += "<button onclick='abrirModal(" + data[i].IIDALUMNO + ")' data-bs-toggle='modal' data-bs-target='#myModal' class='btn btn-warning'><i class='glyphicon glyphicon-edit'></i></button> "
        contenido += "<button onclick='eliminar(" + data[i].IIDALUMNO + ")' class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button>"
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

function btnAceptar() {
    if (datosRequeridos() == true) {
        let form = new FormData();
        let id = document.getElementById("txtIdAlumno").value;
        let nombre = document.getElementById("txtNombreAlumno").value;
        let primerApellido = document.getElementById("txtPrimerApellido").value;
        let segundoApellido = document.getElementById("txtSegundoApellido").value;
        let fecha = document.getElementById("datepicker").value;
        let sexo = document.getElementById("cboSexo").value;
        let telefonoAcudiente = document.getElementById("txtTelefonoAcudiente").value;

        form.append("IIDALUMNO", id);
        form.append("NOMBRE", nombre);
        form.append("APPATERNO", primerApellido);
        form.append("APMATERNO", segundoApellido);
        form.append("FECHANACIMIENTO", fecha);
        form.append("IIDSEXO", sexo);
        form.append("TELEFONOPADRE", telefonoAcudiente);
        form.append("BHABILITADO", 1);
        if (confirm("¿Desea crear este registro?") == 1) {
            $.ajax({
                type: "POST",
                url: "Alumno/Guardar",
                data: form,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data != 0) {
                        alert("El registro se creó correctamente!");
                        ObtenerAlumnos();
                        document.getElementById("btnCerrar").click();                       
                    } else {
                        alert("Error al crear el resgistro");
                    }
                }

            });
        }
    };
}
function datosRequeridos() {
    let exito = true;
    let campos = document.getElementsByClassName("requerido");
    let numeroCamposRequeridos = campos.length;
    for (let i = 0; i < numeroCamposRequeridos;i++) {
        if (campos[i].value == "") {
            exito = false;
            campos[i].parentNode.classList.add("error");
        } else {
            campos[i].parentNode.classList.remove("error");
        }
    }

    return exito;
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
        $.get("Alumno/RecuperarDatos?id="+id, function (data) {
            document.getElementById("txtIdAlumno").value = data[0].IIDALUMNO;
            document.getElementById("txtNombreAlumno").value = data[0].NOMBRE;
            document.getElementById("txtPrimerApellido").value = data[0].APPATERNO;
            document.getElementById("txtSegundoApellido").value = data[0].APMATERNO;
            document.getElementById("datepicker").value = data[0].FECHANACIMIENTO;
            document.getElementById("cboSexoPopUp").value = data[0].IIDSEXO;    
            document.getElementById("txtTelefonoAcudiente").value = data[0].TELEFONOPADRE;
        });
    }
}

function limpiarPopUp() {
    let campo = document.getElementsByClassName("limpiar");
    let numeroDeCampos = campo.length;
    for (let i = 0; i < numeroDeCampos; i++) {
        campo[i].value = "";
    }
}

function eliminar(id) {
    var form = new FormData;
    form.append("IIDALUMNO", id);
    if (confirm("¿Desea eliminar este resgistro?")==1) {
        $.ajax({
            type: "POST",
            url: "Alumno/Eliminar",
            data: form,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data != 0) {
                    alert("Se ha eliminado el registro!");
                    ObtenerAlumnos();
                } else {
                    alert("Ocurrió un error");
                }
            }
        });
    }
}
