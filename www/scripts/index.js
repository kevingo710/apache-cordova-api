// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en dispositivos/emuladores Ripple o Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.
        document.getElementById("btnBuscar").addEventListener('click', BuscarUsuario, false);
        document.getElementById("btnCargar").addEventListener('click', CargarLista, false);

    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };

    //FUNCIONES PERSONALIZADAS
    function BuscarUsuario() {
        var usuario = Number(document.getElementById("txtNombre").value);
        if (usuario == ""|| null) {
            document.getElementById("divResultado").innerHTML = "Ingrese usuario!";
        } else {
            //agregando evento Ajax
            $.ajax({
                type: "GET",
                url: "http://localhost:3678/api/favoritosuno/"+usuario,
                crossDomain: true,
                cache: false,
                success: function (result) {
                    console.log(result);
                    document.getElementById("divResultado1").innerHTML = "Bienvenido: " + result["favoritos"][0]["_id"].toString();
                    document.getElementById("divResultado2").innerHTML = "Su id de Cliente es: " + result["favoritos"][0]["idCliente"].toString();
                    document.getElementById("divResultado3").innerHTML = "Sus preferencias: " + result["favoritos"][0]["preferencias"];
                },
                error: function (result) {
                    alert("Ocurrió un problema. Por favor Comuníquese con el administrador del sistema. Gracias.");
                }
            });
        }
    }


    function CargarLista() {
        var cadena = "<table border=1 cellpadding=2 cellspacing=0 align=center><tr><th>idCliente</th><th>Preferencias</th></tr>";
        //agregando evento Ajax
        $.ajax({
            type: "GET",
            url: "http://localhost:3678/api/favoritostodos",
            crossDomain: true,
            cache: false,
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (result) {

                $.each(result.favoritos, function (i, field) {
                    console.log(field);
                    console.log(i);
                    console.log(i + ": " + field["user_id"]);
                            cadena = cadena + "<tr>" + "<td>" + field["idCliente"] 
                                + "</td><td>" + field["preferencias"] + "</td></tr>";                                                
                }); 
                cadena = cadena + "</table>";
                $("#divLista").append(cadena);
            },
            error: function (result) {
                alert("Ocurrió un problema. Por favor Comuníquese con el administrador del sistema. Gracias.");
            }
        });
    }

} )();