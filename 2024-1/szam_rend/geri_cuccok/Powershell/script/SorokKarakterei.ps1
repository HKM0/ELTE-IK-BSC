﻿$elso=Read-Host -Prompt: "Kérem a kisebb sorszámot"
$masodik=Read-Host -Prompt: "Kérem a nagyobb sorszámot" 

if($elso -gt $masodik)
{
    Write-Host "Hibás sorszámmegadás!"
}
else
{
    Write-Host "A paraméterként kapott fájl sorainak $elso-$masodik. karaktere:"
    foreach($i in Get-Content $args[0])
    {
        $string=""
        for($l=$elso-1;$l -lt $masodik;$l++)
        {
            $string+=$i[$l]
        }
        Write-Host $string
    }
}