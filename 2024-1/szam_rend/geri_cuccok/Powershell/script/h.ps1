param
(
    [Parameter(Mandatory=$true)][int]$szam
)


Write-Output (-join("Hello ", $szam))