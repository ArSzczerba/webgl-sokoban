function m_hero(){
    
    
    this.Rot_x = 0;
    this.Rot_y = 0;
    this.Rot_z = 0;
    
    this.model = new Model();
    this.inMove = 0;
    this.newPosition = 0;
    this.directory = ' ';
    this.push = 0;
    this.boxID = -1;
    this.boxX = -1;
    this.boxZ = -1;
    
   // this.init = m_hero_init;
   
    this.draw = m_hero_draw;
	this.start_move = m_hero_start_move
    this.move_forward = m_hero_move_f;
    this.move_back = m_hero_move_b;
    this.move_right = m_hero_move_r;
    this.move_left = m_hero_move_l;
    this.stop = m_hero_stop;
    this.move = m_hero_move;
    
}

function m_hero_init(tex,mag_filter,min_filter,tab1,tab2,tab3)
{
    this.model.init("textures/ball2.jpg",0,0,Ball2_geometry.vertices,Ball2_geometry.texCoords,0);
}

function m_hero_draw()
{
    
 
}


function m_hero_move_f(){
    if(this.inMove == 0){
        this.PositionX = Math.round(this.PositionX);
        this.PositionZ = Math.round(this.PositionZ);

        if(levelModelsStatic[this.PositionX][this.PositionZ-1].type != 'wall' && (levelModelsStatic[this.PositionX][this.PositionZ-1].type == 'floor' || levelModelsStatic[this.PositionX][this.PositionZ-1].type == 'nest')){
            
            
            if(levelModels[this.PositionX][this.PositionZ-1]){
                if(levelModels[this.PositionX][this.PositionZ-1].type == 'crate' && levelModelsStatic[this.PositionX][this.PositionZ-2].type != 'wall' && !levelModels[this.PositionX][this.PositionZ-2]){
                    this.push = 1;
                    this.boxID = levelModels[this.PositionX][this.PositionZ-1].id;
                    this.boxX = this.PositionX;
                    this.boxZ = this.PositionZ-1;
                    
                } else {
                return false;
                } 
            }
            this.inMove = 1;
            this.newPosition =  this.PositionZ - 1;
            this.directory = 'F';
        }
    }
    return true;
}

function m_hero_move_b(){
    if(this.inMove == 0){
        this.PositionX = Math.round(this.PositionX);
        this.PositionZ = Math.round(this.PositionZ);        
        
        if(levelModelsStatic[this.PositionX][this.PositionZ+1].type != 'wall' && (levelModelsStatic[this.PositionX][this.PositionZ+1].type == 'floor' || levelModelsStatic[this.PositionX][this.PositionZ+1].type == 'nest')){
            
            
            if(levelModels[this.PositionX][this.PositionZ+1]){
                if(levelModels[this.PositionX][this.PositionZ+1].type == 'crate' && levelModelsStatic[this.PositionX][this.PositionZ+2].type != 'wall' && !levelModels[this.PositionX][this.PositionZ+2]){
                    this.push = 1;
                    this.boxID = levelModels[this.PositionX][this.PositionZ+1].id;
                    this.boxX = this.PositionX;
                    this.boxZ = this.PositionZ+1;
                    
                } else {
                return false;
            } 
            }
            this.inMove = 1;
            this.newPosition =  this.PositionZ + 1;
            this.directory = 'B';
        }
    }
    return true;
}

function m_hero_move_r(){
    if(this.inMove == 0){
        this.PositionX = Math.round(this.PositionX);
        this.PositionZ = Math.round(this.PositionZ);

        
        if(levelModelsStatic[this.PositionX+1][this.PositionZ].type != 'wall' && (levelModelsStatic[this.PositionX+1][this.PositionZ].type == 'floor' || levelModelsStatic[this.PositionX+1][this.PositionZ].type == 'nest')){
            
            
            if(levelModels[this.PositionX+1][this.PositionZ]){
                if(levelModels[this.PositionX+1][this.PositionZ].type == 'crate' && levelModelsStatic[this.PositionX+2][this.PositionZ].type != 'wall' && !levelModels[this.PositionX+2][this.PositionZ]){
                    this.push = 1;
                    this.boxID = levelModels[this.PositionX+1][this.PositionZ].id;
                    this.boxX = this.PositionX+1;
                    this.boxZ = this.PositionZ;
                    
                } else {
                return false;
            } 
            }
            this.inMove = 1;
            this.newPosition =  this.PositionX + 1;
            this.directory = 'R';
        }
    }
    return true;
}

