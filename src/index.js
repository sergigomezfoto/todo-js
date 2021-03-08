// [1] IMPORTS
import './styles.css';
import {Todo,TodoList} from './classes'
import { crearTodoHtml } from './js/componentes';
// import { TodoList } from './classes/todo-list.class.js';
// import { Todo } from './classes/todo.class.js';


// [2] MÈTODE DE FUNCIONAMENT NUEVOTODO()
export const todoList= new TodoList();
//[3]
// todoList.todos.forEach(pepita => {
//     crearTodoHtml(pepita) 
// });
// [3 opt]
todoList.todos.forEach(crearTodoHtml);

todoList.todos[0].imprimirClase();
console.log('todos', todoList.todos);

// -------------------------------------------------------------------------------
// [1] tot i que puc importar les coses una a una especificant la funció i l'arxiu, un truc és crear-se un arxiu clsses/index.js que ja faci la importació i exportació, llavors des del central, d'aquesta manera importo tot lo especificat en aquell arxiu.
// [2] tinc 1 classe instanciada TodoList, imporada prèviament. Primer faig la instància de les classes 'const todoList=new Todolist()' ara ja tinc l'objecte llest per utilitzar-lo amb els mètodes i propietats de la classe.
// [3]  crida a 'crearTodoHtml' definit a componentes.js per crear totes les llistes en base a lo que hi ha emagatzemat al localStorage. Ho fa amb un foreach que apunta al array "todos" dintre del objecte 'todoList' instaciat de classe 'TodoList'. Aquest foreach diu per cada element diguem-li pepita, fes la funció crearTodoHtml i passali com a argument cada un dels nodes de l'array 'todos', és a dir pepita dinitre del foreach.
// [3 opt]  aquest resum funciona només si la funció que he de fer per cada cosa que troba el foreach, té un UNIC argument... en aquest cas és així, i per tant el puc resumir.