//GLOBAL VARIABLES:
var div;//Main container of the calculator
var input;
var inputContent=0;
var incoming=false;
var add=false;//Created to work in conjunction with equal sign to indicate that it's a continuation of a addition operation or no.
var displayingResultsAdd=false;//The number diplayed in the input was just typed or a result of a privious addition ?
var sub=false;//same as add
var displayingResultsSub=false;//Same purpose as displayingResultsAdd(substraction in this case).
var mult=false;//same as add
var displayingResultsMult=false;//Same purpose as displayingResultsAdd(multiplication in this case).
var divi=false;//same as add
var displayingResultsDiv= false;//Same purpose as displayingResultsAdd(for division in this case).


function addition(){

	if(checkLength()||!/\d/.test(input.value)|| displayingResultsAdd==true){
			return;
		//THIS CONDITIONAL WILL TEST 3 CONDITIONS:
		//It will return if the integer value is bigger than 15 characters(math limitation)
		//Also if there is no digit at all(case the user presses the plus sign without inserting a value)
		//And if the value in the display was typed by the user or it's just a previous result being displayed.
	}
	inputContent = parseFloat(input.value)+ parseFloat(inputContent);
	input.value=inputContent;
	incoming=false;
	add=true;
	sub=false;				
	divi=false;
	mult=false;
	displayingResultsAdd=true;//Equal true will, case the user press plus sign more than once.
}

function substraction(){

	if(checkLength()||!/\d/.test(input.value)|| displayingResultsSub==true){
			return;//The explanation for this condition is described at addition function.
	}

	if(sub==false){
		//If sub is false, it means that it's the first time minus sign was pressed, it also means that inputContent
		//is empty, so it cannot make any king of math with it, then the value is assign to inputContent.
		inputContent = input.value;
		incoming=false;
		add=false;
		sub=true;			
		divi=false;
		mult=false;
		displayingResultsSub=true;//add qual true the function make it return, case the user press minus sign more than once.
	}else{
		inputContent = parseFloat(inputContent)- parseFloat(input.value);
		input.value=inputContent;
		incoming=false;
		add=false;
		sub=true;			
		divi=false;
		mult=false;
		displayingResultsSub=true;
	}	
}

function multiplication(){

	if(checkLength()||!/\d/.test(input.value)|| displayingResultsMult==true){
			return;//The explanation for this condition is described at addition function.
		}else{
			if(inputContent==0 && mult==false){
				//if inputContent is equal to zero is better just assign a value to it.
				inputContent = parseFloat(input.value);
				add=false;
				sub=false;				
				divi=false;
				mult=true;
				incoming=false;
				displayingResultsMult=true;

			}else{
				inputContent = parseFloat(inputContent)*parseFloat(input.value);
				input.value=inputContent;
				incoming=false;
				add=false;
				sub=false;				
				divi=false;
				mult=true;
				displayingResultsMult=true;
			}
	}
}

function division(){

	if(checkLength()||!/\d/.test(input.value)|| displayingResultsDiv==true){
			return;//The explanation for this condition is described at addition function.
		}else{
			if(inputContent==0){
				//if inputContent is equal to zero it can not be the divisor.
				inputContent = parseFloat(input.value);
				add=false;
				sub=false;				
				divi=true;
				mult=false;
				incoming=false;
				displayingResultsDiv=true;

			}else{
				inputContent = parseFloat(inputContent)/parseFloat(input.value);
				input.value=inputContent;
				add=false;
				sub=false;				
				divi=true;
				mult=false;
				incoming=false;
				displayingResultsDiv=true;
			}
		}
}
		
function checkLength(){
	//Javscript uses a total of 15 digits to perform its operations; therefore,
	//If the total length of the operation is over 15 digits, this function will: 
	//Alert the user about the overflow ..and 
	//Subtract one digit from the input

	if(/\w{16}/.test(input.value)){
			input.value= input.value.slice(0,input.value.length-1);
			return true;
		}
		else{ 
			return false;//False means that input is up to 15 digits.
		}

	}


function attachValue(e){
		if(!checkLength()){
			if(incoming==false){
					//Avoid adding zeros to every digit entered
					if(/\./.test(e.innerHTML)){
						return;//Return if a dot is inserted before a digit.
					}
					input.value= parseInt(e.innerHTML);
					incoming=true;
			}else{
				if(/\./.test(e.innerHTML)){						
						if(/\.{1}/.test(input.value)){
							return;//Returns if more than one dot is submmited.
						}else{
							var temp= input.value;
							input.value="";
							input.value= temp+e.innerHTML;
							return;
						}

				}				
				var temp= input.value;
				input.value="";
				input.value= temp+e.textContent;
		}			
	}			
}
			
