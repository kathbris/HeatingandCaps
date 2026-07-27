/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
const t13 =`
<option Value="1">Select Overcurrent Size</option>
<option Value="15">15 amp</option>
<option Value="20">20 amp</option>
<option Value="25">25 amp</option>
<option Value="30">30 amp</option>
<option Value="35">35 amp</option>
<option Value="40">40 amp</option>
<option Value="45">45 amp</option>
<option Value="50">50 amp</option>
<option Value="60">60 amp</option>
<option Value="70">70 amp</option>
<option Value="80">80 amp</option>
<option Value="90">90 amp</option>
<option Value="100">100 amp</option>
<option Value="110">110 amp</option>
<option Value="125">125 amp</option>
<option Value="150">150 amp</option>
<option Value="175">175 amp</option>
<option Value="200">200 amp</option>
<option Value="225">225 amp</option>
<option Value="250">250 amp</option>
<option Value="300">300 amp</option>
<option Value="400">400 amp</option>
<option Value="450">450 amp</option>
<option Value="500">500 amp</option>
<option Value="600">600 amp</option>
</select>
`
const wireTable = `
<option Value="1">Select Conductor Size</option>
<option Value="14 awg">14 awg</option>
<option Value="12 awg">12 awg</option>
<option Value="10 awg">10 awg</option>
<option Value="8 awg">8 awg</option>
<option Value="6 awg">6 awg</option>
<option Value="4 awg">4 awg</option>
<option Value="3 awg">3 awg</option>
<option Value="2 awg">2 awg</option>
<option Value="1 awg">1 awg</option>
<option Value="0">0</option>
<option Value="00">00</option>
<option Value="000">000</option>
<option Value="0000">0000</option>
<option Value="250 Kcmil">250 Kcmil</option>
<option Value="300 Kcmil">300 Kcmil</option>
<option Value="350 Kcmil">350 Kcmil</option>
<option Value="400 Kcmil">400 Kcmil</option>
<option Value="500 Kcmil">500 Kcmil</option>
<option Value="600 Kcmil">600 Kcmil</option>
<option Value="700 Kcmil">700 Kcmil</option>
<option Value="750 Kcmil">750 Kcmil</option>
<option Value="800 Kcmil">800 Kcmil</option>
<option Value="900 Kcmil">900 Kcmil</option>
<option Value="1000 Kcmil">1000 Kcmil</option>
<option Value="1250 Kcmil">1250 Kcmil</option>
<option Value="1500 Kcmil">1500 Kcmil</option>
<option Value="1750 Kcmil">1750 Kcmil</option>
<option Value="2000 Kcmil">2000 Kcmil</option>
</select>
`;

