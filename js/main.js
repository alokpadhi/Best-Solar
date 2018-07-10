/*jslint browser:true */
"use strict";

//total daily usage by home
function addMonths(elem){
    var totalYearUsagekw = 0, dailyusagekw = 0, i =0, x = 0;
    var months = document.getElementById(elem).getElementsByTagName('input');
   // console.log(months);
    for(i=0;i < months.length;i++){
        x = Number(months[i].value);
        totalYearUsagekw += x;
    }
    //console.log(totalYearUsagekw)
    dailyusagekw = totalYearUsagekw/365;
    return dailyusagekw;
}

function hoursOfSunshine(){
    var hrs;
    var thezone = document.forms.solarForm.zone.selectedIndex;
    thezone += 1;
    switch (thezone) {
        case 1:
            hrs = 6;
            break;
        case 2:
            hrs = 5;
            break;
        case 3:
            hrs = 3.5;
            break;
        case 4:
            hrs = 2.5
            break;
        case 5:
            hrs = 2;
            break;
        case 6:
            hrs = 1.5;
            break;
        default:
            hrs = 0;
            break;
    }

    return hrs;
}

function calpanels(){
    var userChoice = document.forms.solarForm.panel.selectedIndex;
    var panelOptions = document.forms.solarForm.panel.options;
    var power = panelOptions[userChoice].value;
    var name = panelOptions[userChoice].text;
    var x = [power, name];
    return x;

}
function calculateSolar(){
    var dailyusagekw = addMonths('mpc');
    console.log(dailyusagekw);

    var hrs = hoursOfSunshine();
    console.log(hrs);

    var minusagekw = dailyusagekw / hrs;
    console.log(minusagekw);

    var realusagekw = minusagekw * 1.25;
    console.log(realusagekw);

    var realusagewatt = realusagekw * 1000;
    console.log(realusagewatt);

    var panelInfo = calpanels();
    //console.log(panelInfo);

    var panelOutput = panelInfo[0];
    var panelName = panelInfo[1];

    console.log(panelOutput, panelName);

    var panelNeeded = Math.ceil(realusagewatt / panelOutput);
    console.log(panelNeeded);

    var feedback = "";
    feedback += "<p>Based on your average daily use of "+ Math.round(dailyusagekw)+" kwh, you will\
    need to purchase "+ panelNeeded + " solar panels to offset 100% of your electricity biil.</p>";
    feedback += "<h2>Additional Details</h2>";
    feedback += "<p>Your average daily electricity consumption: "+ Math.round(dailyusagekw)+"Kwh per day.</p>";
    feedback += "<p>Average sunshine hours per day: "+hrs+" hours.</p>";
    feedback += "<p>Realistic watts needed per hour: "+Math.round(realusagewatt)+" watts/hour.</p>";
    feedback += "<p>The selected solar panel "+panelName+" generates about "+panelOutput+" watts per hour.<p>";

    document.getElementById('feedback').innerHTML = feedback;
}
