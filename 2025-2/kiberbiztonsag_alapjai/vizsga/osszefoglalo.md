# Kiberbiztonság Alapjai - Összefoglaló

## 1. Basic Concepts of Cybersecurity (Kiberbiztonság alapfogalmai)

*   **Cybersecurity (Kiberbiztonság)**: Az információs javak (eszközök, alkalmazások, hálózatok, adatok, felhasználók) védelme az illetéktelen közzétételből, adatsérülésből vagy szolgáltatáskiesésből eredő károk ellen.
*   **The CIA Triad (A CIA triád)**: A klasszikus alapvető biztonsági célok:
    *   **Confidentiality (Bizalmasság)**: Az információ illetéktelen felek előtti közzétételének megakadályozása.
    *   **Integrity (Integritás)**: Az információ illetéktelen módosításának vagy megsemmisítésének megakadályozása, biztosítva annak helyességét és hitelességét.
    *   **Availability (Rendelkezésre állás)**: Annak biztosítása, hogy a rendszerek és adatok az arra jogosultak számára szükség esetén elérhetőek és használhatóak legyenek.
*   **AAA Framework (AAA keretrendszer)**:
    *   **Authentication (Hitelesítés)**: A felhasználó azonosságának ellenőrzése ("Ki vagy te?").
    *   **Authorization (Engedélyezés)**: Annak meghatározása, hogy a felhasználó mely erőforrásokhoz férhet hozzá, és milyen műveleteket végezhet el.
    *   **Accounting (Elszámoltathatóság)**: A felhasználói tevékenységek nyomon követése, beleértve a hozzáféréseket és a végrehajtott módosításokat.
*   **Non-Repudiation (Letagadhatatlanság)**: Annak biztosítása, hogy egy tranzakció vagy kommunikáció résztvevője ne tagadhassa le saját aláírásának hitelességét vagy az üzenet elküldését.
*   **The Cybersecurity Cube (McCumber Cube) (Kiberbiztonsági kocka)**: Háromdimenziós keretrendszer, amely a biztonsági alapelveket (CIA triád), az adatok állapotait (továbbítás, tárolás, feldolgozás) és a védelmi intézkedéseket (technológia, szabályzatok/gyakorlat, emberek) kezeli.
*   **Information States (Adatállapotok)**:
    *   **Data at Rest (Tárolt adat)**: Nem aktív használatban lévő, tárolt adatok (pl. merevlemezeken, NAS-on).
    *   **Data in Transit (Továbbított adat)**: Hálózaton vagy eszközök között aktívan mozgó adatok.
    *   **Data in Process (Feldolgozás alatti adat)**: Alkalmazások által éppen létrehozott, frissített vagy feldolgozott adatok.
*   **Threat Actor (Fenyegető fél / Támadó)**: Olyan aktív egység (ellenfél vagy természeti erő), amely elindít vagy végrehajt egy fenyegetési forgatókönyvet.
*   **Threat Scenario (Fenyegetési forgatókönyv)**: Egy támadó által irányított reális cselekvéssorozat, amely kihasználja a sérülékenységeket és incidenst okozhat.
*   **Vulnerability (Sérülékenység)**: Olyan technikai, folyamatbeli vagy emberi gyengeség, amely lehetővé teszi egy fenyegetési forgatókönyv sikerességét.
*   **Security Incident (Biztonsági incidens)**: A biztonsági célok (CIA) megsértése, amely negatív hatással jár.
*   **Hacker Classifications (Hacker kategóriák)**:
    *   **Black Hat (Fekete kalapos)**: Rosszindulatú bűnöző.
    *   **White Hat (Fehér kalapos)**: Etikus szakember.
    *   **Gray Hat (Szürke kalapos)**: Törvényt sért, de nem feltétlenül rosszindulatú.

## 2. Information Gathering (Információgyűjtés)

