//import DateSelected from './ctrl.js'
///const ctrl = require('./ctrl');

var today = new Date();

$(document).ready(function(){
    createCalendar();
    $('nav .day').removeClass('on');
    $('nav #'+today.getDate()+'').addClass('on');
    var date = document.getElementById("cal-month").value;
    date = date.slice(2, 7);
    if(today.getDate() < 10){
        date = date.concat('.0'+today.getDate());
    }
    else{
        date = date.concat('.'+today.getDate());
    }
            
   // console.log(date);
            
});

        
function selected(value){
    $('nav .day').removeClass('on');
    $('nav #'+value+'').addClass('on');
    callCasting('21008252', value, '02');
}


function callCasting(musical_id, value, time_id){
    var show_date_id = showDateID(value);
    console.log(show_date_id);
    
    var innn = document.getElementById('castingResult');
    innn.innerHTML = show_date_id;
    innn.value = show_date_id;

    var results = document.getElementById('castingResultList');
    //let list = await ctrl.DateSelected(musical_id, value, time_id);
    //console.log(list);

    const call = async function(req, res){
        //let list = await DateSelected(musical_id, show_date_id, time_id);
        //console.log(list);
        console.log('callcasting :' , show_date_id);
    };
    call();
    //return show_date_id;
}


function showDateID(value){
    var date = document.getElementById("cal-month").value;
    date = date.slice(2, 7);
    if(value < 10){
        date = date.concat('.0'+value);
    }
    else{
        date = date.concat('.'+value);
    }
            
    return date;
}

function createCalendar(){
    var firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
    var lastDate = new Date(today.getFullYear(), today.getMonth()+ 1, 0);
    var tbCalendar= document.getElementById("calendar");
    var tbCalendarMonth = document.getElementById("cal-month");

    if(today.getMonth() + 1 < 10){
        tbCalendarMonth.value = today.getFullYear() + ".0" +( (today.getMonth() + 1));
    }
    else{
        tbCalendarMonth.value = today.getFullYear() + "." +(today.getMonth() + 1);
    }
        tbCalendarMonth.innerHTML = today.getFullYear() + "." +(today.getMonth() + 1);
            
    while(tbCalendar.rows.length > 1){
        tbCalendar.deleteRow(tbCalendar.rows.length-1);
    }

        var row = null;
        row= tbCalendar.insertRow();
        var count = 0;
        for(i = 0; i<firstDate.getDay(); i++){
            cell = row.insertCell();
            count += 1;
        }

        for(i=1; i<=lastDate.getDate(); i++){
            cell = row.insertCell();
                
        if(count%7==0){
            cell.innerHTML="<nav id='day' class = 'Sunday' >"+"<a href='#' class = 'day' id ="+i+"  onclick ='selected("+i+")'>"+ "<font color='#eb5461'>"+i+"</font>"+"</a>"+"</nav>";
        }
        else if(count%7==6)cell.innerHTML="<nav id = 'day' class = 'Saturday'>"+"<a href='#' class = 'day' id ="+i+"  onclick ='selected("+i+")'>"+ "<font color='#3b9af3'>"+i+"</font></a></nav>";
        else cell.innerHTML = "<nav id ='day' class = 'WeekDay'>"+"<a href='#' class = 'day' id ="+i+"   onclick ='selected("+i+")'>"+ "<font color='black'>"+i+"</font></a></nav>";
                
        count +=1;
        if(count%7==0) row = calendar.insertRow();
    }
    
}
        
    
function prevCalendar(){
    today=new Date(today.getFullYear(), today.getMonth()-1,today.getDate());
    createCalendar();
}

function nextCalendar(){
    today=new Date(today.getFullYear(),today.getMonth()+1,today.getDate());
    createCalendar();
}
//module.exports= { createCalendar, selected, prevCalendar, nextCalendar, callCasting, showDateID };

//module.exports = { createCalendar };