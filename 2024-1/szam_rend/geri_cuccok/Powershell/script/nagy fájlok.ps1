if($args.Length -ne 2)
{
    Write-Host "Nem kettő paramétert adtál meg"
}
else
{
    $mappa=$args[0]
    Get-ChildItem $mappa | Where-Object -Property Length -gt $args[1]
}