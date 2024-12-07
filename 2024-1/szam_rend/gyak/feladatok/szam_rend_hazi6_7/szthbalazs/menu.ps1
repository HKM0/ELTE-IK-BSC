$opc=0
Clear-Host
while ($opc -ne 3)
{
    Write-host "Kerem valasszon!"
    Write-Host "1. Elso menupont"
    Write-Host "2. Masodik menupont"
    Write-Host "3. Kilepes"
    $opc = Read-Host
    switch($opc)
    {
        1
            {
                Write-Host "On az elso menupontot valasztotta!"
                Start-Sleep 2
            }
        2
            {
                Write-Host "On az Masodik menupontot valasztotta!"
                Start-Sleep 2
            }
        3
            {
                #Write-Host "On a kilepest valasztotta!"
                #Start-Sleep 2
            }
        default
            {
                Write-Host "Hibas valasztas!"
                Start-Sleep 2
            }
    }
    Clear-Host
}