function m_hero_move_l(){
    if(this.inMove == 0){
        this.PositionX = Math.round(this.PositionX);
        this.PositionZ = Math.round(this.PositionZ);
        
        if(levelModelsStatic[this.PositionX-1][this.PositionZ].type != 'wall' && (levelModelsStatic[this.PositionX-1][this.PositionZ].type == 'floor' || levelModelsStatic[this.PositionX-1][this.PositionZ].type == 'nest')){
            
            
            if(levelModels[this.PositionX-1][this.PositionZ]){
                if(levelModels[this.PositionX-1][this.PositionZ].type == 'crate' && levelModelsStatic[this.PositionX-2][this.PositionZ].type != 'wall' && !levelModels[this.PositionX-2][this.PositionZ]){
                    this.push = 1;
                    this.boxID = levelModels[this.PositionX-1][this.PositionZ].id;
                    this.boxX = this.PositionX-1;
                    this.boxZ = this.PositionZ;
                    
                } else {
                return false;
            } 
            }
            this.inMove = 1;
            this.newPosition =  this.PositionX - 1;
            this.directory = 'L';
        }
    }
    return true;
}

function m_hero_stop(){
    this.Rot_x = 0;
    this.Rot_y = 0;
    this.Rot_z = 0;
}


function m_hero_move(directory) {
    switch(directory){
        case 'F':
            
            if(this.PositionZ >= this.newPosition){
                 if(this.push == 1){
                    Objects[this.boxID].PositionZ = Objects[this.boxID].PositionZ-0.04;
                }
                
                this.PositionZ = this.PositionZ-0.04;
                this.Rot_x -= 4;
            } else {
                this.inMove = 0;
                this.newPosition = 0;
                this.PositionX = Math.round(this.PositionX);
                this.PositionZ = Math.round(this.PositionZ);
               
                if(this.push == 1){
                    this.push = 0;
                    Objects[this.boxID].PositionX = Math.round(Objects[this.boxID].PositionX);
                    Objects[this.boxID].PositionZ = Math.round(Objects[this.boxID].PositionZ);
                     
                    levelModels[this.boxX][this.boxZ-1] = levelModels[this.boxX][this.boxZ];
                    levelModels[this.boxX][this.boxZ] = undefined;
                    if(Objects[levelModelsStatic[this.boxX][this.boxZ].id].nested){
						Objects[levelModelsStatic[this.boxX][this.boxZ].id].nested = false;
					} 
                    if(levelModelsStatic[this.boxX][this.boxZ-1].type == 'nest'){
                        Objects[levelModelsStatic[this.boxX][this.boxZ-1].id].nested = true;
                        
                        if(checkNests()){
                            finish = 1;
                        }
						
                       
                    } else {
							Objects[levelModelsStatic[this.boxX][this.boxZ-1].id].nested = false;
						}
                    
                     
                    this.boxID = -1;
                    
                 }
               
            }
        break;
    
        case 'B':
            
            if(this.PositionZ <= this.newPosition){
                if(this.push == 1){
                    Objects[this.boxID].PositionZ = Objects[this.boxID].PositionZ+0.04;
                }
                
                
                this.PositionZ = this.PositionZ+0.04;
                this.Rot_x += 4;
            } else {
                this.inMove = 0;
                this.newPosition = 0;
                this.PositionX = Math.round(this.PositionX);
                this.PositionZ = Math.round(this.PositionZ);
               
                if(this.push == 1){
                    this.push = 0;
                    Objects[this.boxID].PositionX = Math.round(Objects[this.boxID].PositionX);
                    Objects[this.boxID].PositionZ = Math.round(Objects[this.boxID].PositionZ);
                     
                    levelModels[this.boxX][this.boxZ+1] = levelModels[this.boxX][this.boxZ];
                    levelModels[this.boxX][this.boxZ] = undefined;
                    if(Objects[levelModelsStatic[this.boxX][this.boxZ].id].nested){
						Objects[levelModelsStatic[this.boxX][this.boxZ].id].nested = false;
					}
                    if(levelModelsStatic[this.boxX][this.boxZ+1].type == 'nest'){
                        Objects[levelModelsStatic[this.boxX][this.boxZ+1].id].nested = true;
                        if(checkNests()){
                            finish = 1;
                        }
                        
                    } else {
							Objects[levelModelsStatic[this.boxX][this.boxZ-1].id].nested = false;
						}
                     
                    this.boxID = -1;
                    
                 }
               
            }
        break;
    
    case 'R':
            
            if(this.PositionX <= this.newPosition){
                if(this.push == 1){
                    Objects[this.boxID].PositionX = Objects[this.boxID].PositionX+0.04;
                }
                this.PositionX = this.PositionX+0.04;
                this.Rot_z -= 4;
            } else {
                this.inMove = 0;
                this.PositionX = Math.round(this.PositionX);
                this.PositionZ = Math.round(this.PositionZ);
                this.newPosition = 0;
                this.inMove = 0;
                
                
                if(this.push == 1){
                    this.push = 0;
                    Objects[this.boxID].PositionX = Math.round(Objects[this.boxID].PositionX);
                    Objects[this.boxID].PositionZ = Math.round(Objects[this.boxID].PositionZ);
                    
                    levelModels[this.boxX+1][this.boxZ] = levelModels[this.boxX][this.boxZ];
                    levelModels[this.boxX][this.boxZ] = undefined;
                    if(Objects[levelModelsStatic[this.boxX][this.boxZ].id].nested){
						Objects[levelModelsStatic[this.boxX][this.boxZ].id].nested = false;
					}
                    if(levelModelsStatic[this.boxX+1][this.boxZ].type == 'nest'){
                        Objects[levelModelsStatic[this.boxX+1][this.boxZ].id].nested = true;
                        
                        if(checkNests()){
                           finish = 1;
                        }
                        
                    } else {
							Objects[levelModelsStatic[this.boxX][this.boxZ-1].id].nested = false;
						}
                    
                    this.boxID = -1;
                     
                }
 
            }
        break;
    
    case 'L':
            
            if(this.PositionX >= this.newPosition){
                if(this.push == 1){
                    Objects[this.boxID].PositionX = Objects[this.boxID].PositionX-0.04;
                }
                
                this.PositionX = this.PositionX-0.04;
                this.Rot_z += 4;
            } else {
                this.inMove = 0;
                this.newPosition = 0;
                this.PositionX = Math.round(this.PositionX);
                this.PositionZ = Math.round(this.PositionZ);
                
                if(this.push == 1){
                    this.push = 0;
                    Objects[this.boxID].PositionX = Math.round(Objects[this.boxID].PositionX);
                    Objects[this.boxID].PositionZ = Math.round(Objects[this.boxID].PositionZ);
                    
                    levelModels[this.boxX-1][this.boxZ] = levelModels[this.boxX][this.boxZ];
                    levelModels[this.boxX][this.boxZ] = undefined;
                    
					if(Objects[levelModelsStatic[this.boxX][this.boxZ].id].nested){
						Objects[levelModelsStatic[this.boxX][this.boxZ].id].nested = false;
					}
					
                    if(levelModelsStatic[this.boxX-1][this.boxZ].type == 'nest'){
                        Objects[levelModelsStatic[this.boxX-1][this.boxZ].id].nested = true;
                        if(checkNests()){
                            finish = 1;
                        }
                        
                    } else {
							Objects[levelModelsStatic[this.boxX][this.boxZ-1].id].nested = false;
						}
					this.boxID = -1;
                    
                }
                
                
            }
        break;
    }
}


