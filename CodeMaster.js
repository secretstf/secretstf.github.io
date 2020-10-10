var code = "";
var attempts = 0;

function go(){
  alert("Yay");
}

function hover(iden){
  document.getElementById(iden.id).style.color = "#c8c8c8";
}

function hoverLeave(iden){
  document.getElementById(iden.id).style.color = "#000000";
}

function color1(iden){
  var value = document.getElementById(iden.id).options[document.getElementById(iden.id).selectedIndex].value;

  document.getElementById("color1Option").style.background = value;
}

function color2(iden){
  var value = document.getElementById(iden.id).options[document.getElementById(iden.id).selectedIndex].value;

  document.getElementById("color2Option").style.background = value;
}

function color3(iden){
  var value = document.getElementById(iden.id).options[document.getElementById(iden.id).selectedIndex].value;

  document.getElementById("color3Option").style.background = value;
}

function color4(iden){
  var value = document.getElementById(iden.id).options[document.getElementById(iden.id).selectedIndex].value;

  document.getElementById("color4Option").style.background = value;
}

function checkPSWD() {
  var pswdIn = document.getElementById("PasswordInput");
  var pswd = pswdIn.value.toUpperCase();

  var pswdValid = true;

  for(var i = 0; i < pswd.length; i++){
    var pswdValidChar = pswd.charAt(i);
    if(pswdValidChar != 'R'&& pswdValidChar != 'G'&& pswdValidChar != 'B'&&
      pswdValidChar != 'Y'&& pswdValidChar != 'C'&& pswdValidChar != 'P'){
      pswdValid = false;
    }
  }

  var remainingLength = Math.abs(pswd.length - 4);

  var outputString = "";

  if(remainingLength > 0){outputString += "The CodeMaster must add " + remainingLength + " characters.<br>";}

  if(!pswdValid){outputString += "The CodeMaster's code has foreign characters.<br>";}

  if(outputString.length == 0){
    document.getElementById("PasswordOutput").style.color = "#00ff00";
    document.getElementById("PasswordOutput").innerHTML = "The CodeMaster's code is valid!";
    document.getElementById("PasswordInput").disabled = true;
    code = pswd;
    attempts = 0;
    document.getElementById("GeneratePSWD").disabled = true;
    document.getElementById("CheckBtn").disabled = false;
    document.getElementById("attemptTitle").hidden = false;
    document.getElementById("attempts_list").innerHTML="";
    document.getElementById("CorrectGuess").remove();
  }

  else{
    document.getElementById("PasswordOutput").style.color = "#ff0000";
    document.getElementById("PasswordOutput").innerHTML = outputString + "Consider checking the way to write the password by clicking \"Password\".";
  }
}

