$(document).ready(function(){
    console.log('get ready');
});
var today = new Date();
console.log(today);
console.log('yeah?');
CreateCalendar();
function CreateCalendar(){
    var firstDate=new Date(today.getFullYear(),today.getMonth(),1);
    var lastDate=new Date(today.getFullYear(),today.getMonth()+1,0);
    var tbCalendar=document.getElementById("calendar");
    var tbCalendarYM=document.getElementById("cal-month");

    tbCalendarYM.innerHTML=today.getFullYear()+"."+(today.getMonth()+1);
    

    while(tbCalendar.rows.length>1){
        tbCalendar.deleteRow(tbCalendar.rows.length-1);
    }
    
    var row=null;
    row=tbCalendar.insertRow();
    var count=0;
    for(i=0; i<firstDate.getDay(); i++){
        cell=row.insertCell();
        count+=1;
    }

    for(i=1; i<=lastDate.getDate();i++){
        cell=row.insertCell();
        
        if(count%7==0){
            cell.innerHTML="<nav id='day'>"+"<a href='#'>"+ "<font color='#eb5461'>"+i+"</font>"+"</a>"+"</nav>";
            
            
        }
        else if(count%7==6)cell.innerHTML=" <font color='#3b9af3'>"+i+"</font>";
        else cell.innerHTML=i;
        count+=1;
        if(count%7==0) row=calendar.insertRow();
    }

}

module.exports= { CreateCalendar };