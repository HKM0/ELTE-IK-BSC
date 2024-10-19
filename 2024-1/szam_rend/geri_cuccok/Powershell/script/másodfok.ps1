Write-Host "Másodfokú egyenlet megoldó program"
$a=Read-Host -Prompt "Írd be az ""a"" együtthatót"
$b=Read-Host -Prompt "Írd be az ""b"" együtthatót"
$c=Read-Host -Prompt "Írd be az ""c"" együtthatót"

Write-Host "Az egyenlet: $a*x2+1*x+1=0"

$hanymegoldas=([Math]::Pow($b,2))-4*$a*$c

if($hanymegoldas -lt 0)
{
    Write-Host "Nincs megoldás"
}
elseif($hanymegoldas -eq 0)
{
    $x=(-($b))/(2*$a)
    Write-Host "Egy megoldás van: $x"
}
else
{
    $x1=((-($b))+[Math]::Sqrt($hanymegoldas))/(2*$a)
    $x2=((-($b))-[Math]::Sqrt($hanymegoldas))/(2*$a)
    Write-Host "Az egyenlet megoldásai: $x1 és $x2"
}

