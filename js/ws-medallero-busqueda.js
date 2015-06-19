var AllResults = "http://sistemas.conade.gob.mx/waAgendaMedalleros/api/DetMedallaOroFiltro?filtro=0";
var returnData = "";
$.ajax({
    type: "GET",
    dataType: "json",
    async: true,
    url: AllResults,
    error: function(e) {
        alert("Falló la conexión a internet")
    },
    success: function(data) {
        $("div#BusquedaOro").html(" ");
        returnData =
            "<div id='titulototales'>Resultados en todas las disciplinas</div>" + "<table id='busquedamedallero'>" + "<tr>" + "<td id='medallerobusquedatitulos'>Nombre Atleta</td>" + "<td id='medallerobusquedatitulos'>Prueba</td>" + "<td id='medallerobusquedatitulos'>Evento</td>" + "</tr>" + "</table>";

        for (i = 0; i < data.length; i++) {
            returnData
                += "<table id='busquedamedallero'>" + "<tr>" + "<td id='medallerobusquedacont'>" + data[i]["NombreAtleta"] + "</td>" + "<td id='medallerobusquedacont'>" + data[i]["Prueba"] + "</td>" + "<td id='medallerobusquedacont'>" + data[i]["Evento"] + "</td>" + "</tr>" + "</table>";
        }

        returnData = returnData + "<div> ";
        $("div#BusquedaOro").html(returnData);
    }
});

function TotalMedallero() {
    var TotalMed = $("#TotalDiv").val();
    var URLTotal = "http://sistemas.conade.gob.mx/waAgendaMedalleros/api/DetMedallaTotalFiltro?filtro=" + TotalMed;
    $.ajax({
        type: "GET",
        dataType: "json",
        async: true,
        url: URLTotal,
        error: function(e) {
            alert("Falló la conexión a internet")
        },
        success: function(data) {
            returnTotal =
                "<div id='titulototales'>Resultados para:" + TotalMed + "</div>" + "<table class='busquedamedallerofiltro'>" + "<tr>" + "<td id='filtromedallerotitulos'>Fecha</td>" + "<td id='filtromedallerotitulos'>Atleta</td>" + "<td id='filtromedallerotitulos'>Prueba</td>" + "<td id='filtromedallerotitulos'>Evento</td>" + "<td id='filtromedallerotitulos'>Medalla</td>" + "</tr>" + "</table>";

            for (i = 0; i < data.length; i++) {
                returnTotal
                    += "<table class='busquedamedallerofiltro'>" + "<tr>" + "<td id='medallerobusquedacont'>" + convertDate(data[i]["FechaEvento"]) + "</td>" + "<td id='medallerobusquedacont'>" + data[i]["NombreAtleta"] + "</td>" + "<td id='medallerobusquedacont'>" + data[i]["Prueba"] + "</td>" + "<td id='medallerobusquedacont'>" + data[i]["Evento"] + "</td>" + "<td id='medallerobusquedacont'>" + data[i]["Medalla"] + "</td>" + "</tr>" + "</table>";
            }
            $("#FiltroTotal").html(returnTotal);
        }
    });
}

function convertDate(inputFormat) {
    var d = new Date(inputFormat);
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/');
}