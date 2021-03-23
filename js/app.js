// variables
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nueva-cita');

const contenedorCitas = document.querySelector('#citas');

eventListener()
function eventListener(){
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit' , nuevaCita); 

};

// clases
class Citas {
    constructor (){
        this.citas = [];
    };
    agregarCita ( cita) {
        this.citas = [...this.citas, cita]
        console.log(this.citas)
    }
};

class UI {
    imprimirAlerta (mensaje, tipo){
         const divMensaje = document.createElement('div');
         divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

    // clase según error
        if ( tipo === 'error'){
            divMensaje.classList.add('alert-danger')
        }else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje; 

        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        setTimeout(() => {
            divMensaje.remove();
        }, 4000);
    };

    imprimirCitas({citas}){
        this.limpiarHTML();

        citas.forEach(cita => {
            const {mascota, propietario, telefono,fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title' , 'font-weight-bolder');
            mascotaParrafo.textContent = mascota; 

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class='font-weight-bolder'>Propietario:</span> ${propietario};
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class='font-weight-bolder'>Telefono:</span> ${telefono};
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class='font-weight-bolder'>Fecha:</span> ${fecha};
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class='font-weight-bolder'>Hora:</span> ${hora};
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class='font-weight-bolder'>Sintomas:</span> ${sintomas};
            `;

            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);

            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHTML() {
        while ( contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
};

// instanciar
const administradorCitas = new Citas();
const ui = new UI();

// name con los mismos nombres que las propiedades del obj
const citaOBJ = {
    mascota: '',
    propietario : '' ,
    telefono : '',
    fecha: '',
    hora: '',
    sintomas: ''
};

function datosCita (e) {
   citaOBJ[e.target.name]  = e.target.value
//    console.log(citaOBJ) 
}

// valida/ agrega cita
function nuevaCita(e){
    e.preventDefault()

    // extraer info 
    const {mascota, propietario, telefono,fecha, hora, sintomas} = citaOBJ;
    // valida
    if( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
    ui.imprimirAlerta('todos los campos son obligatorios', 'error');
    return;
    };

    citaOBJ.id = Date.now();
    // console.log(citaOBJ)

    administradorCitas.agregarCita({...citaOBJ});

    reiniciarObj ();

    formulario.reset();

    ui.imprimirCitas(administradorCitas);

};

function reiniciarObj () {
    citaOBJ.mascota = '',
    citaOBJ.propietario = '',
    citaOBJ.telefono = '',
    citaOBJ.fecha = '',
    citaOBJ.hora = '',
    citaOBJ.sintomas = ''
};