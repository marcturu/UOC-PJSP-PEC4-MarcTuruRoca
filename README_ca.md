# PJP PAC 4

En aquesta PAC es practiquen els diversos aspectes que ofereix l'API DOM de JavaScript: cerca de nodes, iteració i manipulació d'elements, així com la gestió d'esdeveniments com a resposta a la interacció de l'usuari.

## Competències

En aquesta PAC es desenvolupen les següents competències del Màster:

* [CB10] Que els estudiants adquireixin les habilitats d'aprenentatge que els permetin continuar estudiant d'una manera que haurà de ser en gran mesura autodirigida o autònoma.
* [CG2] Resoldre problemes, identificant, analitzant i definint els seus elements significatius.
* [CE3] Utilitzar de manera adequada els llenguatges de programació i les millors eines de desenvolupament per a l'anàlisi, el disseny i la implementació de llocs i aplicacions web en funció de les necessitats del projecte.
* [CE5] Aplicar de la manera més adequada els patrons d'arquitectura de programari més convenients per a cada problema.

## Objectius

Els objectius concrets d'aquesta PAC són:

* Ser capaç de comprendre i posar en pràctica les funcionalitats de manipulació del DOM de JavaScript.
* Ser capaç de resoldre problemes sobre manipulació del DOM en JavaScript.
* Saber aplicar les diferents funcions de manipulació del DOM de JavaScript.
* Explorar i conèixer maneres diferents de resoldre problemes sobre manipulació del DOM en JavaScript.

## Lliurament de la PAC

Un cop hagis realitzat les activitats pràctiques proposades en aquest enunciat, el lliurament es farà enviant els teus canvis a l'apartat de l'aula virtual de la UOC.

## Puntuació

El fet de treballar amb tests per verificar la funcionalitat del codi us permetrà tenir una idea de la vostra pròpia nota abans del lliurament.

La puntuació dels exercicis pràctics es basa en dos criteris: **Funcionalitat** i **Implementació**. S'espera que els exercicis funcionin correctament (passin els tests) i que la implementació (el codi) tingui una qualitat adequada.

Alguns detalls a tenir en compte:

- Es penalitzarà qualsevol intent de _hardcodejar_ els tests per forçar que passin. Aquesta tècnica consisteix a canviar la implementació perquè retorni únicament el valor esperat pel test (qualsevol altre test fallaria).
- Els tests automàtics estan dissenyats per detectar exercicis erronis o incomplets per a casos concrets. El fet que un test passi no garanteix que l'exercici estigui realitzat correctament, és a dir, que cobreixi tots els casos.
- Un exercici els tests del qual no passen es puntuarà amb un 0 llevat que existeixin problemes amb el test.
- A més de passar els tests, el professorat avaluarà el vostre codi amb base en els criteris següents:
    - Llegibilitat, senzillesa i qualitat del codi.
    - Coneixements de programació. Per exemple, no utilitzar les estructures de control adequades, com ara utilitzar un bucle per construir una sentència condicional o viceversa.

## Requisits mínims

- Tenir instal·lat Visual Studio Code.
- Coneixements bàsics de Git i GitHub (Repte 1)
- Estudi de la introducció i repàs a JavaScript (Repte 2).
- Estudi dels conceptes de JavaScript (Repte 2).
- Estudi de la introducció a l'asincronía en JavaScript (Repte 3).
- Estudi dels conceptes d'asincronía de JavaScript (Repte 3).
- Estudi dels materials i exercici sobre manipulació del DOM (Repte 4).

### Cas pràctic

En aquesta PAC treballarem amb un cas pràctic que pretén construir un joc de dames funcional amb tauler de mida configurable. L'objectiu és implementar les classes necessàries per gestionar el tauler, la lògica del joc, el moviment de fitxes, les captures i la interfície d'usuari.

El joc es compon d'un tauler configurable (mínim 4x4, màxim 16x16), on es col·loquen fitxes blanques i negres a les caselles fosques. El nombre de files amb fitxes depèn de la mida del tauler:
- Taulers de 4x4 a 7x7: 2 files de fitxes per jugador.
- Taulers de 8x8 a 11x11: 3 files de fitxes per jugador.
- Taulers de 12x12 a 16x16: 4 files de fitxes per jugador.

Els jugadors mouen les seves fitxes en diagonal, podent capturar fitxes contràries saltant sobre elles. Quan una fitxa arriba a l'extrem oposat del tauler, es promociona a dama, adquirint la capacitat de moure's en qualsevol direcció diagonal. El joc acaba quan un jugador es queda sense fitxes o no pot realitzar cap moviment vàlid.

