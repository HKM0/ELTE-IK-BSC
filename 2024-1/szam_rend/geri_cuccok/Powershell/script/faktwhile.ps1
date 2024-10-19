$fakt=1
if($args.Length -ne 1)
{
    Write-Host "Pontosan egy paraméter kell! A parancs helyes használata:" $MyInvocation.MyCommand.Name "<szám>"
}
else
{
    $i=1
    while($i -le $args[0])
    {
        $fakt=$fakt*$i
        $i++
    }
    Write-Host "A(z)" $args[0] "faktoriálisa: $fakt"
}