*   **Passive Information Gathering (Passive Reconnaissance) (Passzív információgyűjtés)**: Információgyűjtés a célpontról közvetlen interakció nélkül, nyilvánosan elérhető forrásokra támaszkodva (alacsony lelepleződési kockázat).
*   **Active Information Gathering (Active Reconnaissance) (Aktív információgyűjtés)**: Információgyűjtés a célrendszerrel vagy hálózattal való közvetlen interakció útján (magasabb lelepleződési kockázat).
*   **OSINT (Open-Source Intelligence) (Nyílt forrású hírszerzés)**: Nyilvánosan elérhető információk gyűjtésének, elemzésének és felhasználásának folyamata.
*   **Google Dorking**: Speciális keresési operátorok (pl. `site:`, `filetype:`, `intitle:`) használata a Google-ben olyan érzékeny információk feltárására, amelyeket nem a nyilvánosságnak szántak.
*   **EXIF Data (EXIF adatok)**: Digitális médiafájlokba ágyazott metaadatok, amelyek részleteket közölnek a fájlról, beleértve az eszköz technikai adatait és GPS koordinátákat.
*   **DNS Zone Transfer Vulnerability (DNS zónaátviteli sérülékenység)**: Olyan konfigurációs hiba, ahol a DNS szerver lehetővé teszi illetéktelenek számára a teljes zónafájl lekérését, felfedve az aldomaineket és a hálózati struktúrát.
*   **Service Enumeration (Network Scanning) (Szolgáltatás-enumeráció)**: Aktív módszer a nyitott portok felderítésére, az elérhető szolgáltatások meghatározására, valamint szoftververziók vagy operációs rendszerre utaló jelek gyűjtésére.
*   **CVE (Common Vulnerabilities and Exposures)**: Nyilvánosan elérhető, szabványosított jegyzék konkrét szoftvertermékek ismert biztonsági fenyegetéseiről és sérülékenységeiről.
*   **CVSS (Common Vulnerability Scoring System)**: Szabványosított pontozási rendszer (0.0-tól 10.0-ig) a sérülékenységek súlyosságának értékelésére.

## 3. Social Engineering (Pszichológiai manipuláció)

*   **Social Engineering (Szociális manipuláció)**: Emberek manipulálása bizonyos műveletek elvégzésére vagy bizalmas információk kiadására, technikai hibák helyett az emberi pszichológia kihasználásával.
*   **Phishing (Adathalászat)**: Megtévesztő kommunikáció (elsősorban tömeges e-mailek), amely legitim entitásokat utánoz hitelesítő adatok, személyes adatok ellopása vagy kártevők terjesztése céljából.
*   **Whaling (Bálnavadászat)**: Az adathalászat egy erősen célzott formája, amely kifejezetten magas beosztású személyeket, vezetőket vagy felsővezetőket vesz célba egy szervezeten belül.
*   **Pretexting**: Egy előzetes kutatáson alapuló kitalált forgatókönyv (ürügy) létrehozása a bizalom és hitelesség kiépítése érdekében, rávéve a célpontot titkok felfedésére.
*   **Baiting (Csalizás)**: Olyan támadás, amely jutalom ígéretével vagy a kíváncsiság kihasználásával próbálja meg kompromittálni a biztonságot, fizikai adathordozók (pl. fertőzött USB kulcsok elhagyása) vagy digitális letöltések útján.
*   **Tailgating**: Olyan fizikai biztonsági incidens, amikor egy illetéktelen személy szorosan követ egy jogosult személyt egy védett területre annak tudta nélkül.
*   **Piggybacking**: Olyan fizikai biztonsági incidens, amikor egy jogosult személy tudatosan enged be egy illetéktelen egyént egy biztonságos területre megfelelő hitelesítés nélkül (pl. udvariasságból tartja az ajtót).
*   **ClickFix Attack (ClickFix támadás)**: Olyan technika, ahol egy weboldal hamis technikai hibaüzenetet jelenít meg, és ráveszi a felhasználót olyan billentyűkombinációk használatára, amelyek egy kártékony parancsot másolnak a vágólapra és futtatnak le.
*   **Psychological Triggers (Pszichológiai kiváltó okok)**: A támadók által kihasznált alapvető emberi érzelmek, mint a **kíváncsiság**, a **sürgetés érzése**, a **félelem/szorongás** és a **bizalom/tekintély**.

