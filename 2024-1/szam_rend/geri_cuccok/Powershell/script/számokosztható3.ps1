if($args.Count -eq 0)
{
    Write-Host "Nem adtál meg paramétert!"
}
else
{
    if([int]$args[0] -le 1)
    {
        Write-Host "1-nél nagyobb számokat adj meg!"
    }
    else
    {
        Write-Host "3-al osztható számok 1-től"$args[0]"-ig:"
        for($i=1;$i -le $args[0];$i++)
        {
            if($i % 3 -eq 0)
            {
                Write-Host $i
            }
        }
    }
}