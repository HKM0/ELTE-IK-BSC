param
(
    [Parameter(Mandatory=$true)][int]$N
)


$path="C:\Windows\System32"

Get-ChildItem -Filter "*.exe" -Path $path  | Sort-Object Length -Descending | Select-Object -First $N | Format-Table -Property Name,LastWriteTime,Length 