Tecnologias 
    git
    npm
    express
    nodemon
    mongoose
	Node js
	Mongo DB

Desarrollo

    En el momento de clonar el codigo ejecutar los comandos
        npm i 
        npm install express --save 
        npm install nodemon --save o npm install -g nodemon
        npm install mongoose
    para instalar las dependencias correspondientes y para ejecutar el proyecto se utiliza el comando 
        nodemon servidor.js 

	El desarrollo se llevo acabo mediante metodos get y post para el manejo de la información

	Con ayuda del metodo get se obtiene la informacion guardada en la base de datos y con ayuda del metodo postse envia la información para ser guardada en la BD

	Todo esto mediante la cadena de conexión y estableciendo la estructura de la colección a utilizar

Modelo Entidad Relación

'usuarios',{
	idUsuario:String
	,nombre:String
	,fechaNacimiento:String
	,ciudadResidencia:String
	,RFC:String, perfil:String
}
'productos',{
	idProducto:String
	,nombreProducto:String
	,precio:Number
	,idUsuario:String
	,localidad:String
	,tipo:String
}
'ventas',{
	idVenta:String
	,idProducto:String
	,idUsuario:String
	,total:String
	,idVendedor:String
}