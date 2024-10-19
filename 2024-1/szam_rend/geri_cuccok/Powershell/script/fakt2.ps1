param
(
    [Parameter(Mandatory=$true)][int]$n
)

$fakt=1

for($i=1;$i -le $n;$i++)
{
    $fakt=$fakt*$i
}
Write-Host "A(z) $n faktoriálisa: $fakt"

