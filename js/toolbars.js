
var toolbarColors = ["", "yellow","blue","red","green"]


var buttonoff = new Image();
var button = new Image();
var buttonsel = new Image();





function turnOnButton(idName) {
       var  newImage = "url(" + buttonsel.src + ")";
        document.getElementById(idName).style.backgroundImage = newImage;
      }

function turnOffButton(idName) {
     var  newImage = "url(" + buttonoff.src + ")";
	if (idName == 'Current') newImage = "url(" + button.src + ")";
       document.getElementById(idName).style.backgroundImage = newImage;
      }


var quoteMark = unescape( '%22' );
var singlequoteMark = unescape( '%27' );
var bookTag = "<a href = 'http://www.mnlibros.com.ar/DespLibro.asp?Libro=9706861351'>";

function writeMailtag(theSubject) {
var theAddress = "mailto:stefman2@optonline.net?Subject="+theSubject;
var theTag = "<a href = '" + theAddress + "'>Webmaster</a>";
document.writeln(theTag);
} // writeMailtag



function writeToolbar(number, theColorIndex) {
// number = which tag is active
// theColorIndex = index in toolbarColors
var theColor = toolbarColors [theColorIndex]; // this is global for some readopn


buttonoff.src = "../nwelts/" + theColor + "buttonoff.gif";

button.src = "../nwelts/" + theColor + "button.gif";

buttonsel.src = "../nwelts/" + theColor + "buttonsel.gif";

var theIdentities = ["", "Other0", "Other1","Other2","Other3", "Other4", "Other5", "Other6"];
theIdentities[number] = "Current";
var theMainPages = ['', '../index.html', '../tcfinitep.html', '../tccalcp.html', '../summaryindex.html', '../tutindex.html', '../textindex.html', '../utilsindex.html'];
theMainPages[number] = '#';

var theBrokenLineStr = "<td width = 10><img src = '../nwelts/" + theColor + "line.gif' height = 2 width = 10></td>";
for (var i = 1; i <= number-1; i++) {
	theBrokenLineStr += "<td width = 118><img src = '../nwelts/" + theColor + "line.gif' height = 2 width = 118></td><td width = 5><img src = '../nwelts/" + theColor + "line.gif' height = 2 width = 5></td>";
	}// i
if(number > 0) theBrokenLineStr += "<td width = 118></td><td width = 5><img src = '../nwelts/" + theColor + "line.gif' height = 2 width = 5></td>";
for (var i = number+1; i <= 7; i++) {
	theBrokenLineStr += "<td width = 118><img src = '../nwelts/" + theColor + "line.gif' height = 2 width = 118></td>";
if (i < 7) theBrokenLineStr += "<td width = 5><img src = '../nwelts/" + theColor + "line.gif' height = 2 width = 5></td>";
	}// i
theBrokenLineStr += "<td width = 10><img src = '../nwelts/" + theColor + "line.gif' height = 2 width = 10></td>";

var theToolBarString = "<div id = 'toolbar'><table cellspacing = 0 cellpadding = 0><tr><td width = 10></td><td id='" + theIdentities[1] + "' align = center width = 118 height = 34><a onMouseover = " + quoteMark + "Javascript: turnOnButton('" + theIdentities[1] + "')" + quoteMark + "onMouseout = " + quoteMark + "Javascript: turnOffButton('" + theIdentities[1] + "')" + quoteMark + " href = '" + theMainPages[1] + "'>P&aacute;gina Principal</a></td><td width = 5></td><td id='" + theIdentities[2] + "' align = center width = 118 height = 34><a onMouseover = " + quoteMark + "Javascript: turnOnButton('" + theIdentities[2] + "')" + quoteMark + "onMouseout = " + quoteMark + "Javascript: turnOffButton('" + theIdentities[2] + "')" + quoteMark + " href = '" + theMainPages[2] + "'>Todo para Matem&aacute;ticas Finitas</a></td><td width = 5></td><td id='" + theIdentities[3] + "' align = center width = 118 height = 34><a onMouseover = " + quoteMark + "Javascript: turnOnButton('" + theIdentities[3] + "')" + quoteMark + "onMouseout = " + quoteMark + "Javascript: turnOffButton('" + theIdentities[3] + "')" + quoteMark + " href = '" + theMainPages[3] + "'>Todo para C&aacute;lculo Aplicado</a></td><td width = 5></td><td id='" + theIdentities[4] + "' align = center width = 118 height = 34><a onMouseover = " + quoteMark + "Javascript: turnOnButton('" + theIdentities[4] + "')" + quoteMark + "onMouseout = " + quoteMark + "Javascript: turnOffButton('" + theIdentities[4] + "')" + quoteMark + " href = '" + theMainPages[4] + "'>Resumenes de Temas</a></td><td width = 5></td><td id='" + theIdentities[5] + "' align = center width = 118 height = 34><a onMouseover = " + quoteMark + "Javascript: turnOnButton('" + theIdentities[5] + "')" + quoteMark + "onMouseout = " + quoteMark + "Javascript: turnOffButton('" + theIdentities[5] + "')" + quoteMark + " href = '" + theMainPages[5] + "'>Tutoriales En L&iacute;nea</a></td><td width = 5></td><td id='" + theIdentities[6] + "' align = center width = 118 height = 34><a onMouseover = " + quoteMark + "Javascript: turnOnButton('" + theIdentities[6] + "')" + quoteMark + "onMouseout = " + quoteMark + "Javascript: turnOffButton('" + theIdentities[6] + "')" + quoteMark + " href = '" + theMainPages[6] + "'>Texto En L&iacute;nea</a></td><td width = 5></td><td id='" + theIdentities[7] + "' align = center width = 118 height = 34><a onMouseover = " + quoteMark + "Javascript: turnOnButton('" + theIdentities[7] + "')" + quoteMark + "onMouseout = " + quoteMark + "Javascript: turnOffButton('" + theIdentities[7] + "')" + quoteMark + " href = '" + theMainPages[7] + "'>Utilidades En L&iacute;nea</a></td><td width = 5></td><td width = 10></td></tr><tr>" + theBrokenLineStr + "</tr></table></div>";
document.write(theToolBarString);

} // writeToolbar


