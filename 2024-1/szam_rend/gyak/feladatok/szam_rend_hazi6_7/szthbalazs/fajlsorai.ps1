$count=(Get-Content $args[0]).Count
Write-Host "A parameterkent kapott fajl sorainak masodik szavai:"
for($i=0; $i -lt $count; $i++)
{
    $szo= (Get-Content $args[0])[$i].Split(' ')[1]
    Write-Host $szo
}