document.addEventListener('DOMContentLoaded', function() {
    // Objeto Usuario
    const Usuario = {
        Nombre: "Ash Ketchum",
        Pin: '1234',
        Saldo: 1000
    };

    let Almacenador = '';
    const input_pin = document.getElementById('pin-contenedor');
    
    // Configuración de validate.js
    const constraints = {
        pin: {
            presence: true,
            length: {
                is: 4,
                
            },
            numericality: {
                onlyInteger: true,
                message: "debe contener solo números"
            }
        }
    };

    let botones = document.querySelectorAll("button.boton");
    const botonEntrar = document.querySelector('.boton-entrar');
    const botonBorrar = document.querySelector('.boton-delete');

    // Event listeners para los botones numéricos
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            let valor_boton = boton.textContent;
            
            if(Almacenador.length < 4) {
                Almacenador += valor_boton;
                input_pin.textContent = '*'.repeat(Almacenador.length);
            }
        });
    });

    // Event listener para el botón de entrar
    botonEntrar.addEventListener('click', () => {
        // Validación con validate.js
        const validation = validate({pin: Almacenador}, constraints);
        
        if (validation) {
            
            Swal.fire({
                icon: 'error',
                title: 'Error de validación',
                text: validation.pin.join(', '),
                confirmButtonText: 'Entendido'
            });
            return;
        }
        
       
        if (Almacenador === Usuario.Pin) {
            Swal.fire({
                icon: 'success',
                title: 'Inicio Exitoso',
                timer: 1500,
                showConfirmButton: false 
            }).then(() => {
                window.location.href = 'Banco-principal.html';
            });
        } else {
            Almacenador = '';
            input_pin.textContent = '';
            Swal.fire({
                icon: 'error',
                title: 'Pin Incorrecto',
                confirmButtonText: 'Entendido'
            });
        }
    });

    
    botonBorrar.addEventListener('click', () => {
        Almacenador = Almacenador.slice(0, -1);
        input_pin.textContent = '*'.repeat(Almacenador.length);
    });
});