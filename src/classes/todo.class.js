// [1] CLASSE PER CREAT UN TAREA (TODO)
export class Todo {
  // [4]
  static fromJson({ id, tarea, completado, creado }) {
    const tempTodo = new Todo(tarea);

    tempTodo.id = id;
    tempTodo.completado = completado;
    tempTodo.creado = creado;

    return tempTodo;
  }

  constructor(tarea) {
    // [2]
    this.tarea = tarea;
    // [3]
    this.id = new Date().getTime(); /// 121212121
    this.completado = false;
    this.creado = new Date();
  }
//   [4'] creat amb fins educatius. No serveix per res útil.
  imprimirClase() {
    console.log(`${this.tarea} Te l'id:  ${this.id}`);
  }
}

// [1] CLASSE PER CREAT UN TAREA (TODO) Amb aquesta classe, crearé una tarea i li assignaré una sèrie de identificadors. Creo la classe i li poso export ja que l'haurés de cridar al index.js
// [2] Li dic que tarea serà igual al argument, creo un parell de propietats més, com completado =false i creado= new Date() que simplement em diu la data amb la horta d'estats units.
// [3] CREO ID: ho faig amb l'objecte instancia Date().gettime(); que bàsicament em donarà un ID en forma de 23245453343 o numeros així que es creen tenint en compte la data actual.

// [4] Quan jo llegeixo elements del Localstorage, el que estic llegint es un string que passo a array... no estic llegint un objecte, i per tant aquest string no té mètodes ni té res de res... això és un problema si estic treballant amb objectes i mètodes associats (no és el cas, però és per apendre...). Per poder conservar els mètodes com el [4'], ho podría fer amb un truco...
// faig un mètode static (és a dir és un mètode de la pròpia classe, no del objecte instanciat) que desetructura l'array (id, tarea,completado,creado) i amb tot aquest material fa una instancia a la pròpia classe i per tant en crea un objecte nou, que retorna. primer instanciá l'objecte i després modifica les propietats (tempTodo.id=id(passat com a argument);). Aquest mètode estatic s'alimenta de la crida a cargarLocalStorage() a todo-list.class.js que es crida sempre que es modifica alguna cosa o quan s'obre la pàgina. 
