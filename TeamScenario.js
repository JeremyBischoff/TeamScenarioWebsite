
function combinations(arr, r) {
    const result = [];
  
    function backtrack(startIndex, currentCombination) {
      if (currentCombination.length === r) {
        result.push([...currentCombination]);
        return;
      }
  
      for (let i = startIndex; i < arr.length; i++) {
        currentCombination.push(arr[i]);
        backtrack(i + 1, currentCombination);
        currentCombination.pop();
      }
    }
  
    backtrack(0, []);
    return result;
}

const scores = {};
    /*"Yul": [14.5, 14.5, 14, 14.7, 14.8, 13.4],
    "Fred": [14.5, 14.5, 13.8, 14.6, 14.7, 14.5],
    "Josh": [13.75, 13.6, 13.1, 14, 14.4, 13.25],
    "Curran": [0, 12.5, 0, 14.7, 15.3, 14],
    "Shane": [14.3, 13, 13.9, 14.5, 14.5, 13.5],
    "Donnell": [14.8, 13, 14.8, 14.8, 14, 13.4],
    "Taywo": [14, 13.5, 13.5, 14.5, 14, 13.5],
    "Skirkoroscik Honkers": [0, 15.3, 0, 0, 0, 0],
    "Khoi": [13.75, 14.6, 12.25, 14.9, 13.475, 13.275],
    "Riley": [14.45, 14.1, 13.8, 14.8, 13.15, 13.15],
    "Colt": [12.9, 13.775, 14.175, 14.5125, 14.9, 10.2],
    "Jerry": [13.825, 12.975, 12.2, 13.25, 14.2, 13.475],
    "Blake": [0, 13.5, 0, 0, 15.275, 11.4],
    "Jr": [0, 13.575, 0, 0, 13.875, 13.475],
    "IanG": [13, 13.2, 13.825, 14.075, 13.95, 13.05],
    "Taylor": [13.95, 13.675, 13, 14.625, 13.875, 10.325],
    "Asher": [14.3, 12.45, 14.0, 15, 13.825, 13.6],
    "Bean": [0, 11.5, 13.25, 14.2, 13.75, 13.75],
    "Evan": [13.075, 12.35, 13.3, 13.725, 13.8, 13],
    "BB": [0, 0, 12.625, 14.6, 0, 11.675]*/

const eventKey = ["FX", "PH", "SR", "V", "PB", "HB"];

class TeamScenario {
    constructor(teamScore, fiveManTeam, eventInfo) {
      this.teamScore = teamScore;
      this.fiveManTeam = fiveManTeam;
      this.eventInfo = eventInfo;
    }
  
    printTeamScore() {
      console.log(this.teamScore);
    }
  
    printFiveManTeam() {
      console.log(this.fiveManTeam);
    }
  
    printEventInfo() {
      console.log(this.eventInfo);
    }
  
    printInfo() {
      let string = this.fiveManTeam.join(", ");
      let roundedTeamScore = parseFloat(this.teamScore);
      console.log(`Team Score: ${roundedTeamScore.toFixed(2)}, Team: ${string}`);
      console.log("Event Info:", this.eventInfo);
      console.log();
    }
}

class Gymnast {
    constructor(name, FXScore, PHScore, SRScore, VScore, PBScore, HBScore) {
        this.name = name;
        this.FXScore = FXScore;
        this.PHScore = PHScore;
        this.SRScore = SRScore;
        this.VScore = VScore;
        this.PBScore = PBScore;
        this.HBScore = HBScore;
    }
}

addGymnastOnStart();

