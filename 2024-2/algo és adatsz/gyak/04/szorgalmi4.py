def pascalSor(k):
    if k < 1:
        return [] # mert csak k>=1 re kell működnie
    sor = [1] 
    for i in range(1, k):
        ujSor = [1]  # sor első eleme
        for j in range(1, len(sor)):
            ujSor.append(sor[j - 1] + sor[j])  #egymás melletti elemek összege
        ujSor.append(1)  # sor utolsó eleme
        sor = ujSor
    
    return sor

k = int(input("Hanyadik Pascal háromszög sort írja ki?\nV: "))
print(pascalSor(k))

'''
1 db sor és az összeadás művelet segítségével állítsuk elő a pascal háromszög k-adik sorát (feltehető hogy k>=1)

+--------------------------------+
| input: k                          |
+--------------------------------+
| Pascal[0][0] := 1              |
| FOR i = 1 TO k DO              |
| | Pascal[i][0] := 1            |
| | FOR j = 1 TO i-1 DO          |
| | | Pascal[i][j] := Pascal[i-1][j-1] + Pascal[i-1][j] |
| | ENDFOR                       |
| | Pascal[i][i] := 1            |
| ENDFOR                         |
+--------------------------------+
| Ki: Pascal[k]                  |
+--------------------------------+

------------------------------------------------------------------------
----------------------------második feladat-----------------------------
------------------------------------------------------------------------

Egy rendezetlen egyirányú fejelemes listában (H1L) keressük meg az egyik legnagyobb kulcsú elemet egyszeri bejárással! 
Üres lista esetén a NIL pointert adja vissza az algoritmus, nem üres lista az elemet fűzze ki a listából és címét adja vissza az algoritmus!

+-------------------------------------------------+
| input: H1L                                      |
+-------------------------------------------------+
| IF H1L = NIL                                    |
| | return NIL                                    |
| ELSE                                            |
| | maxElem := H1L                                |
| | maxElozo := NIL                               |
| | elozo := NIL                                  |
| | mostani := H1L                                |
| |                                               |
| | FOR mostani ≠ NIL DO                          |
| | | IF mostani -> key > maxElem -> key          |
| | | | maxElem := mostani                        |
| | | | maxElozo := elozo                         |
| | | ENDIF                                       |
| | | elozo := mostani                            |
| | | mostani := mostani -> next                  |
| | ENDFOR                                        |
| |                                               |
| | IF maxElozo = NIL                             |
| | | H1L := maxElem -> next                      |
| | ELSE                                          |
| | | maxElozo -> next := maxElem -> next         |
| | ENDIF                                         |
| | return: maxElem                               |
+-------------------------------------------------+
'''
#https://progalap.elte.hu/stuki/?data=H4sIAAAAAAAACrVZ3VLiSBR%2BlWymam50phLkf9atIiKiw4CI4qLlRX46EAhJTAICUz7MXu4LzAv4Ytsd0icnI%2ByaiZsLaU8n5%2FvOb5%2FAd9EyxLoofZblUrF2VCvX5GKxVpRLNfFQnLhL4p%2FTfWdh24diQGyih8RIJI5rkECsfxdb50%2FutKnfsHWkEASHoqf6xAmThyaWYRBHrJuqHZBDMVx7hD4QkMcFcXRCH9Anlm3QZ84NqvtebBT6inekXtGd5WDaCxqNNl1Kd9PKiRMEdFkaLAx5PK%2FS5enRwF8ptYb48Izu5qTQ4wkpTHUPtVANyZzeTu8IySqkIk8NdNW%2Bnz3cSw%2F1Y1l8RoQ4GmKYE82KIRx%2F5c56ZAYQIEhBIH9k9XWvWSaFiX5HdzolpdVRShfMq3O335zcFemyEFw7XVdqR7qn1yvlaznyNWByaohEFuufKJ%2BIl%2BsYVmi5DjNf%2BGiHX44FZqbmGutBTP885QJKAthzEsgcRAJ5LWvALRRwcBBHQx7LiTaNIboD%2FboqL02AAEEKAsUna8C7rdokXPoG3Wmb1Y3cGBejeIJKjowwshi3K55TFk5rVzDBPGY7Zwa2J1QRA%2BSRXwjmlAZT4P9%2BkqmA%2FhEO0qIHRgcSn9NBlfBuuWXx3II%2BBu7ngtzNxCfhwncE6GAMDlosh0M9N2%2FvcrxFWBei%2BoSOwWFAkNuHtEVaB5HrII05CAhy5w0ty%2BkWZPqonCjW%2BBJAQJD%2FvLOeTnvOWflPulOx%2Bsu5PWVag83I8C6qa7rsNZ6OhpeOERUq3M2ZoMeRuYjfL4UOmHAYRC0nTJyJEmqtp81GtXl%2B0UzSnwtSaMgnWZ3s3PUfTU0Z0Z3iVaUcWOsuXQ6rs4FcOTuNPAvaOQkEl8XknUcaNfSLYEXn2owuDg6E3zX%2Fj109EUxnAwBnDQNAYgY%2BDxJv5TngblrT27k1twANBCk05L%2BsUZhupObq9qIX%2BRv0cDikOItxO4%2BcyN%2Fbg4d%2BUnfvcjXYxyqcU4MK54IUG%2BSS%2F%2FX4gczkdEDwjpGH4wc6DAxSXJC72ncdP8qg6JnXkg5wIMjfTdd0Zpj4RcbAHA2vSvr6LMo2kHNMdCMyETHJ2jfbcocZ19L8RWnsJ2MiCFJAQC67iS358fbMNrzIrpv%2B7Gv58ih5RwDBe8HJd8uhQnx2wHRL2qgb3LIhvy%2BdqdVv0w17S2u7i4m01thM2VavZ%2FYty1K9ZDiavWTdcz6QWhPJ8yPCwIQTRtSyBMIyf6p56n%2FhWOied1hk%2FAVRfNXRJ6mCR6GIlO24BdzHQskdDaHkgvSYlGjNWhaMLQUCF3Mg5HPcfJLQvhlorq5ObTKvH8fpCSGEMTuJ6XtAuRu3fhybBTnCsVDS5MQiKSDIQHjzT1Iyr1EuFToW%2BC9Uyp3hiT8FKBCkoFAhZC5vb9gnN6ZCdzaL0ejmafCVLuXSXN%2BMqpdRDYF2mHkTuCz27jo6Y4OF33gtvTo2wWLK5EwNN6HVXQATEKRLJLEp8%2BRmDUcF56JPd65OFqXeZCBvG1%2FV71ytvKSPgCCF3FwWh73uav%2FM6LiuxyyBG7k%2B9OT7WAIEGX3QA70lUYzgUHa9sQ3y%2BH36OA6%2FCDOyFqJF3AcS8f4uiUK4r0uCb9iQygMEQ2oSMWQJ0pq9ecVGMThIAg4HgveBi%2FpK1F4YGlQgR0MlmSVM%2B1sYMg1qHI4BLsgNBm0snR4O26XIet%2FTO141%2BSYNBClkdKZnTX7%2Foj380xl%2Bi5J%2F3G56d41BUmsgeC84KWxpncfaduQAPWBdojhLu3xda3HC%2FNfcgby5r6LAA5Qv%2BIrzBUHaPYnWN%2BcBPcVoDqR6Ac8BcBl8oc0FKVQUqsyFhRAF%2Bia0mwdMi5wHCHIf5vHUFeOKz%2Bytn4ZMD92xr85Z4nwXHXXOnpY%2Ff2rEby3C5OUv350Hm5cfY2EmqIY1EwLXV9noq%2FqWqtnsRxGR%2Fuu77qtvzoKJ%2BzRMbos5MmmbqAahZrKkeT7EyMqvI6N3tJ8xdnNByIXP7CVGsMnYUcdrV9OE8OWHb7%2F8HZB%2FQUST%2BhsRH1gV2a4f%2FXayDc29%2BME0JXpRLR%2FYp8lqjcp0kGlSCVZmtKpIR5IarXSimtWK%2BLCNtKLqs7HvLtgLbaRYK2gFdhv75IqJzmWkoqt8ZUYro6hLpMDUsV%2B8XqnT6RWh0ourMwtcRkxD36cOZdsrreyKbX6TftOs1ba7klTVayW2IoQUjTL2yPPzP5XAXuvzGwAA

'''
Lengyelforma Kiértékelés
+--------------------------------+
| v.stack(n)                     |
| FOR read(x) DO                 |
| | IF operátor (x)              |
| | | jobb := v.pop()            |
| | | bal := v.pop()             |
| | | v.push(bal X jobb)         |
| | Else                         |
| | | v.push(x)                  |
| | ENDIF                        |
| ENDFOR                         |
| write(v.pop())                 |
+--------------------------------+
'''