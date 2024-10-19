$szum=0

foreach($i in $args)
{
    $szum+=$i
}
Write-Host "A paraméterek összege:" $szum