$szum=0

for($i=0; $i -lt $args.Length; $i++)
{
    $szum+=$args[$i]
}
Write-Host "A paraméterek összege:" $szum

