﻿Write-Host A paraméterként kapott fájl sorainka 2-4 karakterei:
foreach ($i in Get-Content $args[0])
{
    Write-host $i.Substring(1,3)
}