## 4. Physical Security (Fizikai biztonság)

*   **Physical Security (Physsec) (Fizikai biztonság)**: IT környezetben a célpont IT infrastruktúrájához való fizikai hozzáférés megszerzése vagy megakadályozása.
*   **Physical Penetration Testing (Fizikai behatolásvizsgálat)**: Fizikai korlátok módszeres tesztelése kifejezett írásos engedéllyel ("get out of jail free card"), amelyet a vizsgálat alatt magánál kell tartania a szakembernek a birtokháborítástól való megkülönböztetés érdekében.
*   **Laser Microphones (Lézeres mikrofonok)**: Olyan megfigyelőeszköz, amely lézersugarat ver vissza egy ablaküvegről, hogy mérje a szobában zajló beszéd okozta apró rezgéseket.
*   **Hotplug Attack (Hotplug támadás)**: Olyan támadás, amelynél egy speciális USB eszközt (pl. Rubber Ducky) csatlakoztatnak egy felügyelet nélküli géphez, hogy nagy sebességgel automatizált billentyűleütési parancsokat injektáljanak.
*   **Network Implants (Hálózati implantátumok)**: Titokban közvetlenül a belső hálózatra csatlakoztatott kártékony hardverek, amelyek távoli hozzáférést biztosítanak a támadónak, megkerülve a külső tűzfalakat.
*   **Under-Door Tool (Ajtó alatti eszköz)**: Az ajtó alatt betolt hosszú drót vagy kampós eszköz a belső ajtókilincs lehúzására, kívülről teljesen megkerülve a zárat.
*   **Latch Tool (Latch Hook) (Zárnyelv-nyitó)**: Olyan eszköz, amellyel az ajtó zárnyelvét közvetlenül húzzák el az ajtó és a keret közötti réseken keresztül (rossz illeszkedés vagy beállítás esetén).
*   **REX (Request to Exit) Sensor (REX szenzor)**: A biztonságos oldalon elhelyezett (általában passzív infravörös) mozgásérzékelő, amely automatikusan kinyitja az ajtót, ha valaki távozni készül.
*   **Hybrid REX Sensor (Hibrid REX szenzor)**: PIR és mikrohullámú érzékelőket kombináló védelmi eszköz, amely megakadályozza, hogy a támadók kívülről (pl. gőzbefúvással vagy hőtükrözéssel) aktiválják a nyitómechanizmust.


## 5. Network Security (Hálózati biztonság)

*   **Network Segmentation (Hálózati szegmentáció)**: Egy nagyobb hálózat kisebb, izolált alhálózatokra (szegmensekre) bontása tűzfalak segítségével a kritikus rendszerek védelme és a támadók oldalirányú mozgásának (*lateral movement*) korlátozása érdekében.
*   **Eavesdropping (Lehallgatás)**: Olyan bizalmasság (*confidentiality*) elleni támadás, amely során egy illetéktelen fél elolvassa a hálózaton keresztül áramló, titkosítatlan (*plaintext*) adatokat (pl. Wireshark használatával).
*   **Inbound / Outbound Tűzfalszabályok**:
    *   **Inbound**: A külső hálózatból a belső alhálózat felé tartó forgalmat szűri.
    *   **Outbound**: A belső hálózatból a külső internet vagy specifikus IP-blokkok felé tartó forgalmat korlátozza.
*   **TTL (Time to Live) Reconnaissance**: A csomagok élettartam-értékének (TTL) elemzése. Mivel a különböző operációs rendszerek eltérő alapértelmezett értékkel indítanak (pl. Windows = 128, Linux = 64), és ez minden útválasztónál (*hop*) eggyel csökken, a támadók ebből következtetni tudnak a célpont operációs rendszerére és távolságára.
*   **IDS vs. IPS (Intrusion Detection / Prevention System)**:
    *   **IDS**: Csak monitorozza a hálózati forgalmat, és riasztást (*alert*) küld gyanús tevékenység esetén.
    *   **IPS**: Aktív védelmi eszköz, amely a detektálás mellett valós időben képes blokkolni vagy megszakítani a kártékony forgalmat.
