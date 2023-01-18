"use strict";
const form = document.querySelector("#form");
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const regEx =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Eventos
window.onload = () => {
  form.addEventListener("submit", enviarMail);
  email.addEventListener("input", quitarAlerta);
  asunto.addEventListener("input", quitarAlerta);
  mensaje.addEventListener("input", quitarAlerta);
  cc.addEventListener("input", quitarAlerta);
};

function quitarAlerta(e) {
  const alerta = e.target.parentElement.querySelector(".form-alerta");
  if (alerta) {
    if (
      (regEx.test(e.target.value) && e.target.name === "email") ||
      e.target.name === "cc"
    ) {
      alerta.remove();
      return;
    }

    if (
      (e.target.value && e.target.name === "asunto") ||
      e.target.name === "mensaje"
    ) {
      alerta.remove();
      return;
    }
  }
}

//Funciones
function enviarMail(e) {
  e.preventDefault();

  //Creamos un objeto con los datos ingresados en los campos
  const emailObj = {
    email: email.value,
    asunto: asunto.value,
    mensaje: mensaje.value,
  };

  //Funcion donde van a estar todas las validaciones del formulario
  validation(emailObj);
}

function validation(obj) {
  //Validacion del mail
  if (!obj.email) {
    alerta(
      document.querySelector(".form-email"),
      "Por favor ingrese un correo electronico"
    );
    obj.email = "";
  }
  if (!regEx.test(obj.email)) {
    alerta(document.querySelector(".form-email"), "El correo no es valido");
    obj.email = "";
  }

  //Validar el CC del formulario
  const cc = document.querySelector("#cc");
  if (cc.value.length > 0 && !regEx.test(cc.value)) {
    alerta(document.querySelector(".form-cc"), "El cc no es valido");
  }

  //Validar el asunto
  if (!obj.asunto) {
    alerta(
      document.querySelector(".form-asunto"),
      "Por favor ingrese el asunto de su correo "
    );
    obj.asunto = "";
  }

  //Validar el mensaje
  if (!obj.mensaje) {
    alerta(
      document.querySelector(".form-mensaje"),
      "Por favor ingrese el mensaje de su correo "
    );
    obj.mensaje = "";
  }

  //Simular el envio del correo
  if (!Object.values(obj).includes("")) {
    const btn = document.querySelector('button[type="submit"]');

    if (cc.value.length > 0 && !regEx.test(cc.value)) {
      return;
    }

    //Elimina todoo los hijos del btn
    while (btn.firstChild) {
      btn.removeChild(btn.firstChild);
    }
    btn.disabled = true;

    //Contenedor del spinner y el texto
    const container = document.createElement("DIV");
    container.className = "d-flex align-items-center justify-content-center";
    btn.appendChild(container);

    //Spinner
    const spinner = document.createElement("SPAN");
    spinner.style = "width: 2rem; height: 2rem";
    spinner.className = "spinner-border spinner-border-sm me-1";
    spinner.role = "status";
    spinner.ariaHidden = true;
    btn.appendChild(spinner);

    //Accesibilidad
    const accesibilidad = document.createElement("SPAN");
    accesibilidad.className = "visually-hidden";
    accesibilidad.textContent = "Cargando el envio";
    btn.appendChild(accesibilidad);

    //Texto
    const texto = document.createElement("SPAN");
    texto.textContent = "Enviando";
    texto.className = "btn-texto";
    btn.appendChild(texto);

    //quitar Spinner y mostrar mensanje de correo enviado
    setTimeout(() => {
      //Elimina todoo los hijos del btn
      while (btn.firstChild) {
        btn.removeChild(btn.firstChild);
      }
      //Habilitando el boton y mostrar el texto
      btn.disabled = false;
      texto.textContent = "Enviar";
      btn.appendChild(texto);

      //formatear el formulario
      form.reset();

      //mostrar alerta de envio correctamente
      const alerta = document.createElement("P");
      alerta.className =
        "text-center p-1 border border-success text-success mb-0 mt-1";
      alerta.textContent = "Correo enviado correctamente";
      document.querySelector(".email-contenido").appendChild(alerta);
      setTimeout(() => {
        alerta.remove();
      }, 3000);
    }, 3000);
  }
}

function alerta(ref, mensaje) {
  const p = document.createElement("P");
  p.innerHTML = `<i class="bi bi-exclamation-circle text-danger"></i> ${mensaje}`;
  p.className = "text-danger form-alerta mt-1";

  const alerta = ref.querySelector(".form-alerta");
  if (!alerta) {
    ref.appendChild(p);
  }
}
