#$measure=Get-Content $args[0] | Measure-Object
#$lines= $measure.Count
$lines=(Get-Content $args[0]).Count
Write-Host "Az $args[0] fajl sorainak szama: $lines"