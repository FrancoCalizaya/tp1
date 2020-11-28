(function(){	

//	CLASE TAREA
class Task {
	constructor(taskId,taskName,taskDone,taskGeo){
		this.taskId = taskId;
		this.taskName = taskName;
		this.taskDone = taskDone;
		this.taskGeo = taskGeo;
	}
}

//	INTERFAZ PARA EL USUARIO
class UI {		
	addTask (task){
		const taskList = document.getElementById('task-list'); // DONDE SE CREA LA LISTA EN EL HTML
		const element = document.createElement('li');
		element.innerHTML = `
                    <input type="checkbox">
                    <span id = "${task.taskId}" class="mls"> ${task.taskName}</span>	
					
					<a href="#" name="delete" class="icon-bin"></a>
					<a href="#" name="clipboard" class="icon-paste"></a>
                    <a href="#" name="share" class="icon-share2"></a>
		
		`;

		taskList.appendChild(element); 		//	AGREGAR 'element' COMO HIJO DE <UL> ID: task-list
		//this.resetForm(); 				// 	DESDE LA MISMA CLASE QUE RESETEE

	}

	resetForm(){
		document.getElementById('task-form').reset();
	}

	deletTask(element){
		
		let parent = element.parentElement;
		let id;
		if(element.name === 'delete'){
			let ui_d = new LocalStorage();
			//console.log(element.parentElement)
			element.parentElement.remove();
			console.log(element)
			id = parent.firstElementChild.nextElementSibling.id;	// 	PADRE <LI> -> PRIMER HIJO <INPUT> -> HERMANO SIG. <SPAN> (ID)
			console.log(id)		
			this.removeItemFromArr(arrayTask,id);
			ui_d.saveLocal();										//	ACTUALIZANDO EL LOCALSTORAGE

		}
	}
	clipboardTask(element){
		let parent = element.parentElement;
		let clip;
		let ID = parent.firstElementChild.nextElementSibling.id;

		if(element.name === 'clipboard'){
			//	value = parent.firstElementChild.nextElementSibling;
			var stringID = ID.toString();
			clip = document.getElementById(stringID).innerHTML;
			//	console.log(ID)
			//	console.log(stringID)


			// CREAR ELEMENTO PARA EL COPIADO AL PORTAPAPELES
			var aux = document.createElement("input");									//	CREAR UN <INPUT> TEMPORAL
			document.body.appendChild(aux);												//	INSERTAD EL <INPUT> EN EL BODY 
			aux.setAttribute('value', document.getElementById(stringID).innerHTML);		//	COPIAR AL INPUT
			//document.getElementById('clipboard').value = clip;
			aux.select();																//	SELECCIONAR VALOR DEL INPUT
			document.execCommand('copy');												//	COPIAR
			document.body.removeChild(aux);												//	REMOVER EL <IMPUT> TEMPORAL
			
		}


	}

	removeItemFromArr ( array, id ) {
		var i;
		for (let j = 0; j < array.length; j++) {			
			console.log('LENGHT'+array.length+' ID:'+id+' ID_ARRAY : '+array[j].taskId)
			if(array[j].taskId == id){		//	BUSCO LA ID CLICKEADA EN EL ARREGLO 'arrayTask'
				i = j;						//	OBTENGO LA POSICION DONDE SE ENCUENTRA LA ID
				//console.log('POSICION: '+j)
				break;						//	SALGO UNA VES ENCONTRADO
			}			
		}
		
		if ( i !== -1 ) {
			array.splice( i, 1 );			//	BORRADO DEL ARREGLO 'arrayTask'
		}
	}

}

//	LOCALSTORAGE
class LocalStorage{
	saveLocal(){
		//if(localStorage.getItem("nombre")){
		// 	CODE SI EXISTE DATOS EN EL LOCALSTORAGE
		//}
		//let pasar = JSON.parse(localStorage.getItem("nombre"));	//PASAR EL OBEJTO
		localStorage.setItem( "Datos" , JSON.stringify(arrayTask));
	}
}

// CAPTURAR EVENTOS DEL DOCUMENTO
document.getElementById('task-form').
	addEventListener('submit', function(e){
		let inputTask = document.getElementById('name');
		const name = inputTask.value;
		// e : evento que captura
		if(document.getElementById('name').value === ""){				//	CONTROLAR QUE EL INPUT NO ESTE VACIO
			inputTask.setAttribute("placeholder", "Tarea Vacia");		//	CAMBIAR EL PLACEHOLDER
			e.preventDefault();
			return;														// 	FINALIZAR LA FUNCION
		}else{
			inputTask.setAttribute("placeholder", "Agregar Tarea");
		}


		const local = new LocalStorage();
		console.log(arrayTask.length)
		console.log(arrayTask.length-1)
		if(arrayTask.length === 0){
			id = 0;
		}else{
			id = arrayTask[arrayTask.length-1].taskId+1;	//	AGREGAR UN ID SEGUN EL TAMAÑO DEL ARRAY
			console.log(id)
		}
		
		const task = new Task(id,name,'n','s');
		//console.log(task);
		//console.log(new Task);
		
		
		ui.addTask(task);  			//	MOSTRAR LA TAREA POR HTML
		arrayTask.push(task);		//	AGREGAR LA TAREA AL ARREGLO 'arrayTask'
		local.saveLocal();			//	SALVAR EN EL LOCALSTORAGE
		//console.log(arrayTask)	//	MOSTRAR POR CONSOLA

		ui.resetForm();				//	RESETEAR INPUT(S) DEL FORMULARIO 'task-form'
		e.preventDefault(); 		//	EVITAR EL REFRESCO POD DEFECTO DEL FORMULARIO 



	});

document.getElementById('task-list')
	.addEventListener('click', function(e){
	//console.log(e.target); /MUESTRA POR CONSOLA QUE ESTOY CLICKEANDO

	const ui = new UI();
	//console.log(e.target)
	ui.deletTask(e.target); //PASO EL EVENTO e
	ui.clipboardTask(e.target);

});



	const ui = new UI();
	// VERIFICAR SI EXISTE DATOS EL LOCAL STORAGE DE 'Datos'
	// SI NO EXISTE CREO EL ARREGLO, SI EXISTE LO COPIO AL ARREGLO PARA TRABAJAR EN ÉL
	// ESTO ES POR QUE CUANDO SE REFRESCABA LA PAGINA SIEMPRE CREABA EL ARREGLO VACIO...
	
	var stored = localStorage.getItem('Datos');		//	Obtengo datos del LocalStorage
	if(stored==null){						//	SI ESTA VACIO EL LOCALSTORAGE SE CREA O SE COPIA PARA TRABAJARLO
		arrayTask = [];						//	VARIABLE GLOBAL CREACION 'arrayTask'
	}else{
		arrayTask = JSON.parse(stored);		//	COPIA DE LOS DATOS DEL LOCALSTORAGE A 'arrayTask'
	}

	//	ARMAR LA LISTA CON EL LOCALSTORAGE EN EL HTML (AL CARGAR LA PAGINA)

	for (let i = 0; i < arrayTask.length; i++) {
		ui.addTask(arrayTask[i]);
	}
	
	//	SHARE NAVIGATION START 	//

	const shareData = {
		title: 'MDN',
		text: 'Learn web development on MDN!',
		url: 'https://developer.mozilla.org',
	  }
	  
	  const btn = document.querySelector('button');
	  const resultPara = document.querySelector('.result');
	  
	  // Must be triggered some kind of "user activation"
	  btn.addEventListener('click', async () => {
		try {
		  await navigator.share(shareData)
		  resultPara.textContent = 'MDN shared successfully'
		} catch(err) {
		  resultPara.textContent = 'Error: ' + err
		}
	  });


	//	SHARE NAVIGATION END	//

	var element = document.getElementById('box');
	var fullscreen = document.getElementById('fullscreen');
	
	fullscreen.addEventListener('click', function(){
		if(element.requestFullscreen){
			element.requestFullscreen;
		}else if(element.webkitRequestFullscreen){
			element.webkitRequestFullscreen;
		}else if(element.mozRequestFullscreen){
			element.mozRequestFullscreen;
		}else if(element.msRequestFullscreen){
			element.msRequestFullscreen;
		}
	});

}());

