$szum = 0

if (@($input).Count -ne 0) 
{
$input.Reset()
ForEach-Object ($i in $input)
{
$szum += $i
}
Write-Host "Sum of input values: $szum"
} 

else 
{
Write-Host "No input values provided."
}