*   **SIEM (Security Information and Event Management)**: Központi rendszer, amely valós időben gyűjti és elemzi a különböző forrásokból származó biztonsági naplófájlokat (*logokat*), és az események összekapcsolásával (*event correlation*) azonosítja a komplex támadásokat.
*   **Zero Trust Model (Zéró bizalom modell)**: Modern biztonsági megközelítés, amelynek alapelve: *"Never trust, always verify"* (Soha ne bízz meg senkiben, mindig ellenőrizz). Senkit és semmit nem tekint alapértelmezetten biztonságosnak (legyen az belső vagy külső hálózaton), folyamatos hitelesítést, mikroszegmentációt és a legkisebb jogosultság elvét alkalmazza.

## 6. Web Application Security (Webes alkalmazások biztonsága)

*   **OWASP Top 10**: A nyílt webalkalmazás-biztonsági projekt (OWASP) által rendszeresen kiadott dokumentum, amely a webes alkalmazásokat fenyegető 10 legkritikusabb biztonsági kockázatot gyűjti össze.
*   **SQL Injection (SQLi)**: Olyan injekciós támadás, ahol a támadó rosszindulatú SQL-kódot juttat be az alkalmazás beviteli mezőin keresztül, közvetlenül manipulálva a háttérben futó adatbázis-lekérdezéseket az adatok ellopása vagy módosítása érdekében.
*   **Parameterized Queries / Prepared Statements**: A SQL Injection elleni leghatékonyabb védelmi módszer. Lényege, hogy a futtatható SQL-kódot és a felhasználótól érkező adatokat szigorúan elkülöníti egymástól, így a bevitelek soha nem futhatnak le kódként.
*   **Cross-Site Scripting (XSS)**: Olyan sérülékenység, amely során a támadó kártékony kliensoldali szkripteket (általában JavaScriptet) juttat be egy legitim weboldalra, ami a gyanútlan látogatók böngészőjében fut le.
    *   **Stored (Tárolt) XSS**: A kártékony kód tartósan elmentődik a szerveren (pl. egy adatbázisban lévő komment mezőben), így minden látogatónak lefut, aki megnyitja az adott oldalt.
    *   **Reflected (Visszatükrözött) XSS**: A kód nem mentődik el, hanem a kéréssel együtt azonnal visszatükröződik a böngészőbe (pl. egy speciálisan módosított URL-linken keresztül).
*   **Directory Traversal / Path Traversal (Könyvtárbejárás)**: Olyan hiba, amelynél a támadó a relatív útvonaljelző karakterek (mint a `../`) használatával kilép a webgyökér könyvtárból, és jogosulatlanul hozzáfér a szerver belső fájlrendszeréhez (pl. `/etc/passwd`).
*   **Canonical Path / realpath()**: Az útvonalak abszolút, egyértelmű formája. PHP-ben a `realpath()` függvény feloldja az összes relatív hivatkozást (`.`, `..`), így segít megelőzni a könyvtárbejárásos támadásokat.
*   **Vulnerable and Outdated Components**: Az a kockázat, amikor egy alkalmazás olyan harmadik féltől származó, elavult vagy nyílt forráskódú könyvtárakat (*libraries*, frameworkök) használ, amelyek már ismert, publikus sérülékenységeket tartalmaznak.

## 7. Introduction to Cryptography (Kriptográfia alapjai)

*   **Symmetric Cryptography (Szimmetrikus titkosítás)**: Olyan titkosítási eljárás, ahol a küldő és a fogadó pontosan ugyanazt a titkos kulcsot (*shared secret*) használja az adatok titkosítására és visszafejtésére is (pl. AES). Előnye a gyorsaság és az alacsony erőforrás-igény.
*   **Asymmetric Cryptography / Public Key Cryptography (Aszimmetrikus titkosítás)**: Olyan eljárás, amely egy matematikailag összetartozó kulcspárt használ:
    *   **Public Key (Nyilvános kulcs)**: Bárki számára elérhető, adatok titkosítására vagy digitális aláírások ellenőrzésére szolgál.
    *   **Private Key (Privát kulcs)**: Szigorúan titkos, csak a tulajdonosa ismeri, adatok visszafejtésére vagy digitális aláírás létrehozására szolgál (pl. RSA).