function check(){
  if(code.length != 4){
    document.getElementById("PasswordOutput").style.color = "#ff0000";
    document.getElementById("PasswordOutput").innerHTML = "The CodeMaster must enter a valid code.";
    return;
  }
  document.getElementById("PasswordOutput").innerHTML = "";
  var outputArray = [];

  var OutputBoxes = ["Check1", "Check2", "Check3", "Check4"];

  var codeArray = [code.charAt(0), code.charAt(1), code.charAt(2), code.charAt(3)];

  var input = [];
  input.push(convertClrToChar(document.getElementById("OptionBox1").value));
  input.push(convertClrToChar(document.getElementById("OptionBox2").value));
  input.push(convertClrToChar(document.getElementById("OptionBox3").value));
  input.push(convertClrToChar(document.getElementById("OptionBox4").value));

  var used = [0,0,0,0];
  var codeUsed = [0,0,0,0];

  for(var i = 0; i < codeArray.length; i++){
    if(codeArray[i] == input[i]){
      used[i] = 1;
      codeUsed[i] = 1;
      outputArray.push("B");
    }
  }

  for(var i = 0; i < used.length; i ++){
    if(used[i] != 0){continue;}

    for(var j = 0; j < codeArray.length; j++){
      if(codeArray[j] == input[i] && codeUsed[j] == 0){
        codeUsed[j] = 1;
        used[i] = 1;
        outputArray.push("W");
      }
    }
  }

  outputArray.sort();

  for(var i = 0; i < outputArray.length; i ++){
    document.getElementById(OutputBoxes[i]).style.background = convertCharToClr(outputArray[i]);

  }

  if(outputArray.length == 4 && outputArray.indexOf("W") == -1){
    document.getElementById("PasswordInput").disabled = false;
    document.getElementById("CheckBtn").disabled = true;
    document.getElementById("GeneratePSWD").disabled = false;
    document.getElementById("PasswordOutput").innerHTML = "Congragulations! CodeBreaker, you have won!\n CodeMaker, maybe try one of the 1295 codes remaining."
  }

  else{
    for(var i = outputArray.length; i < OutputBoxes.length; i++){
      document.getElementById(OutputBoxes[i]).style.background = "#c6c6c6";
    }
  }

  var attempt = document.createElement("li");

  var attemptBox = [document.createElement("canvas"), document.createElement("canvas"),
                      document.createElement("canvas"), document.createElement("canvas")];

  for(var i = 0; i < attemptBox.length; i++){
    attemptBox[i].className = "attemptsInput";
    attemptBox[i].style.background = convertCharToClr(input[i], true);
    attempt.appendChild(attemptBox[i]);
  }

  var attemptOuput =[document.createElement("canvas"), document.createElement("canvas"),
                    document.createElement("canvas"), document.createElement("canvas")];

  for(var i = 0; i < attemptOuput.length; i++){
    attemptOuput[i].className = "attemptsOutput";
    attemptOuput[i].style.background = document.getElementById(OutputBoxes[OutputBoxes.length-1-i]).style.background;
    attempt.appendChild(attemptOuput[i]);
  }

  document.getElementById("attempts_list").appendChild(attempt);
  attempts += 1;

  if(attempts == 10){
    document.getElementById("PasswordInput").disabled = false;
    document.getElementById("CheckBtn").disabled = true;
    document.getElementById("GeneratePSWD").disabled = false;
    document.getElementById("PasswordOutput").style.color = "red";
    document.getElementById("PasswordOutput").innerHTML = "Unfortunately, it seems you have run out of guesses.<br> The correct answer is shown underneath all your failed attempts."
    showGuess();
  }
}


function convertClrToChar(color){
  switch(color){
    case "#ff0000":
      return "R";
    case "#0000ff":
      return "B";
    case "#00ff00":
      return "G";
    case "#ffff00":
      return "Y";
    case "#00ffff":
      return "C";
    case "#ffc0cb":
      return "P";
  }
}

function convertCharToClr(charact, blue = false){
  if(charact == "B" && !blue){return "#000000";}
  if(charact == "W"){return "#ffffff";}
  if(charact == "R"){return "#ff0000";}
  if(charact == "B"){return "#0000ff";}
  if(charact == "G"){return "#00ff00";}
  if(charact == "Y"){return "#ffff00";}
  if(charact == "C"){return "#00ffff";}
  if(charact == "P"){return "#ffc0cb";}
}

function showGuess(){
  var codeShow = document.createElement("div");
  codeShow.id = "CorrectGuess";
  codeShow.style.textAlign = "center";
  var corGuess = [document.createElement("canvas"), document.createElement("canvas"),
                      document.createElement("canvas"), document.createElement("canvas")];

  for(var i = 0; i < corGuess.length; i++){
    corGuess[i].className = "correctGuess";
    corGuess[i].style.background = convertCharToClr(code.charAt(i), true);
    if(i == 0){corGuess[i].style.marginLeft = "0px";}
    codeShow.appendChild(corGuess[i]);
  }

  document.getElementById("attempts").appendChild(codeShow);
}

function generatepswd(){
  var newCode = '';
  for(var i = 0; i < 4; i++){
    var x = Math.floor((Math.random() * 6) + 1);

    switch (x) {
      case 1:
        newCode += 'R';
        break;
      case 2:
        newCode += 'G';
        break;
      case 3:
        newCode += 'B';
        break;
      case 4:
        newCode += 'Y';
        break;
      case 5:
        newCode += 'C';
        break;
      case 6:
        newCode += 'P';
        break;
      default:
        break;
    }
  }
  document.getElementById('PasswordInput').value = newCode;
  checkPSWD();
}
