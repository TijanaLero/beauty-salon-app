# Aplikacija za upravljanje rezervacijama u salonu lepote

## Opis projekta

Aplikacija omogućava digitalno upravljanje rezervacijama u salonu lepote kroz različite korisničke uloge: administratora, kozmetičara i klijenta.

### Administrator

Administrator salona ima potpun pregled sistema i može da:

- Pregleda sve korisnike sistema (kozmetičare i klijente)
- Pregleda sve rezervacije
- Kreira nove korisničke naloge
- Izmenjuje postojeće korisničke naloge
- Briše korisnike koji više nisu aktivni
- Upravlja rezervacijama

### Kozmetičar

Kozmetičaru je omogućeno da:

- Pregleda rezervacije koje se odnose na njegove usluge
- Menja rezervacije kada je to potrebno

### Klijent

Klijent može da:

- Pregleda dostupne termine u realnom vremenu
- Odabere željenog kozmetičara
- Kreira rezervaciju termina
- Otkazuje rezervaciju u skladu sa pravilima salona

Nakon uspešno kreirane rezervacije, klijent automatski dobija potvrdu putem e-mail adrese sa svim detaljima zakazanog termina.

## Funkcionalnosti sistema

- Autentifikacija i autorizacija korisnika
- Upravljanje korisnicima (CRUD operacije)
- Upravljanje rezervacijama (CRUD operacije)
- Pregled dostupnih termina u realnom vremenu
- Slanje potvrde rezervacije putem e-mail-a
- Resetovanje lozinke
- Pretraga i filtriranje rezervacija
- Paginacija rezultata
- Zaštita od istovremenog zakazivanja istog termina
