(function(){
	// Variables
	var lista = document.getElementById("lista"),
		tareaEnviada = document.getElementById("tarea"),
		enviar = document.getElementById("enviar");


	// Funciones
	var nuevaTarea = function(){
		var tarea = tareaEnviada.value,
			nuevaTareaLi = document.createElement("li"),
			contenido = document.createTextNode(tarea);
			botonEliminar = document.createElement("input");


		if (tarea === "") {
			tareaEnviada.setAttribute("placeholder", "Tarea Vacia");
			return false;
		}
		nuevaTareaLi.appendChild(contenido);
		lista.appendChild(nuevaTareaLi);
		nuevaTareaLi.appendChild(botonEliminar);
		botonEliminar.setAttribute("type", "button");
		botonEliminar.value = "BORRAR";
		tareaEnviada.value = "";

		function seleccionar(e){
			var li = e.parentELement;

			e.parentNode.parentNode.removeChild(e.parentNode.parentNode);

		};

		for (var i = 0; i <= lista.children.length -1; i++) {
			botonEliminar.addEventListener("click", eleminar);

		}
		/*
		var a = e.target;
		var padre = a.parentELement;
		var hermano  = a.nextElementSibling;
		var hermanoAtras = a.previousElementSibling;
		var hijos = hermano.firstChild;

		*/

	};
	var comprobar= function(){
		tareaEnviada.setAttribute("placeholder", "Agrega tu tarea");
	};

	var eleminar = function(){
		this.parentNode.parentNode.removeChild(this.parentNode);
	};

	enviar.addEventListener("click", nuevaTarea);

	tareaEnviada.addEventListener("click", comprobar);

	// Borrando Elementos de la lista
	for (var i = 0; i <= lista.children.length -1; i++) {
		lista.children[i].addEventListener("click", eleminar);
	}
}());
