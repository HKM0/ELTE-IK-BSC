[int32]$szam=Read-Host -Prompt "Írj be egy természetes számot"
$igaz=$true
if($szam -lt 0)
{
    Write-Host "Nem természetes számot írtál be!"
}
else
{
    if($szam -eq 1)
    {
        Write-Host "A szám sem nem prím, sem nem összetett."
    }
    elseif($szam -eq 0)
    {
        Write-Host "A szám nem prím."
    }
    else
    {
        for($i=2;$i -le $szam;$i++)
        {
            if(($szam % $i) -eq 0)
            {
                $igaz=$false
            }
        }
        if($igaz)
        {
            Write-Host "A szám prím."
        }
        else
        {
            Write-Host "A szám nem prím."
        }
    }
}