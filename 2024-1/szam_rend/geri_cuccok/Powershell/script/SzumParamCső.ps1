$szum=0

if(@($input).Count -ne 0)
{
    $input.reset()
    foreach($i in $input)
    {
        $szum+=$i
    }
    Write-Host $szum
}
else
{
    foreach($i in $args)
    {
        $szum+=$i
    }
    Write-Host $szum
}

