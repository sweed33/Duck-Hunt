var section;
var clicksp=0;
var easteregg=0;
var patosEaster=0;

var juegoEmpezado=0;
var haFallado;//si el inmediatamente anterior tiro ha sido fallido haFallado==1

//jugador
var jugador;


//variables animacion inicial
var perro;
var movIniPerro;
var saltoPerro;
var caidaPerro;
var leftInicialPerro=10;
var topInicialPerro=300;
var waitPerroSalto=0;
var haCaido=0;

//variables mira de escopeta
var intervaloMira;
var x,y;//coordenadas raton

//variables pato
var pato;
var lado;//lado por el que ha salido el pato
var animacionPato;
var patoimg;
var fotogramas;
var divpato;
var intervaloPato;

//variables accion perro
var fotogramasaccion;
var aperro=0;
var yaccionperro;
var perroimg;
var divperroaccion;
var animacionsubir;
var haSubido;
var perroanimandose;//si el perro se encuentra en una animacion de accion perroanimandose==1


window.onload=function(){
	section=document.getElementById("section");//cojo el elemento section

	//listener teclado para recargar
	document.addEventListener('keyup', function(event){
		var char = event.which || event.keyCode;
		if(char==82){
			clicksp=0;
			if(jugador.recargas>0&&jugador.balas==0){
				jugador.recargas--;
				jugador.balas=3;
				section.removeChild(section.lastChild);
				colocarBullets();
		}}else if(char==80){
			clicksp++;
			if(clicksp>9){
				patosEaster=0;
				easteregg=1;
				clicksp=0;
			}
		}else clicksp=0;
		})
	//empieza la partida
  	start();
}

//animacion perro
function start(){
	jugador=new Jugador(2,3,0);
	//comienza a andar el perro
	movIniPerro=setInterval("andar()",200);
}

//perro anda hasta la mitad de la pantalla
function andar(){
	if(leftInicialPerro<200){
		perro=document.getElementById("perro");
		divperro=document.getElementById("divperro");
		if(perro.src.substring(perro.src.length-14,perro.src.length)=="perroanda0.png")perro.src="../img/perro/perroanda1.png";
		else perro.src="../img/perro/perroanda0.png";
		divperro.style.left=(leftInicialPerro+10)+"px";
		leftInicialPerro+=10;
	}else{
		perro=document.getElementById("perro");
		perro.src="../img/perro/perroanda2.png";
		waitPerroSalto++;
		if(waitPerroSalto>10){
			perro.style.width="90px";
			clearInterval(movIniPerro);
			saltoPerro=setInterval("funSaltoPerro()",10);
		}
	}
}

//salto perro
function funSaltoPerro(){
	if(topInicialPerro>200){
		perro=document.getElementById("perro");
		divperro=document.getElementById("divperro");
		perro.src="../img/perro/perrosalta0.png";
		topInicialPerro=topInicialPerro-2;
		leftInicialPerro++;
		divperro.style.left=(leftInicialPerro)+"px";
		divperro.style.top=(topInicialPerro)+"px";
	}else{
		perro=document.getElementById("perro");
		perro.src="../img/perro/perrosalta1.png";
		perro.width="80px";
		aniadirFront();
		clearInterval(saltoPerro);
		caidaPerro=setInterval("funCaidaPerro()",10);
	}
}

//caida de salto perro
function funCaidaPerro(){
	if(topInicialPerro<300){
		divperro=document.getElementById("divperro");
		topInicialPerro=topInicialPerro+1.5;
		leftInicialPerro=leftInicialPerro+0.5;
		divperro.style.left=(leftInicialPerro)+"px";
		divperro.style.top=(topInicialPerro)+"px";
	}else{
		clearInterval(caidaPerro);
		colocarPaneles();//coloca elementos en pantalla
	}
}
//acaba animacion inicial perro

///coloca los elementos visuales
function colocarPaneles(){
	juegoEmpezado=1;
	limpiarSection();
	aniadirFront();
	colocarScore();
	colocarBullets();
	sacarPatos();//saco el primer pato
}

//limpia el section
function limpiarSection(){
	while (section.childNodes.length>=1)section.removeChild(section.firstChild);//limpio la pantalla
}

