[int] $cso = @($input).Count
$input.Reset()


if ($cso -eq 0){}
elseif ($cso -eq 1)
{
    foreach ($i in $input)
    {
        Write-Host A legnagyobb elem $i
    }
}
else
{
    $max = -99999999999999999999999999
    foreach ($i in $input)
    {
        if([int]$i -gt $max)
        {
            $max = [int]$i
        }
    }
    Write-Host A legnagyobb elem $max
}
