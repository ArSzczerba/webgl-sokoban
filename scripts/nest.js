function n_model(){
    this.nested = false;
}


function checkNests(){
       for(var i in a_handler.nestsHandler){
		
            if(Objects[a_handler.nestsHandler[i]].nested == false){
				
               return false;
            }
        }
        return true;
    
}