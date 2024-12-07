$s = 0
$count = $args.Count
for ($i = 0; $i -lt $count; $i++)
{
    $s+=$args[$i]
}
Write-Host "A parameterek osszege: $s"