$bojler = 0
while ($bojler -ne 3) {
    Write-Host "1. menü opció"
    Write-Host "2. menü opció"
    Write-Host "3. kilépés"
    $bojler = Read-Host -prompt "Meddig olvassuk: "
    if ($bojler -eq 3) {
    }
    elseif ($bojler -eq 2 -or $bojler -eq 1) {
        Write-Host "$bojler opciót választotta!"
        Start-Sleep -Seconds 2
        Clear-Host
    } else {
        Write-Host "Rossz opciót adott meg! ($bojler)"
        Start-Sleep -Seconds 2
        Clear-Host
    }
}