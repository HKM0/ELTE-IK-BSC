# Kiberbiztonság Alapjai - Összefoglaló

## 1. Basic Concepts of Cybersecurity

*   **Cybersecurity**: The protection of information assets (devices, applications, networks, data, users) from harm resulting from unauthorized disclosure, corruption of data, or service disruption.
*   **The CIA Triad**: The classic core security goals:
    *   **Confidentiality**: Preventing unauthorized disclosure of information.
    *   **Integrity**: Preventing unauthorized modification or destruction of information, ensuring correctness and trustworthiness.
    *   **Availability**: Ensuring systems and data are accessible and usable upon demand by authorized entities.
*   **AAA Framework**:
    *   **Authentication**: Verifying a user's identity ("Who are you?").
    *   **Authorization**: Determining what resources a user can access and what operations they can perform.
    *   **Accounting**: Keeping track of what users do, including resources accessed and changes made.
*   **Non-Repudiation**: Ensuring that a party in a transaction or communication cannot deny the authenticity of their signature or the sending of a message.
*   **The Cybersecurity Cube (McCumber Cube)**: A three-dimensional framework addressing Security Principles (CIA Triad), Information States (Transmission, Storage, Processing), and Countermeasures (Technology, Policies/Practice, People).
*   **Information States**:
    *   **Data at Rest**: Stored data not actively in use (e.g., local hard drives, NAS).
    *   **Data in Transit**: Data actively moving across a network or between devices.
    *   **Data in Process**: Data actively being created, updated, or computed by applications.
*   **Threat Actor**: An active entity (adversary or force of nature) that triggers or executes a threat scenario.
*   **Threat Scenario**: A realistic sequence of actions controlled by a threat actor that can exploit vulnerabilities and cause an incident.
*   **Vulnerability**: A technical, process, or human weakness that allows a step in a threat scenario to succeed.
*   **Security Incident**: A breach of security goals (CIA) that results in negative impact.
*   **Hacker Classifications**:
    *   **Black Hat**: Malicious criminal.
    *   **White Hat**: Ethical professional.
    *   **Gray Hat**: Violates laws but not necessarily malicious.

## 2. Information Gathering

*   **Passive Information Gathering (Passive Reconnaissance)**: Collecting information about a target without directly interacting with it, relying on publicly available sources (low risk of detection).
*   **Active Information Gathering (Active Reconnaissance)**: Collecting information by directly interacting with the target system or network (higher risk of detection).
*   **OSINT (Open-Source Intelligence)**: The process of collecting, analyzing, and leveraging publicly available information from open sources.
*   **Google Dorking**: A technique using advanced search operators in Google (e.g., `site:`, `filetype:`, `intitle:`) to uncover sensitive information not intended for public access.
*   **EXIF Data**: Metadata embedded within digital media files providing details about the file, including technical device specs and GPS coordinates.
*   **DNS Zone Transfer Vulnerability**: A misconfiguration where a DNS server allows unauthorized users to request the entire zone file, exposing subdomains and network structure.
*   **Service Enumeration (Network Scanning)**: An active method to find open ports, determine available services, and gather software versions or operating system clues.
*   **CVE (Common Vulnerabilities and Exposures)**: A publicly available, standardized dictionary of known information security threats and vulnerabilities in specific software products.
*   **CVSS (Common Vulnerability Scoring System)**: A standardized scoring system (0.0 to 10.0) used to rate the severity of vulnerabilities.

## 3. Social Engineering

*   **Social Engineering**: Manipulating individuals into performing actions or divulging sensitive information by exploiting human psychology rather than technical flaws.
*   **Phishing**: Deceptive communication (primarily mass emails) mimicking legitimate entities to steal credentials, personal data, or deploy malware.
*   **Whaling**: A highly targeted form of phishing specifically aimed at high-profile individuals, executives, or senior managers within an organization.
*   **Pretexting**: Creating a fabricated scenario (pretext) based on background research to build trust and credibility, manipulating targets into disclosing secrets.
*   **Baiting**: An attack that lures victims into compromising security by promising a reward or exploiting curiosity, using physical media (e.g., infected USB drives left in public) or digital downloads.
*   **Tailgating**: A physical security breach where an unauthorized person follows closely behind an authorized person into a restricted area without their knowledge.
*   **Piggybacking**: A physical security breach where an authorized person knowingly allows an unauthorized individual to enter a secure area without proper authentication (e.g., holding the door out of politeness).
*   **ClickFix Attack**: A technique where a website displays a fake technical error pop-up and guides the user into executing system shortcuts that copy and run a malicious command via their clipboard.
*   **Psychological Triggers**: Core human emotions leveraged by attackers, such as **Curiosity**, **Sense of Urgency**, **Fear/Anxiety**, and **Trust/Authority**.

## 4. Physical Security

*   **Physical Security (Physsec)**: In an IT context, the practice of getting or preventing physical access to a target's IT infrastructure.
*   **Physical Penetration Testing**: Methodically testing physical barriers with express written permission, which must be kept on person during the operation to distinguish it from trespassing or burglary.
*   **Laser Microphones**: A surveillance tool that bounces a laser beam off a window pane to measure tiny vibrations caused by speech inside the room.
*   **Hotplug Attack**: An attack where a specialized USB device (e.g., Rubber Ducky) is plugged into an unattended machine to inject automated keystroke commands at high speed.
*   **Network Implants**: Malicious hardware covertly connected directly to an internal network to grant an attacker remote access, bypassing external firewalls.
*   **Under-Door Tool**: A long wire or hook tool inserted underneath a door to pull the internal door handle, bypassing the lock completely from the outside.
*   **Latch Tool (Latch Hook)**: A tool used to pull a door latch open directly through gaps caused by bad door fitment or poor alignment.
*   **REX (Request to Exit) Sensor**: A motion sensor (usually passive infrared) installed on the secure side of a door that automatically unlocks it when someone approaches to leave.
*   **Hybrid REX Sensor**: A security control combining PIR and microwave sensors to prevent attackers from tripping the exit mechanism from the outside using vapor clouds or heat tricks.


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
 