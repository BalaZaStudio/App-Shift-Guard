
const cuadranteButton = document.getElementById("cuadranteButton");
const mainContainer = document.getElementById("mainContainer");
const calendarContainer = document.getElementById("calendarContainer");
const calendar = document.getElementById("calendar");
const backToMainButton = document.getElementById("backToMain");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const currentMonthText = document.getElementById("currentMonth");


// Obtener la fecha actual al cargar
let currentDate = new Date(); // Obtener la fecha actual

let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function updateCalendar() {
  calendar.innerHTML = ""; // Limpiar el calendario

  // Crear el calendario (puedes utilizar una librería de calendario aquí)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Ajustar el primer día de la semana según la fecha real del 1 de octubre de 2023
  const adjustedStartingDay = new Date(currentYear, currentMonth, 1).getDay();


  // Crear un array de nombres de días de la semana en el orden español
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];


  // Llenar los días del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");

    // Calcular el día de la semana actual (0 para domingo, 1 para lunes, ..., 6 para sábado)
    const currentDayOfWeek = (adjustedStartingDay + day - 1) % 7;

    // Agregar el número del día al elemento
    dayElement.textContent = day;

    // Agregar el nombre completo del día de la semana debajo del número
    const dayOfWeekElement = document.createElement("div");
    dayOfWeekElement.classList.add("day-of-week");
    dayOfWeekElement.textContent = daysOfWeek[currentDayOfWeek];
    dayElement.appendChild(dayOfWeekElement);

    // Agregar evento "Guardia" al hacer clic
    dayElement.addEventListener("click", () => {
      if (!events[currentYear + "-" + (currentMonth + 1) + "-" + day]) {
        events[currentYear + "-" + (currentMonth + 1) + "-" + day] = "Guardia";
      } else {
        delete events[currentYear + "-" + (currentMonth + 1) + "-" + day];
      }
      saveEventsToLocalStorage(events); // Guardar eventos en el almacenamiento local
      updateCalendarView(); // Actualizar vista de eventos
    });

    calendar.appendChild(dayElement);
  }

  // Actualizar automáticamente la vista de eventos
  updateCalendarView();

  // Actualizar el encabezado con el mes y año actuales
  currentMonthText.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
}


// Función para obtener el nombre del mes
function getMonthName(month) {
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return monthNames[month];
}

// Función para cambiar al mes anterior
prevMonthButton.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  updateCalendar();
});

// Función para cambiar al mes siguiente
nextMonthButton.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateCalendar();
});

// Función para guardar eventos en el almacenamiento local
function saveEventsToLocalStorage(events) {
  localStorage.setItem("guardiaEvents", JSON.stringify(events));
}

// Función para cargar eventos desde el almacenamiento local
function loadEventsFromLocalStorage() {
  const storedEvents = localStorage.getItem("guardiaEvents");
  return storedEvents ? JSON.parse(storedEvents) : {};
}

let events = loadEventsFromLocalStorage(); // Cargar eventos guardia

function updateCalendarView() {
  const dayElements = calendar.querySelectorAll(".day");
  dayElements.forEach((dayElement) => {
    const day = parseInt(dayElement.textContent);
    if (events[currentYear + "-" + (currentMonth + 1) + "-" + day]) {
      dayElement.classList.add("guardia");
    } else {
      dayElement.classList.remove("guardia");
    }

    // Marcar los sábados y domingos como días de fin de semana
    const currentDay = new Date(currentYear, currentMonth, day).getDay();
    if (currentDay === 0 || currentDay === 6) { // 0 es domingo, 6 es sábado
      dayElement.classList.add("fin-de-semana");
      dayElement.classList.remove("laborable");
    } else {
      dayElement.classList.remove("fin-de-semana");
      dayElement.classList.add("laborable");
    }
  });
}

// Función para abrir la ventana de Cuadrante
cuadranteButton.addEventListener("click", () => {
  mainContainer.style.animationName = "fadeOut"; // Animación de desaparición de la ventana principal
  mainContainer.style.display = "none"; // Ocultar la ventana principal
  calendarContainer.style.display = "flex"; // Mostrar la ventana de Cuadrante
});