var formatTable = '<center><table border = 1 width = 90% cellspacing = 0 cellpadding = 7 noshade border = 0 bordercolor = #009933 STYLE=' + quoteMark + 'background-color: FFE9EE; border-collapse: collapse' + quoteMark + '><tr><td align = center><font class = smtableHeading>Unos Ejemplos:<br>Expresi&oacute;n</font></td><td align = center><font class = smtableHeading>Formato (espacios son ignorados)</font></td></tr><tr><td align = center> 2<font class = math>x</font> <font face = ' + quoteMark + 'Courier' + quoteMark + '>-</font> 4</td><td align = center><font face = ' + quoteMark + 'Courier' + quoteMark + ' class = magenta>2*x-4 </font>or<font face = ' + quoteMark + 'Courier' + quoteMark + ' class = magenta> 2x-4</font></td></tr><tr><td align = center>3<sup>2</sup></td><td align = center><font face = ' + quoteMark + 'Courier' + quoteMark + ' class = magenta> 3^2 </font>or<font face = ' + quoteMark + 'Courier' + quoteMark + ' class = magenta> pow(3,2)</font></td></tr><tr><td align = center> 3<font class = math>x</font><sup>2</sup> + 4<font class = math>x</font> <font face = ' + quoteMark + 'Courier' + quoteMark + '>-</font> 5</td><td align = center><font face = ' + quoteMark + 'Courier' + quoteMark + ' class = magenta>3*x^2+4*x-5 </font>or<font face = ' + quoteMark + 'Courier' + quoteMark + ' class = magenta> 3x^2+4x-5</font></td></tr><tr><td align = center> 3,000e<sup>2<font class = math>x</font><font face = ' + quoteMark + 'Courier' + quoteMark + '>-</font>1</sup></td><td align = center><font face = ' + quoteMark + 'Courier' + quoteMark + ' class = magenta>3000*e^(2*x-1) </font>or<font face = ' + quoteMark + 'Courier' + quoteMark + ' class = magenta>   3000*exp(2x-1)</font></td></tr><tr><td align = center><table><tr><td nowrap><center>2<font class = math>x</font> <font face = ' + quoteMark + 'Courier' + quoteMark + '>-</font> 1<br><img src = ' + quoteMark + 'SYMB/FR.GIF' + quoteMark + ' height = 1 width =100%><br>3<font class = math>x</font><sup>2</sup> <font face = ' + quoteMark + 'Courier' + quoteMark + '>-</font> 4<font class = math>x</font> </center></td></tr></table></td><td align = center><font face = ' + quoteMark + 'Courier' + quoteMark + ' class = magenta> (2x-1)/(3x^2-4x)</font></td></tr><tr><td align = center>|2x <font face = ' + quoteMark + 'Courier' + quoteMark + '>-</font> e<sup>x</sup>|</td><td align = center><font face = ' + quoteMark + 'Courier' + quoteMark + ' class = magenta>abs(2x-exp(x)) </font>or<font face = ' + quoteMark + 'Courier' + quoteMark + ' class = magenta> abs(2x-e^x)</font></td></tr><tr><TD align = center><TABLE><TR><img src = ' + quoteMark + 'gf/shortsqrtline.gif' + quoteMark + '><br><img src = ' + quoteMark + 'gf/sqrt.gif' + quoteMark + '>2x+1</td></TR></TABLE></TD></td><td align = center><font face = ' + quoteMark + 'Courier' + quoteMark + ' class = magenta> (2x+1)^0.5 </font>or<font face = ' + quoteMark + 'Courier' + quoteMark + ' class = magenta> sqrt(2x+1)</font></td></tr><tr><td align = center>ln | 4<font class = math>x</font><sup>3</sup><font face = ' + quoteMark + 'Courier' + quoteMark + '>-</font>5<font class = math>x</font> | + log(10<sup><font class = math>x</font></sup><img src =' + quoteMark + 'gf/thinspace.gif' + quoteMark + ' width = 2>)</td><td align = center><font face = ' + quoteMark + 'Courier' + quoteMark + ' class = magenta>ln(abs(4x^3-5x))+log(10^x)</font></td></tr><tr><td align = center>sin(&pi;<font class = math>x</font> <font face = ' + quoteMark + 'Courier' + quoteMark + '>-</font> 4)</td><td align = center><font face = ' + quoteMark + 'Courier' + quoteMark + ' class = magenta>sin(pi*x-4) </font>NOT<font face = ' + quoteMark + 'Courier' + quoteMark + ' class = magenta> sin(pix-4) </font></td></tr></table></center>';

// *** Error Handler ******
function myErrorTrap(message,url,linenumber) {
this.parent.bottom.window.location = "wrong.html";
return (true);
} // end of on error
// ********************


