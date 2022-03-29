package com.example.oblig3;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class minController {
    ArrayList<Ticket> ticketList = new ArrayList<Ticket>();
    ArrayList<String> filmListe = new ArrayList<String>();

    @GetMapping("/ticketReg")
    public String ticketRegistration(String navn, String tlf, String epost, int antall, String film) {
        ticketList.add(new Ticket(navn, tlf, epost, antall, film));
        return "Billetten er registrert";
    }

    @GetMapping("/ticketPrint")
    public String ticketPrint(){
        String ut = "";
        ut += "<thead><tr><th>Navn</th><th>Tlf</th><th>E-Post</th><th>Antall</th><th>Film</th></tr></thead><tbody>";
        for (Ticket ticket : ticketList) {
            ut += "<tr><td>" + ticket.getNavn() + "</td><td>" + ticket.getTlf() + "</td><td>" + ticket.getEpost() + "</td><td>" + ticket.getAntall() + "</td><td>" + ticket.getFilm() + "</td></tr>";
        }
        ut += "</tbody>";
        System.out.println(ut);
        return ut;
    }

    @GetMapping("/delTickets")
    public void delTickets() {
        ticketList.clear();
    }

    @GetMapping("/hentFilmer")
    public String hentFilmer() {

        filmListe.clear();
        filmListe.add("Batman 56");
        filmListe.add("Superman 91");
        filmListe.add("Spiderman 21");
        filmListe.add("Catwoman 12");
        filmListe.add("WonderWoman 9");
        filmListe.add("Black Widow 63");
        filmListe.add("All of the heroes 32");

        String ut = "<select id='valgtFilm'>";
        ut +="<option value=\"Velg film\">Velg film</option>";
        String forrigeFilm = "";
        for (String film : filmListe){
            if(!film.equals(forrigeFilm)){
                ut+="<option value=\""+ film + "\">"+film+"</option>";
            }
            forrigeFilm = film;
        }
        ut+="</select>";
        System.out.println(ut);
        return ut;
    }
}
