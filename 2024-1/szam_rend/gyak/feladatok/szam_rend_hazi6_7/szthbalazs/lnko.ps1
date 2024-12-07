$szam1 = read-host -Prompt "Kerem az elso szamot: "
$szam2 = Read-Host -Prompt "Kerem a masodik szamot: "
$seged = ($szam1 % $szam2)
while ($seged -ne 0)
{
    $szam1 = $szam2
    $szam2 = $seged
    $seged = $szam1 % $szam2
}
if ($szam2 -lt 0)
{
    $szam2*=(-1)
}
Write-Host "Legnagyobb kozos osztojuk: $szam2"