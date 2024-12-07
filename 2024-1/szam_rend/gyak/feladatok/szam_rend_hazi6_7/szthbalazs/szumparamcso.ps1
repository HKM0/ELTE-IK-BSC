$count=@($input).Count
if ($count -eq 0)
{
    $s = 0
    $count = $args.Count
    for ($i = 0; $i -lt $count; $i++)
    {
        $s+=$args[$i]
    }
    Write-Host "$s"
}
else
{
    $input.Reset()
    $s = 0
    foreach($i in $input)
    {
        $s += $i
    }
    Write-Host $s
}