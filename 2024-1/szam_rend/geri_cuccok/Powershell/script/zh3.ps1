$elsoe=$true
$db=@($input).Count
$input.Reset()
if($db -eq 0)
{
    Write-Host
}
else
{
    foreach($i in $input)
    {
        [int]$i=$i # Hogy működjön a negatív számokra is
        if($elsoe)
        {
            $max=$i
            $elsoe=$false
        }
        else
        {
            if($i -gt $max)
            {
                $max=$i
            }
        }
    }
    Write-host $max
}