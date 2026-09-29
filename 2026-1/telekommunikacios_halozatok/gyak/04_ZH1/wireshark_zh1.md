## Wireshark ZH

1. Hány **.js** kiterjesztésű fájl töltödött le a **ggombos.web.elte.hu** webcímről **HTTP2**-vel?

   **Szűrő:** `http2.headers.method=="GET" and http2.headers.authority=="ggombos.web.elte.hu" and http2.headers.path contains ".js"`

   **Helyes válasz:** **[itt nincs eredményem]**

2. Hány **HTTP2** kérés ment **GET** metódussal a **facebook.com** webcímre? 

   **Szűrő:** `http2.headers.method=="GET" and http2.headers.authority=="facebook.com"`

   **Helyes válasz:** `4`

3. Mi a TCP source portja a legelső **HTTP2 GET** kérésnek amely a **ggombos.web.elte.hu** webcímre ment?

   **Szűrő:** `http2.headers.method=="GET" and http2.headers.authority=="ggombos.web.elte.hu"`

   **Helyes válasz:** `64446`

4. Hány csomag érkezett **204**-es **HTTP2** válasz kóddal / státusszal?

   **Szűrő:** `http2.headers.status==204`

   **Helyes válasz:** `29`

5. Hány olyan csomag volt, amely a **157.181.165.51** címre szeretett volna kapcsolódni, de a kapcsolódás vissza lett utasítva, azaz a TCP headerben a **RESET** flag be volt állítva?

   **Szűrő:** `tcp.flags.reset==true and ip.dst_host==157.181.165.51`

   **Helyes válasz:** `6`

6. A DNS lekérdezés milyen IP címet adott vissza a **lakis.web.elte.hu** weboldalnak?

   **Szűrő:** `dns.flags.response==1 and dns.qry.name==lakis.web.elte.hu`

   **Helyes válasz:** `157.181.1.225`

7. Hány **ARP** kérés ment a **157.181.165.65** IP-cím miatt?

   **Szűrő:** `arp.dst.proto_ipv4==157.181.165.65`

   **Helyes válasz:** `6`

8. Hány olyan **icmp** protokolú csomag volt, amely a következő IP-címről lett elküldve: **13.53.44.67**?

   **Szűrő:** `icmp and ip.src==13.53.44.67` vagy `ip.src==13.53.44.67 and ip.proto=="icmp"`

   **Helyes válasz:** `2`
