$lista=Get-Content $args[0]
$vegso=@()
write-host $lista
for($i=($hossz)-1;$i -le 0; $i--)
{
$aktualis=$lista[$i]
write-host $aktualis
$seged=""
for($j=($aktualis.Length)-1;$j -le 0; $j--)
{
    $seged+=$aktualis[$j]
    Write-Host $seged
    if($j -eq 0)
    {
        $vegso+=$seged
    }
}
}
write-host $vegso