// Función para volver a la ventana principal
backToMainButton.addEventListener("click", () => {
  calendarContainer.style.animationName = "fadeOut"; // Animación de desaparición de la ventana de Cuadrante
  calendarContainer.style.display = "none"; // Ocultar la ventana de Cuadrante
  mainContainer.style.display = "block"; // Mostrar la ventana principal
});

// Evento para mostrar la ventana de "Guardias" al hacer clic en el botón "Guardias"
document.querySelector("button#guardiasButton").addEventListener("click", () => {
  mainContainer.style.animationName = "fadeOut";
  mainContainer.style.display = "none";
  guardiasContainer.style.display = "block";
});

// Evento para mostrar la ventana de "Historial" al hacer clic en el botón "Historial"
document.querySelector("button#historialButton").addEventListener("click", () => {
  mainContainer.style.animationName = "fadeOut";
  mainContainer.style.display = "none";
  historialContainer.style.display = "block";
  loadGuardiaHistory();
});

// Evento para volver a la ventana principal desde la ventana de historial
document.querySelector("button#volverPrincipalDesdeHistorial").addEventListener("click", () => {
  historialContainer.style.animationName = "fadeOut";
  historialContainer.style.display = "none";
  mainContainer.style.display = "block";
});

// Obtener referencias a elementos del formulario de "Guardias"
const guardiasContainer = document.getElementById("guardiasContainer");
const nombreInput = document.getElementById("nombre");
const empleoInput = document.getElementById("empleo");
const fechaInput = document.getElementById("fecha");
const imagen1Input = document.getElementById("imagen1");
const imagen2Input = document.getElementById("imagen2");
const guardarGuardiaButton = document.getElementById("guardarGuardia");
const volverPrincipalButton = document.getElementById("volverPrincipal");

// Obtener referencias a elementos de la ventana de "Historial"
const historialContainer = document.getElementById("historialContainer");
const historialTable = document.getElementById("historialTable");
const totalHorasGuardias = document.getElementById("totalHorasGuardias");
const totalGuardias = document.getElementById("totalGuardias");

// Evento para mostrar la ventana de "Guardias" al hacer clic en el botón "Guardias"
document.querySelector("button#guardiasButton").addEventListener("click", () => {
  mainContainer.style.animationName = "fadeOut";
  mainContainer.style.display = "none";
  guardiasContainer.style.display = "block";
});

// Evento para volver a la ventana principal desde la ventana de "Guardias"
volverPrincipalButton.addEventListener("click", () => {
  guardiasContainer.style.animationName = "fadeOut";
  guardiasContainer.style.display = "none";
  mainContainer.style.display = "block";
});

// Evento para guardar una nueva guardia
guardarGuardiaButton.addEventListener("click", () => {
  // Obtener los valores de los campos de entrada
  const nombre = nombreInput.value;
  const empleo = empleoInput.value; // Aquí obtienes el valor seleccionado
  const fecha = fechaInput.value;
  const imagen1 = imagen1Input.files[0];
  const imagen2 = imagen2Input.files[0];

  // Validar que se haya ingresado un nombre, empleo y fecha
  if (!nombre || !empleo || !fecha) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, complete todos los campos.',
    });
    return;
  }

  // Crear un objeto de guardia con la información
  const guardia = {
    nombre,
    empleo,
    fecha,
  };

  // Agregar las imágenes al objeto de guardia si están disponibles
  if (imagen1) {
    guardia.imagen1 = imagen1;
  }
  if (imagen2) {
    guardia.imagen2 = imagen2;
  }

  // Guardar la guardia en IndexedDB
  guardarGuardiaEnIndexedDB(guardia);

  // Limpiar los campos de entrada
  nombreInput.value = "";
  empleoInput.value = "";
  fechaInput.value = "";
  imagen1Input.value = "";
  imagen2Input.value = "";

  // Mostrar un mensaje de éxito
  Swal.fire({
    icon: 'success',
    title: 'Éxito',
    text: 'Guardia registrada con éxito.',
  });

  // Actualizar el contador de guardias en la ventana principal
  updateGuardiasCounter();
});

