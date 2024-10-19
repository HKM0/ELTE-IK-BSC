$valtozo=0
while($valtozo -ne 3)
{
    Clear-Host
    Write-Host "Kérem válasszon!"
    Write-Host "1. Első menüpont"
    Write-Host "2. Második menüpont"
    Write-Host "3. Kilépés"
    $valtozo=Read-Host

    switch($valtozo)
    {
        1{
        Write-Host "Ön az első menüpontot választotta"
        Start-Sleep 2
        }
        2{
        Write-Host "Ön az második menüpontot választotta"
        Start-Sleep 2
        }
        3{
        Write-Host "Viszlát!"
        Start-Sleep 2
        }
        default{
        Write-Host "Hibás választás!"
        Start-Sleep 2
        }
    }
}