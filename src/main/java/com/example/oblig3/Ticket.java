package com.example.oblig3;

public class Ticket {
    String navn;
    String tlf;
    String epost;
    int antall;
    String film;

    public Ticket(String navn, String tlf, String epost, int antall, String film) {
        this.navn = navn;
        this.tlf = tlf;
        this.epost = epost;
        this.antall = antall;
        this.film = film;
    }

    public String getNavn() {return navn;}
    public void setNavn(String fornavn) {this.navn = fornavn;}
    public String getTlf() {return tlf;}
    public void setTlf(String tlf) {this.tlf = tlf;}
    public String getEpost() {return epost;}
    public void setEpost(String epost) {this.epost = epost;}
    public int getAntall() {return antall;}
    public void setAntall(int antall) {this.antall = antall;}
    public String getFilm() {return film;}
    public void setFilm(String film) {this.film = film;}




}
