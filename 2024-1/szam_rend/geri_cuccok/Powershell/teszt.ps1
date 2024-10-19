$nap=0
Write-Host $nap
while(($nap -ne 1) -o ($nap -ne 2) -or ($nap -ne 3) -or ($nap -ne 4) -or ($nap -ne 5))
{
    $nap=Read-Host
}
Write-host $nap