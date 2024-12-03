$faktor = 1 
$szam = $args[0] 

if ($args.Count -ne 1) { 
    Write-Host "Nem pontosan 1 paramétert kaptam!"
    Write-Host "Helyes használat: .\faktor *szám*"
} 
else {
    if ($szam -eq 0) {
        Write-Host "0"
    } 
    else {
        while ($szam -ne 1) {
            $faktor = $faktor * $szam
            $szam = $szam - 1
        }
        Write-Host "$faktor"
    }
}