//Heating Branch Circuits
var glHelp =""
const raceWay = getRandomItem(['rigid steel conduit', 'EMT', 'rigid PVC','flexible metal raceway']);
const wtype = getRandomItem(["CU","CU","AL"]);
const TTemp = getRandomItem([75,90]);
const wireTemp = getRandomItem([75,90]);
var numberA = randomRangeWithIncrements(12, 60, 1);
var eMarked = `All equipment is marked with ${TTemp}`
var correctedA = numberA;
var terminationTempa = TTemp;
if (TTemp == "unmarked"){
  var terminationTempa = 60;
  var eMarked = "The equipment has no visible markings"
}
const correctA = Wire(correctedA,terminationTempa,wireTemp,wtype,true);
const aOC = overcurrent(correctA.ampacity*1.25,false);
if (wtype == "AL"){
  var glHelp = glHelp+"The conductor is made of aluminum therefore Table 4 will be used to find the correct wire.<br><br>";
} else {
  var glHelp = glHelp+"The conductor is made of copper therefore Table 2 will be used to find the correct wire. <br><br>";
}
if (correctA.size == '14 awg'||correctA.size == '12 awg'||correctA.size == '10 awg' ){
  var glHelp = glHelp+"Since 62-114 allows us to oversize the overcurrent based on the ampacity of the conductor meaning 14-104 2) does not apply to heating branch circuits. <br><br>";
}
if(correctA.tableTemp==60){
  var glHelp = glHelp+"The lowest temprature rating is 60 degrees or unmarked therefore we must use the 60 degree coloumn 4-006 1) and 2). <br><br>"
} else if (correctA.tableTemp == 75 && numberA > 100){
  var glHelp = glHelp+"The lowest temprature rating is 75 degrees or unmarked and load is greater then 100 A, 4-006 1) and 2). <br><br>"
} else if (correctA.tableTemp == 75) {
  var glHelp = glHelp+"The lowest temprature rating is 75 degrees 4-006 1). <br><br>"
} else {
  var glHelp = glHelp+"The lowest temprature rating is 90 degrees 4-006 1). <br><br>"
}
var glHelp =glHelp +"The overcurrent is allowed to be sized up 125% of the rated ampacity of the conductor and if a standard size overcurrent does not match we can go to the next largest overcurrent. 62-114 7) & 8)<br>";
const button = `
<p>    
${numberA} amp heater utilizing ${wtype} conductor with RW${wireTemp} insulation.<br>Ran in ${raceWay} with no more than 3 conductors<br>  ${eMarked}. <br>.
<h3>Select the minimum conductor and maximum overcurrent:</h3>
<form name="answerDU">
<select name="wireSz" id="wireSz">${wireTable}<br>
<select name="ocSz" id="ocSz">${t13}<br>
<input type="button" id ="DUB" value="Submit" onclick="testButton('${correctA.size}',document.getElementById('wireSz').value,1,'${glHelp}',${aOC},document.getElementById('ocSz').value)"><br>
</form>
<p id="responseDU"></p>
</p>
`;
addElement(1,"heatingBC",button)

//Capacitor Branch Circuit
var numberB = randomRangeWithIncrements(12, 50, 1);
var t5Help = "";
const wtype2 = getRandomItem(["CU","CU","AL"]);
const TTemp2 = getRandomItem(["unmarked","60","75","90"]);
const wireTemp2 = getRandomItem(["60","75","90"]);
if (TTemp2 =="unmarked"){
var eMarked2 = 'There are no visible markings on the equipment';
} else {
  var eMarked2 = `All equipment is marked with ${TTemp2}`;
}
if (wtype2=="AL"){
  var whichTable = 4;
} else {
  var whichTable = 2;
}
var correctedB = numberB*1.35;
var correctB = Wire(correctedB,TTemp2,wireTemp2,wtype2,true);
var corrOC=(numberB*2.5)
var aOC2 = overcurrent(corrOC,true);
if (aOC2==corrOC){
  var ocHelp = "Since 250% of the rated current of the capacitor matches a standard size overcurrent on <b>table 13</b> we can stay with this option";  
} else {
  var ocHelp = "Since 250% of the rated current of the capacitor does not matches a standard size overcurrent on <b>table 13</b> we must select a lower option as we <b>CANNOT EXCEED 250%</b>"
}
const capHelp = "<b>26-208</b> states a single capacitor branch circuit conductor shall have have an ampacity of at least 135% of the rated current of the capacitor. <b>"+numberB+" * 1.35 = "+Math.round(correctedB*10)/10+"</b>, then select the correct wire from <b>table "+whichTable+".</b><br><br><b>26-210</b> states the overcurrent shall not be larger then 250% of the rated current of the capacitor. <b> "+numberB+" * 2.5 = "+corrOC+"</b>. "+ocHelp
const buttonp = `
<p>    
${numberB} amp capacitor utilizing ${wtype2} conductor with RW${wireTemp2} insulation.<br> ${eMarked2} <br> It will be run in a conduit with no more then 2 other current carrying conductors.
<h3>Select the minimum conductor and maximum overcurrent:</h3>
<form name="answerT5BC">
<select name="wireSz2" id="wireSz2">${wireTable}<br>
<select name="ocSz2" id="ocSz2">${t13}<br>
<input type="button" id ="DUB" value="Submit" onclick="testButton('${correctB.size}',document.getElementById('wireSz2').value,2,'${capHelp}',${aOC2},document.getElementById('ocSz2').value)"><br>
</form>
<p id="responsePL"></p>
`;
addElement(2,"CapBC",buttonp)

