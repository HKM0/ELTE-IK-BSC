1. Hány '.css' kiterjesztésű fájt szerettek volna letölteni? (contains)

`http.request.uri contains ".css"`

2. Keresd meg a HTTP POST kérést és  nézd meg a tartalmát. (vagy a Mime-ban, vagy Follow HTTP Stream)

`http.request.method == "POST"`

3. Keress olyan HTTP válaszokat, amelyek sikeresek, és amelyek sikertelenek: response kód 200, >400.

`http.response.code == 200 || http.response.code >= 400`

4. Nézd meg milyen porton hívtuk meg a weboldalt!
`http.request`

5. Nézd meg milyen porton mennek a DNS kérések!
`dns.flags.response == 0`

6. Vannak-e benne DHCP kérések?
`dhcp`

7. Vannak-e benne ARP kérések? 
    - Hány kérés ment egy adott IP-re? (arp.dst.proto_ipv4) 
`arp.opcode == 1 && arp.dst.proto_ipv4 == cim`	


Nézzük meg van-e benne titkosított kézfogás! (tls.handshake.type) 1 -kliens, 2-szerver
8. Nézzük meg van-e benne titkosított kézfogás! (tls.handshake.type) 1 -kliens, 2-szerver
`tls.handshake.type == 1 || tls.handshake.type == 2`

