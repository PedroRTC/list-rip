  
let select_turn=document.querySelector('.select_turn')
let input_workload=document.querySelector('.input_workload')

let backend_turn_date=[]

backend_turn_date = JSON.parse(localStorage.getItem("backend_turn_date")) || [];

function addDateTurn(){
  
        backend_turn_date.map(item=>{
            select_turn.value=item.turn 
            input_workload.value=item.workload
         })
    
}

addDateTurn()


select_turn.addEventListener('input',changeTurn)

function changeTurn(){
    if(select_turn.options.selectedIndex=='1'
        ){
       input_workload.value='07:00 AS 19:00'
       
    }else if(select_turn.options.selectedIndex=='2'){
        input_workload.value='19:00 AS 05:00'
    }else if(select_turn.options.selectedIndex=='3'){
        input_workload.value='19:00 AS 07:00'
    }else{
        input_workload.value='07:00 AS 17:00'
    }
         
  

    backendTurnDate(select_turn.value,input_workload.value)



}

function backendTurnDate(turn,workload){
    new_turn_date={
        turn: turn,
        workload : workload
    }

    backend_turn_date.splice(new_turn_date)
    backend_turn_date.push(new_turn_date)

    localStorage.setItem("backend_turn_date", JSON.stringify(backend_turn_date)) || [];

    
}