// Función para guardar una guardia en IndexedDB
function guardarGuardiaEnIndexedDB(guardia) {
  // Variable para almacenar la referencia al almacén de objetos
  let guardiasStore;

  // Abre la base de datos o crea una nueva si no existe
  const request = indexedDB.open("GuardiasDB", 1);

  request.onerror = function (event) {
    console.error("Error al abrir la base de datos:", event.target.error);
  };


  // Configurar la estructura de la base de datos si es necesario
  request.onupgradeneeded = function (event) {
    const db = event.target.result;

    // Crea un almacén de objetos llamado "guardias"
    if (!db.objectStoreNames.contains("guardias")) {
      db.createObjectStore("guardias", { keyPath: "id" }); // Puedes ajustar la clave primaria según tus necesidades
    }
  };

  // Maneja la apertura exitosa de la base de datos
  request.onsuccess = function (event) {
    const db = event.target.result;

    // Verifica si el almacén de objetos ya existe
    if (!db.objectStoreNames.contains("guardias")) {
      // Si no existe, crea el almacén de objetos
      const versionChangeTransaction = db.transaction([], "versionchange");
      versionChangeTransaction.onerror = function (event) {
        console.error("Error al crear el almacén de objetos:", event.target.error);
      };
      versionChangeTransaction.oncomplete = function () {
        console.log("Almacén de objetos 'guardias' creado.");
      };
      const objectStore = db.createObjectStore("guardias", { keyPath: "id", autoIncrement: true });
    }

    // Realiza una transacción de escritura en el almacén de objetos de guardias
    const transaction = db.transaction(["guardias"], "readwrite");
    guardiasStore = transaction.objectStore("guardias");


    // Agregar la guardia al almacén de objetos
    const addRequest = guardiasStore.add(guardia);

    addRequest.onsuccess = function () {
      console.log("Guardia agregada a IndexedDB:", guardia);
    };

    addRequest.onerror = function () {
      console.error("Error al agregar la guardia a IndexedDB:", addRequest.error);
    };

    // Completar la transacción
    transaction.oncomplete = function () {
      console.log("Transacción completada.");
      db.close();
    };

    transaction.onerror = function () {
      console.error("Error en la transacción:", transaction.error);
    };
  };
}

// Función para cargar el historial de guardias desde IndexedDB
function loadGuardiaHistory() {
  // Abrir la base de datos o crearla si no existe
  const request = indexedDB.open("GuardiasDB", 1);

  request.onerror = function (event) {
    console.error("Error al abrir la base de datos:", event.target.error);
  };

  // Manejar la apertura exitosa de la base de datos
  request.onsuccess = function (event) {
    const db = event.target.result;

    // Realizar una transacción de lectura en el almacén de objetos de guardias
    const transaction = db.transaction(["guardias"], "readonly");
    const guardiasStore = transaction.objectStore("guardias");

    // Obtener todos los registros de guardias
    const getAllRequest = guardiasStore.getAll();

    getAllRequest.onsuccess = function () {
      // Limpiar la tabla de historial
      historialTable.innerHTML = "";

      const guardias = getAllRequest.result;

      // Calcular el total de horas de guardias y el total de guardias registradas
      let totalHoras = 0;
      let totalGuardiasRegistradas = 0;

      // Recorrer las guardias y agregarlas a la tabla de historial
      guardias.forEach((guardia) => {
        const tableRow = document.createElement("div");
        tableRow.classList.add("historial-row");

        const nombreCell = document.createElement("div");
        nombreCell.textContent = `Nombre: ${guardia.nombre}`;
        tableRow.appendChild(nombreCell);

        const empleoCell = document.createElement("div");
        empleoCell.textContent = `Empleo: ${guardia.empleo}`;
        tableRow.appendChild(empleoCell);

        const fechaCell = document.createElement("div");
        fechaCell.textContent = `Fecha de Guardia: ${guardia.fecha}`;
        tableRow.appendChild(fechaCell);

        const horasCell = document.createElement("div");
        const horasGuardia = calcularHorasGuardia(guardia);
        horasCell.textContent = `Horas de Guardia: ${horasGuardia} horas`;
        tableRow.appendChild(horasCell);

        // Botón para eliminar la guardia
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => {
          eliminarGuardiaDeIndexedDB(guardia.id);
        });
        tableRow.appendChild(deleteButton);

        // Botón para ver las imágenes adjuntas
        if (guardia.imagen1 || guardia.imagen2) {
          const viewImagesButton = document.createElement("button");
          viewImagesButton.textContent = "Ver Imágenes";
          viewImagesButton.addEventListener("click", () => {
            verImagenesAdjuntas(guardia);
          });
          tableRow.appendChild(viewImagesButton);
        }

        historialTable.appendChild(tableRow);

        // Actualizar el total de horas y el total de guardias registradas
        totalHoras += horasGuardia;
        totalGuardiasRegistradas++;
      });

      // Actualizar el contador de horas de guardias y el contador de guardias
      totalHorasGuardias.textContent = totalHoras;
      totalGuardias.textContent = totalGuardiasRegistradas;

      // Llama a la función de paginación después de agregar todas las guardias
      updatePagination();
    };

    getAllRequest.onerror = function () {
      console.error("Error al obtener las guardias desde IndexedDB:", getAllRequest.error);
    };

    // Completar la transacción
    transaction.oncomplete = function () {
      console.log("Transacción completada.");
      db.close();
    };

    transaction.onerror = function () {
      console.error("Error en la transacción:", transaction.error);
    };
  };
}



