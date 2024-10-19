if($args.Length -eq 0)
{
    Write-host "Nem adtál meg paramétert!"
}
else
{
    $elsoe=$true
    foreach($i in $args)
    {
        if($elsoe)
        {
            $maximum=[int]$i
            $elsoe=$false
        }
        else
        {
            if([int]$i -gt $maximum)
            {
                $maximum=[int]$i
            }
        }
    }
    Write-Host "maximum: $maximum"
}