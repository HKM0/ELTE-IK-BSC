$a = Read-Host -Prompt "Kérem a kisebb sorszámot"
$b = Read-Host -Prompt "Kérem a nagyobb sorszámot"
Write-Host A paraméterként kapott fájl sorainak $a-$b.karakterei:
foreach ($i in Get-Content $args[0])
{
    Write-Host $i[$a..$b]
}