*   **Digital Signature (Digitális aláírás)**: Olyan kriptográfiai eljárás, amely biztosítja az üzenet sértetlenségét (*integrity*), a küldő hitelességét (*authenticity*) és a letagadhatatlanságot (*non-repudiation*). Úgy készül, hogy a küldő az üzenet hash-értékét titkosítja a saját privát kulcsával.
*   **Cryptographic Hash Function (Hash függvény)**: Olyan egyirányú (*one-way*) matematikai függvény, amely tetszőleges hosszúságú bemenő adatból egy fix hosszúságú egyedi lenyomatot (*checksum / digest*) készít (pl. SHA-256). Az adatintegritás ellenőrzésére használják, mivel az adat legkisebb változása is teljesen más hash-értéket eredményez (lavina-effektus).
*   **Caesar Cipher (Caesar-titkosítás)**: Klasszikus, egyszerű helyettesítő rejtjelező módszer, ahol az ábécé betűit egy fix számmal eltolják. Mai szemmel teljesen védtelen a betűgyakorisági elemzéssel (*frequency analysis*) vagy a mindössze 25 lehetséges kulcs végigpróbálásával (*brute-force*) szemben.
*   **One-Time Pad (OTP)**: Az egyetlen matematikailag bizonyítottan feltörhetetlen titkosítási módszer (*perfect secrecy*). Feltétele, hogy a kulcs valóban teljesen véletlenszerű legyen, legalább olyan hosszú legyen, mint maga az üzenet, szigorúan titokban maradjon, és csak egyszer használják fel.

## 8. Password Security (Jelszóbiztonság)

*   **Password Hashing (Jelszó hash-elés)**: Biztonsági alapelv, amely kimondja, hogy a jelszavakat soha nem szabad plaintext formátumban tárolni az adatbázisban. Helyette a jelszó egyirányú hash-értékét kell elmenteni. Belépéskor a rendszer a megadott jelszó hash-ét hasonlítja össze a tárolttal.
*   **Salting (Sózás)**: Olyan eljárás, amely során a jelszó hash-elése előtt egy egyedi, véletlenszerű karakterláncot (sót) fűznek a felhasználó jelszavához. Ez biztosítja, hogy ha két felhasználónak ugyanaz is a jelszava, a kimeneti hash teljesen eltérő lesz, megakadályozva az előre kiszámított szivárványtáblák használatát.
*   **Rainbow Table (Szivárványtábla)**: Egy előre kiszámított (*precomputed*) adatbázis, amely több millió plaintext jelszót és a hozzájuk tartozó hash-értékeket tartalmazza láncolt formában. Segítségével a támadók a lopott, sózatlan hasheket rendkívül gyorsan képesek visszafejteni.
*   **Parallel Processing in GPU (Párhuzamos feldolgozás)**: A grafikus kártyák (GPU-k) több ezer egyszerűbb maggal rendelkeznek, így képesek másodpercenként több milliárd független hash-műveletet egyidejűleg végrehajtani. Ezért alkalmasak a GPU-k a jelszavak nyers erővel (*brute-force*) történő feltörésére sokkal gyorsabban, mint a kevesebb maggal rendelkező CPU-k.
*   **Brute-Force Attack (Nyers erő alapú támadás)**: Olyan jelszófeltörési technika, ahol a támadó matematikai úton, szisztematikusan generálja és próbálgatja az összes lehetséges karakterkombinációt (vagy egy szótár elemeit) a hash ellenében, amíg meg nem találja a megfelelőt.


## 9. Mobile & IoT Security

### Mobilbiztonság (CyberBasicsIXA.pdf)

