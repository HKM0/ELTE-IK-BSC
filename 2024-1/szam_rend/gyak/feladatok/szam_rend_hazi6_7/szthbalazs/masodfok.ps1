Write-Host "Masodfoku egyenlet megoldo program"
[double] $a = Read-Host -Prompt 'Ird be az "a" egyutthatot: '
[double] $b = Read-Host -Prompt 'Ird be a "b" egyutthatot: '
[double] $c = Read-Host -Prompt 'Ird be a "c" egyutthatot: '
$delta = $b * $b - 4 * $a * $c
Write-Host "Az egyenlet: ${a}*x2+${b}*x+${c}=0"
if ($delta -lt 0)
{
    Write-Host "Nincs megoldas"
}
elseif ($delta -eq 0)
{
    $m1 = (-1) * $b / (2 * $a)
    Write-Host "Egy megoldas van: $m1"
}
else
{
    $m1 = ((-1) * $b + [math]::Sqrt($delta)) / (2 * $a)
    $m2 = ((-1) * $b - [math]::Sqrt($delta)) / (2 * $a)
    Write-Host "Az egyenlet megoldasai: $m1 es $m2"
}
