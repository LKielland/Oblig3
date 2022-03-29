let i = 0;
let utTekst = 'Kjøpet registreres ...';
let utTekst2 = 'Registrering vellykket. Vi ønsker deg en hyggelig opplevelse på Follo Kino';
let message = false;
let gyldig = false;
let kontroll = [0, 0, 0, 0, 0, 0];

$(function(){
    hentFilmer();
});

function hentFilmer() {
    $("#filmer").html("");
    $.get("/hentFilmer", function(data) { $("#filmer").html(data)});
}

function vent(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function printProgress() {
    if (message === false) {
        $("#progress").html("");
        while (i < utTekst.length) {
            document.getElementById("progress").innerHTML += utTekst.charAt(i);
            i++;
            await vent(20);
        }
    }
    await vent(1000);
    message = true;
    $("#progress").html("");
    i = 0;

    if (message === true) {
        document.getElementById("progress").innerHTML += utTekst2;
    }
    await vent(3000);
    $("#progress").html("");
    i = 0
    message = false;
}


function buyTicket() {

    let fornavn = $("#fornavn").val();
    let etternavn = $("#etternavn").val();
    let tlf = $("#tlf").val();
    let epost = $("#epost").val();
    let antall = parseInt($("#antall").val());
    let film = $("#valgtFilm").val();

    sjekkGyldig(fornavn, etternavn, tlf, epost, antall, film);

    if (gyldig === true) {
        const person1 = {
            navn: fornavn + " " + etternavn,
            tlf: tlf,
            epost: epost,
            antall: antall,
            film: film,
        };

        $.get("/ticketReg", person1, function(data) { $("#progress").html(data)});
        clear();
        printProgress();
    } else {
        $("#progress").html("Bestilling kunne ikke gjennomføres");
    }
}

function sjekkInt(antall) {
    try {
        parseInt(antall);
        return antall;
    }
    catch (err)
    {
        console.log(err);
        return null;
    }
}

function sjekkGyldig(fornavn, etternavn, tlf, epost, antall, film) {
    gyldig = false;
    sjekkInt(antall);

    if (isNaN(antall)) {
        $("#antallStatus").html("Antall ikke gyldig");
        return gyldig;
    }
    if (film === "ikkeValgt") {
        $("#filmStatus").html( "Du må velge en film");
    } else {
        kontroll[0] = 1;
        $("#filmStatus").html("");
    }
    if (antall <= 0) {
        $("#antallStatus").html("Antall ikke gyldig");
    } else {
        kontroll[1] = 1;
        $("#antallStatus").html("");
    }
    if (fornavn.length <= 0) {
        $("#fornavnStatus").html("Fornavn ikke gyldig");
    } else {
        kontroll[2] = 1;
        $("#fornavnStatus").html("");
    }
    if (etternavn.length <= 0) {
        $("#etternavnStatus").html("Etternavn ikke gyldig");
    } else {
        kontroll[3] = 1;
        $("#etternavnStatus").html("");
    }
    if (tlf.length !== 8) {
        $("#tlfStatus").html("Tlf ikke gyldlig");
    } else {
        kontroll[4] = 1;
        $("#tlfStatus").html("");
    }
    if (!epost.includes("@") || !epost.includes(".")) {
        $("#epostStatus").html("epost ikke gyldig");
    } else {
        kontroll[5] = 1;
        $("#epostStatus").html("");
    }

    for (const int of kontroll) {
        if (int === 0) {
            gyldig = false;
            break
        }
        gyldig = true;
    }
    kontroll = [0, 0, 0, 0, 0, 0];
}

function clear() {
    $("#fornavn").val("");
    $("#fornavnStatus").html("");
    $("#etternavn").val("");
    $("#etternavnStatus").html("");
    $("#tlf").val("");
    $("#tlfStatus").html("");
    $("#epost").val("");
    $("#epostStatus").html("");
    $("#antall").val("");
    $("#antallStatus").html("");
    $("#valgtFilm").val("Velg film");
    $("#filmStatus").html("");
}

function visBestillinger() {
    $("#personRegister").html("");
    $.get("/ticketPrint", function(data) { $("#personRegister").html(data)});
}

function slettBestillinger() {
    let sikker = confirm("Er du sikker på at du vil slette alle bestillingene?");
    if (sikker) {
        $.get("/delTickets", function() {$("#progress").html("Bestillinger slettet")});
        $("#personRegister").html("");
    }
}