*   **DarkSword**: Egy 6-lépcsős, felhasználói interakciót nem igénylő (*zero-click*) exploit lánc iOS-re, amely weboldalakba ágyazott kártékony JavaScript kódon keresztül hajt végre távoli kódvisszaélést (RCE), kikerüli az alkalmazás-homokozót (*sandbox escape*), és kernelszintű jogosultságkiterjesztést ér el.
*   **Secure Boot Process (Biztonságos rendszerindítás)**: Egy hardveres bizalmi gyökéren (*hardware root of trust*) alapuló kriptográfiai lánc, ahol a rendszerindítás minden szakasza ellenőrzi a következő szakasz digitális aláírását, megakadályozva a boot-időben induló kártevők futását.
*   **File-Based Encryption (FBE - Fájlalapú titkosítás)**: Olyan tároló-titkosítási eljárás, ahol minden egyes fájl külön kriptográfiai kulcsot kap, ami granuláris hozzáférés-vezérlést és jobb teljesítményt biztosít a teljes lemezes titkosítással (FDE) szemben.
*   **SparkCat (2025)**: Legitim alkalmazásokba épített kártékony fejlesztői csomag (SDK), amely a hivatalos alkalmazásboltok (Google Play, App Store) ellenőrzésein átcsúszva a kijelzőképek automatikus optikai karakterfelismerésével (OCR) lopott el titkosítatlan adatokat.

### Beágyazott és IoT eszközök (CyberBasicsIXB.pdf)

*   **Aisuru-Kimwolf Botnet**: Kártékony szoftverrel megfertőzött IoT eszközökből álló tömeges hálózat, amely rekordméretű, akár 31,4 Tbps sávszélességű, hiper-volumetrikus DDoS támadások végrehajtására képes kritikus infrastruktúrák ellen.
*   **Hardware Attack Surfaces (Hardveres támadási felületek)**: Az eszközök fizikai hozzáférési pontjai, mint például a nyomtatott áramköri lapokon található fizikai hibakereső interfészek (JTAG, debug headers), amelyek lehetőséget adnak firmware-kinyerésre.
*   **Cloud Tunneling (Felhő alapú alagút)**: Olyan távoli elérést biztosító módszer, amely kimenő kapcsolatot létesít egy proxy szolgáltató felé. Ez elrejti a publikus IP-címet, és szükségtelenné teszi a bejövő portok megnyitását (*port forwarding*) a helyi routeren.
*   **EU Cyber Resilience Act (2022-2027)**: Európai uniós jogszabályi keretrendszer, amely kötelező alapértelmezett biztonsági konfigurációkat, biztonsági frissítéseket a termék teljes életciklusára, valamint sérülékenység-közzétételi kötelezettséget ír elő a piacra kerülő digitális termékekre.

## 10. Malware and Antivirus (CyberBasicsX.pdf)

