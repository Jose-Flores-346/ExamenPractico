var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ExamenPractico'); 
var usuarios = mongoose.model('usuarios',{idUsuario:String, nombre:String, fechaNacimiento:String, ciudadResidencia:String, RFC:String, perfil:String});
var productos = mongoose.model('productos',{idProducto:String, nombreProducto:String, precio:Number, idUsuario:String, localidad:String, tipo:String});
var ventas = mongoose.model('ventas',{idVenta:String, idProducto:String, idUsuario:String, total:String, idVendedor:String});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.configure(function(){
    app.use(express.static(__dirname+'/public'));
    app.use(express.bodyParser());
});
app.listen(8081, function(){
    console.log("servidor 1");
});
app.get('/api/productos', function(request, response){
    if(request.body.tipo != ""){
        productos.findOne({
            tipo:request.body.tipo
        }, function(error, lista){
            if(error){
                response.send(lista);
            }
            response.json(lista);
        });
    }
    else if(request.body.localidad != ""){
        productos.findOne({
            localidad:request.body.localidad
        }, function(error, lista){
            if(error){
                response.send(lista);
            }
            response.json(lista);
        });
    }
    else if(request.body.precio > 0){
        productos.findOne({
            precio:request.body.precio
        }, function(error, lista){
            if(error){
                response.send(lista);
            }
            response.json(lista);
        });
    }
    else{
        productos.find(function(error, lista){
            if(error){
                response.send(lista);
            }
            response.json(lista);
        });
    }
});
app.get('/api/TopTen', function(request, response){
    ventas.find(function(error, lista){
        if(error){
            response.send(lista);
        }
        response.json(lista);
    });
});
app.post('/api/usuarios', function(request, response){
    usuarios.create({
        idUsuario:request.body.idUsuario
        ,nombre:request.body.nombre
        ,fechaNacimiento:request.body.fechaNacimiento
        ,ciudadResidencia:request.body.ciudadResidencia
        ,RFC:request.body.RFC
        ,perfil:request.body.perfil
    }, function(error, lista){
        if(error){
            response.send(error);
        }
        usuarios.find(function(error, lista){
            if(error){
                response.send(lista);
            }
            response.json(lista);
        });
    });
});
app.post('/api/Ventas', function(request, response){
    try {
        var crypto = require('crypto');
        var hash_sha256=crypto.createHash("sha256",request.body.total);
        var sha256c = hash_sha256.digest ("hex");
    } catch (error) {
        console.log(error);
    }
    let totalVen = sha256c;
    ventas.create({
        idVenta:request.body.idVenta
        ,idProducto:request.body.idProducto
        ,idUsuario:request.body.idUsuario
        ,total:totalVen
        ,idVendedor:request.body.idVendedor
    }, function(error, lista){
        if(error){
            response.send(error);
        }
        ventas.find(function(error, lista){
            if(error){
                response.send(lista); 
            }
            response.json(lista);
        });
    });
});