var code = "";

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
    document.getElementById("CheckBtn").disabled = false;
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
    document.getElementById("PasswordOutput").innerHTML = "Congragulations! CodeBreaker, you have won!\n CodeMaker, maybe try one of the 1295 codes remaining."
  }

  else{
    for(var i = outputArray.length; i < OutputBoxes.length; i++){
      document.getElementById(OutputBoxes[i]).style.background = "#c6c6c6";
    }
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

function convertCharToClr(charact){
  if(charact == "B"){return "#000000";}
  if(charact == "W"){return "#ffffff";}
}
