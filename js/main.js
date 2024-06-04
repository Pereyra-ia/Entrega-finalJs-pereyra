// arrays
const usuarios = [];
const pacientes = [];
const medicamentos = [];
const estudios= [];
const turnos = [];
const servicios = ["Clinico","traumatologo","Laboratorio", "Vacunatorio", "radiologia"];

// variables usuario
let contador = 0; 
let nomUsuario = "";
let dniUsuario = "";
// variables paciente
let nomPaciente = "";
let apePaciente = "";
let dniPaciente = "";
let medicacion = "";
let dolencia = "";
let servicio = "";
// variables turno
let fechaTurno = "";
let horaTurno = "";
let opcion = "";
let idTurno = "";
let nuevaFecha = "";
let nuevaHora = "";

// mensaje de fin del programa
const finPrograma = () => alert('Gracias por participar y hasta luego'); 
// generador id
const cont = () => contador++;

// Carga de datos usuario
function CargaUsuario() { 
    
    nomUsuario = prompt("Bienvenido a la Clinica Pereyra \n Hola, como te llamas? :");
    if (nomUsuario === null) {
        finPrograma();
        return null;
    }
    dniUsuario = prompt(" Por favor, ingresá tu DNI:");
    if (dniUsuario === null) {
        finPrograma();
        return null;
    }
    const usuario = {
        id: cont(),
        nomUsuario,
        dniUsuario
    };
    usuarios.push(usuario);

    return usuario.id;


}
// Ingreso de datos de los pacientes y sus turnos
const Cargadatos_pacientes = (numUsuario) => { 
    
    const cantidadPacientes = parseInt(prompt(" ¿ Cuantos pacientes vas a ingresar al sistema ?"));
    if (cantidadPacientes=== null) {
        alert("por favor ingrese un numero valido de pacientes");
        return;
    }
    for (let i = 0; i < cantidadPacientes; i++) {
        nomPaciente = prompt(`ingrese nombre del paciente ${i + 1}:`);
        if (nomPaciente === null) {
            finPrograma();
            return;
        }
        apePaciente = prompt(`ingrese apellido del paciente ${i}:`);
        if (apePaciente === null) {
            finPrograma();
            return;
        }
        dniPaciente = prompt(`ingrese dni de ${nomPaciente}:`);
        if (dniPaciente === null) {
            finPrograma();
            return;
        }
        medicacion = prompt('el/la paciente toma alguna medicacion ? si es asi ingrese le nombre de esa medicaion:');
        if (medicacion === null) {
            finPrograma();
            return;
        }
        dolencia = prompt('que dolencia tiene el paciente ?:');
        if (dolencia === null) {
            finPrograma();
            return;
        }
        const paciente = { 
            id: cont(),
            numUsuario,
            nomPaciente,
            apePaciente,
            dniPaciente,
            medicacion,
            dolencia
        };
        pacientes.push(paciente);

        // elegir servicio y turno para el servicio
        servicio = elegirServicio(nomPaciente);
        if (servicio === null) {
            finPrograma();
            return;
        }
        fechaTurno = prompt(` Fecha del turno para ${nomPaciente} (dd/mm/aaaa) `);
        if (fechaTurno === null) {
            finPrograma();
            return;
        }
        horaTurno = prompt(` Hora del turno para ${nomPaciente} (HH:MM) 🕒`);
        if (horaTurno === null) {
            finPrograma();
            return;
        }
        
        

        const turno = {
            id: cont(),
            idpaciente: paciente.id,
            fechaTurno,
            horaTurno,
            servicio
        };
        turnos.push(turno);
    }
};

// opcion del usuario
const elegirServicio = (nomPaciente) => {
    let servicioElegido = null;
    while (servicioElegido === null) { 
        const opcionServicio = prompt('¿Que servicio solicita el paciente? \n1.Clinico.\n2.traumatologo.\n3.Laboratorio.\n4.Vacunatorio.\n5.radiologia.\nElige una opción:');
        if (opcionServicio === null) {
            return null;
        }
        switch (opcionServicio) {
            case '1':
                servicioElegido = servicios[0];
                break;
            case '2':
                servicioElegido = servicios[1];
                break;
            case '3':
                servicioElegido = servicios[2];
                break;
            case '4':
                servicioElegido = servicios[3];
                break;
            case '5':
                servicioElegido = servicios[5];
                break;
            default:
                alert('ingrese un servicio valido');
        }
    }
    return servicioElegido;
};

