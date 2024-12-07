if (test-path .\ParosSorok.txt)
{
    Remove-Item .\ParosSorok.txt
}
if (test-path .\ParatlanSorok.txt)
{
    Remove-Item .\ParatlanSorok.txt
}
New-Item .\ParosSorok.txt
New-Item .\ParatlanSorok.txt

$count=(Get-Content $args[0]).Count
for($i=0; $i -lt $count; $i++)
{
    if ( $i % 2 -eq 0)
    {
        (Get-Content $args[0])[$i] | Out-File -Append .\ParatlanSorok.txt
    }
    else
    {
        (Get-Content $args[0])[$i] | Out-File -Append .\ParosSorok.txt
    }
}