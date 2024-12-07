[double]$szam = Read-Host -Prompt "Irj be egy termeszetes szamot: "
if ($szam -lt 0)
{
    Write-Host "Nem termeszetes szamot irtal be!"
}
elseif ($szam % 1 -ne 0)
{
    Write-Host "Nem termeszetes szamot irtal be!"
}
else 
{
    [int] $szam = $szam
    if ($szam -eq 1)
    {
        Write-Host "A szam sem nem prim, sem nem osszetett."
    }
    else
    {
        $ell=$true
        $d = 2
        while ($d * $d -le $szam)
        {
            if($szam % $d -eq 0)
            {
                $ell=$false
            }
            $d++
        }
        if($ell)
        {
            Write-Host "A szam prim."
        }
        else
        {
            Write-Host "A szam nem prim."
        }
    }
}