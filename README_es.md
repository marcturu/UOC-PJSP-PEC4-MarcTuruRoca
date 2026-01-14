# PJP PEC 4

En esta PEC se practican los diversos aspectos que ofrece el API DOM de JavaScript: búsqueda de nodos, iteración y manipulación de elementos, así como la gestión de eventos como respuesta a la interacción del usuario.

## Competencias

En esta PEC se desarrollan las siguientes competencias del Máster:

* [CB10] Que los estudiantes posean las habilidades de aprendizaje que les permitan continuar estudiando de una manera que tendrá que ser en gran medida autodirigida o autónoma.
* [CG2] Resolver problemas, identificando, analizando y definiendo sus elementos significativos.
* [CE3] Utilizar de manera adecuada los lenguajes de programación y las mejores herramientas de desarrollo para el análisis, el diseño y la implementación de lugares y aplicaciones web en función de las necesidades del proyecto.
* [CE5] Aplicar de la manera más adecuada los patrones de arquitectura de software más conveniente para cada problema.

## Objetivos

Los objetivos concretos de esta PEC son:

* Ser capaz de comprender y poner en práctica las funcionalidades de manipulación del DOM de JavaScript.
* Ser capaz de resolver problemas sobre manipulación del DOM en JavaScript.
* Saber aplicar las diferentes funciones de manipulación del DOM de JavaScript.
* Explorar y conocer maneras diferentes de resolver problemas sobre manipulación del DOM en JavaScript.

## Entrega de la PEC

Una vez hayas realizado las actividades prácticas propuestas en este enunciado, la entrega se realizará enviando tus cambios al apartado del aula virtual de la UOC.

## Puntuación

El hecho de trabajar con tests para verificar la funcionalidad del código os permitirá tener una idea de vuestra propia nota antes de la entrega.

La puntuación de los ejercicios prácticos se basa en dos criterios: **Funcionalidad** e **Implementación**. Se espera que los ejercicios funcionen correctamente (pasen los tests) y que la implementación (el código) tenga una calidad adecuada.

Algunos detalles a tener en cuenta:

- Se penalizará cualquier intento de _hardcodear_ los tests para forzar que pasen. Esta técnica consiste en cambiar la implementación para que devuelva únicamente el valor esperado por el test (cualquier otro test fallaría).
- Los tests automáticos están diseñados para detectar ejercicios erróneos o incompletos para casos concretos. El hecho de que un test pase no garantiza que el ejercicio esté realizado correctamente, es decir, que cubra todos los casos.
- Un ejercicio cuyos tests no pasan se puntuará con un 0 salvo que existan problemas con el test.
- Además de pasar los tests, el profesorado evaluará vuestro código con base en los siguientes criterios:
    - Legibilidad, sencillez y calidad del código.
    - Conocimientos de programación. Por ejemplo, no utilizar las estructuras de control adecuadas, como utilizar un bucle para construir una sentencia condicional o viceversa.

## Requisitos mínimos

- Tener instalado Visual Studio Code.
- Conocimientos básicos de Git y GitHub (Reto 1)
- Estudio de la introducción y repaso a JavaScript (Reto 2).
- Estudio de los conceptos de JavaScript (Reto 2).
- Estudio de la introducción a la asincronía en JavaScript (Reto 3).
- Estudio de los conceptos de asincronía de JavaScript (Reto 3).
- Estudio de los materiales y ejercicio sobre manipulación del DOM (Reto 4).

### Caso práctico

En esta PEC trabajaremos con un caso práctico que pretende construir un juego de damas funcional con tablero de tamaño configurable. El objetivo es implementar las clases necesarias para gestionar el tablero, la lógica del juego, el movimiento de fichas, las capturas y la interfaz de usuario.

El juego se compone de un tablero configurable (mínimo 4x4, máximo 16x16), donde se colocan fichas blancas y negras en las casillas oscuras. El número de filas con fichas depende del tamaño del tablero:
- Tableros de 4x4 a 7x7: 2 filas de fichas por jugador
- Tableros de 8x8 a 11x11: 3 filas de fichas por jugador
- Tableros de 12x12 a 16x16: 4 filas de fichas por jugador

