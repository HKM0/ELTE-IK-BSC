$count=(Get-Content $args[0]).Count
$a=Read-Host -Prompt "Kerem a kisebb sorszamot: "
$b=Read-Host -Prompt "Kerem a nagyobb sorszamot: "
if ($b -lt $a)
{
    $tmp = $a
    $a = $b
    $b = $tmp
}
Write-Host "A parameterkent kapott fajl sorainak ${a}-${b}. karaktere:"
for($i=0; $i -lt $count; $i++)
{
    $szo= (Get-Content $args[0])[$i].Substring($a-1, $b-$a+1)
    Write-Host $szo
}