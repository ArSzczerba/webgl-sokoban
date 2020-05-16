var Objects = new Array();


var levelModels;
var levelModelsStatic;
var hero;
var obj;

function loadWorld(level){
	Objects = [];
	levelModels = [];
	levelModelsStatic = [];
	a_handler.modelHandler = [];
	a_handler.nestsHandler = [];
	var url = "maps/"+level;
	var getSourceSynch = function(url) {
		var req = new XMLHttpRequest();
		req.open("GET", url, false);
		req.send(null);
		return (req.status === 200) ? req.responseText : null;
	};
			
	// Zwraca obiekt zawarty w pliku .json
	var loadJSON = function(url) {
		return JSON.parse(getSourceSynch(url));
	};
			
	obj = loadJSON(url);
	
	
	//CREATE MAP ARRAY
	
	levelModelsStatic = new Array(obj.size[0]);
	for(var i = 0; i< obj.size[1]; i++){
		levelModelsStatic[i] = new Array(obj.size[1]);
	}
	levelModels = new Array(obj.size[0]);
	for(var i = 0; i< obj.size[1]; i++){
		levelModels[i] = new Array(obj.size[1]);
	}
	
	
	var mapWidth = obj.size[0];
	var mapHeight = obj.size[1];
	
	worldZ = obj.size[0]/2;
	worldX = obj.size[1]/2;
	centerZ = obj.size[0]/2;
	centerX = obj.size[1]/2;
	
	console.log(centerX);
	console.log(centerZ);
	
	
	for(i in obj.level){
				
		if(obj.level[i].type == 'wall' || obj.level[i].type == 'floor' || obj.level[i].type == 'nest'){
			levelModelsStatic[obj.level[i].position[0]][obj.level[i].position[2]] = new levelModelClass();
			levelModelsStatic[obj.level[i].position[0]][obj.level[i].position[2]].id = i;
			levelModelsStatic[obj.level[i].position[0]][obj.level[i].position[2]].type = obj.level[i].type;
			if(obj.level[i].type == 'nest'){
				a_handler.nestsHandler[a_handler.nestsHandler.length] = i;
			}
		}
		if(obj.level[i].type == 'crate'){
			levelModels[obj.level[i].position[0]][obj.level[i].position[2]] = new levelModelClass();
			levelModels[obj.level[i].position[0]][obj.level[i].position[2]].id = i;
			levelModels[obj.level[i].position[0]][obj.level[i].position[2]].type = obj.level[i].type;
			
		}
		
		
		
		getModel(obj.level[i], i);
		
	}
	
	checkStartNests();
	checkIsloaded();
}

function c_model(){
	//position
	this.PositionX = 0;
	this.PositionY = 0;
	this.PositionZ = 0;	
}




function getModel(singleModel, obj_num){
	
	
	
	var modelName = singleModel.model;
	var modelType = singleModel.type;
	
	var modelHandlerId = -1;
	var isNew = false;
	
	
	var modelHandlerSize = 0;
	modelHandlerSize = a_handler.modelHandler.length;
	
		modelHandlerId = modelHandlerFindIdByName(modelName);
	
	if(modelHandlerId == -1){
		a_handler.modelHandler[modelHandlerSize] = new Model;
		a_handler.modelHandler[modelHandlerSize].type = modelName;
		isNew = true;
	}
	
	
	if(isNew){
		
	
		var url = "models/"+modelName; // adres z danymi w formacie JSON
		// Zwraca zawartosc pliku tekstowego
		var getSourceSynch = function(url) {
			var req = new XMLHttpRequest();
			req.open("GET", url, false);
			req.send(null);
			return (req.status === 200) ? req.responseText : null;
		};
				
		// Zwraca obiekt zawarty w pliku .json
		var loadJSON = function(url) {
			return JSON.parse(getSourceSynch(url));
		};
				
		var obj = loadJSON(url);
		
		
				
		verticles = eval(obj.verticles);
		a_handler.modelHandler[modelHandlerSize].Vertices = verticles;
		textures = eval(obj.texture);
		a_handler.modelHandler[modelHandlerSize].Texture = textures;
				
		for( var i =0; i< (verticles.length/3); i++){
			indexs[i] = i;
		}
		a_handler.modelHandler[modelHandlerSize].Indices = indexs;
	} else {
		verticles = a_handler.modelHandler[modelHandlerId].Vertices;
		textures = a_handler.modelHandler[modelHandlerId].Texture;
		indexs = a_handler.modelHandler[modelHandlerId].Indices;
	}
	createObject(obj_num, singleModel.texture, singleModel.position, modelType);
	 
		   
       
   
        
}

function createObject(i, textureName, positions, modelType){
	
	if(modelType != 'hero'){
		if(modelType == 'nest'){
		Objects[i] = new n_model();
		} else {
		Objects[i] = new c_model();
		}
	} else {
		Objects[i] = new m_hero();
		hero = Objects[i];
		hero.type = 'hero';
	}
		Objects[i].init("textures/"+textureName,gl.LINEAR,gl.LINEAR_MIPMAP_LINEAR,verticles,textures,indexs);
	
	
		Objects[i].PositionX = positions[0];
		Objects[i].PositionY = positions[1];
		Objects[i].PositionZ = positions[2];
	 
	verticles = [];
	textures = [];
	indexs = [];

	counter++;
	
}

function checkIsloaded(){
	
	if (counter == obj.level.length) {
	
		gl.clearColor(0.8, 0.8, 0.8, 1.0);
			
		gl.clearDepth(1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		
		setInterval(tick, 15);
	}else {
			
		setTimeout('checkIsloaded()', 15);
	}
	
}

function checkStartNests(){
	for(var i = 0; i < obj.size[0]; i++){
		for(var j = 0; j < obj.size[1]; j++){
			if(levelModels[i][j] && levelModels[i][j].type == 'crate' && levelModelsStatic[i][j].type == 'nest'){
				Objects[levelModelsStatic[i][j].id].nested = true;
			}
		}
		
	}
	checkNests();

}

	
	