$tstpath1=Test-Path ./PáratlanSorok.txt
$tstpath2=Test-Path ./PárosSorok.txt
$tstpathforras=(Write-Output (-join (".\",$args[0])) | Test-Path)
$hanyadik=1
if(!$tstpathforras)
{
    Write-Host "A forrásfájl nem létezik! Adjon meg helyes forrásfájlt!"
}
else
{
    if($tstpath1)
    {
        Remove-Item ./PáratlanSorok.txt
        New-Item -Name PáratlanSorok.txt | Out-Null #-> nem írta a feladat hogy kell de ez kikuzzá az outputot és így szebb
    }
    else
    {
        New-Item -Name PáratlanSorok.txt | Out-Null
    }

    if($tstpath2)
    {
        Remove-Item ./PárosSorok.txt
        New-Item -Name PárosSorok.txt | Out-Null
    }
    else
    {
        New-Item -Name PárosSorok.txt | Out-Null
    }
    foreach ($i in Get-Content $args[0])
    {
        if($hanyadik -eq 1)
        {
            Add-Content .\PáratlanSorok.txt -Value $i
            $hanyadik=0
        }
        else
        {
            Add-Content .\PárosSorok.txt -Value $i
            $hanyadik=1
        }
    }
}