Un exemple de com es veurà l'aplicació web una vegada implementats els exercicis de la PAC és el següent:

![Game Screenshot](./damas.gif)

A la carpeta `src/web` trobaràs els fitxers necessaris per al front-end. El fitxer `index.html` conté l'estructura bàsica de l'aplicació, mentre que el fitxer `style.css` conté els estils CSS per a la interfície d'usuari. El fitxer `game.js` és el punt d'entrada de l'aplicació i s'encarregarà d'inicialitzar el joc.

## Exercicis pràctics (10 punts)

Per realitzar els exercicis pràctics has de dirigir-te a la següent ruta, dins del repositori: `src/pec4/pec4.js`.
En aquest fitxer hauràs d'implementar les funcions que t'indiquem als exercicis que veuràs més avall.
En cada funció trobaràs una capçalera amb la descripció de la funció i els paràmetres que rep.

D'altra banda, els tests que et permetran saber si la solució que proposes per als exercicis és correcta es troben al fitxer `src/pec4/pec4.test.js`.

**No has d'editar aquest fitxer**.
Tingues en compte que els tests són condicions que han de complir les funcions que implementaràs als exercicis, per la qual cosa poden servir-te d'ajuda per corregir-los.

Per córrer l'aplicació hauràs d'executar la comanda:
```bash
npm run serve
```
i seleccionar la carpeta `web` dins de `src`. Quan el joc sigui funcional s'hi hauria de veure el tauler i la interfície d'usuari; d'una manera similar a la imatge que es mostra anteriorment.

Per executar els tests, recorda que només has d'executar la següent comanda:
```bash
npm test
```

i prémer la tecla corresponent amb el test que vulguis executar. Prement la `a` executaràs tots els tests. Recorda que perquè un exercici sigui correcte **a nivell funcional** ha de passar tots els tests.

### Exercici 1 (1 punt): Configuració del joc

Implementa la classe `GameConfig` per gestionar la configuració inicial del tauler de dames amb mida configurable.

Les característiques de la classe són les següents:

- Ha de tenir una propietat `size` de tipus numèric i inicialitzada amb el valor 8 (tauler de 8x8 per defecte).
- Haurà de tenir una propietat `currentPlayer` inicialitzada amb el valor 'white' que indicarà quin jugador té el torn actual.
- Haurà d'implementar un mètode `setSize(newSize)` que permeti canviar la mida del tauler:
    - La mida mínima ha de ser 4 i la màxima 16.
    - Si la mida està fora de rang, s'ha d'establir al valor més proper vàlid (4 o 16).
    - La mida ha de ser un nombre enter.
- Haurà d'implementar un mètode `getPieceRows()` que retorni el nombre de files de fitxes segons la mida del tauler:
    - 2 files si el tauler és menor de 8 (mides 4-7).
    - 3 files si el tauler és de 8 a 11 (mides 8-11).
    - 4 files si el tauler és de 12 a 16 (mides 12-16).
- Haurà d'implementar un mètode `initialize()` que prepari l'estat inicial del joc amb el jugador inicial en `white`.
- Haurà d'implementar un mètode `switchPlayer()` que canviï el torn a l'altre jugador (de 'white' a 'black' o viceversa).

### Exercici 2 (1.5 punts): Generació del tauler

Implementa la classe `Board` per gestionar el tauler del joc de dames amb mida dinàmica.

Les característiques de la classe són les següents:

- El constructor haurà de rebre com a paràmetre un objecte de tipus `gameConfig` que contindrà la configuració del joc.
- Haurà de tenir una propietat `size` que guardarà la mida del tauler (obtinguda de `gameConfig.size`).
- Haurà de tenir una propietat `board` que representarà el tauler del joc. Aquesta propietat serà un array bidimensional on cada cel·la pot contenir:
    - `null`: casella buida
    - Un objecte de tipus `Piece` amb `player: 'white'` o `'black'` i `isKing: true` o `false`. **Ull:** Hauràs d'utilitzar la classe `Piece` (ja implementada al fitxer, no l'has de fer tu) per crear les fitxes. La classe `Piece` té un constructor que rep dos paràmetres: `player` ('white' o 'black') i `isKing` (true o false). Exemple: `new Piece('white', false)` crea una fitxa blanca normal.
