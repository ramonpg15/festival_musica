document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});
let iniciarApp = () => {
  navegacionFija();
  crearGaleria();
  scrollNav();
};
let navegacionFija = () => {
  const barra = document.querySelector("header");
  const sobreFestival = document.querySelector(".sobre-festival");
  const body = document.querySelector("body")
  window.addEventListener("scroll", () => {
    if (sobreFestival.getBoundingClientRect().bottom < 0) {//para saber la posisicon de la barra
      barra.classList.add("fijo");
      body.classList.add("body-scroll")
    } else {
      barra.classList.remove("fijo");
      body.classList.remove("body-scroll")
    }
  });
};
let scrollNav = () => {
  //primero leer los enlaces
  const enlaces = document.querySelectorAll(".navegacion-principal a");
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      const seccionScroll = e.target.attributes.href.value;
      /* const seccionScroll2 = "." + seccionScroll.substr(1);
      const seccion = document.querySelector(seccionScroll2); */
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
};
let crearGaleria = () => {
  const galeria = document.querySelector(".galeria-imagenes");
  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("PICTURE");
    imagen.innerHTML = ` <picture>
      <source srcset="build/img/thumb/${i}.avif" type="image/avif">
      <source srcset="build/img/thumb/${i}.webp" type="image/webp">
      <img width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagenVocalista">
    </picture>`;
    imagen.onclick = () => {
      mostrarImagen(i);
    };
    galeria.appendChild(imagen);
  }
};
let mostrarImagen = (id) => {
  const imagen = document.createElement("PICTURE");
  imagen.innerHTML = ` <picture>
      <source srcset="build/img/grande/${id}.avif" type="image/avif">
      <source srcset="build/img/grande/${id}.webp" type="image/webp">
      <img width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagenVocalista">
    </picture>`;
  //crear el overlay con la imagen
  const overlay = document.createElement("DIV");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");
  overlay.onclick = () => {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };
  //añadirlo al html
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
  //boton para cerrar el modal
  const cerrarModal = document.createElement("P");
  cerrarModal.textContent = "X";
  cerrarModal.classList.add("btn-cerrar");
  //para cerrar el modal
  cerrarModal.onclick = () => {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };
  overlay.appendChild(cerrarModal);
};