// Menu
const Menu = (numUsuario) => {
    const menu = `
    Menú Clinica Pereyra 
1.  Dar de alta nueva paciente
2.  Ver turnos de pacientes
3.  Solicitar turno para paciente
4.  Modificar turno del paciente
5.  Eliminar turno del paciente
6.  Salir 
`;
    opcion = prompt(menu + '\n elija una de estas opciones: 1, 2, 3, 4, 5, 6 ');
    if (opcion === null) {
        finPrograma();
        return false;
    }

    switch (opcion) {
        case '1':
            Cargadatos_pacientes(numUsuario);
            break;
        case '2':
            mostrarMascotas(numUsuario);
            break;
        case '3':
            ingresarTurnos(numUsuario);
            break;
        case '4':
            modificarTurno(numUsuario);
            break;
        case '5':
            eliminarTurno(numUsuario);
            break;
        case '6':
            finPrograma();
            return false;
        default:
            alert('ingrese uno de los numeros dentro de las opciones');
            break;
    }
    return true;
};
// pacientes del usuario
const mostrarpacientes = (numUsuario) => {
    const pacientesUsuario = [];
    for (const paciente of pacientes) {
        if (paciente.numUsuario === numUsuario) {
            pacientesUsuario.push(paciente);
        }
    }
    let datosAMostrar = '';
    for (let i = 0; i < pacientesUsuario.length; i++) {
        const pacienteDelUsuario = pacientesUsuario[i];
        const turno = turnos.find(turno => turno.idpaciente === pacienteDelUsuario.id) || {};
        if (turno.fechaTurno) {
            datosAMostrar += `Para ${pacienteDelUsuario.nomPaciente} tenés un turno el ${turno.fechaTurno} a las ${turno.horaTurno} para ${turno.servicio}\n`;
        }
    }
    alert(`Los turnos a tu nombre son:\n ${datosAMostrar}`);
    
};

// Turnos del usuario
const mostrarTurnos = (numUsuario) => {
    const turnosUsuario = [];

    for (const turno of turnos) {
        const pacienteDelUsuario = pacientes.find(pacienteDelUsuario => pacienteDelUsuario.id === turno.idpaciente);
        if (pacienteDelUsuario && pacienteDelUsuario.numUsuario === numUsuario) {
            turnosUsuario.push(turno);
        }
    }

    let datosAMostrar = '';
    for (let i = 0; i < turnosUsuario.length; i++) {
        const turno = turnosUsuario[i];
        const pacienteDelUsuario = pacientes.find(pacienteDelUsuario => pacienteDelUsuario.id === turno.idpaciente);
        datosAMostrar += `Para ${pacienteDelUsuario.nomPaciente} tenés el turno número *${turno.id}* el ${turno.fechaTurno} a las ${turno.horaTurno} para ${turno.servicio}\n`;
    }

    alert(`${nomUsuario} los turnos a tu nombre son:\n ${datosAMostrar}`);
    
};

// Modificar un turno
const modificarTurno = (numUsuario) => {
    mostrarTurnos(numUsuario);
    idTurno = prompt("Ingrese numero de turno que quiera modificar: ");
    if (idTurno === null) {
        finPrograma();
        return;
    }
    idTurno = parseInt(idTurno);
    const turno = turnos.find(turno => turno.id === idTurno);
    if (turno) {
        nuevaFecha = prompt(" Ingrese la nueva fecha (dd/mm/aaaa): ");
        if (nuevaFecha === null) {
            finPrograma();
            return;
        }
        nuevaHora = prompt(" Ingrese la nueva hora (HH:MM): ");
        if (nuevaHora === null) {
            finPrograma();
            return;
        }
        nuevoServicio = elegirServicio();
        if (nuevoServicio === null) {
            finPrograma();
            return;
        }

        turno.fechaTurno = nuevaFecha;
        turno.horaTurno = nuevaHora;
        turno.servicio = nuevoServicio;
        alert("turno modificado exitosamente");
    } else {
        alert("numero de turno no encontrado, ingrese el numero correcto");
    }
};

// Eliminar un turno
const eliminarTurno = (numUsuario) => {
    mostrarTurnos(numUsuario);
    idTurno = prompt(" Ingrese numero del turno que quiere eliminar: ");
    if (idTurno === null) {
        alert("Cancelo la eliminación del turno, volvemos al menú");
        return;
    }
    idTurno = prompt(" Ingrese numero del turno que quiere eliminar: ");
    const index = turnos.findIndex(turno => turno.id === idTurno);
    if (index !== -1) { 
        turnos.splice(index, 1);
        alert("turno eliminado exitosamente");
    } else {
        alert("el número de turno que ingresaste no es valido");
    }
};

// Inicializacion del programa 
const numUsuario = CargaUsuario();
if (numUsuario !== null) { 
    Cargadatos_pacientes(numUsuario);

    seguir= Menu(numUsuario);
    while (seguir) {
        seguir = Menu(numUsuario); 
    }
}

