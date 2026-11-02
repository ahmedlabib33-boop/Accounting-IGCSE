$ErrorActionPreference = "Continue"

$ProjectRoot = "C:\Users\pc\OneDrive\Desktop\omar\SAT_Quiz_App"
$Stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$ReportRoot = Join-Path $ProjectRoot "_doctor_reports"
$ReportDir = Join-Path $ReportRoot "DR_$Stamp"
$ZipPath = Join-Path $ReportRoot "SAT_Quiz_App_DR_$Stamp.zip"

New-Item -ItemType Directory -Force -Path $ReportDir | Out-Null

$Report = Join-Path $ReportDir "DR_REPORT.txt"
$Tree = Join-Path $ReportDir "FILE_TREE.txt"
$PyCheck = Join-Path $ReportDir "PYTHON_CHECK.txt"
$Scan = Join-Path $ReportDir "ERROR_SCAN.txt"

"SAT Quiz App Doctor Report" | Out-File $Report -Encoding utf8
"Project Root: $ProjectRoot" | Out-File $Report -Append -Encoding utf8
"Generated: $(Get-Date)" | Out-File $Report -Append -Encoding utf8
"" | Out-File $Report -Append -Encoding utf8

if (!(Test-Path $ProjectRoot)) {
    "ERROR: Project folder not found." | Out-File $Report -Append -Encoding utf8
    Write-Host "Project folder not found: $ProjectRoot" -ForegroundColor Red
    exit
}

Set-Location $ProjectRoot

"================ FILE TREE ================" | Out-File $Tree -Encoding utf8
Get-ChildItem -Recurse -Force |
Where-Object {
    $_.FullName -notlike "*\_doctor_reports\*" -and
    $_.FullName -notlike "*\__pycache__\*" -and
    $_.FullName -notlike "*\.venv\*" -and
    $_.FullName -notlike "*\venv\*"
} |
Sort-Object FullName |
ForEach-Object {
    if ($_.PSIsContainer) {
        "[DIR]  $($_.FullName)"
    } else {
        "[FILE] $($_.FullName) | $($_.Length) bytes"
    }
} | Out-File $Tree -Append -Encoding utf8

"================ PYTHON CHECK ================" | Out-File $PyCheck -Encoding utf8

if (Get-Command py -ErrorAction SilentlyContinue) {
    "Python launcher found: py" | Out-File $PyCheck -Append -Encoding utf8
    py -3 --version 2>&1 | Out-File $PyCheck -Append -Encoding utf8
    py -3 -m pip --version 2>&1 | Out-File $PyCheck -Append -Encoding utf8
    py -3 -m pip list 2>&1 | Out-File $PyCheck -Append -Encoding utf8
    py -3 -m streamlit version 2>&1 | Out-File $PyCheck -Append -Encoding utf8
}
elseif (Get-Command python -ErrorAction SilentlyContinue) {
    "Python found: python" | Out-File $PyCheck -Append -Encoding utf8
    python --version 2>&1 | Out-File $PyCheck -Append -Encoding utf8
    python -m pip --version 2>&1 | Out-File $PyCheck -Append -Encoding utf8
    python -m pip list 2>&1 | Out-File $PyCheck -Append -Encoding utf8
    python -m streamlit version 2>&1 | Out-File $PyCheck -Append -Encoding utf8
}
else {
    "ERROR: Python not found in PATH." | Out-File $PyCheck -Append -Encoding utf8
}

"================ PROJECT SUMMARY ================" | Out-File $Report -Append -Encoding utf8
"Python files:" | Out-File $Report -Append -Encoding utf8
Get-ChildItem -Recurse -File -Filter *.py |
Where-Object { $_.FullName -notlike "*\_doctor_reports\*" } |
ForEach-Object { $_.FullName } |
Out-File $Report -Append -Encoding utf8

"" | Out-File $Report -Append -Encoding utf8
"CSV files:" | Out-File $Report -Append -Encoding utf8
Get-ChildItem -Recurse -File -Filter *.csv |
Where-Object { $_.FullName -notlike "*\_doctor_reports\*" } |
ForEach-Object { $_.FullName } |
Out-File $Report -Append -Encoding utf8

"" | Out-File $Report -Append -Encoding utf8
"Excel files:" | Out-File $Report -Append -Encoding utf8
Get-ChildItem -Recurse -File -Include *.xlsx,*.xls |
Where-Object { $_.FullName -notlike "*\_doctor_reports\*" } |
ForEach-Object { $_.FullName } |
Out-File $Report -Append -Encoding utf8

"" | Out-File $Report -Append -Encoding utf8
"Possible Streamlit entry files:" | Out-File $Report -Append -Encoding utf8
"app.py","streamlit_app.py","main.py","dashboard.py","Home.py" | ForEach-Object {
    $p = Join-Path $ProjectRoot $_
    if (Test-Path $p) {
        "FOUND: $_"
    }
} | Out-File $Report -Append -Encoding utf8

"================ ERROR SCAN ================" | Out-File $Scan -Encoding utf8

$Patterns = @(
    "ModuleNotFoundError",
    "ImportError",
    "NameError",
    "KeyError",
    "FileNotFoundError",
    "PermissionError",
    "AttributeError",
    "TypeError",
    "ValueError",
    "IndentationError",
    "SyntaxError",
    "st.session_state",
    "pd.read_csv",
    "pd.read_excel",
    "streamlit run"
)

Get-ChildItem -Recurse -File -Filter *.py |
Where-Object { $_.FullName -notlike "*\_doctor_reports\*" } |
ForEach-Object {
    $file = $_.FullName
    foreach ($pattern in $Patterns) {
        Select-String -Path $file -Pattern $pattern -ErrorAction SilentlyContinue |
        ForEach-Object {
            "$($file):$($_.LineNumber): $($_.Line.Trim())"
        } | Out-File $Scan -Append -Encoding utf8
    }
}

$Snapshot = Join-Path $ReportDir "SOURCE_SNAPSHOT"
New-Item -ItemType Directory -Force -Path $Snapshot | Out-Null

Get-ChildItem -Recurse -File -Include *.py,*.txt,*.csv,*.json,*.toml,*.md |
Where-Object {
    $_.FullName -notlike "*\_doctor_reports\*" -and
    $_.Length -lt 5MB
} |
ForEach-Object {
    $relative = $_.FullName.Replace($ProjectRoot, "").TrimStart("\")
    $dest = Join-Path $Snapshot $relative
    New-Item -ItemType Directory -Force -Path (Split-Path $dest -Parent) | Out-Null
    Copy-Item $_.FullName $dest -Force
}

Compress-Archive -Path (Join-Path $ReportDir "*") -DestinationPath $ZipPath -Force

Write-Host ""
Write-Host "Doctor report generated successfully." -ForegroundColor Green
Write-Host "ZIP file:" -ForegroundColor Yellow
Write-Host $ZipPath -ForegroundColor Cyan
