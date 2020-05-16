var verticles = [];
var textures = [];
var indexs = [];

function Model()
{
	this.Texture = null;
	this.Vertices = null;
	this.Tex_coords = null;
	this.Indices = null;
	this.type = null;
	
	this.PositionX = 0;
    this.PositionY = 0;
    this.PositionZ = 0;
	
	this.init = Model_init;
	this.display = Model_display;
	this.load_texture = Model_load_texture;
}



function Model_display(mode)
{										
	//vertices:
	gl.bindBuffer(gl.ARRAY_BUFFER, this.Vertices);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
	
	//coords:
	gl.bindBuffer(gl.ARRAY_BUFFER, this.Tex_coords);
	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

	//tex:
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, this.Texture);
	gl.uniform1f(gl.getUniformLocation(shaderProgram, "uSampler"), 0);		
	
	if( !this.Indices )
	{
		//first draw method without indices:
		setMatrixUniforms();
		if( !mode )
			gl.drawArrays(gl.TRIANGLES, 0, this.Vertices.numItems);
		else
			gl.drawArrays(mode, 0, this.Vertices.numItems);
	}
	else
	{
		//second draw method with indices:
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.Indices);

		setMatrixUniforms();
		if( !mode )
			gl.drawElements(gl.TRIANGLES, this.Indices.numItems, gl.UNSIGNED_SHORT, 0);
		else
			gl.drawElements(mode, this.Indices.numItems, gl.UNSIGNED_SHORT, 0);
	}
}


function Model_init(tex,mag_filter,min_filter,tab1,tab2,tab3)
{
	
	
	//load texture
	if( tex )
		this.load_texture(tex,mag_filter,min_filter);
	
	//create vertices buffer
	if( tab1 )
	{
		
		this.Vertices = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.Vertices);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tab1), gl.STATIC_DRAW);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
		this.Vertices.itemSize = 3;
		this.Vertices.numItems = tab1.length/3;
	}
	
	//create coords buffer
	
	if( tab2 )
	{		
		this.Tex_coords = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.Tex_coords);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tab2), gl.STATIC_DRAW);
		gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);		
		this.Tex_coords.itemSize = 2;
		this.Tex_coords.numItems = tab2.length/2;
	}
	
	//create indices buffer
	if( tab3 )
	{		
		this.Indices = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.Indices);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexs), gl.STATIC_DRAW);
		this.Indices.itemSize = 1;
		this.Indices.numItems = tab3.length;
	}
	
}


function Model_load_texture(adres,mag_filter,min_filter)
{
	//create Texture object
	var Texture = gl.createTexture();
	var tempImage;
	tempImage = new Image();
	tempImage.onload = function()
	{
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
		gl.bindTexture(gl.TEXTURE_2D, Texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tempImage);
		if( !mag_filter )
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);	//default filtr - gl.LINEAR
		else
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, mag_filter);
	
		
		if( !min_filter )
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);	//default filtr - gl.LINEAR
		else
		{
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, min_filter);
			if( min_filter==gl.LINEAR_MIPMAP_NEAREST || min_filter==gl.LINEAR_MIPMAP_LINEAR || min_filter==gl.NEAREST_MIPMAP_NEAREST || min_filter==gl.NEAREST_MIPMAP_LINEAR )
				gl.generateMipmap(gl.TEXTURE_2D); 	//generate mipmaps
		}
		
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	//load image
	tempImage.src = adres;
	this.Texture = Texture;
}

function levelModelClass() {
	this.id = 0;
	this.type = 'empty';
}
