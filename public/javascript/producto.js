//cargar de manera automatica los datos regostrados
function loadtable() {
    $.ajax({
		url: `${host}/producto`,
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    }).done(function (items) {
        var registros = "";
        items.forEach(function (data, index, array) {
			registros += `
			<tr>
				<td>${data.nombre}</td>
				<td>${data.precio}</td>
				<td>${data.descripcion}</td>
				<td>${data.idCategoria.nombre}</td>
				<td>${data.cantidad}</td>
				<td><a class="text-danger" href="#" onclick="eliminarProducto(${data.id}, '${data.nombre}')"><i class="bi bi-trash"></i></a></td><!--Incluir la url para eliminar que recibirá el id-->
				<td><a href="actualizarProducto.html?id=${data.id}"><i class="bi bi-arrow-repeat"></i></a></td>
			</tr>
			`;
        })
		$('#tablaDatos').html(registros);
    })
}
//accion de adicionar un registro
$("#registrarProducto").on('click', function (e) {
	e.preventDefault();
	console.log('regisrar');
	// let form = $('#registrarProductoForm');
	let form = document.querySelector("#registrarProductoForm");
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
		url: `${host}/producto`,
        data: JSON.stringify(data), 
        method: "post",
        headers: {
            "content-type": "application/json"
        }
    }).done(function (res) {
		alert('Se ha registrado el producto ' + res.nombre)
        window.location.href = path + "/public/pages/gestionProductos.html"
        loadtable();
	}).fail(function(err){
		console.log(err.responseJSON.error);
		console.log(err.responseJSON.message);
		console.log(err.responseJSON.status);
	})
})


function eliminarProducto(id, nombre){
    if (confirm("está seguro de eliminar el producto " + nombre + "?")) {
        $.ajax({
			url: `${host}/producto/${id}`,
            method: "delete",
            headers: {
                "content-type": "application/json"
            }
        }).done(function (result) {
            loadtable();
        })
    }

}

//cargar tabla
$(document).ready(function () {
    loadtable();
})

