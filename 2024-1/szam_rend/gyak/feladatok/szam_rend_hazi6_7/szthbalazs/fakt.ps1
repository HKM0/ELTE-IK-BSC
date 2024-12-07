if ($args.Count -ne 1) #ezt lehet, hogy nem igy keri a feladat, de a laboros gepen ott kell legyen a szep megoldas
{
    Write-Host "Pontosan egy parameter kell! A parancs helyes hasznalata: Fakt.ps1 <szam>"
}
else
{
    $fakt = 1
    $szam = $args[0]
    for($i = 1 ; $i -le $szam; $i++)
    {
        $fakt*=$i
    }
    Write-Host "A(z) $szam faktorialisa: $fakt"
}