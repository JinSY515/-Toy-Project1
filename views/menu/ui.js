document.innerHTML = "aaaaaaaaa";

createCalendar();

var today = new Date();
function createCalendar(){
    var firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
    var lastDate = new Date(today.getFullYear(), today.getMonth()+1, 0);
    var tbCalendar = document.getElementById("calendar");
    var tbCalendarMonth = document.getElementById("cal-month");

    tbCalendarMonth.innerHTML = today.getMonth()+1;

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
    }

}