function unlockDisplayingResults(){
	//This function unlocks the variables, linked to operators type, every time it is called.
	displayingResultsAdd=false;
	displayingResultsSub=false;
	displayingResultsDiv=false;
	displayingResultsMult=false;
}

		
window.onload= function criaCalculadora(){ 
// Calling javascript code only after the window is completely loaded
	
	/* CREATION OF DOM ELLEMENTS, DINAMICALLY */

	var html=document.querySelector("html");//Creating a html element to use to add other elements
	div=document.createElement("div");//Creating the container of the "calculator" elements
	
	input=document.createElement("input");
	input.setAttribute("readonly","true");//set a readonly attribute to avoid insertion of undisired characters
	input.value=0;
	div.appendChild(input);


	var btnC=document.createElement("button");
	btnC.textContent="CE";
	btnC.setAttribute("class","ce");
	div.appendChild(btnC);	
	btnC.onclick=function(){
		//Besides internal controlers, it cleans only the "calculator" screen
		inputContent = parseFloat(input.value);
		input.value=0;
		incoming=false;
		unlockDisplayingResults();
	}

	var btnCE=document.createElement("button");
	btnCE.textContent="C";
	btnCE.setAttribute("class","c");
	div.appendChild(btnCE);
	btnCE.onclick=function(){
		//Cleans every previous number entrance and internal controlers
		inputContent="0";
		input.value=0;
		incoming=false;
		unlockDisplayingResults();
		add=false;
		sub=false;				
		divi=false;
		mult=false;
	}


	var btn7=document.createElement("button");
	btn7.textContent="7";
	div.appendChild(btn7);
	btn7.onclick=function(){
		attachValue(btn7);
		unlockDisplayingResults();
	};

	var btn8=document.createElement("button");
	btn8.textContent="8";
	div.appendChild(btn8);
	btn8.onclick=function(){
		attachValue(btn8);
		unlockDisplayingResults();
	};

	var btn9=document.createElement("button");
	btn9.textContent="9";
	div.appendChild(btn9);
	btn9.onclick=function(){
		attachValue(btn9);
		unlockDisplayingResults();
	};

	var btnDivisao=document.createElement("button");
	btnDivisao.textContent="/";
	div.appendChild(btnDivisao);
	btnDivisao.onclick=function(){
		division();
	}

	var btn4=document.createElement("button");
	btn4.textContent="4";
	div.appendChild(btn4);
	btn4.onclick=function(){
		attachValue(btn4);
		unlockDisplayingResults();
	};		

	var btn5=document.createElement("button");
	btn5.textContent="5";
	div.appendChild(btn5);
	btn5.onclick=function(){
		attachValue(btn5);
		unlockDisplayingResults();
	};

	var btn6=document.createElement("button");
	btn6.textContent="6";
	div.appendChild(btn6);
	btn6.onclick=function(){
		attachValue(btn6);
		unlockDisplayingResults();
	};

	var btnMultip=document.createElement("button");
	btnMultip.textContent="*";
	div.appendChild(btnMultip);
	btnMultip.onclick=function(){
		multiplication();
	}


	var btn1=document.createElement("button");
	btn1.textContent="1";
	div.appendChild(btn1);
	btn1.onclick=function(){
		attachValue(btn1);
		unlockDisplayingResults();
	};
	

	var btn2=document.createElement("button");
	btn2.textContent="2";
	div.appendChild(btn2);
	btn2.onclick=function(){
		attachValue(btn2);
		unlockDisplayingResults();
	};
	

	var btn3=document.createElement("button");
	btn3.textContent="3";
	div.appendChild(btn3);
	btn3.onclick=function(){
		attachValue(btn3);
		unlockDisplayingResults();
	};
	

	var btnSubtr=document.createElement("button");
	btnSubtr.textContent="-";
	div.appendChild(btnSubtr);
	btnSubtr.onclick=function(){
		substraction();
	};

	
	var btn0=document.createElement("button");
	btn0.textContent="0";
	btn0.onclick=function(){
		attachValue(btn0);
		unlockDisplayingResults();
	};
	div.appendChild(btn0);	

	var btnVirgula=document.createElement("button");
	btnVirgula.textContent=".";
	div.appendChild(btnVirgula);
	btnVirgula.onclick=function(){
		attachValue(btnVirgula);
	}


	var btnIgual=document.createElement("button");
	btnIgual.textContent="=";
	div.appendChild(btnIgual);
	btnIgual.onclick=function(){
		if(add==true){
			//If it enters here, it means that the user is performing a addition oparation 
			incoming=false;//Controls if the next numbers that will be typed should be treated as individuals or as a set
			displayingResultsAdd=false;
			addition();
			add=false;

		}else if(sub==true){
			//If it enters here, it means that the user is performing a substraction oparation
			incoming=false;
			displayingResultsSub=false;
			substraction();
			sub=false;

		}else if(mult==true){
			//If it enters here, it means that the user is performing a multiplication oparation
			incoming=false;
			displayingResultsMult=false;			
			multiplication();
			mult=false;

		}else if(divi==true){
			//If it enters here, it means that the user is performing a division oparation
			incoming=false;
			displayingResultsDiv=false;			
			division();
			divi=false;
		}	
	};

	var btnAdicao=document.createElement("button");
	btnAdicao.textContent="+";
	btnAdicao.onclick=function(){
		addition();
	};
	div.appendChild(btnAdicao);

	var h3=document.createElement("h3");
	h3.textContent="By Sergio FM";
	
	html.appendChild(div);
	html.appendChild(h3);
}