Los jugadores mueven sus fichas en diagonal, pudiendo capturar fichas contrarias saltando sobre ellas. Cuando una ficha llega al extremo opuesto del tablero, se promociona a dama, adquiriendo la capacidad de moverse en cualquier dirección diagonal. El juego termina cuando un jugador se queda sin fichas o no puede realizar ningún movimiento válido.

Un ejemplo de cómo se verá la aplicación web una vez implementados los ejercicios de la PEC es el siguiente:

![Game Screenshot](./damas.gif)

En la carpeta `src/web` encontrarás los ficheros necesarios para el front-end. El fichero `index.html` contiene la estructura básica de la aplicación, mientras que el fichero `style.css` contiene los estilos CSS para la interfaz de usuario. El fichero `game.js` es el punto de entrada de la aplicación y se encargará de inicializar el juego.

## Ejercicios prácticos (10 pts)

Para realizar los ejercicios prácticos debes dirigirte a la siguiente ruta, dentro del repositorio: `src/pec4/pec4.js`.
En este fichero deberás implementar las funciones que te indicamos en los ejercicios que verás más abajo.
En cada función encontrarás un encabezado con la descripción de la función y los parámetros que recibe.

Por otro lado, los tests que te permitirán saber si la solución que propones para los ejercicios es correcta están en el fichero `src/pec4/pec4.test.js`.

**No debes editar este fichero**.
Ten en cuenta que los tests son condiciones que deben cumplir las funciones que implementarás en los ejercicios, por lo que pueden servirte de ayuda para corregirlos.

Para correr la aplicación deberás ejecutar el comando:
```bash
npm run serve
```
y seleccionar la carpeta `web` dentro de `src`. Cuando el juego sea funcional debería de verse ahí el tablero y la interfaz de usuario; de una manera similar a la imagen que se muestra anteriormente.

Para ejecutar los tests, recuerda que solo tienes que ejecutar el siguiente comando:
```bash
npm test
```

y pulsar la tecla correspondiente con el test que quieras ejecutar. Pulsando la `a` correrás todos los tests. Recuerda que para que un ejercicio esté correcto **a nivel funcional** debe de pasar todos los tests.

### Ejercicio 1 (1 pt): Configuración del juego

Implementa la clase `GameConfig` para gestionar la configuración inicial del tablero de damas con tamaño configurable.

Las características de la clase son las siguientes:

- Debe tener una propiedad `size` de tipo numérico e inicializada con el valor 8 (tablero de 8x8 por defecto).
- Deberá tener una propiedad `currentPlayer` inicializada con el valor 'white' que indicará qué jugador tiene el turno actual.
- Deberá implementar un método `setSize(newSize)` que permita cambiar el tamaño del tablero:
    - El tamaño mínimo debe ser 4 y el máximo 16.
    - Si el tamaño está fuera de rango, debe establecerse al valor más cercano válido (4 o 16).
    - El tamaño debe ser un número entero.
- Deberá implementar un método `getPieceRows()` que devuelva el número de filas de fichas según el tamaño del tablero:
    - 2 filas si el tablero es menor de 8 (tamaños 4-7).
    - 3 filas si el tablero es de 8 a 11 (tamaños 8-11).
    - 4 filas si el tablero es de 12 a 16 (tamaños 12-16).
- Deberá implementar un método `initialize()` que prepare el estado inicial del juego con el jugador inicial en `white`.
- Deberá implementar un método `switchPlayer()` que cambie el turno al otro jugador (de 'white' a 'black' o viceversa).

### Ejercicio 2 (1.5 pts): Generación del tablero

Implementa la clase `Board` para gestionar el tablero del juego de damas con tamaño dinámico.

Las características de la clase son las siguientes:

- El constructor deberá recibir como parámetro un objeto de tipo `gameConfig` que contendrá la configuración del juego.
- Deberá tener una propiedad `size` que guardará el tamaño del tablero (obtenido de `gameConfig.size`).
- Deberá tener una propiedad `board` que representará el tablero del juego. Esta propiedad será un array bidimensional donde cada celda puede contener:
    - `null`: casilla vacía
    - Un objeto de tipo `Piece` con `player: 'white'` o `'black'` e `isKing: true` o `false`. **Ojo:** Deberás utilizar la clase `Piece` (ya implementada en el fichero, no tienes que hacerla tú) para crear las fichas. La clase `Piece` tiene un constructor que recibe dos parámetros: `player` ('white' o 'black') e `isKing` (true o false). Ejemplo: `new Piece('white', false)` crea una ficha blanca normal.
