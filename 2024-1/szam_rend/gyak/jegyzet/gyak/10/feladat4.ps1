Write-Host A paraméterként kapott fájl sorainka második szavai:
foreach ($i in Get-Content $args[0])
{
    Write-Host $i.Split(' ')[1]
}