// Función para calcular las horas de guardia de una guardia
function calcularHorasGuardia(guardia) {
  // Aquí puedes implementar la lógica para calcular las horas de guardia
  // Asumiremos que hay una diferencia de 24 horas entre el inicio y el fin de la guardia
  return 24;
}

// Función para eliminar una guardia de IndexedDB
function eliminarGuardiaDeIndexedDB(guardiaId) {
  // Abrir la base de datos o crearla si no existe
  const request = indexedDB.open("GuardiasDB", 1);

  request.onerror = function (event) {
    console.error("Error al abrir la base de datos:", event.target.error);
  };

  // Manejar la apertura exitosa de la base de datos
  request.onsuccess = function (event) {
    const db = event.target.result;

    // Realizar una transacción de escritura en el almacén de objetos de guardias
    const transaction = db.transaction(["guardias"], "readwrite");
    const guardiasStore = transaction.objectStore("guardias");

    // Eliminar la guardia por su ID
    const deleteRequest = guardiasStore.delete(guardiaId);

    deleteRequest.onsuccess = function () {
      console.log(`Guardia con ID ${guardiaId} eliminada.`);
      loadGuardiaHistory(); // Recargar el historial después de la eliminación
    };

    deleteRequest.onerror = function () {
      console.error(
        `Error al eliminar la guardia con ID ${guardiaId}:`,
        deleteRequest.error
      );
    };

    // Completar la transacción
    transaction.oncomplete = function () {
      console.log("Transacción completada.");
      db.close();
    };

    transaction.onerror = function () {
      console.error("Error en la transacción:", transaction.error);
    };
  };
}

// Función para ver las imágenes adjuntas de una guardia
function verImagenesAdjuntas(guardia) {
  // Crear una ventana emergente o una superposición para mostrar las imágenes
  const overlay = document.createElement("div");
  overlay.classList.add("image-overlay");

  // Crear un contenedor para las imágenes
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  // Función para cerrar la ventana emergente
  function cerrarVentana() {
    overlay.remove();
  }

  // Crear un botón para cerrar la ventana
  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.textContent = "X";
  closeButton.addEventListener("click", cerrarVentana);

  overlay.addEventListener("click", cerrarVentana);

  // Función para detener la propagación del evento de clic en el contenedor de imágenes
  imageContainer.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Crear elementos de imagen para las imágenes adjuntas
  if (guardia.imagen1) {
    const image1 = document.createElement("img");
    image1.src = URL.createObjectURL(guardia.imagen1);
    image1.style.maxWidth = "400px";
    image1.style.maxHeight = "650px";
    imageContainer.appendChild(image1);
  }

  if (guardia.imagen2) {
    const image2 = document.createElement("img");
    image2.src = URL.createObjectURL(guardia.imagen2);
    image2.style.maxWidth = "400px";
    image2.style.maxHeight = "650px";
    imageContainer.appendChild(image2);
  }

  // Agregar el botón de cierre y el contenedor de imágenes a la ventana emergente
  overlay.appendChild(closeButton);
  overlay.appendChild(imageContainer);

  // Agregar la ventana emergente al cuerpo del documento
  document.body.appendChild(overlay);
}

