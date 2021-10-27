

// *********************** COPYRIGHT (c) 2004, 2007 STEFAN WANER *********
// *********************** ALL RIGHTS RESERVED *********************

< !----- invisible to non - javascript browsers


// *******GLOBAL DECLARATIONS FOLLOW ***************************

var toolbarNumber = 16; // number of images in the toolbar needed for image[]
var okToRoll = true;
rowicon1up = new Image();
rowicon1up.src = "icon1.gif";
rowicon2up = new Image();
rowicon2up.src = "icon2.gif";
rowicon3up = new Image();
rowicon3up.src = "icon3.gif";
rowicon4up = new Image();
rowicon4up.src = "icon4.gif";
rowicon5up = new Image();
rowicon5up.src = "icon5.gif";
rowicon5off = new Image();
rowicon5off.src = "iconx.gif";

var playing = false;
var gameEmpty = true;	// in case nothing is entered
var biggestRowNum = 5;	// nonempty rows
var biggestColNum = 5;	// these are cols
var theScore = 0;		// for playing mode
var gameValue = 0;		// value of the game
var repeatWatch = true;	// pay attention to repeated strategies
var repeatThreshold = 3;	// reacts if repeat at least 4 times
var numRepeats = 0;
var lastPlay = 1;		// last row move (arbitray)
var numRows = 5;
var numCols = 5;
var numActRows = 5;
var numActCols = 5;
var theMatrix = new makeArray2(numRows, numCols);
var activeCol = new Array();
var activeRow = new Array();
var rowMinAr = new Array();	// to record multiple row minima
rowMinAr[0] = 0;			// This entry tells how many minima there are
for (var i = 1; i <= 5; i++) {
    activeCol[i] = true;
    activeRow[i] = true;
}
var tellCols = true;
var tellRows = true;
var colStrategy = new Array();
for (i = 1; i <= numCols; i++) colStrategy[i] = 0;
var rowStrategy = new Array();
for (i = 1; i <= numRows; i++) rowStrategy[i] = 0;

// window.onerror = handleError;
// ***********************HANDLE ERROR **************
function handleError() {
    // alert(count);
}

// *****************MATH ROUTINES *******************
function roundEight(theNumber) {
    var x = (Math.round(100000000 * theNumber)) / 100000000;
    return (x);
}
function roundNine(theNumber) {
    var x = (Math.round(1000000000 * theNumber)) / 1000000000;
    return (x);
}

function evaluate(theString) {
    return (eval(theString));
}

// *****************PLAYING ROUTINES **************
function playTheGame() {
    readMatrix();
    if (gameEmpty) document.theDiagram.Comment.value = "No ha introducido ningun pagos en la matriz de pagos." + "\n\r" + "Introduzcalos pagos y pruebe de nuevo.";
    else {
        playing = true;
        theScore = 0;
        numRepeats = 0;
        var xyz = saddlePoint();
        reduceByDominance();
        xyz = solveGame();
        document.theDiagram.status.value = "Resultado = " + theScore + " Le toca a usted. (Clic en una accion renglon.)"
    } // game not empty
} // playTheGame



function stopTheGame() {
    playing = false;
    if (theScore > 0) {
        document.theDiagram.status.value = "Gano usted";
        if (gameValue > 0) document.theDiagram.status.value += ". No es gran cosa. Este juego es parcial en su favor. ";
        else if (gameValue == 0) document.theDiagram.status.value += ". Bastante bien. Este juego es justo.";
        else if (gameValue < 0) document.theDiagram.status.value += ". Excelente. Este juego es parcial en mi favor.";
    }
    else if (theScore == 0) {
        document.theDiagram.status.value = "Es un empate";
        if (gameValue > 0) document.theDiagram.status.value += ".No impresionante. Este juego es parcial en su favor.";
        else if (gameValue == 0) document.theDiagram.status.value += ". Bien. Este juego es justo.";
        else if (gameValue < 0) document.theDiagram.status.value += ". Excelente. Este juego es parcial en mi favor.";
    }

    else if (theScore < 0) {
        document.theDiagram.status.value = "Usted perdio";
        if (gameValue > 0) document.theDiagram.status.value += ". Mal hecho. Este juego es parcial en su favor.";
        else if (gameValue == 0) document.theDiagram.status.value += ". No impresionante. Este juego es justo.";
        else if (gameValue < 0) document.theDiagram.status.value += ". No hay sorpresa. Este juego es parcial en mi favor.";
    }
} // stopTheGame

