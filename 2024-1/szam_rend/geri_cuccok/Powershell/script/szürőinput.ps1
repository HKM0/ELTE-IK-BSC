$osszeg=0
if(@($input).Count -ne 0)
{
    $input.reset()
    foreach($i in $input)
    {
        $osszeg+=$i
    }
}
else
{
    foreach($i in $args)
    {
        $osszeg+=$i
    }
}
Write-Host $osszeg