//Capacitor Feeder and Tap Conductors
var numberofCaps = randomRangeWithIncrements(2,7,1);
var numberC = randomRangeWithIncrements(12, 30, 1);
const wtype3 = getRandomItem(["CU","CU","AL"]);
const TTemp3 = getRandomItem(["unmarked","60","75","90"]);
const wireTemp3 = getRandomItem(["60","75","90"]);
if (TTemp3 =="unmarked"){
var eMarked3 = 'There are no visible markings on the equipment';
} else {
  var eMarked3 = `All equipment is marked with ${TTemp2}`;
}
if (wtype3=="AL"){
  var whichTable = 4;
} else {
  var whichTable = 2;
}
var correctedc = numberC*numberofCaps*1.35;
var correctc = Wire(correctedc,TTemp3,wireTemp3,wtype3,true);
var perTap = Wire(numberC*1.35,TTemp3,wireTemp3,wtype3,true);
if (perTap.ampacity < correctc.ampacity/3){
  var perTap = Wire(correctc.ampacity/3,TTemp3,wireTemp3,wtype3,true);
}
var corrOCa=(numberC*numberofCaps*2.5)
var aOC3 = overcurrent(corrOCa,true);
if (aOC3==corrOCa){
  var ocHelp = "Since 250% of the rated current of the capacitor matches a standard size overcurrent on <b>table 13</b> we can stay with this option";  
} else {
  var ocHelp = "Since 250% of the rated current of the capacitor does not matches a standard size overcurrent on <b>table 13</b> we must select a lower option as we <b>CANNOT EXCEED 250%</b>"
}
var captapHelp = "<b>26-208 2) b)</b> states a capacitor tap conductor shall have have an ampacity of at least 135% of the rated current of the capacitor and at least 1/3 the ampacity of the branch circuit conductors feeding the circuit. <b>"+numberC+" * 1.35 = "+Math.round(numberC*1.35*10)/10+" vs. "+Math.round(correctc.ampacity/3*10)/10+"</b>, then select the correct wire from <b>table "+whichTable+".</b><br><br><b>26-210</b> states the overcurrent shall not be larger then 250% of the rated current of the capacitor. <b> "+numberC*numberofCaps+" * 2.5 = "+corrOCa+"</b>. "+ocHelp
//const captapHelp = "<b>26-208</b> states a single capacitor branch circuit conductor shall have have an ampacity of at least 135% of the rated current of the capacitor. <b>"+numberB+" * 1.35 = "+Math.round(correctedB*10)/10+"</b> or, then select the correct wire from <b>table "+whichTable+".</b><br><br><b>26-210</b> states the overcurrent shall not be larger then 250% of the rated current of the capacitor. <b> "+numberB+" * 2.5 = "+corrOC+"</b>. "+ocHelp
const buttonct = `
<p>    
${numberofCaps} - ${numberC} amp capacitors utilizing ${wtype3} conductor with RW${wireTemp3} insulation.<br> ${eMarked3} <br> It will be run in a conduit with no more then 2 other current carrying conductors.<br> Tap conductors are no longer then 7m.
<h3>Select the minimum wire size for each conductor and the maximum overcurrent for the circuit:</h3>
<form name="answercaptap">
<select name="feed1" id="feed1">${wireTable} Branch Circuit Conductors<br>

<select name="tap1" id="tap1">${wireTable} Tap Conductors<br>

<select name="capOC" id="capOC">${t13} Overcurrent<br>

<input type="button" id ="DUB" value="Submit" onclick="tapButton('${correctc.size}',document.getElementById('feed1').value,'${perTap.size}',document.getElementById('tap1').value,3,'${captapHelp}',${aOC3},document.getElementById('capOC').value)"><br>
</form>
<p id="responseMS"></p>
`;
addElement(3,"CapTap",buttonct)
console.log(perTap.size,aOC3,correctc.size)
function randomRangeWithIncrements(min, max, inc) {
  min = min || 0;
  inc = inc || 1;
  if (!max) {
    return new Error("need to define a max");
  }
  return Math.floor((Math.random() * (max - min)) / inc) * inc + min;
}
function Wire(ma,terminationTemp,insulationTemp,wm,SL) {
  var minAMP = ma;
  var termTemp = terminationTemp;
  var TTTtemp = Math.min(insulationTemp,terminationTemp);
  if (isNaN(termTemp)== true) {
    termTemp = 60;
  }
  let x =0;
  if (wm=="CU"){
      var gen60ampT2=[15,20,30,40,55,70,85,95,110,125,145,165,195,215,240,260,280,320,350,385,400,410,435,455,495,525,545,555];
      var gen75ampT2=[15,20,30,50,65,85,100,115,130,150,175,200,230,255,285,310,335,380,420,460,475,480,520,545,590,625,650,665];
      var gen90ampT2=[15,20,30,55,75,95,115,130,145,170,195,225,260,290,320,350,380,430,475,520,535,555,585,615,665,705,735,750];
      var odd75ampT2=[20,25,35,50,65,85,100,115,130,150,175,200,230,255,285,310,335,380,420,460,475,480,520,545,590,625,650,665];
      var odd90ampT2=[25,30,40,55,75,95,115,130,145,170,195,225,260,290,320,350,380,430,475,520,535,555,585,615,665,705,735,750];
      var awg=['14 awg','12 awg','10 awg','8 awg','6 awg','4 awg','3 awg','2 awg','1 awg','0','00','000','0000','250 Kcmil','300 Kcmil','350 Kcmil','400 Kcmil','500 Kcmil','600 Kcmil','700 Kcmil','750 Kcmil','800 Kcmil','900 Kcmil','1000 Kcmil','1250 Kcmil','1500 Kcmil','1750 Kcmil','2000 Kcmil']
  } else {
      var gen60ampT2=[15,25,35,40,55,65,75,85,100,115,130,150,170,195,210,225,260,285,315,320,330,355,375,405,435,455,470];
      var gen75ampT2=[15,25,40,50,65,75,90,100,120,135,155,180,205,230,250,270,310,340,375,385,395,425,445,485,520,545,560];
      var gen90ampT2=[15,25,45,55,75,85,100,115,135,150,175,205,230,260,280,305,350,385,425,435,445,480,500,545,585,615,630];
      var odd75ampT2=[20,30,40,50,65,75,90,100,120,135,155,180,205,230,250,270,310,340,375,385,395,425,445,485,520,545,560];
      var odd90ampT2=[25,35,45,55,75,85,100,115,135,150,175,205,230,260,280,305,350,385,425,435,445,480,500,545,585,615,630];
      var awg=['12 awg','10 awg','8 awg','6 awg','4 awg','3 awg','2 awg','1 awg','0','00','000','0000','250 Kcmil','300 Kcmil','350 Kcmil','400 Kcmil','500 Kcmil','600 Kcmil','700 Kcmil','750 Kcmil','800 Kcmil','900 Kcmil','1000 Kcmil','1250 Kcmil','1500 Kcmil','1750 Kcmil','2000 Kcmil']
  }
  if (SL == false){
      if (TTTtemp== '90'){
          var lowTemp = gen90ampT2;
      } else if ((TTTtemp== '75' || minAMP > 100) && insulationTemp != 60 ){
          var lowTemp =gen75ampT2;
      } else {
          var lowTemp = gen60ampT2;
          var TTTtemp = 60;
      }
  } else {
      if (TTTtemp== '90'){
          var lowTemp =odd90ampT2;
      } else if ((TTTtemp== '75'|| minAMP > 100) && insulationTemp != 60){
          var lowTemp =odd75ampT2;
      } else {
          var lowTemp =gen60ampT2;
          var TTTtemp = 60;
      }
  }
  if (minAMP > Math.max(...lowTemp)){
      do  {
          x++;
          minAMP = ma/(x+1);
      }
      while (minAMP > Math.max(...lowTemp))
  }
  var wireId = lowTemp.findIndex((element) => element >= minAMP);
  var wireAmpacity =lowTemp.find((element) => element >= minAMP);
  var wireSize =awg.at(wireId);
  const wireInfo ={
    size:wireSize,
    ampacity:wireAmpacity,
    tableTemp:TTTtemp
};
  return wireInfo;
}
function getRandomItem(arr) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  // get random item
  const item = arr[randomIndex];
  return item;
}
function overcurrent(amp,maX) {
  const T13=[15,20,25,30,35,40,45,50,60,70,80,90,100,110,125,150,175,200,225,250,300,350,400,450,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100,2200,2300,2400,2500,2600,2700,2800,2900,3000,3500,4000,4500,5000,6000,7000];
  this.amp=amp;
  console.log(T13.find((element) => element >= this.amp),this.amp);
  if (maX == false){
    var OverCurrent = T13.find((element) => element >= this.amp);
  } else {
    if (T13.find((element) => element >= this.amp) == this.amp){
      this.OC=T13.findIndex((element) => element >= this.amp);
      } else {
      this.OC = (T13.findIndex((element) => element >= this.amp))-1;
      }
    if (this.OC != 0){
        var OverCurrent = T13.at(this.OC);
        console.log(this.OC,OverCurrent);
    } else {
      var OverCurrent = 15
    }
  }
  return OverCurrent;
}
function testButton(totalDemand, answer, response, help,oca,ocr) {
  if (response == 1) {
    response = "responseDU";
  } else if (response == 2) {
    response = "responsePL";
  } else {
    response = "responseMS";
  }
  if (totalDemand == answer && oca == ocr) {
    let text = "<h3>Correct</h3>";
    document.getElementById(response).innerHTML = text;
  } else {
    let text = `
    <h3>Incorrect</h3>
    <div class="row">
    <div class="column">
            <p> Correct answer is <b>${totalDemand} </b>for the conductor and <b>${oca} amp</b> for the overcurrent </p><br></p>
    </div>
    <div class="column">
        <p id="plHelp">${help}</p>
    </div>
   </div>
    `;
    document.getElementById(response).innerHTML = text;
  }
}
function tapButton(feeder, feedanswer,tap,tapanswer, response, help,oca,ocr) {
  if (response == 1) {
    response = "responseDU";
  } else if (response == 2) {
    response = "responsePL";
  } else {
    response = "responseMS";
  }
  if (feeder == feedanswer && oca == ocr && tap == tapanswer) {
    let text = "<h3>Correct</h3>";
    document.getElementById(response).innerHTML = text;
  } else {
    let text = `
    <h3>Incorrect</h3>
    <div class="row">
    <div class="column">
            <p> Correct answer is; <br><b>${feeder}</b> for the branch circuit conductor and<br> <b>${tap}</b> for the tap conductors and <br><b>${oca} amp</b> for the overcurrent </p><br></p>
    </div>
    <div class="column">
        <p id="plHelp">${help}</p>
    </div>
   </div>
    `;
    document.getElementById(response).innerHTML = text;
  }
}
function addElement(divNum,divID,innHT) {
  // create a new div element
  const newDiv = document.createElement("div");
  newDiv.innerHTML = innHT;
  newDiv.id = divID;
  let sp2 = document.getElementById("div"+divNum);
  // Get the parent element
  let parentDiv = sp2.parentNode;
  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div"+divNum);
  parentDiv.insertBefore(newDiv, currentDiv);
}