function playThis() {
    if (playing) {
        var i = playThis.arguments[0];
        if (i > biggestRowNum) document.theDiagram.status.value = "No pueda hacer eso!";
        else {
            var theResponse = 1; // temporary
            // first deal with repeated moves by row player
            if (i == lastPlay) numRepeats++;
            else numRepeats = 0;
            lastPlay = i;
            if (numRepeats >= repeatThreshold) {
                var min = theMatrix[i][1];
                for (var j = 2; j <= biggestColNum; j++) {
                    if (theMatrix[i][j] < min) {
                        min = theMatrix[i][j];
                        theResponse = j;
                    }
                }
            }
            else
            // play according to optimal strategy
            {
                var theProb = 0;
                var rnd = 0;
                while (rnd == 0) {
                    rnd = Math.random();
                } // don't want exactly 0...
                var j = 0;
                while ((rnd > theProb) && (j < numCols)) {
                    j++;
                    theProb += colStrategy[j];
                }
                theResponse = j;
            }
            var thePayoff = theMatrix[i][theResponse];
            theScore += thePayoff;
            document.theDiagram.status.value = "Mi accion fue " + theResponse + ". Pago = " + roundEight(thePayoff) + ". Resultado = " + roundEight(theScore) + ". Le toca a usted. ";
        }
    } // if playing
    else {
        document.theDiagram.Comment.value += "\n\r" + "Pulse 'Juega' para jugar conra mi.";
    }
} // playThis

// *******************PIVOT **********************
function pivot(InMatrix, rows, cols, theRow, theCol) {
    // alert("theRow = " + theRow + "theCol" + theCol);
    var thePivot = InMatrix[theRow][theCol];
    for (var i = 1; i <= cols; i++) {
        InMatrix[theRow][i] = InMatrix[theRow][i] / thePivot;
    } // i
    // now pivot
    for (var i = 1; i <= rows; i++) {
        if ((i != theRow) && (InMatrix[i][theCol] != 0)) {
            var factr = InMatrix[i][theCol];
            for (var j = 1; j <= cols; j++) {
                InMatrix[i][j] = InMatrix[i][j] - factr * InMatrix[theRow][j];
            } // j
        }
    } // i
    // now round all answers
    for (var i = 1; i <= rows; i++) {
        for (var j = 1; j <= cols; j++) {
            InMatrix[i][j] = roundNine(InMatrix[i][j]);
        } // j
    } // i
    return (InMatrix);
}

// ****************SIMPLEX METHOD****************
function simplexMethod(InMatrix, rows, cols) {
    var negIndicator = false;
    var testRatio = new Array();
    var theRow = 0;
    for (var i = 1; i <= cols - 1; i++) {
        if (InMatrix[rows][i] < 0) {
            var theCol = i;
            negIndicator = true;
        }
    } // i
    while (negIndicator) {
        for (var i = 1; i <= rows - 1; i++) {
            testRatio[i] = -1;
            if (InMatrix[i][theCol] > 0) {
                testRatio[i] = InMatrix[i][cols] / InMatrix[i][theCol];
            }
        } // i
        var minRatio = 10000000000000;
        for (var i = 1; i <= rows - 1; i++) {
            if ((testRatio[i] >= 0) && (testRatio[i] <= minRatio)) {
                minRatio = testRatio[i];
                theRow = i;
            }
        } // i
        InMatrix = pivot(InMatrix, rows, cols, theRow, theCol);
        negIndicator = false;
        for (var i = 1; i <= cols - 1; i++) {
            if (InMatrix[rows][i] < 0) {
                theCol = i;
                negIndicator = true;
            }
        } // i
    } // while negIndicator
    return (InMatrix);
} // simplexMethod

