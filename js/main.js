/*
let turnoslist  = [""]
let turnoss = document.getElementById("turnosxd")
for (const turnos of turnoslist){
    let li = document.createElement("li")
    li.innerHTML = turnos
    turnoslist.appendChild(li)
}
*/

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // campo usuario acepte letras minuscula
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // letras con o sin acento y espacios
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    dolencia: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    //password: /^.{4,12}$/, minimo de 4 digitos y maximo de 12 
    correo:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //acepta todo menos caracteres especiales
    telefono: /^\d{7,14}$/,  //minimo 7 y maximo 14 numeros
    dni: /^\d{7,9}$/,
}


const $formulario = document.getElementById("formulario");
const $inputs = document.querySelectorAll("#formulario input")


const campos = {
    usuario: false,
    nombre: false,
    correo: false,
    telefono: false,
    dni: false,
    apellido: false,
    dolencia: false,

}

const validarFormulario = (e) => {
    switch(e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, "usuario");
        break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre");
        break;
        case "correo":
            validarCampo(expresiones.correo, e.target, "correo");
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, "telefono");
        break;
        case "dni":
            validarCampo(expresiones.dni, e.target, "dni");
        break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, "apellido");
        break;
        case "dolencia":
            validarCampo(expresiones.dolencia, e.target, "dolencia");
        break;
    }
    
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        campos[campo] = true;
    } else {
           document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
           document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
           document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle");
           document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle");
           document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
           campos[campo] = false;
        }
}

$inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

$formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const $terminos = document.getElementById("terminos");
    if(campos.usuario && campos.correo && campos.telefono) {

        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
        setTimeout(() => {
            document.getElementById("formulario__mensaje-exito").classList.remove("formulario__mensaje-exito-activo");
            document.getElementById("formulario__grupo-terminos").style.display = "none";
            
        }, 3000);
        
        document.querySelectorAll(".formulario__grupo--correcto").forEach ((icono) => {
            icono.classList.remove("formulario__grupo--correcto");
        });
        
        setTimeout(() => {
            location.reload();
        }, 5000);

    } else {
        document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
    }
});





var PacientesList= [];

function addpaciente(pnombre,papellido,pdni,pdolencia,pfecha,phora){
    var nuevoPaciente={
        nombre : pnombre,
        apellido : papellido,
        dni : pdni,
        dolencia : pdolencia,
        fecha : pfecha,
        hora : phora
    };
    PacientesList.push(nuevoPaciente);
}
document.querySelector('#btnSave').addEventListener('click',savepaciente);
imprimirpaciente();
function savepaciente(){
    var snombre = document.querySelector("#nombre-paciente").value,
        sapellido = document.querySelector("#apellido-paciente").value,
        sdni = document.querySelector("#dni-paciente").value,
        sdolencia = document.querySelector("#dolencia-paciente").value,
        sfecha = document.querySelector("#turno-fecha").value,
        shora = document.querySelector("#turno-hora").value;

    
    
    addpaciente(snombre,sapellido,sdni,sdolencia,sfecha,shora);  
    imprimirpaciente();
}
function getpaciente(){
    return PacientesList;
}
function imprimirpaciente(){
    var list= getpaciente(),
        tbody = document.querySelector('#tabla-pacientes tbody');
    tbody.innerHTML = '';

    for (var i = 0 ; i < list.length; i ++){
        var row = tbody.insertRow(i);
        var nombreCell = row.insertCell(0);
            apellidoCell = row.insertCell(1);
            dniCell = row.insertCell(2);
            dolenciaCell = row.insertCell(3);
            fechaCell = row.insertCell(4);
            horaCell = row.insertCell(5);




        nombreCell.innerHTML = list[i].nombre;
        apellidoCell.innerHTML = list[i].apellido;
        dniCell.innerHTML = list[i].dni;
        dolenciaCell.innerHTML = list[i].dolencia;
        fechaCell.innerHTML = list[i].fecha;
        horaCell.innerHTML = list[i].hora;

    }
}