function addGymnastOnStart() {
    console.log("adding gymnasts in session storage")
    for (const key in sessionStorage) {
        // make sure to exclude the 'length' and everything
        if (key !== "length" && key !== "clear" && key !== "getItem" && key !== "key" && key !== "removeItem" && key !== "setItem") {            
            var arr = JSON.parse(sessionStorage.getItem(key));
            
            scores[key] = arr;      
        }
    }
    
    console.log(scores);

    for (const key in scores) {

        var gymnastName = key;
        var gymnastNameText = document.createElement("p");
        gymnastNameText.innerHTML = gymnastName;
        gymnastNameText.className = 'gymnastNameText';

        var inputFX = document.createElement("input");
        inputFX.type = 'number';
        inputFX.placeholder = 'FX';
        inputFX.className = 'FXScore';
        inputFX.value = scores[key][0];
        var inputPH = document.createElement("input");
        inputPH.type = 'number';
        inputPH.placeholder = 'PH';
        inputPH.className = 'PHScore';
        inputPH.value = scores[key][1];
        var inputSR = document.createElement("input");
        inputSR.type = 'number';
        inputSR.placeholder = 'SR';
        inputSR.className = 'SRScore';
        inputSR.value = scores[key][2];
        var inputV = document.createElement("input");
        inputV.type = 'number';
        inputV.placeholder = 'V';
        inputV.className = 'VScore';
        inputV.value = scores[key][3];
        var inputPB = document.createElement("input");
        inputPB.type = 'number';
        inputPB.placeholder = 'PB';
        inputPB.className = 'PBScore';
        inputPB.value = scores[key][4];
        var inputHB = document.createElement("input");
        inputHB.type = 'number';
        inputHB.placeholder = 'HB';
        inputHB.className = 'HBScore';
        inputHB.value = scores[key][5];

        var gymnastText = document.createElement('div');
        gymnastText.append(gymnastNameText, inputFX, inputPH, inputSR, inputV, inputPB, inputHB);
        
        var gymnastList = document.getElementById("gymnastList");
        gymnastList.appendChild(gymnastText);
    }
}

function updateScores() {
    event.preventDefault();

    console.log("update", scores)
    // for each div in gymnastList, get name and event scores (using get p or h1 in the div),
    // and in listOfGymnasts update scores using name as key
    var gymnastList = document.getElementById("gymnastList");
    var childDivs = gymnastList.querySelectorAll('div');

    for (const div of childDivs) {
        var gymnastNameText = div.querySelector(".gymnastNameText").textContent;

        var FXScore = parseFloat(div.querySelector(".FXScore").value);
        var PHScore = parseFloat(div.querySelector(".PHScore").value);
        var SRScore = parseFloat(div.querySelector(".SRScore").value);
        var VScore = parseFloat(div.querySelector(".VScore").value);
        var PBScore = parseFloat(div.querySelector(".PBScore").value);
        var HBScore = parseFloat(div.querySelector(".HBScore").value);

        let arr = [FXScore, PHScore, SRScore, VScore, PBScore, HBScore]
        for (let i = 0; i < arr.length; i++) {
            if (isNaN(arr[i])) {
                arr[i] = 0;
            }
        }

        scores[gymnastNameText] = arr;
        sessionStorage.setItem(gymnastNameText, JSON.stringify(arr));
    }
}

function saveGymnastInfo() {
    event.preventDefault();

    console.log("save gymnast info")


}

