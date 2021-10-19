$(document).ready(function () {
	getCategorias();
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
				<option value="${data.id}">${data.nombre}</option>
			`
		});
		$('#categoriaSelect').html(options);


	});
}

$('#crearCategoriaBtn').on('click', function(e){
	e.preventDefault();
    $.ajax({
		url: `${host}/categoria`,
        method: "post",
        data: JSON.stringify({
			nombre : $('#nombreCategoria').val(),
        }),
        headers: {
            "content-type": "application/json"
        }
    }).done(function (res) {
		alert('Se ha registrado la categoria ' + res.nombre)
        window.location.href = path + "/public/pages/gestionProductos.html"
        // window.location.href = "file:///home/edcas/GRUPO-C3-MARRON/public/pages/gestionProductos.html"

	});
})
