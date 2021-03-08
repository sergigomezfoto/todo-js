// [8']
import { Todo } from "./";

// [1] CLASSE PER MANEJAR TOT EL REFERNT A LA LLISTA DE "TODOS"
export class TodoList {
  constructor() {
    // this.todos = [];
    // [7']
    this.cargarLocalStorage();
  }
  // [2]
  nuevoTodo(todo) {
    this.todos.push(todo);
    // [6']
    this.guardarLocalStorage();
  }
  // [3]
  eleiminarTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id != id);
    // [6']
    this.guardarLocalStorage();
  }
  // [4]
  marcarCompletado(id) {
    for (const todo of this.todos) {
      if (todo.id == id) {
        todo.completado = !todo.completado;
        // [6']
        this.guardarLocalStorage();
        break;
      }
    }
  }
  // [5]
  eliminarCompletados() {
    this.todos = this.todos.filter((todo) => !todo.completado);
    this.guardarLocalStorage();
  }
  //[6]
  guardarLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(this.todos));
  }
  //[7]
  cargarLocalStorage() {

    // if (localStorage.getItem('todo')) {
    //     this.todos= JSON.parse(localStorage.getItem('todo'));
    // }else{
    // this.todos=[];
    // }
// [7']
    this.todos = localStorage.getItem("todo")
      ? JSON.parse(localStorage.getItem("todo"))
      : (this.todos = []);


    //  [8] 
    // this.todos =this.todos.map(obj => Todo.fromJson(obj));
    // [8 opt] 
    this.todos =this.todos.map(Todo.fromJson);
  }
}

// [1] CLASSE PER MANEJAR TOT EL REFERNT A LA LLISTA DE "TODOS". El arxiu todo.class.js conté la classe que permet crear un todo. s'aniràn creant todos, i per fer les diferents funcions de la llista tenim aquest script. Cada cop que creei un todo el guardaré en un array que es el que es troba buit al contructor, amb aquests elements gusrdats faré vaàries funcions.
// nuevoTodo(todo)-> fa un push (coloca la final de l'objecte) el 'todos' creat al constructor.
// eliminarTodo(id)-> mirarà el id de la nomva taréa i en base a això, leliminarà quan s'apreti el botó.
// marcarCompletado(id)-> farà un toggle entre l'estat completat i per fer.
// eliminarCompletados()-> borrarà totes les tareas completades de cop.
// [2]
// [3] defineix l'array this.todos com a this.todos(el que hi habia), i fa servir la funcició predefinida filter()https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter.
// filter filtra un array i retorna només els que compleixen la conició. En aquest cas és qie l'ID que li passo al mètode sigui diferent dels diferents ID, és a dir si l'ID de la tarea coincideix amb algun dels element de l'array (és a dir amb alguna de totes les tareas), llavors aquesta excloula de l'array. i com que l'igualo a l'array this.todo, a la pràctica és com si l'esborrés.
// [4] for of on diu de l'arrray todos, vés recorrent totes les prtopietats com a todo. si el id de l'array == al io que et passo, fes un toggle true/false de la propietat complecado i surt del bucle. (2 iguals per a que no sigui exactament igual pot ser un string Vs número).
// [5] igualo el array todos (que conté tots els objectes instanciats a partid de la classe Todos) a el mateix array filtrat per a que només apareguin els que no estàn completats (this.todos.filter(todo=>!todo.completado)). Fixar-se amb '!' que està dient els NO estan completats pq el seu valor es 'false'
// [6] Guardat a LocalStorage: 'localStorage' és una paraula reservada que ve amb els seus mètodes. Un d'ells es el setItem que em permet guardar una informació en forama de "string":"valor en string"(NOMÉS soprota strings, N nº NO booleans, NO funcions, NO arrays, NO objects, etc...); El localStorage es manté com una especie de BBDD pròpia de la url, pots tancar la pàgina, tornar demà passat i es manté.
// En aquesta funció (que crido cada cop que faig alguna cosa, en algún altre mètode, el que faig es guardo al localstorage "todo" amb valor-> totes les tareas en format Json. ja que si nó no ho entendría perque this.todo es un array , i arrays no són acceptats per localStorage. Per fer-ho utilitzo un mètode pròpi de jS que és JSON.stringyfy(this.todos), i això fa que em guardi l'array en format JSON dintre d'un calaix 'KEY' anomenat 'todo',  i això si que ho acccepta.
// [7]  Carregar del Local storage per crear la pàgina. Primer sempre que es demana al localstorage algo s'ha de verificar que el que es demana existeiz, l'if fa això: si dintre del localstorage existeix 'todos' fes això, sinó, creo la variable this.todos=[];, és a dir, la inicialitzo com al constructor, per a que existeixi, encara que buida.(es podría treure de fet la inicialització del constructor...). Si existeix: estableix que this.todos és el contingut, però transpformat en array amb JSON.parse(localStorage.getItem('todo'));
// [7'] TRANSPFORMAT A OP.TERNARI!!!

// [8] primer veure [4] a todo.class.js
//  quan carrego del localStorage també transformo en instancies d'objecte tots els nodes del array guardat. llavors els hi faig un map()https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map que vàsicament el que fà és fer la funció que se li digui per cada node de l'array. cada node es un altre array, però que hauría de ser un objecte... per combertirlo efectivament en objecte i poder així mantenir mètodes, etc..., a cada sub array d'aquests els faig el mètode estatic de la classe Todo, 'fromJson()'. El resultat és que tota la informació del localStorage la converteixo en Objectes en obrir la pàgina. -> llegeixo l'string, 2 el parsejo com a array[7], i després el converteixo en objecte[8];
// [8 opt] com que només hi ha un argument en joc (li habiem posat 'obj') puc resumir d'aquesta manera... això només pot ser quan només tenim un argument en joc.