//aniade el cesped en el frente(se va a utilizar para poder mostrar los elementos tras él)
function aniadirFront(){
	var front=document.createElement("img");
	var divfront=document.createElement("div");
	divfront.style.left="0px";
	divfront.style.top="291px";
	front.src="../img/front.png";
	divfront.appendChild(front);
	var section=document.getElementById("section");
	section.appendChild(divfront);
}

//coge coordenadas raton
function coordenadas(event) {
	x=event.clientX-document.getElementById("section").offsetLeft;
	y=event.clientY;
}

//coloca bullets y recargas restantes
function colocarBullets(){
	var divbullets=document.createElement("div");
	divbullets.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;R: "+jugador.recargas+"<br>";//recargas
	divbullets.id="divbullets";
	var bullet1=document.createElement("img");
	bullet1.id="bullet1";
	bullet1.className="bullet";
	if(jugador.balas>=1||easteregg==1)bullet1.src="../img/bullet.png";
	else bullet1.src="../img/bulletrans.png";
	var bullet2=document.createElement("img");
	bullet2.id="bullet2";
	bullet2.className="bullet";
	if(jugador.balas>=2||easteregg==1)bullet2.src="../img/bullet.png";
	else bullet2.src="../img/bulletrans.png";
	var bullet3=document.createElement("img");
	bullet3.id="bullet2";
	bullet3.className="bullet";
	if(jugador.balas==3||easteregg==1)bullet3.src="../img/bullet.png";
	else bullet3.src="../img/bulletrans.png";
	divbullets.appendChild(bullet1);
	divbullets.appendChild(bullet2);
	divbullets.appendChild(bullet3);
	section.appendChild(divbullets);
}

//coloca score
function colocarScore(){
	var divscore=document.createElement("div");
	divscore.id="divscore";
	divscore.innerHTML=jugador.score+"<br>SCORE";
	section.appendChild(divscore);
}

//clase jugador
function Jugador(recargas,balas,score){
	this.recargas=recargas;
	this.balas=balas;
	this.score=score;
}

//limpiar para patos
function limpiarSectionPatos(){
	while (section.childNodes.length>1)section.removeChild(section.firstChild);//limpio la pantalla
	aniadirFront();
	colocarScore();
	colocarBullets();
}

//funcion imprimete pato
function imprimete(){ 
	divpato=document.createElement("div");
	divpato.id="divpato";
	patoimg=document.createElement("img");
	patoimg.src=this.src;
	if(easteregg==1)patoimg.className="patoVivoG";
	else patoimg.className="patoVivo";
	divpato.style.top=this.topPato+"px";
	divpato.style.left=this.leftPato+"px";
 	divpato.appendChild(patoimg);
 	section.appendChild(divpato);
 	limpiarSectionPatos();
 	animacionPato=setInterval("animacion()",20);
 } 


//animacion pato
function animacion(){
	divpato.style.top=(pato.topPato+pato.avanceY)+"px";
	divpato.style.left=(pato.leftPato+pato.avanceX)+"px";
	pato.leftPato+=pato.avanceX;
	pato.topPato+=pato.avanceY;
	if(fotogramas%5==0){//cada 10 fotogramas de animacion la imagen cambia
		switch(pato.turnoImagen){
			case 0:
				patoimg.src="../img/pato/patoarriba1.png";
				pato.turnoImagen=1;
				break;
			case 1:
				patoimg.src="../img/pato/patoarriba2.png";
				pato.turnoImagen=2;
				break;
			case 2:
				patoimg.src="../img/pato/patoarriba0.png";
				pato.turnoImagen=0;
				break;
			case 3:
				patoimg.src="../img/pato/patoarriba4.png";
				pato.turnoImagen=4;
				break;
			case 4:
				patoimg.src="../img/pato/patoarriba5.png";
				pato.turnoImagen=5;
				break;
			case 5:
				patoimg.src="../img/pato/patoarriba3.png";
				pato.turnoImagen=3;
				break;
			default:
				break;
		}
	}
	
	//corto el div del pato si se sale del section
	if(pato.leftPato<0||pato.topPato<0&&lado==1){
		if(easteregg==0)var clip="rect("+(pato.topPato<0?-pato.topPato:0)+"px,50px,50px,"+(pato.leftPato<-50?50:-pato.leftPato)+"px)";
		else var clip="rect("+(pato.topPato<0?-pato.topPato:0)+"px,100px,100px,"+(pato.leftPato<-100?100:-pato.leftPato)+"px)";
		divpato.style.clip=clip;
	}
	if(pato.leftPato>=458||easteregg==1&&pato.leftPato>=408||pato.topPato<0&&lado==0){
		if(easteregg==0)var clip="rect("+(pato.topPato<0?-pato.topPato:0)+"px,"+(pato.leftPato>=508?0:508-pato.leftPato)+"px,50px,0px)";
		else var clip="rect("+(pato.topPato<0?-pato.topPato:0)+"px,"+(pato.leftPato>=508?0:508-pato.leftPato)+"px,100px,0px)";
		divpato.style.clip=clip;
	}

	fotogramas++;
	if(pato.topPato<-110){//si el pato se ha salido de la pantalla por arriba
		aperro=0;
		pararPato();
	}
}

