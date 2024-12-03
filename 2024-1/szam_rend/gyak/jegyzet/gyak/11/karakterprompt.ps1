$honnan = Read-Host -prompt "Mettől olvassuk: "
$meddig = Read-Host -prompt "Meddig olvassuk: "

if ($honnan -lt $meddig) {
    foreach ($i in Get-Content $args[0]) {
        Write-Host $i.Substring($honnan - 1, $meddig - $honnan + 1)
    }
} else {
    Write-Host "Hiba"
    $tmp = $honnan
    $honnan = $meddig
    $meddig = $tmp
    foreach ($i in Get-Content $args[0]) {
        Write-Host $i.Substring($honnan - 1, $meddig - $honnan + 1)
    }
}
