$count=(Get-Content $args[0]).Count
Write-Host "A parameterkent kapott fajl sorainak 2-4. karaktere:"
for($i=0; $i -lt $count; $i++)
{
    $szo= (Get-Content $args[0])[$i].Substring(1, 3)
    Write-Host $szo
}