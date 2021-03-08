// CREACIÓ FISICA DEL DIV DE LES TAREAS
// [6']
import { Todo } from "../classes";
import { todoList } from "../index";

// [1] REFERÈNCIES AL HTML
const divTodoList = document.querySelector(".todo-list");
// [6']
const txtInput = document.querySelector(".new-todo");
//[13']
const btnBorrar = document.querySelector(".clear-completed");
//[14']
const ulFiltros = document.querySelector(".filters");
// [15']
const anchorFiltros = document.querySelectorAll(".filtro");
// [2]
export const crearTodoHtml = (todo) => {
  // [3]
  const htmlTodo = `
<li class="${todo.completado ? "completed" : ""}" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${todo.completado ? "checked" : ""} >
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>
`;
  // [4]
  const div = document.createElement("div");
  div.innerHTML = htmlTodo;
  divTodoList.append(div.firstElementChild); // [5]
  return div;
};

// [6]
txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    const nuevoTodo = new Todo(txtInput.value);
    todoList.nuevoTodo(nuevoTodo);
    crearTodoHtml(nuevoTodo);
    txtInput.value = "";
  }
});

// [7]
divTodoList.addEventListener("click", (event) => {
  // [8]
  const nombreElemento = event.target.localName; // input label o button
  // [9]
  const todoElemento = event.target.parentElement.parentElement;
  // [10]
  const todoId = todoElemento.getAttribute("data-id");
  // [11]
  if (nombreElemento.includes("input")) {
    // click en el check
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle("completed");
    //[12]
  } else if (nombreElemento.includes("button")) {
    // click en la x
    todoList.eleiminarTodo(todoId);
    divTodoList.removeChild(todoElemento);
  }
});
//[13]
btnBorrar.addEventListener("click", () => {
  todoList.eliminarCompletados();
  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];
    if (elemento.classList.contains("completed")) {
      divTodoList.removeChild(elemento);
    }
  }
});

// [14]
ulFiltros.addEventListener("click", (event) => {
  // console.log(event.target.text);
  const filtro = event.target.text;
    
  if (!filtro) {
    return;
  }

// [15]
anchorFiltros.forEach(pepi => pepi.classList.remove('selected'));
event.target.classList.add('selected');

  for (const pepinisimo of divTodoList.children) {
    console.log(pepinisimo);
    const completado = pepinisimo.classList.contains("completed");
    pepinisimo.classList.remove("hidden");
  
    switch (filtro) {
      case "Pendientes":
        if (completado) {
          pepinisimo.classList.add("hidden");
        }
        break;
      case "Completados":
        if (!completado) {
          pepinisimo.classList.add("hidden");
        }
        break;
    }
  }
});

// -------------------------------

// [1] faig referència al contenidor div amb classe .todo-List
// [2] faig una funció que em crearà un li per cada tarea que crei, li passo largument 'todo' que serà simplement la tarea
// [3] creo una constant  que conté tot el còdig que necessito, i entremig hi poso ${} amb les expressions de javascript al estil PHP: si això es fals fes això si No lo altre. com que el argument todo serà en realitat un objecte creat amb la instàcia new Todo, aquest objecte tindrà una sèrie de parametres, com completado=false (per defecte) o tarea, que es la frase en sí, o el id. Aprofito això per crear tot el contingut html.
// [4] Faig la inclusió del l'string HtmlTodo. creo un div, li dic dintre del div hi hagi tot el contingut de htmlTodo i li dic que ho posi dintre deel primer element de DivTodoList, que fà referència al div amb classe .todo-List. Finalment li dic a la funció que ho retorni... és a dir que crei aquest div quan la cridi.
// [5] el div.firstElementChild realment es per borrar aquest div que d'altra manera aniría dintre d'un <ul>, i això és mala pràctica... és a dir creo el div per tenirlo de contingut i poderlo omplir del contingut, però al últim molt el trec per a que no estorbi.

// [6]  faig un event listener de quan la persona es posa al input '.new-todo' en concret mitjançant el keycode del enter (13) i assegurantme que no ha apretat enter i està buit 'length>0' dic que quan apreti enter crei un Todo, importat a [6'], i faci el mètode nuevoTodo de la instancia TodoList passat com a variable todoList a index.js i importada a [6']. Un cop tinc tot això dic que crei la fila html crearTodoHtml(nuevoTodo); i que borri el que s'ha tipejat al input.

