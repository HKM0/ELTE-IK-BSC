param
(
    [Parameter(Mandatory=$true)][int]$szam
)
$faktor = 1 
if ($szam -eq 0) {
    Write-Host "0"
} 
else {
    while ($szam -ne 1) 
    {
        $faktor = $faktor * $szam
        $szam = $szam - 1
    }
    Write-Host "$faktor"
}