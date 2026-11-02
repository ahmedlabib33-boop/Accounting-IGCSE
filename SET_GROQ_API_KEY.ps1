param(
  [switch]$Replace
)

$envFile = Join-Path $PSScriptRoot '.env.local'
$lines = if (Test-Path -LiteralPath $envFile) { @(Get-Content -LiteralPath $envFile) } else { @() }
$hasKey = $lines | Where-Object { $_ -match '^\s*GROQ_API_KEY\s*=\s*.+$' }

if ($hasKey -and -not $Replace) {
  Write-Host 'Groq API key is already configured in .env.local.' -ForegroundColor Green
  Write-Host 'To replace it, run: .\SET_GROQ_API_KEY.ps1 -Replace'
  exit 0
}

Write-Host 'Paste your Groq API key. The value will not be displayed.' -ForegroundColor Cyan
$secureKey = Read-Host 'GROQ_API_KEY' -AsSecureString
$pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureKey)
try {
  $plainKey = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
} finally {
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
}

if ([string]::IsNullOrWhiteSpace($plainKey)) {
  Write-Error 'No API key was entered. Nothing was saved.'
  exit 1
}

$newLine = "GROQ_API_KEY=$plainKey"
$updatedLines = [System.Collections.Generic.List[string]]::new()
$replaced = $false
foreach ($line in $lines) {
  if ($line -match '^\s*GROQ_API_KEY\s*=') {
    if (-not $replaced) { [void]$updatedLines.Add($newLine) }
    $replaced = $true
  } else {
    [void]$updatedLines.Add($line)
  }
}
if (-not $replaced) { [void]$updatedLines.Add($newLine) }

[System.IO.File]::WriteAllLines($envFile, $updatedLines, [System.Text.UTF8Encoding]::new($false))
$plainKey = $null
Write-Host 'Groq API key saved securely in .env.local. Restarting Next.js will load it.' -ForegroundColor Green