function runScenarios() {
    // prevents reloading of page
    event.preventDefault();
    // clears team scenario list text
    var teamScenarioList = document.getElementById('teamScenarioList');
    teamScenarioList.innerHTML = "";

    updateScores();

    teamScenarios = [];
    fiveManTeams = combinations(Object.keys(scores), 5);
    for (const fiveManTeam of fiveManTeams){
        eventInfo = {};
        teamScenario = new TeamScenario(0, fiveManTeam, eventInfo);

        for (let apparatus = 0; apparatus < 6; apparatus++) {
            threeManLineups = combinations(fiveManTeam, 3);
            eventCombinedScores = {};

            for (const threeManLineup of threeManLineups) {
                eventScore = 0;
                for (var gymnast of threeManLineup) {
                    console.log(gymnast, scores[gymnast]);
                    console.log(gymnast, scores[gymnast][apparatus]);
                    console.log(scores)
                    eventScore += scores[gymnast][apparatus];
                };
                eventCombinedScores[eventScore] = threeManLineup;
            };
            arr = Object.keys(eventCombinedScores);
            floatArr = arr.map((str) => parseFloat(str));
            maxEventScore = Math.max(...floatArr);
            eventString = eventKey[apparatus] + ": " + maxEventScore.toFixed(2);
            eventInfo[eventString] = eventCombinedScores[maxEventScore];
        };

        teamScore = 0;
        for (const eventScore of Object.keys(eventInfo)) {
            substring = eventScore.split(": ")[1];
            float_val = parseFloat(substring);
            teamScore += float_val;
        };
        teamScenario.teamScore = teamScore.toFixed(2);
        teamScenarios.push(teamScenario);

    };
    sortedTeamScenarios = teamScenarios.sort((a,b) => a.teamScore - b.teamScore).reverse();

    var numScenarios = parseInt(document.getElementById("numTeamScenarios").value);
    for (let i = 0; i < numScenarios; i++) {
        var h1 = document.createElement('h1');
        var h2 = document.createElement('h2');
        var h3 = document.createElement('h3');

        h1.innerHTML = "Team Score: " + sortedTeamScenarios[i].teamScore;
        h2.innerHTML = "Team Members: " + sortedTeamScenarios[i].fiveManTeam;
        h3.innerHTML = "Event Info:";

        events = Object.keys(sortedTeamScenarios[i].eventInfo);
        events.forEach(key => {
            let str = document.createElement('p')
            str.innerHTML = key + " - " + sortedTeamScenarios[i].eventInfo[key];
            h3.appendChild(str);
        });
        teamScenarioList.append(h1, h2, h3);
    };
}

// CHANGES: change it so you add a gymnasts name and then next to the
// name there is input boxes for each event that can be filled out.
// When the run button is clicked, add all the gymnasts and scores to
// the scores array and then run the team scenario.

// ANOTHER CHANGE: add a class 'gymnast' that has name and each event scores
// every time a gymnast is added, add the gymnast class to an array
// when run scenario is called, go through the array and update scores

function addGymnast() {
    event.preventDefault();

    var gymnastName = document.getElementById("gymnastName").value;
    var gymnastNameText = document.createElement("p");
    gymnastNameText.innerHTML = gymnastName;
    gymnastNameText.className = 'gymnastNameText';
    
    var inputFX = document.createElement("input");
    inputFX.type = 'number';
    inputFX.placeholder = 'FX';
    inputFX.className = 'FXScore';
    var inputPH = document.createElement("input");
    inputPH.type = 'number';
    inputPH.placeholder = 'PH';
    inputPH.className = 'PHScore';
    var inputSR = document.createElement("input");
    inputSR.type = 'number';
    inputSR.placeholder = 'SR';
    inputSR.className = 'SRScore';
    var inputV = document.createElement("input");
    inputV.type = 'number';
    inputV.placeholder = 'V';
    inputV.className = 'VScore';
    var inputPB = document.createElement("input");
    inputPB.type = 'number';
    inputPB.placeholder = 'PB';
    inputPB.className = 'PBScore';
    var inputHB = document.createElement("input");
    inputHB.type = 'number';
    inputHB.placeholder = 'HB';
    inputHB.className = 'HBScore';
    
    var gymnastText = document.createElement('div');
    gymnastText.append(gymnastNameText, inputFX, inputPH, inputSR, inputV, inputPB, inputHB);
    
    var gymnastList = document.getElementById("gymnastList");
    gymnastList.appendChild(gymnastText);

    updateScores();
}

const saveGymnastsInfoButton = document.getElementById("saveGymnastsInfoButton");
saveGymnastsInfoButton.addEventListener('click', updateScores);

const addGymnastButton = document.getElementById("addGymnastButton");
addGymnastButton.addEventListener('click', addGymnast);

const runScenariosButton = document.getElementById("runScenariosButton");
runScenariosButton.addEventListener('click', runScenarios);


