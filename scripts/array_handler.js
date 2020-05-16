function array_handler(){
    this.modelHandler = new Array();
    this.nestsHandler = new Array();
}

function modelHandlerFindIdByName(name){
    for(i in a_handler.modelHandler){
        if(a_handler.modelHandler[i].type == name){
            return i;
        }
    }
    return -1;
}