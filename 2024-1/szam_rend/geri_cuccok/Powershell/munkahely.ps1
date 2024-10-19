$tomb = get-content $args[0]
$van = 0
$osszesOr=0
$maxCselekedet=0
$nincscselekedet=@()
$maxNevek=@()
$maxCimek=@()
foreach($j in $tomb)
{
    $cegnev=$j.Split(',')[0]
    $cim=$j.Split(',')[1]
    $cselekedet=$j.Split(',')[2]
    $or=$j.Split(',')[3]
    if($cselekedet -eq 0)
    {
        $van=1
        $nincscselekedet+=$cegnev
    }
    if($cselekedet -gt $maxCselekedet)
    {
        $maxCselekedet=$cselekedet
        $maxNevek=@()
        $maxCimek=@()
    }
    if($cselekedet -eq $maxCselekedet)
    {
        $maxNevek+=$cegnev
        $maxCimek+=$cim
    }
    $osszesOr=$osszesOr+$or
}

if($van -eq 0)
{
    Write-Host -NoNewline "Munkahely(ek), ahol nem jelentettek erőszakos cselekedetetet: "
    Write-Host -ForegroundColor Green "NINCS"
}
else
{
    Write-Host -NoNewline "Munkahely(ek), ahol nem jelentettek erőszakos cselekedetetet: "
    Write-Host -ForegroundColor Green -Separator ', ' $nincscselekedet
}
Write-Host
Write-Host -NoNewline "Az összes őr az adatfájlban: "
Write-Host -ForegroundColor Green $osszesOr
Write-Host
Write-Host "A legtöbb erőszakot jelentő munkahely(ek) neve(i) és címe(i):"
for($l=0;$l -lt $maxNevek.Length;$l++)
{
    Write-Host -Separator ', ' -ForegroundColor Green $maxNevek[$l] $maxCimek[$l]
}