// ->[6'](dependencies importades i declaracio variables)

// [7] EventListener de cada un dels divs que es creen al afegir una tarea.
// [8] Posada en variables de el nom de l'objecte que s'ha clicat dintre del div. En aquest cas pot ser input(la rodona) label ( el títol) i button(la x). Amb 'event.target.localName;' em diu quin dels tres elements he clikat.
// [9] Posada en variables de tot el element <li></li>. Amb event.target, obting el ultim child... és a dir si clicko al label obting <label> ---- </label>. si hi afegeixo el parentElement, obting el pare immediat és a dir <div><label>----</label></div>, i si hi afegeixo un altre parentElement, obting el que m'interessa que és el <li><div><label>----</label></div></li>.
// [10] d'aquest <li><div><label>----</label></div></li>, obting l'atribut data-id, que conté l'ID de la tarea.
// [11] Llògica de marcar com a tarea feta: si el nom del l'element clicat és 'input' (clicko a la rodona), fes el mètode marcarCompletado de todoList amb l'id que obtens al todoId. Aquest mètodoe està definit todo-list.class.js i el que fà és agafar un Id, mirar a quina tarea correspon i posar completado=false o vecebersa (toggle). i a part li dic que faci un toggle (si no té classe l'afegeix i si la té la treu) de classes al elmenet <li></li>, per a que aparegui el tachat.
//[12]  Llògica de eliminar una tarea. Si l'element clicat és un 'button' fes el mètode de todoList eliminarTodo(i passa l'ID); després de l'element pare de tot, elimina el fill definit a 'todoElemento'.
//[13]Llogica de eliminar completats: al botó de 'borrar completados' li afegim un event listenre que borrarà només les feines completades. Primer llencem el mètode 'todoList.eliminarCompletados();' que el filtrrà i només deixarà a la arry els que NO estàn completados=true. deprés anem a borrar el html en sí. fem on for normal, però invers, és a dir que mostri tots els elements en posició inversa, i que quan a rribi al index 0 pari. El length-1 és per resoldre el tema de que els index comencen en 0. i diem que quan sigui >= continui restant 1 al index de cada element. Després comprovem els elements de dintre el for i si conté la classe 'completado' el borrem de divTodoList.
// [14] eventlistener on passo l'event per veure que hi ha. m'interessa veure si clica al ul i dintre del ul si clicka a 'todos' 'pendientes' o 'completados'. Hi ha llocs del <ul> que on si click respon 'undefined', per tant amb la primera instrució dic filtro és igual al text del target del event click. Si filtro NO és true (!) llavors simplement fes un retorn sense res.
// tenim un classe '.hidden' amb la que podem jugar per amagar coses. al for of li dic que de quan clicki (per l'eventlistener) em mostri tots els fills de divTodoList... amb aquesta informació puc saber si esta completado o no. Posaré la classe hidden depenent del filtre que es faci... així que el primer que faig és quan es fa click a un filtre de moment trec momentèniament (milimilessimes de segons) trec de tots la classe hidden. Aixó és per ressetejar tot abans de filtrar. Defineixo una constant que es de cada pepinisimo( cada divTodoList.children), agafa només els que estàn amb la classe "completed". Amb tot això faig un switch evaluant 'filtro' (pot ser completados o pendientes o todos). I dic en els casos que siguin pendientes, si correspon a completado ( = pepinisimo.classList.contains("completed");), els afegeixi la classe hiden per amagarlos. En el cas de completados, si no correspon a completado, els posi hidden. En el cas de 'todos' els mostrarà tots, perque d'inici ja he dit que els mostri tots i com que no compleix cap case del swich, no farà cap opció, i per tant els mostrarà tots.
// [15] la clasee '.filtro' posa el requadret al al paraula del filtre en si , el borde de la caixa que permet saber a quin filtre hem clickat. De finim la constant com un array que ens diu tots els elementnt que tenen aquesta classe anchorTags(querySelectorAll)[15'] i fem: per cada (forEach) element (pepi en aquest cas), borra la classe selected, d'entrada. després li diem que al event(parametre definit al click del eventlistener).target, li afegim la classe selcted. d'aquesta manera es va movent el recuadre.