// Función para inicializar la base de datos
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("GuardiasDB", 1);

    request.onerror = function (event) {
      console.error("Error al abrir la base de datos:", event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      // Verificar si el almacén de objetos 'guardias' ya existe
      if (!db.objectStoreNames.contains("guardias")) {
        // Si no existe, créalo aquí
        const guardiasStore = db.createObjectStore("guardias", {
          keyPath: 'id',
          autoIncrement: true
        });
        // Puedes definir la estructura del almacén de objetos aquí, si es necesario
        // guardiasStore.createIndex("nombre", "nombre", { unique: false });
      }
    };
  });
}

// Función para actualizar el contador de guardias en la ventana principal
function updateGuardiasCounter() {
  // Inicializar la base de datos
  initDB()
    .then((db) => {
      // Realizar una transacción de lectura en el almacén de objetos de guardias
      const transaction = db.transaction("guardias", "readonly");
      const guardiasStore = transaction.objectStore("guardias");

      // Obtener todos los registros de guardias
      const getAllRequest = guardiasStore.getAll();

      getAllRequest.onsuccess = function () {
        // Obtener el número total de guardias registradas
        const totalGuardias = getAllRequest.result.length;

        // Actualizar el contador en la ventana principal
        const guardiasButton = document.getElementById("guardiasButton");
        guardiasButton.textContent = `Guardias (${totalGuardias})`;

        // Completar la transacción
        transaction.oncomplete = function () {
          console.log("Transacción completada.");
        };
      };

      getAllRequest.onerror = function () {
        console.error(
          "Error al obtener las guardias desde IndexedDB:",
          getAllRequest.error
        );
      };
    })
    .catch((error) => {
      console.error("Error al inicializar la base de datos:", error);
    });
}

// Llamar a la función para actualizar el contador de guardias
updateGuardiasCounter();

document.getElementById("crearDB").addEventListener("click", function () {
  // Nombre de la base de datos y versión
  const dbName = "GuardiasDB";
  const dbVersion = 1;

  // Intenta abrir la base de datos o crear una nueva si no existe
  const request = indexedDB.open(dbName, dbVersion);

  // Manejar errores en la apertura de la base de datos
  request.onerror = function (event) {
    console.error("Error al abrir o crear la base de datos:", event.target.error);
  };

  // Manejar el éxito de la apertura o creación de la base de datos
  request.onsuccess = function (event) {
    const db = event.target.result;
    console.log("Base de datos creada o abierta con éxito:", db);

    // Puedes realizar más operaciones aquí, como crear almacenes de objetos y más.
  };

  // Definir el esquema de la base de datos (si es necesario)
  request.onupgradeneeded = function (event) {
    const db = event.target.result;

    // Crea un almacén de objetos llamado "guardias" si no existe
    if (!db.objectStoreNames.contains("guardias")) {
      db.createObjectStore("guardias", { keyPath: "id", autoIncrement: true });
      console.log("Almacén de objetos 'guardias' creado.");
    }
  };
});

document.getElementById("eliminarDB").addEventListener("click", function () {
  // Nombre de la base de datos a eliminar
  const dbName = "GuardiasDB";

  // Intenta eliminar la base de datos
  const deleteRequest = indexedDB.deleteDatabase(dbName);

  // Manejar el éxito o el error al eliminar la base de datos
  deleteRequest.onsuccess = function () {
    console.log("Base de datos eliminada con éxito.");
  };

  deleteRequest.onerror = function (event) {
    console.error("Error al eliminar la base de datos:", event.target.error);
  };
});