*   **Malware (Kártevő)**: Rosszindulatú szoftver, amelyet eszközök vagy hálózatok károsítására, illetve illegális kihasználására terveztek.
*   **Worm (Féreg)**: Önállóan replikálódó kártevőfajta, amely hálózati biztonsági réseket keresve terjed egyik rendszerről a másikra anélkül, hogy futtatható gazdafájlra (*host file*) lenne szüksége.
*   **Metamorphism (Metamorfizmus)**: Olyan fejlett rejtőzködési technika, amelynél a kártevő minden egyes fertőzési ciklusban teljesen átírja a saját szintaxisát és a fordító/titkosító motorját, így a kód külleme változik, de a funkcionális szemantikája azonos marad.
*   **Polymorphism (Polimorfizmus)**: Olyan technika, ahol a kártevő a külső megjelenését (titkosítását vagy csomagolását/*packing*) változtatja meg minden futáskor, de a mögöttes belső kódstruktúrát és motort nem írja át.
*   **Fileless Execution (Fájl nélküli futás)**: Olyan végrehajtási stratégia, amely során a kártevő kizárólag az illékony memóriában (RAM) fut legitim rendszerszolgáltatásokba ágyazva, így nem hagy fájlnyomot a merevlemezen, megkerülve a hagyományos szignatúra-alapú vírusirtókat.
*   **Anomaly Detection (Anomália-alapú detektálás)**: Olyan védelmi megközelítés, amely a rendszer rendes működését alapul véve (*baseline profile*) riasztást generál minden olyan tevékenységre, amely eltér a megszokott normától.

## 11. Software Security (CyberBasicsXI.pdf)

*   **CWE (Common Weakness Enumeration)**: A MITRE által fenntartott strukturált jegyzék, amely a szoftveres tervezési hibák és gyengeségek absztrakt típusait és kategóriáit azonosítja.
*   **CVE (Common Vulnerabilities and Exposures)**: Konkrét, már felfedezett és publikált biztonsági sérülékenységek szabványosított listája konkrét szoftvertermékekben.
*   **SAST (Static Application Security Testing)**: Statikus, fehér-dobozos (*white-box*) tesztelési eljárás, amely a szoftver forráskódját vagy binárisát elemzi sérülékenységek után kutatva anélkül, hogy a programot lefuttatná.
*   **DAST (Dynamic Application Security Testing)**: Dinamikus, fekete-dobozos (*black-box*) tesztelési eljárás, amely valós idejű támadások szimulálásával teszteli a már aktívan futó alkalmazást.
*   **Fuzzing (Fuzz tesztelés)**: Olyan dinamikus tesztelési technika, amely hibás, véletlenszerű vagy formázatlan adatokat küld a futó alkalmazásnak, miközben monitorozza annak összeomlásait vagy memóriaszivárgásait.
*   **Threat Modeling (Fenyegetésmodellezés)**: Az SDLC korai szakaszában végzett folyamat, ahol strukturált keretrendszerek (pl. STRIDE, PASTA) segítségével szisztematikusan azonosítják a lehetséges támadókat és az attack vektorokat.
*   **Heartbleed (CVE-2014-0160)**: Kritikus OpenSSL sérülékenység, amely a TLS heartbeat kiterjesztés hiányos input-ellenőrzését (*bounds checking*) kihasználva tette lehetővé a szerver volatilis memóriájának távoli leolvasását.

## 12. Artificial Intelligence (CyberBasicsXII.pdf)

*   **Tokenization (Tokenizálás)**: Az LLM szövegfeldolgozásának első lépése, ahol a bemeneti szöveget kisebb egységekre, úgynevezett tokenekre (szavakra, szórészletekre) bontják a numerikus reprezentáció (*embedding*) előtt.
*   **System Prompt vs. User Prompt**:
    *   **System Prompt**: Az LLM háttérben futó viselkedési és biztonsági irányelvei, amelyek láthatatlanok a végfelhasználó számára.
    *   **User Prompt**: A felhasználó által közvetlenül beírt kérdés vagy utasítás.
*   **Prompt Injection (Prompt injekció)**: Olyan alkalmazásoldali támadás, amelynél a támadó kártékony utasításokat juttat a felhasználói promptba, szándékosan rábírva az AI-t a beépített korlátozások (*system prompt*) figyelmen kívül hagyására vagy védett adatok kiszivárogtatására.
*   **Offensive Application of AI (Offenzív AI)**: Nyelvi modellek használata támadási célokra, például automatizált, kontextus-érzékeny és személyre szabott adathalász levelek generálására vagy antivírusokat kijátszó kártékony kódok írására.
*   **Defensive Application of AI (Defenzív AI)**: Gépi tanulás alkalmazása a védelemben, mint például a SIEM rendszerek naplóelemzésének (*log analysis*) támogatása, a sebezhetőségek automatikus triázsolása és automatizált incidensreagálási forgatókönyvek (*playbooks*) írásása.
*   **Model Hallucination (Modell-hallucináció)**: Az LLM modellek azon kockázati tulajdonsága, hogy hamis információkat, illetve sebezhető, biztonságilag hibás kódmintákat generálnak teljesen magabiztos formában.
 