$csvPath = "d:\my_folder\education\projects\nexus-tools\Kutsal_Pazar_Listesi.csv"
$jsPath = "d:\my_folder\education\projects\nexus-tools\js\data.js"

# Use explicit headers to avoid encoding issues with "Fiyatı"
# Also force encoding to UTF8 for reading
$csv = Import-Csv -Path $csvPath -Delimiter "," -Header "Name","Link","Price" -Encoding UTF8 | Select-Object -Skip 1

$data = @()

foreach ($row in $csv) {
    $name = $row.Name
    $link = $row.Link
    # Parse price, handling potential empty strings or parsing errors
    $priceStr = $row.Price
    $price = 0
    if (-not [string]::IsNullOrWhiteSpace($priceStr)) {
        # Try parsing as double using InvariantCulture (dot decimal)
        if ($priceStr -match '^\d+(\.\d+)?$') {
            try {
                $price = [double]::Parse($priceStr, [System.Globalization.CultureInfo]::InvariantCulture)
            } catch {
                $price = 0
            }
        }
    }

    if (-not [string]::IsNullOrWhiteSpace($name)) {
        $item = @{
            name = $name
            link = $link
            price = $price
        }
        $data += $item
    }
}

$json = $data | ConvertTo-Json -Depth 3 -Compress
$content = "/**`n * Nexus Tools - Static Data`n * Generated from Kutsal_Pazar_Listesi.csv`n */`n`nconst marketData = $json;"

Set-Content -Path $jsPath -Value $content -Encoding UTF8
Write-Host "Converted $($data.Count) items."
