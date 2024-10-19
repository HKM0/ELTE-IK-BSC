$elsoe=$true
if($args.Count -ne 1)
{
    Write-Host "Nem egy paramétert adtál meg"
}
else
{
    foreach($i in Get-Content $args[0])
    {
        $szo1=$i.Split(' ')[0]
        $szo2=$i.Split(' ')[1]
        $seged=$szo1
        $szo1=$szo2
        $szo2=$seged
        if($elsoe)
        {
            Set-Content $args[0] -Value "$szo1 $szo2"
            $elsoe=$false
        }
        else
        {
            Add-Content $args[0] -Value "$szo1 $szo2"
        }
        
    }
}