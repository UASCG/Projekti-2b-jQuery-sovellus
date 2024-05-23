# Paranneltu tehtävälista

Tämä on verkkosivu jonka toteutin kurssia **"Web-sovellusten kehittäminen Javascriptillä TO00BL10-3022"** ja sen kolmatta projektia, **"Projekti 2b: jQuery-sovellus"** varten.

Tämä projekti on aiemman projektin uudempi versio. Tein Projekti 1:n tehtävälistan uusiksi, käyttäen HTML:ää, CSS:ää, JavaScriptiä, jQueryä, sekä Bootstrappia.

Verkkosivulla on kenttä, johon voi kirjoittaa haluamaansa tekstiä, jonka jälkeen painamalla "Lisää", teksti lisätään alla olevaan tehtäväluetteloon.

Tehtävät tallentuvat localStorageen, ja sivun latautuessa tehtävälista ladataan localStoragesta. Tehtäviä voi yksitellen poistaa tai merkitä valmiiksi niin, että tiedot tallentuvat paikallisesti.

Verkkosivulla on painike, josta painamalla voi poistaa kerralla kaikki luodut tehtävät.

Sallittut merkkijonopituudet ovat minimissään 1 ja maksimissaan 100. Toisin kuin projekti 1:ssä, puolipistemerkki on tässä versiossa sallittu.

# Erot Projekti 1:n tehtävälistaan

Tämä versio hyödyntää mahdollisimman paljon jQueryä ja Bootstrappia tavallisen JavaScriptin ja CSS:n sijaan.

Tässä versiossa localStorageen ei tallenneta Array-listoja JSON:in avulla, vaan jokaiselle tehtävälle luodaan erikseen kaksi sitä vastaavaa localStorage-avainta. Tässä menetelmässä on omat hyvät ja huonot puolensa, ja saattaa olla, että tulen muuttamaan localStorage-järjestelmän takaisin alkuperäisen tehtävälistan tyyliseksi. Ainakin tämä sallii sen, että puolipistemerkkiä ei enää tarvitse varata erilaisia JSON Array -operaatioita varten.