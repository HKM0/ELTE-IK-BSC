param
(
    [Parameter(Mandatory=$True)][string]$fájl
)
Get-ChildItem($fájl)
