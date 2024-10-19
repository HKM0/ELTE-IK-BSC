$fakt=1
if($args.Length -ne 1)
{
    Write-Host "Pontosan egy paraméter kell! A parancs helyes használata:" $MyInvocation.MyCommand.Name "<szám>"
}
else
{
    for($i=1;$i -le $args[0];$i++)
    {
        $fakt=$fakt*$i
    }
    Write-Host "A(z)" $args[0] "faktoriálisa: $fakt"
}
