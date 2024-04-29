# Web-ohjelmoinnin sovellusprojekti - Movie Mayhem

## Sisällysluettelo
- [Web-ohjelmoinnin sovellusprojekti - Movie Mayhem](#web-ohjelmoinnin-sovellusprojekti---movie-mayhem)
  - [Sisällysluettelo](#sisällysluettelo)
  - [Sivuston esittely](#sivuston-esittely)
  - [Työskentely ja työnjako](#työskentely-ja-työnjako)
  - [Käyttöliittymän suunnittelu ja toteutus](#käyttöliittymän-suunnittelu-ja-toteutus)
    - [Frontend](#frontend)
    - [Backend](#backend)
      - [Node.js ja Express](#nodejs-ja-express)
      - [Rajapinta](#rajapinta)
      - [Dokumentaatio](#dokumentaatio)
    - [Testaus](#testaus)
    - [Tietokanta](#tietokanta)
      - [ER-kaavio](#er-kaavio)
    - [Sovelluksen käyttöönotto](#sovelluksen-käyttöönotto)

## Sivuston esittely
Movie Mayhem on elokuvien sekä tv-sarjojen yhden pysähdyksen löytöasema sekä arvostelusivuston prototyyppi. Sivusto on toteutettu ryhmätyönä Oulun ammattikorkeakoulun Web-ohjelmoinnin sovellusprojektikurssilla. Sivuston on toteuttanut Tiina Mäntykivi, Jarno Tauriainen, Johannes Vidkopp sekä Joona Vilponen.

![](/readmeKuvat/1LogoKuva.png)<br>
**Kuva 1.** Websovelluksen logo.

Projektin tarkoituksena oli toteuttaa reaktiivinen ja käyttäjäystävällinen web-sovellus hyödyntäen React kirjastoa frontendin ja node.js backendin kanssa ja oppia fullstack ohjelmistokehitystä sekä Kanban ja Scrum toimintatapoja hyödyntäen GitHubiin luotua kanbantaulua (kuva 2).

Sivustolla pystyy selaamaan ja etsimään elokuvia sekä tv-sarjoja ja katsomaan näistä top-listoja. Sivustolle voi myös rekisteröityä käyttäjäksi, jolloin käyttäjälle avautuu mahdollisuus kirjoittaa arvioita, luoda ja liittyä ryhmiin sekä laatia omia suosikkilistoja, joita voi myös jakaa linkillä muille nähtäväksi.

![](/readmeKuvat/2KanbanKuva.png)<br>
**Kuva 2.** Kanbantaulu GitHubissa.

## Työskentely ja työnjako
Projekti lähti käyntiin suunnittelemalla ensin hieman ulkoasua, tietokantaa sekä haluamiamme ominaisuuksia. Saatuamme prototyypin etusivusta sekä käsityksen tarvittavista komponenteista pystyimme aloittamaan myös backendin suunnittelun. Tässä projektissa kaikki ryhmän jäsenet pääsivät tutustumaan fullstack-kehitykseen tekemällä ainakin jonkin osuuden alusta loppuun asti. Jokainen jäsen toteutti frontendiin sivun ja kyseiseen sivuun liittyvät endpointit backendiin sekä tarvittavat kyselyt backendistä tietokantaan.

Tehtävät napattiin kanbantaulun backlogista omaan tahtiin, taikka jaettiin scrumpalaverissa. Ryhmä- sekä scrumpalavereja olemme pitäneet viikoittain tai useamman kerran viikossa. Muutoin työskentely on ollut ryhmänjäsenillä pääosin itsenäistä.

## Käyttöliittymän suunnittelu ja toteutus
Sovelluksen rautalankamallia hahmoteltiin sekä paperille piirtämällä, että Figma ja Wireframe.cc -sovelluksilla (kuva 3). Sivuston käyttöliittymä jaettiin jo suunnitteluvaiheessa sopiviin osiin, joiden toteuttaminen komponentteina olisi mahdollisimman virtaviivaista. Alasivuilla osa komponenteista piilotetaan ja uusia komponentteja voidaan lisätä ilman, että sivuston yleisilme muuttuu radikaalisti eri toimintojen välillä.

![](/readmeKuvat/3RautalankaKuva.png)<br>
**Kuva 3.** Etusivun rautalankamalli ja sisäänkirjautumisen hahmottelua.

Erikokoiset näytöt ja laitteet on sivustolla huomioitu muuttamalla fonttien kokoa, komponenttien sijaintia ja ulkomuotoa laitteen ominaisuuksien mukaan. Lisäksi eri elementit reagoivat hiiren kursoriin antaen käyttäjälle interaktiivista palautetta. Sivuston eri osat ja komponentit on nimetty selkeästi käyttötarkoituksen mukaan. Esimerkiksi HTML:n semanttisia elementtejä on käytetty hyväksi ja sivunavigointipalkin komponenteille on annettu kuvaavat otsikot.

![](/readmeKuvat/4SemanttisiaKuva.gif)<br>
**Kuva 4.** Semanttisia elementtejä.

### Frontend
Käyttöliittymä on tehty eri kuvasuhteille mukautuvaksi eli reaktiiviseksi ja käyttäjäystävälliseksi avoimen lähdekoodin kirjastoa React.js hyödyntäen. React mahdollistaa erityisesti Movie Mayhemissä hyödynnettyä niin sanottua yhden sivun applikaatiota, jossa React lataa vain sivulla muuttuvat osiot tai komponentit koko sivun sijaan. Sivuston ulkoasussa on hyödynnetty myös Bootstrapin Reactille käännettyä React-Bootstrap kirjastoa, joka on kolmannen osapuolen ulkoasuun keskittyvä React komponentti, joka ei vaadi muita riippuvuuksia. Sivuston ulkoinen ilme ja asettelu on muutoin tehty CSS-tyylikieltä käyttäen, joka on standardi HTML- sekä React-pohjaisten web-sivujen muotoilukieli. Käyttöliittymä on jaettu komponentteihin, joita voidaan sivulla näyttää tai olla näyttämättä sen mukaan, mikä on kehittäjän, taikka sen hetkisen sivun tarve. Komponentit mahdollistavat yhden sivun applikaation, jossa Movie Mayhemin tapauksessa vain navigointi- ja alaviitepalkkien välissä oleva sisältö muuttuu sivuston eri sivuille navigoidessa.

![](/readmeKuvat/5KomponentitKuva.png)<br>
**Kuva 5.** Havainnekuva komponenttien piilottamisesta ja näyttämisestä.

### Backend
#### Node.js ja Express
Sovelluksen backend on toteutettu Node.js:llä joka mahdollistaa Frontendin ohella myös backendin toteuttamisen Javascript ohjelmointikielellä, virtaviivaistaen websovelluskehitystä. Node.js on avoimen lähdekoodin suoritusympäristö, joka omaa maailman suurimman ohjelmistokirjastojen ekosysteemin npm (node package manager). Hyödynnämme websovelluksessamme Express-kirjastoa tietokannan ja frontendin välisessä kommunikoinnissa. Sillä hoidimme tietokantakyselyt kuten käyttäjien luonnit ja todentamiset, sekä API-kyselyt The Movie Databaseen.

#### Rajapinta
Sovelluksen tietokannan ja palvelimen välillä JSON datan vastaanottamiseen käytettiin REST rajapintaa. REST-Rajapinta tarjoaa erilaisten päätepisteiden toiminnallisuuksien hallinnan halutulla endpointilla. Esimerkiksi käyttäjän arvostelujen lisäämiseen on mahdollista /review/add endpointilla. Sille annetaan parametreinä käyttäjän id, elokuvan id TMBD:stä, arvostelun arvosanana ja käyttäjän kirjoittama arvostelu elokuvasta. Palautteena käyttäjä saa HTML-statuskoodin operaation onnistumisesta tai virheilmoituksen sen epäonnistumisesta.

#### Dokumentaatio
Rajapinnan dokumentaation toteutimme Postman-työkalua hyväksikäyttäen. Sitä varten kaikkien endpointtien tuli palauttaa response koodi ja antaa vastaus JSON-formaatissa. Dokumentaatio sisältää kuvaukset kunkin endpointin toiminnasta, mukaan lukien pyyntöön tarvittavat parametrit ja vastausrakenteet.

![](/readmeKuvat/6PostmanKuva.png)<br>
**Kuva 6.** Postman-dokumentaatio ryhmän jäsenten listaamisesta.

### Testaus
Projektin testauksessa käytettiin Chai- ja Mocha kirjastoja yksikkötestien tekemiseen. Yksikkötesteillä varmistimme, että sivuston osat toimivat luotettavasti itsenään. Esimerkiksi hakurajapintaa testatessa (Koodi 1) lähetetään pitkä kyselyteksti TMDB elokuvien ja tv-sarjojen hakuun, joka pitää suoriutua onnistuneesti testistä. Näin haku toiminto suoriutuu myös pidemmistä hauista ilman epäonnistumisia. Käyttäjähallinnan testauksessa käydään testi testiltä läpi käyttäjän luonti, sisäänkirjautuminen sekä käyttäjän poisto tarkistaen samalla yleisimpiä mahdollisia virhetilanteita, kuten väärän salasanan syöttäminen tai käyttäjän poistaminen ilman kirjautumista.

```javascript
describe('Search', function() {
  this.timeout(5000);

  it('should handle very long string queries', async function() {
      const longString = 'a'.repeat(30);
      const res = await chai.request(app)
          .get('/search/headersearch')
          .query({
              query: longString,
              api_key: process.env.TMDB_API_KEY,
              page: 1
          });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
  });
```
### Tietokanta
Hyödynnämme sovelluksessa PostgreSQL-tietokantaa tarvittavan tiedon säilyttämiseen. Tietokantaan tallennetaan muun muassa yksilölliset profiilit, luodut ryhmät, arvostelut ja käyttäjäkohtaiset suosikki elokuvat sekä sarjat. Tietokanta on luotu yhden ryhmän jäsenen Proxmox-serverillä sijaitsevaan Linux konttiin (LXC). Kehitysvaiheessa jokainen ryhmän jäsen otti SSH-yhteyden serverille ja tietokantayhteys ohjattiin porttiohjauksen avulla tietokannalle. 

#### ER-kaavio
Alla oleva ER-kaavio kuvaa tietokannan rakennetta. Tietokanta koostuu keskeisistä tauluista, kuten users, group ja review, jotka tallentavat käyttäjätiedot, ryhmien tiedot ja käyttäjäarvostelut. Taulut groupMember ja groupInvite mahdollistavat käyttäjien ja kutsujen hallinnan ryhmiin. Poistettaessa käyttäjän poistuvat myös käyttäjään linkitetyt tiedot automaattisesti tietokannasta.

![](/readmeKuvat/7ER-kaavioKuva.png)<br>
**Kuva 7.** Sovelluksen tietokannan ER-kaavio.

### Sovelluksen käyttöönotto
Sovelluksen saa käyttöön kloonaamalla ReactFrontend sekä NodeBackend repositoriot. Siirry ReactFrontend repositorioon ja kopioi repositorion osoite. Luo repositioriosta kopio koneellesi käskyllä:

git clone ```http://github.com/TVT23KMO-R14/ReactFrontend.git```

Toista sama myös NodeBackend repositoriolle. Asenna tarvittavat riippuvuudet molempien ReactFrontend sekä NodeBackend kansioiden juureen:	

npm install

Käynnistä ReactFrontend käskyllä:

npm start

Toista sama NodeBackendille.

NodeBackend kansion juureen on liitetty SQL-tiedosto (createdatabase.sql), mikä sisältää tietokannan SQL-koodin, jotta saat luotua itsellesi käyttöön sovellukseen tarvittavan tietokannan.

Oletkin sitten valmis käynnistämään sovelluksen! käynnistä frontend sekä backend ja pääsetkin jo kokeilemaan sovelluksen ominaisuuksia.

