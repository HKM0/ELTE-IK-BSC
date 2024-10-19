$elso = Read-Host -Prompt "első: "
$masodik = Read-Host -Prompt "második: "

if ($elso -lt $masodik)
{
    Write-Host "Jó sorrend"
}
else
{
    Write-Host "Rossz Sorrend"
}
