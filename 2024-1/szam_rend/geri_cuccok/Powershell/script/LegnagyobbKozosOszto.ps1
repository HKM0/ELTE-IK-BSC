[int32]$szam1=Read-Host -Prompt "Kérem az első számot"
[int32]$szam2=Read-Host -Prompt "Kérem a második számot"
$oszto=0
if($szam1 -lt 0)
{
    $szam1=-($szam1)
}

if($szam2 -lt 0)
{
    $szam2=-($szam2)
}

if($szam1 -lt $szam2)
{
   for($i=1;$i -le $szam2;$i++)
   {
        if(($szam1 % $i -eq 0) -and ($szam2 % $i -eq 0))
        {
            $oszto=$i
        }
   }
   Write-Host "Legnagyobb közös osztójuk: $oszto"
}
else
{
   for($i=1;$i -le $szam1;$i++)
   {
        if(($szam1 % $i -eq 0) -and ($szam2 % $i -eq 0))
        {
            $oszto=$i
        }
   }
   Write-Host "Legnagyobb közös osztójuk: $oszto"
}