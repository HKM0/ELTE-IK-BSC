# A legjobb &lt;internetes/webes&gt; témájú filmek - Kezdőlap

**Főmenü: Kezdőlap,** Új film beküldése

## Bevezető

_Krasznahorkai László_ a következőt írta: 
>Az internet (...) az eddigi legbiztosabb út az örökkévalóságba.  

Hogy ez igaz-e, mindenki döntse el maga, miután megnézte a listámban szereplő filmeket.

**Figyelem!** A lista nem átfogó, erősen _szubjektív._

## Ugrás a filmekhez

1. Social Network - A közösségi háló
2. A nő
3. Te meg én és minden ismerősünk
4. Deep Web

## Social Network - A közösségi háló


| **A film adatai** |     |
| --- | --- |
| **Bemutató** | 2010\. október 1. |
| **Angol cím** | _The Social Network_ |
| **IMDb értékelés** | &nbsp;7.7/10 |

_Mark Zuckerberg_ jobban ért a számítógépekhez, mint a csajozáshoz. A Harvard egyetem diákja ideje nagy részét a gépe előtt tölti. 2003-ban új ötlettel áll elő: egy olyan **oldalt indít** a világhálón, ahol a haverok **közösségi életet** élhetnek. A kollégiumi szobából indult Facebook valóságos **kommunikációs forradalmat** hozott, és alapjaiban változtatta meg a világot, az emberi kapcsolatokat - és megváltoztatta az alkotóját is. Hat esztendővel és ötszázmillió ismerőssel később Zuckerberg a világ legfiatalabb milliárdosa. Egykor békés, nyugodt életről álmodott, a siker azonban felkavarta mind a szakmai, mind a magánéletét.

_A Social Network - A közösségi háló a korszellemet grabancon ragadó, aktuális, de időtálló munka, ami nem csak, hogy sokkal jobb móka, mint két óra facebookozás, de biztos, hogy évek-évtizedek távlatából is élvezhető lesz._

![Jelenet a Social Network - A közösségi háló című filmből](../media/TheSocialNetwork.jpg)

Jelenet a _Social Network - A közösségi háló_ című filmből

### Forráskód a filmben

A filmben nagy figyelmet fordítottak arra is, hogy a megjelenő forráskódok a témához kapcsolódjanak. Íme egy példa:
```py
    #!/usr/bin/perl
    $wget = "wget -q0- http://leverett.harvard.edu/facebook/compactshow.php 
         --post-data='action=Search'";
    print "$wget\n";
    $page = ` $wget`;
    while ($page =~ m/compactshow\.php\?student_id=([0-9]+)/g) {
	    $id=$1
	    $wget = "wget -q0- http://leverett.harvard.edu/facebook/compactshow.php?student_id=$id";
	    print "$wget\n";
    }
```

A filmben szereplő forráskód részlete

### Filmzene

A filmzenéből _Trent Reznor and Atticus Ross: A Familiar Taste_ című száma a kedvencem.

{hang beágyazása - socialnetwork.mp3}

## A nő


| **A film adatai** |     |
| --- | --- |
| **Bemutató** | 2014\. január 10. |
| **Angol cím** | _Her_ |
| **IMDb értékelés** | &nbsp;8/10 |

Los Angelesben, a közeli jövőben él Theodore Twombly író, aki abból él, hogy **megható, személyes leveleket ír** mások számára. A férfi rossz passzban van, próbálja kiheverni, hogy tönkrement egy hosszú kapcsolata. A számítógépein dolgozik és játszik. Egy nap unalmában letölt egy új, **intelligens operációs programot**. Így találkozik Samantha-val, pontosabban a hangjával, amely valósággal megigézi. Kiderül, hogy Samantha okos és éleslátó, érzékeny és meglepően vicces. A kezdeti barátságuk egyre jobban elmélyül.

_Spike Jonze A nővel gyakorlatilag megalkotta a tökéletes szerelmesfilmet, amelyből egyszerre derül ki, hogy ez az egész felhajtás mekkora baromság, és hogy nem érdemes élni nélküle._

### A film előzetese

{videó beágyazása - her_elozetes.mp4}

## Te meg én és minden ismerősünk


| **A film adatai** |     |
| --- | --- |
| **Bemutató** | 2005\. augusztus 5. |
| **Angol cím** | _Me And You And Everyone We Know_ |
| **IMDb értékelés** | &nbsp;7,4/10 |