//parar pato y preparar el siguiente
function pararPato(){
	clearInterval(animacionPato);
	if(easteregg==0)intervaloPato=setTimeout("sacarPatos()",3000);
	else intervaloPato=setTimeout("sacarPatos()",500);
	haFallado=0;
}

//disparar
function disparar(){
	if(divpato!==null&&juegoEmpezado==1&&perroanimandose==0&&jugador.balas>0){
		if(easteregg==0)jugador.balas--;
		section.removeChild(section.lastChild);
		colocarBullets();
		divpato=document.getElementById("divpato");
		if(x>=pato.leftPato&&x<=pato.leftPato+50&&y>=pato.topPato&&y<=pato.topPato+50||easteregg==1&&x>=pato.leftPato&&x<=pato.leftPato+100&&y>=pato.topPato&&y<=pato.topPato+100){//si ha alcanzado el pato
			if(easteregg==0)jugador.score+=500;
			else jugador.score+=2500;
			if(aperro==0)aperro=1;//si es el primer pato consecutivo
			else if(aperro==1){//si en el tiro anterior ya alcanzó un pato
				aperro=2;
				jugador.recargas++;
			}
			switch(lado){
				case 0:
					patoimg.src="../img/pato/patocaidaderecha.png";
					break;
				default:
					patoimg.src="../img/pato/patocaidaizquierda.png";
					break;
			}
			pararPato();
			caidaPato=setInterval("caePato()",20);
			
		}else{
			aperro=0;
			haFallado=1;
			if(easteregg==0)intervaloPato=setTimeout("sacarPatos()",3000);
			else intervaloPato=setTimeout("sacarPatos()",500);
			accionPerro();
		}
	}
}

//animacion caida
function caePato(){
	divpato=document.getElementById("divpato");
	if(easteregg==1)patoimg.className="patoMuertoG";
	else patoimg.className="patoMuerto";
	if(easteregg==0)pato.topPato=pato.topPato+5;
	else pato.topPato=pato.topPato+20;
	divpato.style.top=pato.topPato+"px";
	if(pato.topPato>320){//si el pato ya ha sobrepasado el césped
		clearInterval(caidaPato);
		accionPerro();
	}
}

//clase pato
function Pato(turnoImagen,topPato,leftPato,src,avanceX){//estado=0 vivo 
   	this.turnoImagen=turnoImagen;
    this.topPato=topPato;
    this.leftPato=leftPato;
    this.src=src;
    if(easteregg==0)this.avanceY=-(topPato/100);
    else this.avanceY=-(topPato/50);
    this.avanceX=avanceX;
	this.imprimete=imprimete;
	this.animacion=animacion;
	this.disparar=disparar;
	this.caePato=caePato;
	this.imprimete();
}