function findID(x,z){
   
    for(i in Objects){
        
        if(Objects[i].PositionX == x && Objects[i].PositionZ == z){
            return i;
        }
    }
    return false;
}

function m_hero_start_move(directory){
	switch(directory){
		case 'F':
			if(worldYRot == 0) this.move_forward();
			if(worldYRot == 90 || worldYRot == -270)  this.move_right();
			if(worldYRot == 180 || worldYRot == -180) this.move_back();
			if(worldYRot == 270 || worldYRot == -90) this.move_left();
		break;
		case 'R':
			if(worldYRot == 0) this.move_right();
			if(worldYRot == 90 || worldYRot == -270)  this.move_back();
			if(worldYRot == 180 || worldYRot == -180) this.move_left();
			if(worldYRot == 270 || worldYRot == -90) this.move_forward();
		break;
		case 'B':
			if(worldYRot == 0) this.move_back();
			if(worldYRot == 90 || worldYRot == -270)  this.move_left();
			if(worldYRot == 180 || worldYRot == -180) this.move_forward();
			if(worldYRot == 270 || worldYRot == -90)  this.move_right();
		break;
		case 'L':
			if(worldYRot == 0) this.move_left();
			if(worldYRot == 90 || worldYRot == -270)  this.move_forward();
			if(worldYRot == 180 || worldYRot == -180) this.move_right();
			if(worldYRot == 270 || worldYRot == -90) this.move_back();
		break;
		
	}
}