// Inicializar el calendario al cargar la página
function updateCalendar() {
  calendar.innerHTML = ""; // Limpiar el calendario

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const adjustedStartingDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");

    const currentDayOfWeek = (adjustedStartingDay + day - 1) % 7;

    dayElement.textContent = day;

    const dayOfWeekElement = document.createElement("div");
    dayOfWeekElement.classList.add("day-of-week");
    dayOfWeekElement.textContent = daysOfWeek[currentDayOfWeek];
    dayElement.appendChild(dayOfWeekElement);

    // Evento para "Guardia"
    dayElement.addEventListener("click", () => {
      if (!events[currentYear + "-" + (currentMonth + 1) + "-" + day]) {
        events[currentYear + "-" + (currentMonth + 1) + "-" + day] = "Guardia";
      } else {
        delete events[currentYear + "-" + (currentMonth + 1) + "-" + day];
      }
      saveEventsToLocalStorage(events);
      updateCalendarView();
    });

    calendar.appendChild(dayElement);
  }

  updateCalendarView();
  currentMonthText.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
}

// Llamar a updateCalendar inicialmente
updateCalendar();

// Actualizar el mes y el año actuales cada minuto
setInterval(() => {
  const now = new Date();
  if (now.getMonth() !== currentMonth || now.getFullYear() !== currentYear) {
    currentMonth = now.getMonth();
    currentYear = now.getFullYear();
    updateCalendar();
  }
}, 60000); // Cada minuto

// Actualizar el contador de guardias en la ventana principal al cargar la página
updateGuardiasCounter();

// Agrega un estado de modo oscuro a localStorage para recordar la preferencia
// (1 para modo oscuro, 0 para modo claro)
function setDarkModePreference(isDarkMode) {
  localStorage.setItem("darkMode", isDarkMode ? "1" : "0");
}

// Cambia entre el modo claro y oscuro
function toggleDarkMode() {
  const body = document.body;

  // Verifica el estado actual del modo
  const isDarkMode = body.classList.toggle("dark-mode");

  // Guarda la preferencia del usuario en localStorage
  setDarkModePreference(isDarkMode);
}

// Verifica la preferencia de modo oscuro guardada en localStorage al cargar la página
function checkDarkModePreference() {
  const body = document.body;
  const darkModePreference = localStorage.getItem("darkMode");

  if (darkModePreference === "1") {
    body.classList.add("dark-mode");
  }
}

// Ejecuta la verificación de modo oscuro al cargar la página
checkDarkModePreference();

// Función para mostrar u ocultar los botones de Crear y Eliminar Base de Datos
function toggleSettings() {
  const crearDBButton = document.getElementById("crearDB");
  const eliminarDBButton = document.getElementById("eliminarDB");

  // Comprueba si los botones están visibles y los oculta, o viceversa
  if (crearDBButton.style.display === "none" || crearDBButton.style.display === "") {
    crearDBButton.style.display = "block";
    eliminarDBButton.style.display = "block";
  } else {
    crearDBButton.style.display = "none";
    eliminarDBButton.style.display = "none";
  }
}

const itemsPerPage = 5; // Cantidad de elementos por página
let currentPage = 1; // Página actual

const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

function updatePagination() {
  const historialTable = document.getElementById("historialTable");
  const totalItems = historialTable.children.length; // Cantidad total de elementos
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Habilitar/deshabilitar botones de navegación
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;

  // Aplica la clase 'hidden' a todas las filas
  const allRows = historialTable.querySelectorAll(".historial-row");
  allRows.forEach((row) => {
    row.classList.add("hidden");
  });

  // Calcula el rango de elementos a mostrar
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  // Muestra solo las filas del rango actual eliminando la clase 'hidden'
  for (let i = startIndex; i < endIndex && i < totalItems; i++) {
    const row = allRows[i];
    if (row) {
      row.classList.remove("hidden");
    }
  }

  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
}


prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updatePagination();
  }
});

nextPageButton.addEventListener("click", () => {
  const historialTable = document.getElementById("historialTable");
  const totalItems = historialTable.children.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (currentPage < totalPages) {
    currentPage++;
    updatePagination();
  }
});

// Llama a updatePagination cuando se carga la página completamente
document.addEventListener("DOMContentLoaded", () => {
  updatePagination();
  // Llama a updatePagination después de asegurarte de que los elementos estén disponibles
  const historialTable = document.getElementById("historialTable");
  if (historialTable) {
    updatePagination();
  }
});

// Agregar evento al icono de reloj
const clockIcon = document.getElementById("clockIcon");
const clockPopup = document.getElementById("clockPopup"); // Asegúrate de que esta ID coincida con tu HTML

clockIcon.addEventListener("click", (event) => {
  event.stopPropagation(); // Evitar que el clic en el icono cierre el popup inmediatamente
  // Calcular los datos de guardias totales y horas de guardia acumuladas
  initDB()
    .then((db) => {
      const transaction = db.transaction("guardias", "readonly");
      const guardiasStore = transaction.objectStore("guardias");

      const getAllRequest = guardiasStore.getAll();

      getAllRequest.onsuccess = function () {
        const guardias = getAllRequest.result;
        const totalGuardias = guardias.length;

        let totalHoras = 0;
        guardias.forEach((guardia) => {
          const horasGuardia = calcularHorasGuardia(guardia);
          totalHoras += horasGuardia;
        });

        // Mostrar la ventana emergente con los datos
        showClockPopup(totalGuardias, totalHoras);
      };

      getAllRequest.onerror = function () {
        console.error(
          "Error al obtener las guardias desde IndexedDB:",
          getAllRequest.error
        );
      };
    })
    .catch((error) => {
      console.error("Error al inicializar la base de datos:", error);
    });
});

// Función para mostrar la ventana emergente
function showClockPopup(totalGuardias, totalHoras) {
  clockPopup.style.display = "block";
  // Aquí puedes agregar el contenido de la ventana emergente usando totalGuardias y totalHoras
  clockPopup.innerHTML = `
    <div class="clock-content">
      <h3>Total de Guardias: ${totalGuardias}</h3>
      <p>Total de Horas: ${totalHoras}</p>
      <button id="closeButton">Cerrar</button>
    </div>
  `;

  // Cerrar la ventana emergente automáticamente después de 5 segundos
  setTimeout(() => {
    clockPopup.style.display = "none";
  }, 2000);

  // Agregar evento al botón de cerrar manual
  const closeButton = document.getElementById("closeButton");
  closeButton.addEventListener("click", closeClockPopup);
}

// Cerrar la ventana emergente al hacer clic fuera de ella
document.addEventListener("click", (event) => {
  // Verificar si el clic fue fuera de la ventana emergente y del icono
  if (clockPopup.style.display === "block" && 
      !clockPopup.contains(event.target) && 
      event.target !== clockIcon) {
    clockPopup.style.display = "none"; // Cierra la ventana emergente
  }
});

// Función para cerrar la ventana emergente manualmente
function closeClockPopup() {
  clockPopup.style.display = "none";
}


// Función para mostrar la ventana emergente con los datos
function showClockPopup(totalGuardias, totalHoras) {
  const clockPopup = document.createElement("div");
  clockPopup.classList.add("clock-popup");

  const clockContent = document.createElement("div");
  clockContent.classList.add("clock-content");
  clockContent.innerHTML = `
<p>Total de Guardias: ${totalGuardias}</p>
<p>Total de Horas de Guardia: ${totalHoras} horas</p>
`;

  clockPopup.appendChild(clockContent);
  document.body.appendChild(clockPopup);

  // Agregar evento para cerrar la ventana emergente al hacer clic fuera de ella
  clockPopup.addEventListener("click", (e) => {
    if (e.target === clockPopup) {
      clockPopup.remove();
    }
  });

  // Mostrar la ventana emergente
  clockPopup.style.display = "block";
}


