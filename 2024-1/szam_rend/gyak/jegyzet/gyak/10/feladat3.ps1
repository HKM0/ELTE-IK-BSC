param
(
    [Parameter(Mandatory=$True)][int]$szam1,
    [Parameter(Mandatory=$true)][int]$szam2
)
$osszeg = $args[0]+$args[1]
$szorzat = $args[0]+$args[1]
Write-Host Összeg: $osszeg
Write-Host Szorzat: $szorzat