//funcion nuevo pato
function sacarPatos(){
	fotogramas=0;
	perroanimandose=0;
	if(intervaloPato!==null)clearInterval(intervaloPato);
	lado=Math.round(Math.random()*1);
	switch(lado){
		case 0:
			pato=new Pato(0,Math.round(Math.random()*(378-290)+290),Math.round(Math.random()*150),"../img/pato/patoarriba0.png",easteregg==0?Math.round(Math.random()*(5-2)+2):Math.round(Math.random()*(10-5)+5));
			break;
		default:
			pato=new Pato(3,Math.round(Math.random()*(378-290)+290),Math.round(Math.random()*(450-250)+250),"../img/pato/patoarriba3.png",easteregg==0?-Math.round(Math.random()*(5-2)+2):-Math.round(Math.random()*(10-5)+5));
			break;
	}
	if(easteregg==1)patosEaster++;
	if(patosEaster>=10){
		easteregg=0;
		patosEaster=0;
	}
}

//limpiar para cuando se falla un tiro(que deje el pato)
function limpiarSectionRisas(){
	while (section.childNodes.length>1)section.removeChild(section.lastChild);//limpio la pantalla
}

//colocar para cuando se falla un tiro(que deje el pato y el perro)
function colocarRisas(){
	while (section.childNodes.length>2)section.removeChild(section.lastChild);//limpio todo menos el pato y el perro
	aniadirFront();
	colocarScore();
	colocarBullets();
}

//funcion accion perro
function accionPerro(){
		haSubido=0;
		perroanimandose=1;
		yaccionperro=300;
	switch(aperro){//segun los fallos o aciertos se realiza una acción
		case 0:
			limpiarSectionRisas();//borro todo menos el pajaro
			divperroaccion=document.createElement("div");
			divperroaccion.id="divperroaccion";
			perroimg=document.createElement("img");
			perroimg.src="../img/perro/perrorie0.png";
			perroimg.id="perrorie";
			divperroaccion.appendChild(perroimg);
			section.appendChild(divperroaccion);
			colocarRisas();
			fotogramasaccion=0;
			if(easteregg==0)animacionsubir=setInterval("subirPerro()",50);
			else animacionsubir=setInterval("subirPerro()",10);
			break;
		case 1:
			limpiarSection();
			divperroaccion=document.createElement("div");
			divperroaccion.id="divperroaccion";
			perroimg=document.createElement("img");
			perroimg.src="../img/perro/perrocelebra0.png";
			perroimg.id="perrocelebra";
			divperroaccion.appendChild(perroimg);
			section.appendChild(divperroaccion);
			limpiarSectionPatos();
			fotogramasaccion=0;
			if(easteregg==0)animacionsubir=setInterval("subirPerro()",40);
			else animacionsubir=setInterval("subirPerro()",8);
			break;
		default:
			aperro=0;//vuelvo a iniciar para la siguiente
			limpiarSection();
			divperroaccion=document.createElement("div");
			divperroaccion.id="divperroaccion";
			perroimg=document.createElement("img");
			perroimg.src="../img/perro/perrocelebra1.png";
			perroimg.id="perrocelebra2";
			divperroaccion.appendChild(perroimg);
			section.appendChild(divperroaccion);
			limpiarSectionPatos();
			fotogramasaccion=0;
			if(easteregg==0)animacionsubir=setInterval("subirPerro()",40);
			else animacionsubir=setInterval("subirPerro()",8);
			break;
	}
}

//animacion de accion perro
function subirPerro(){
		if(perroimg.id=="perrorie"&&fotogramasaccion%5==0){//si el perro se esta riendo cambiamos su imagen cada 5 fotogramas
				if(perroimg.src.substring(perroimg.src.length-13,perroimg.src.length)=="perrorie0.png")perroimg.src="../img/perro/perrorie1.png";
				else perroimg.src="../img/perro/perrorie0.png";
		}
		if(yaccionperro>250&&haSubido==0){//si esta subiendo
			yaccionperro=yaccionperro-2;
		}else{//si ya ha subido al top deseado
			haSubido=1;
			yaccionperro=yaccionperro+2;
		}
		divperroaccion.style.top=yaccionperro+"px";
		if(yaccionperro>=320){//si ya ha vuelto a bajar despues de subir
			pararPerro();
		}
		fotogramasaccion++;
}

//parar animacion de accion perro
function pararPerro(){
	perroanimandose=0;
	clearInterval(animacionsubir);
}
