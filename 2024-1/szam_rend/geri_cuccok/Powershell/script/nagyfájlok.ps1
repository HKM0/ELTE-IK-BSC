if($args.Length -ne 2)
{
    Write-Host "Nem kettő paramétert adtál meg"
}
else
{

    Get-ChildItem $args[0] | Where-Object -Property Length -gt $args[1]
}