- Deberá implementar un método `generate()` que inicialice el tablero según el tamaño configurado:
    - El número de filas con fichas dependerá del tamaño.
    - Colocar fichas negras en las casillas oscuras de las primeras N filas (desde la fila 0 empezando a contar por arriba).
    - Colocar fichas blancas en las casillas oscuras de las últimas N filas (desde la última fila hacia arriba).
- Deberá implementar un método `getPiece(row, col)` que devuelva la ficha en la posición especificada.
- Deberá implementar un método `setPiece(row, col, piece)` que coloque una ficha en la posición especificada.
- Deberá implementar un método `isEmpty(row, col)` que devuelva `true` si la casilla está vacía.

### Ejercicio 3 (3 pts): Lógica del juego

Implementa la clase `GameLogic` para gestionar la lógica del juego de damas.

Las características de la clase son las siguientes:

- Debe implementar un constructor que inicialice los siguientes atributos:
    - Un atributo `board` que será una instancia de la clase `Board`. Le será pasado como parámetro al constructor.
    - Un atributo `config` que será una instancia de la clase `GameConfig`. Le será pasado como parámetro al constructor.
    - Un atributo `selectedPiece` que guardará las coordenadas de la ficha seleccionada (null si no hay ninguna).
    - Un atributo `gameOver` que será un booleano que indicará si el juego ha terminado.
    - Un atributo `winner` que indicará el ganador ('white', 'black').
- Deberá implementar un método `isValidMove(fromRow, fromCol, toRow, toCol)` que indique si un movimiento es válido:
    - Las fichas normales solo pueden moverse en diagonal hacia adelante (blancas hacia arriba, negras hacia abajo).
    - Las damas pueden moverse en diagonal en cualquier dirección, pero solo una casilla (simplificación del juego real de damas, donde se puede mover +1 casilla y en cualquier dirección).
    - La casilla de destino debe estar vacía y ser oscura.
- Deberá implementar un método `isValidCapture(fromRow, fromCol, toRow, toCol)` que indique si una captura es válida:
    - Debe haber una ficha enemiga en la casilla intermedia.
    - La casilla de destino debe ser válida.
    - Las fichas normales solo pueden capturar hacia adelante, las damas en cualquier dirección diagonal.
- Deberá implementar un método `movePiece(fromRow, fromCol, toRow, toCol)` que mueva una ficha:
    - Si es un movimiento de captura, eliminar la ficha enemiga.
    - Mover la ficha a la nueva posición.
    - Promocionar a dama si la ficha llega al extremo opuesto.
    - Cambiar el turno al otro jugador.
    - Comprobar si el juego ha terminado llamándo al método `checkGameOver()` que se implementará a continuación.
    - Retornar `true` si el movimiento se realizó correctamente, `false` en caso contrario.
- Deberá implementar un método `checkGameOver()` que compruebe si el juego ha terminado:
    - Un jugador gana si el otro se queda sin fichas.
    - Un jugador gana si el otro jugador no tiene movimientos válidos (está bloqueado).

### Ejercicio 4.1 (2 pts): Interfaz de usuario (1)

Implementa la clase `UI` para gestionar la interfaz de usuario del juego de damas.

Las características de la clase son las siguientes:

- Debe implementar un constructor que inicialice 3 atributos:
    - Un atributo `gameLogic` que será una instancia de la clase `GameLogic`. Le será pasado como parámetro al constructor.
    - Un atributo `gameBoard` que será inicializado con el elemento de DOM que contiene el identificador `game-board`.
    - Un atributo `onRestart` que será una función callback que se ejecutará cuando se pulse el botón de reinicio. Le será pasado como parámetro al constructor.
    - Al final del constructor, deberá llamar al método `setupSizeInput()` y al método `setupRestartButton()`.

- Debe implementar el método `setupSizeInput()` que creará el control de entrada del tamaño del tablero:
    - Creará un input de tipo `number` con id `board-size` con los siguientes atributos:
        - type: 'number'
        - min: '4'
        - max: '16'
        - value: '8'
    - El input tendrá asociado un label con el texto 'Board size: ' y htmlFor 'board-size'.
    - El input y su label se añadirán dentro de un div de controles que a su vez se añadirá al contenedor principal (elemento con clase 'container').