Miranda July, multimédia-performer és zenész éleslátó és rendkívül szórakoztató filmet készített olyan **magányos emberekről**, akik megpróbálnak **kapcsolatot teremteni** környezetükkel. Azokat a külső és belső gátakat mutatja meg, amik magányos, modern világunkban gyakran meghiúsítják az egymással való kapcsolatteremtést. July szerint a történet elérhetetlen vágyakat tápláló gyerekekről és felnőttekről szól, akik olyan korban élnek, mikor a felnőtté válás digitális folyamat és a valóság esztétikai döntésünk függvénye.

_A Miranda July korábbi műveiben felvetett témák folytatásának tekinthető Te meg én és minden ismerősünk leleplezi az emberek titkolt érzéseit, vágyait és motivációit. Az eredmény egy gyönyörű, egyedi film, amely észrevétlenül ejti rabul az ember szívét._

![Jelenet a Te meg én és minden ismerősünk című filmből](../media/meandyou.jpg)

Jelenet a _"Te meg én és minden ismerősünk"_ című filmből

## Deep web


| **A film adatai** |     |
| --- | --- |
| **Bemutató** | 2015\. november 21. |
| **Angol cím** | _Deep web_ |
| **IMDb értékelés** | &nbsp;7,1/10 |

Az internet nem csak hírportálokból, közösségi oldalakból és cuki állatos videókból áll. A keresőmotoroktól elzárva ott húzódik a felszín alatt az úgynevezett _deep web_, vagy más néven dark web, a **világháló sötét oldala**. Anonimitásba burkolózott felhasználók szörföznek az internet sötét hullámain, ahol burjánzik a drog- és fegyverkereskedelem, és mindenre van kereslet, ami **illegális**.

_Alex Winter dokumentumfilmje mélyen elmerül a deep web titkaiban. Kiderül, hogy az igazságszolgáltatásnak nem csupán az utcán kell üldöznie a bűnözőket, hanem a virtális világban nyüzsgő arctalan törvényszegőkkel is kénytelen megküzdeni. Mi, átlagfelhasználók nem is sejtjük, micsoda üzelmek folynak az internet rejtett bugyraiban. Egészen addig, amíg meg nem nézzük a Deep Web dokumentumfilmet._

![A Deep web című film plakátja](../media/Deep_Web_Poster.jpg)

A _Deep Web_ című film plakátja

### Mi is az a deep web?

Az alábbi angol nyelvű prezentáció bemutatja, hogy mi is az a deep web.

{slideshare prezentáció beágyazása - <https://www.slideshare.net/asertseminar/the-deep-web-32353889>}

## Források

- [Techtimes.com](http://www.techtimes.com/articles/10259/20140711/the-best-movies-about-the-internet.htm)
- [Librarius](http://librarius.hu/2015/07/14/a-deep-web-megmutatja-a-virtualis-pokol-legmelyet/)

Készítette: Gipsz Jakab  
([gipszjakab@mailinator.com](mailto:gipszjakab@mailinator.com))  
1117 Budapest, Nevenincs u. 17

# A legjobb &lt;internetes/webes&gt; témájú filmek – Új film beküldése

Főmenü: Kezdőlap, **Új film beküldése**

## Saját kedvenc beküldése

Neked is van kedvenc filmed ebben a témában? Ha igen, kérlek töltsd ki az alábbi űrlapot.

**A film adatai**

_Cím (magyarul)_

_{egysoros, szöveges beviteli mező}_

_Cím (angolul)_

{egysoros, szöveges beviteli mező}

IMDb webcím:

{egysoros, url típusú beviteli mező}

A film cselekménye röviden

{szövegterület}

**Értékelés**

A Te értékelésed 5-ös skálán

{rádiógombok 1-től 5-ig}

**Az adataid**

Név

{egysoros, szöveges beviteli mező}

E-mail cím

{egysoros, email típusú beviteli mező}

{jelölőnégyzet}  Fel szeretnék jelentkezni a filmes hírlevélre

**Adatok elküldése**

{Elküldés gomb}

{Töröl gomb}

Emlékeztetőül, eddig ezek a filmek vannak a listámban:

1. Social Network - A közösségi háló
2. A nő
3. Te meg én és minden ismerősünk
4. Deep Web

Készítette: Gipsz Jakab ([gipszjakab@mailinator.com](mailto:gipszjakab@mailinator.com))  
1117 Budapest, Nevenincs u. 17