- Haurà d'implementar un mètode `generate()` que inicialitzi el tauler segons la mida configurada:
    - El nombre de files amb fitxes dependrà de la mida.
    - Col·locar fitxes negres a les caselles fosques de les primeres N files (des de la fila 0 començant a compta per dalt).
    - Col·locar fitxes blanques a les caselles fosques de les últimes N files (des de l'última fila cap amunt).
- Haurà d'implementar un mètode `getPiece(row, col)` que retorni la fitxa a la posició especificada.
- Haurà d'implementar un mètode `setPiece(row, col, piece)` que col·loqui una fitxa a la posició especificada.
- Haurà d'implementar un mètode `isEmpty(row, col)` que retorni `true` si la casella està buida.

### Exercici 3 (3 punts): Lògica del joc

Implementa la classe `GameLogic` per gestionar la lògica del joc de dames.

Les característiques de la classe són les següents:

- Ha d'implementar un constructor que inicialitzi els següents atributs:
    - Un atribut `board` que serà una instància de la classe `Board`. Li serà passat com a paràmetre al constructor.
    - Un atribut `config` que serà una instància de la classe `GameConfig`. Li serà passat com a paràmetre al constructor.
    - Un atribut `selectedPiece` que guardarà les coordenades de la fitxa seleccionada (null si no n'hi ha cap).
    - Un atribut `gameOver` que serà un booleà que indicarà si el joc ha acabat.
    - Un atribut `winner` que indicarà el guanyador ('white', 'black').
- Haurà d'implementar un mètode `isValidMove(fromRow, fromCol, toRow, toCol)` que indiqui si un moviment és vàlid:
    - Les fitxes normals només poden moure's en diagonal cap endavant (blanques cap amunt, negres cap avall).
    - Les dames poden moure's en diagonal en qualsevol direcció, però només una casella (simplificació del joc real de dames, on es pot moure +1 casella i en qualsevol direcció).
    - La casella de destinació ha d'estar buida i ser fosca.
- Haurà d'implementar un mètode `isValidCapture(fromRow, fromCol, toRow, toCol)` que indiqui si una captura és vàlida:
    - Hi ha d'haver una fitxa enemiga a la casella intermèdia.
    - La casella de destinació ha de ser vàlida.
    - Les fitxes normals només poden capturar cap endavant, les dames en qualsevol direcció diagonal.
- Haurà d'implementar un mètode `movePiece(fromRow, fromCol, toRow, toCol)` que mogui una fitxa:
    - Si és un moviment de captura, eliminar la fitxa enemiga.
    - Moure la fitxa a la nova posició.
    - Promocionar a dama si la fitxa arriba a l'extrem oposat.
    - Canviar el torn a l'altre jugador.
    - Comprovar si el joc ha acabat cridant al mètode `checkGameOver()` que s'implementarà a continuació.
    - Retornar `true` si el moviment es va realitzar correctament, `false` en cas contrari.
- Haurà d'implementar un mètode `checkGameOver()` que comprovi si el joc ha acabat:
    - Un jugador guanya si l'altre es queda sense fitxes.
    - Un jugador guanya si l'altre jugador no té moviments vàlids (està bloquejat).

### Exercici 4.1 (2 punts): Interfície d'usuari (1)

Implementa la classe `UI` per gestionar la interfície d'usuari del joc de dames.

Les característiques de la classe són les següents:

- Ha d'implementar un constructor que inicialitzi 3 atributs:
    - Un atribut `gameLogic` que serà una instància de la classe `GameLogic`. Li serà passat com a paràmetre al constructor.
    - Un atribut `gameBoard` que serà inicialitzat amb l'element de DOM que conté l'identificador `game-board`.
    - Un atribut `onRestart` que serà una funció callback que s'executarà quan es premi el botó de reinici. Li serà passat com a paràmetre al constructor.
    - Al final del constructor, haurà de cridar al mètode `setupSizeInput()` i al mètode `setupRestartButton()`.

- Ha d'implementar el mètode `setupSizeInput()` que crearà el control d'entrada de la mida del tauler:
    - Crearà un input de tipus `number` amb id `board-size` amb els següents atributs:
        - type: 'number'
        - min: '4'
        - max: '16'
        - value: '8'
    - L'input tindrà associat un label amb el text 'Board size: ' i htmlFor 'board-size'.
    - L'input i el seu label s'afegiran dins d'un div de controls que al seu torn s'afegirà al contenidor principal (element amb classe 'container').

- Ha d'implementar el mètode `setupRestartButton()` que crearà el botó de reinici:
    - Crearà un botó amb id `restart` i text `Restart Match`.
    - El botó s'afegirà al div de controls juntament amb l'input de mida del tauler.
    - El botó tindrà un esdeveniment `click` associat que:
        - Eliminarà els elements amb id 'game-status' i 'current-player' si existeixen.
        - Executarà la funció callback `onRestart` passada al constructor.

- Ha d'implementar el mètode `renderBoard()` que s'encarregarà de renderitzar el tauler al DOM:
    - Netejar el contingut de l'element `gameBoard`.
    - Afegir-li a l'element `gameBoard` la classe `game-board` i `checkerboard`.
    - Crear un nombre de cel·les segons la mida del tauler. Cada cel·la tindrà les següents característiques:
        - Serà un element de DOM de tipus `div`.
        - Tindrà la classe `cell`.
        - Tindrà la classe `dark` si és una casella fosca, `light` si és clara. El tauler de dames és una quadrícula de
          quadrats alterns on les caselles fosques són aquelles on (row + col) és senar.
        - Tindrà propietats (dataset) `row` i `col`.
        - Si conté una fitxa, tindrà un element fill `div` amb classe `piece`, classe `white` o `black` segons el
          color, i classe `king` si és una dama.
        - Si la fitxa ha estat seleccionada (gameLogic.selectedPiece), la cel·la (cell) tindrà a més la
          classe `selected`.
        - Tindrà un esdeveniment `click` associat que cridarà al mètode `handleCellClick(row, col)`. Aquest mètode
          s'implementarà a l'exercici `4.2`.
    - Cridarà a `showCurrentPlayer` per mostrar el torn actual. Aquest mètode l'implementarem a l'exercici `4.2`.

### Exercici 4.2 (1.5 punts): Interfície d'usuari (2)

Implementa els següents mètodes per a la classe `UI`:

- El mètode `handleCellClick(row, col)` que gestioni el clic en una cel·la:
    - Si no hi ha fitxa seleccionada i la cel·la conté una fitxa del jugador actual, seleccionar-la.
    - Si hi ha una fitxa seleccionada, intentar moure-la a la cel·la clicada.
    - Actualitzar el tauler després de cada acció.
    - Mostrar l'estat del joc, si ha acabat cridant a `showGameStatus`.
- El mètode `showGameStatus(status)` que mostri l'estat del joc:
    - Si status és 'white' o 'black', mostrar missatge de victòria per a aquell jugador.
    - El missatge es mostrarà en un element amb id `game-status`, a continuació del tauler de joc (identificat amb id `game-board`).
    - El missatge ha de desaparèixer automàticament després de 5 segons.
- El mètode `showCurrentPlayer()` que mostri de qui és el torn actual.
    - Crearà un element de DOM amb id `current-player`.
    - Li afegirà el text "Turn: " i el jugador a qui li toca (`White`/`Black`).
    - El pintarà abans del tauler de joc, és a dir, immediatament abans de l'element amb id `game-board`.

### Exercici 5 (1 punt): Integració del joc

Implementa la classe `Game` per integrar tots els components del joc de dames.

Aquesta classe tindrà les següents característiques:
- Haurà d'implementar un constructor amb les propietats següents inicialitzades a `null`:
    - `config`
    - `board`
    - `gameLogic`
    - `ui`

- Haurà d'implementar un mètode `start()` que iniciï el joc i que realitzarà el següent:
    - Llegirà la mida del tauler des d'un input amb id `board-size`.
    - Instanciarà la classe `GameConfig`, establirà la mida si es proporciona, i cridarà al mètode `initialize()`.
    - Instanciarà la classe `Board` i cridarà al mètode `generate()`.
    - Instanciarà la classe `GameLogic` passant-li com a paràmetres `board` i `config`.
    - Instanciarà la classe `UI` passant-li com a paràmetres `gameLogic` i una funció callback que reiniciï el joc (cridant al mètode `start()` d'aquesta mateixa classe).
    - Cridarà al mètode `renderBoard()` de la classe `UI`.
    - Comprovarà si el joc ha acabat des de l'inici (cridant a `checkGameOver()`) i mostrarà el guanyador si és necessari.

### Execució del joc

Una vegada tots els exercicis quedin resolts, el joc serà funcional i podràs jugar partides de dames, amb totes les regles bàsiques implementades: moviment diagonal, captures, promoció a dama i condicions de victòria (amb l'excepció del moviment de les dames coronades, que hem limitat).