- Debe implementar el método `setupRestartButton()` que creará el botón de reinicio:
    - Creará un botón con id `restart` y texto `Restart Match`.
    - El botón se añadirá al div de controles junto al input de tamaño del tablero.
    - El botón tendrá un evento `click` asociado que:
        - Eliminará los elementos con id 'game-status' y 'current-player' si existen.
        - Ejecutará la función callback `onRestart` pasada al constructor.

- Debe implementar el método `renderBoard()` que se encargará de renderizar el tablero en el DOM:
    - Limpiar el contenido del elemento `gameBoard`.
    - Añadirle al elemento `gameBoard` la clase `game-board` y `checkerboard`.
    - Crear un número de celdas según el tamaño del tablero. Cada celda tendrá las siguientes características:
        - Será un elemento de DOM de tipo `div`.
        - Tendrá la clase `cell`.
        - Tendrá la clase `dark` si es una casilla oscura, `light` si es clara. El tablero de damas es una cuadrícula de
          cuadrados alternos donde las casillas oscuras son aquellas donde (row + col) es impar.
        - Tendrá propiedades (dataset) `row` y `col`.
        - Si contiene una ficha, tendrá un elemento hijo `div` con clase `piece`, clase `white` o `black` según el
          color, y clase `king` si es una dama.
        - Si la ficha ha sido seleccionada  (gameLogic.selectedPiece), la celda (cell) tendrá además la
          clase `selected`.
        - Tendrá un evento `click` asociado que llamará al método `handleCellClick(row, col)`. Este método se
          implementará en el ejercicio `4.2`.
    - Llamará a `showCurrentPlayer` para mostrar el turno actual. Este método lo implementaremos en el ejercicio `4.2`.

### Ejercicio 4.2 (1.5 pts): Interfaz de usuario (2)

Implementa los siguientes métodos para la clase `UI`:

- El método `handleCellClick(row, col)` que maneje el clic en una celda:
    - Si no hay ficha seleccionada y la celda contiene una ficha del jugador actual, seleccionarla.
    - Si hay una ficha seleccionada, intentar moverla a la celda clicada.
    - Actualizar el tablero después de cada acción.
    - Mostrar el estado del juego si ha terminado llamando a `showGameStatus`.
- El método `showGameStatus(status)` que muestre el estado del juego:
    - Si status es 'white' o 'black', mostrar mensaje de victoria para ese jugador.
    - El mensaje se mostrará en un elemento con id `game-status`, a continuación del tablero de juego (identificado con id `game-board`).
    - El mensaje debe desaparecer automáticamente después de 5 segundos.
- El método `showCurrentPlayer()` que muestre de quién es el turno actual.
    - Creará un elemento de DOM con id `current-player`.
    - Le añadirá el texto "Turn: " y el jugador al que le toca (`White`/`Black`).
    - Lo pintará antes del tablero de juego, es decir, inmediatamente antes del elemento con id `game-board`.

### Ejercicio 5 (1 pt): Integración del juego

Implementa la clase `Game` para integrar todos los componentes del juego de damas.

Esta clase tendrá las siguientes características:
- Deberá implementar un constructor con las propiedades siguientes inicializadas a `null`:
    - `config`
    - `board`
    - `gameLogic`
    - `ui`

- Deberá implementar un método `start()` que inicie el juego y que realizará lo siguiente:
    - Leerá el tamaño del tablero desde un input con id `board-size`.
    - Instanciará la clase `GameConfig`, establecerá el tamaño si se proporciona, y llamará al método `initialize()`.
    - Instanciará la clase `Board` y llamará al método `generate()`.
    - Instanciará la clase `GameLogic` pasándole como parámetros `board` y `config`.
    - Instanciará la clase `UI` pasándole como parámetros `gameLogic` y una función callback que reinicie el juego (llamando al método `start()` de esta propia clase).
    - Llamará al método `renderBoard()` de la clase `UI`.
    - Comprobará si el juego ha terminado desde el inicio (llamando a `checkGameOver()`) y mostrará el ganador si es necesario.

### Ejecución del juego

Una vez todos los ejercicios queden resueltos, el juego será funcional y podrás jugar partidas de damas, con todas las reglas básicas implementadas: movimiento diagonal, capturas, promoción a dama y condiciones de victoria (con la salvedad del movimiento de las damas coronadas, que hemos limitado).
