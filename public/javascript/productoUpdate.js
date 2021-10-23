//Consultando el id enviado por parametro a través de url 
const parametros = window.location.search;
const urlParams = new URLSearchParams(parametros);
var id = urlParams.get('id');

function findbyid(id) {
	let form= document.querySelector('#actualizarProductoForm');
    $.ajax({
        url: host+'/producto/' + id,
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    }).done(function (data) {
		form['idProducto'].value = data.id;
		form['nombre'].value = data.nombre;
		form['precio'].value = data.precio;
		form['descripcion'].value = data.descripcion;
		form['cantidad'].value = data.cantidad;
		$(`#categoriaSelectUpdate option[value='${data.idCategoria.id}']`).attr("selected", true);
    })
}

$(document).ready(function () {
	// getCategorias();
})

function getCategorias(){
    $.ajax({
		url: `${host}/categoria`,
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    }).done(function (items) {
		let options = '<option value="">...Seleccione una</option>';
		items.forEach(function (data, index, array) {$
			options += `
				<option value="${data.id}" >${data.nombre}</option>
			`
		});
		$('#categoriaSelectUpdate').html(options);

		if(id){
		   findbyid(id);
		}


	});
}

$("#actualizarProductoBtn").on('click', function (e) {
	e.preventDefault();
	console.log('regisrar');
	// let form = $('#registrarProductoForm');
	let form= document.querySelector('#actualizarProductoForm');
	let urlID = form['idProducto'].value;
	let data = {
		'nombre' : form['nombre'].value,
		'precio': form['precio'].value,
		'descripcion': form['descripcion'].value,
		'cantidad': form['cantidad'].value,
		'idCategoria': {
			'id' : form['categoria'].value
		},
	}
    $.ajax({
		url: `${host}/producto/${urlID}`,
        data: JSON.stringify(data), 
        method: "put",
        headers: {
            "content-type": "application/json"
        }
    }).done(function (res) {
		alert('Se ha actualizado el producto ' + res.nombre + " exitosamente")
		window.location.href = path +  "/public/pages/gestionProductos.html"
        loadtable();
	}).fail(function(err){
		console.log(err.responseJSON.error);
		console.log(err.responseJSON.message);
		console.log(err.responseJSON.status);
	})
})
