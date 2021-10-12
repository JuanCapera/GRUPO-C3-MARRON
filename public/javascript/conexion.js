var host = 'localhost:8080';
// busqueda por id
function findbyid(id) {
    $.ajax({
        url: 'http:// '+host+'/api/producto/' + id,
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    }).done(function (data) {
        $("#id").val(data.id)
        $("#descripcion").val(data.descripcion)
    })
}

//cargar de manera automatica los datos regostrados
function loadtable() {
    $.ajax({
        url: 'http:// '+host+'/api/producto',
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    }).done(function (items) {
        var registros = "";
        items.foreach(function (data, index, array) {
			registros += `
			<tr>
				<td>${data.nombre}</td>
				<td>${data.precio}1000</td>
				<td>${data.descripcion}Descripcion producto</td>
				<td>${data.categoria}Categoria producto</td>
				<td>${data.stock}200</td>
				<td><a class="text-danger" href="#" onclick="eliminar(${data.id})" ><i class="bi bi-trash"></i></a></td>
				<td><a href="actualizarProducto.html"><i class="bi bi-arrow-repeat"></i></a></td>
			</tr>
			`;
        })
        $("#tbsalidadatos").html(registros);
        $("#descripcion").val("");
        $("#id").val("");
    })
}

//accion de adicionar un registro
$("#btnadicionar").on('click', function () {
    $.ajax({
        url: 'http:// '+host+'/api/producto',
        data: json.stringify({
            descripcion: $("#descripcion").val()
        }),
        method: "post",
        headers: {
            "content-type": "application/json"
        }
    }).done(function (result) {
        loadtable();
    })
})

//accion de modificar el registro que este seleccionado
$("#btnmodificar").on('click', function () {
    $.ajax({
        url: 'http:// '+host+'/api/producto/' + $("#id").val(),
        data: json.stringify({
            descripcion: $("#descripcion").val()
        }),
        method: "put",
        headers: {
            "content-type": "application/json"
        }
    }).done(function (result) {
        loadtable();
    })
})

//accion para eliminar un registro seleccionado 
function eliminar(id) => {
// $("#btneliminar").on('click', function () {
    if (confirm("está seguro de eliminar?")) {
        $.ajax({
            url: 'http:// '+host+'/api/producto/' + id,
            method: "delete",
            headers: {
                "content-type": "application/json"
            }
        }).done(function (result) {
            loadtable();
        })
    }
}

//eveto cargar tabla
$(document).ready(function () {
    loadtable();
})

