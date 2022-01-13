const jsdom = require("jsdom");
const { JSDOM } = jsdom;


var today = new Date();
console.log('이거 아님');

function createCalendar(){
    
    var firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
    var lastDate = new Date(today.getFullYear(), today.getMonth()+1, 0);
    
    var tbCalendar =document.getElementById("calendar");
    var tbCalendarMonth = document.getElementById("cal-month");

    //tbCalendarMonth.innerHTML = today.getMonth()+1;
    tbCalendarMonth.innerHTML = today.getMonth() + 1;
    var row = null;
    row = tbCalendar.insertRow();
    var count =  0;
    for(i=0; i<firstDate.getDay(); i++){
        cell = row.insertCell();
        count +=1;
    }

    for(i=1; i<=lastDate.getDate(); i++){
        cell = row.insertCell();

        if(count %7 ==0){
            cell.innerHTML = "a  "+ i ;
        }
        count += 1;
        if(count % 7 == 0){
            row = calendar.insertRow();
        }
    }
    
    
}

function gotoCalendar(mon){
    var firstDate = new Date(today.getFullYear(), mon -1, 1);
    var lastDate = new Date(today.getFullYear(), mon, 0);
    var tbCalendar = document.getElementsById("calendar");
    var tbCalendarMonth = document.getElementsById("cal-month");

    tbCalendarMonth.innerHTML = today.getFullYear() + "." + (mon);

    while(tbCalendar.rows.length > 1){
        tbCalendar.deleteRow(tbCalendar.rows.length - 1);
    }

    var row = null;
    row = tbCalendar.insertRow();

    var count = 0;
    for(i=0; i<firstDate.getDate(); i++){
        cell = row.insertCell();

        if(count %7==0) cell.innerHTML = i;
        count += 1;
        if(count %7==0) row = calendar.insertRow();
    }
}

function prevCalendar(){
    today=new Date(today.getFullYear(), today.getMonth()-1,today.getDate());
    CreateCalendar();
}

function nextCalendar(){
    today=new Date(today.getFullYear(),today.getMonth()+1,today.getDate());
    CreateCalendar();
}

//createCalendar.call();
//module.exports = { createCalendar, gotoCalendar, prevCalendar, nextCalendar };