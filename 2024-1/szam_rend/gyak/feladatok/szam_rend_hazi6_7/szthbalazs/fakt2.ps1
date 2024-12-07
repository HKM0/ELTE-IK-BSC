PARAM
(
    [Parameter(Mandatory=$true)][Int32]$n
)
$fakt = 1
$szam = $n
for($i = 1 ; $i -le $szam; $i++)
{
    $fakt*=$i
}
Write-Host "A(z) $szam faktorialisa: $fakt"