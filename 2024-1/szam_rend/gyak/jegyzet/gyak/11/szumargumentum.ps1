$szumma0=0
$szumma=0
foreach ($i in $args)
{
    $szumma=$szumma+$i
}
Write-Host $szumma

for ($i = 0; $i -lt $args.Count; $i++ )
{
    $szumma0=$szumma0+$args[$i]
}
Write-Host $szumma0