// ********************SOLVING A GAME***************
function solveGame() {
    if (gameEmpty) document.theDiagram.Comment.value = "No ha introducido ningun pagos en la matriz de pagos." + "\n\r" + "Introduzcalos pagos y pruebe de nuevo.";
    else if (numActRows == 1) {
        // this was taken care of in the saddle point routine
    }
    else {
        var rows = numActRows + 1;
        var cols = numActCols + numActRows + 2;
        theTableau = new makeArray2(rows, cols);
        // first get the biggest negative number in the active game
        var k = 0;
        for (var i = 1; i <= 5; i++) {
            for (var j = 1; j <= 5; j++) {
                if ((activeRow[i]) && (activeCol[j])) {
                    if (theMatrix[i][j] < k) k = theMatrix[i][j];
                }
            } // j
        } // i
        k = -k;
        // its a positive number
        // now set up the tableau
        var rowNum = 0;

        for (i = 1; i <= rows; i++) {
            rowNum++;
            if (i <= numActRows) {
                var foundRow = false;
                while (!foundRow) {
                    if (activeRow[rowNum]) {
                        foundRow = true;
                    }
                    else rowNum++;
                } // while not found
                var colNum = 1;
                for (j = 1; j <= cols; j++) {
                    foundEntry = false;
                    while (!foundEntry) {
                        // alert ("j = " + j + "colNum = " + colNum);
                        if ((j <= numActCols) && (activeCol[colNum])) {
                            theTableau[i][j] = theMatrix[rowNum][colNum] + k;
                            colNum++;
                            foundEntry = true;
                            // alert ("i = " + i + "j = " + j + "rowNum = " + rowNum + "colNum = " + colNum 	);
                        }

                        else if ((j <= numActCols) && (!activeCol[colNum])) {
                            colNum++;
                        }
                        else if ((j > numActCols) && (j == numActCols + i)) {
                            foundEntry = true;
                            theTableau[i][j] = 1;
                        }
                        else if ((j > numActCols) && (j != numActCols + i)) {
                            foundEntry = true;
                            theTableau[i][j] = 0;
                        }
                        if ((j == cols) && (i < rows)) theTableau[i][j] = 1;
                    } // found entry
                } // j
            } // if i lt num rows
            if (i == rows) {
                for (j = 1; j <= numActCols; j++) theTableau[i][j] = -1;
                for (j = numActCols + 1; j <= cols; j++) theTableau[i][j] = 0;
                theTableau[i][cols - 1] = 1;
            }
        } // i

        // present results -- deBug
        var deBug0 = false;
        if (deBug0) {
            for (i = 1; i <= rows; i++) {
                document.theDiagram.Comment.value = document.theDiagram.Comment.value + "\r"
                for (j = 1; j <= cols; j++) {
                    document.theDiagram.Comment.value = document.theDiagram.Comment.value + theTableau[i][j] + " ";
                }
            }
            document.theDiagram.Comment.value = document.theDiagram.Comment.value + "\r" + "num rows = " + rows + "numcols = " + cols;
        } // deBug


        // now do the simplex method
        theTableau = simplexMethod(theTableau, rows, cols);

        // present results -- deBug
        var deBug = false;
        if (deBug) {
            for (i = 1; i <= rows; i++) {
                document.theDiagram.Comment.value = document.theDiagram.Comment.value + "\r"
                for (j = 1; j <= cols; j++) {
                    document.theDiagram.Comment.value = document.theDiagram.Comment.value + theTableau[i][j] + " ";
                }
            }
            document.theDiagram.Comment.value = document.theDiagram.Comment.value + "\r" + "num rows = " + rows + "numcols = " + cols;
        } // deBug

        // now the column strategy
        // get the solutions from the tableau
        var solution = new Array();
        var theCol = 0; // the column in the simplex method tablea…