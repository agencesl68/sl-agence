# Installe (ou met à jour) la prospection SL Agence sur Windows, sans rien installer à la main.
# Usage, dans PowerShell :
#   irm https://raw.githubusercontent.com/agencesl68/sl-agence/claude/eager-shannon-5we0ld/_prospection/installer.ps1 | iex
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$Branche = "claude/eager-shannon-5we0ld"
$Dossier = Join-Path $env:USERPROFILE "SL-Prospection"
$Bureau = [Environment]::GetFolderPath("Desktop")
$Lanceur = Join-Path $Bureau "Prospection SL Agence.bat"

Write-Host ""
Write-Host "  Installation de la prospection SL Agence"
Write-Host "  (2 a 3 minutes la premiere fois)"
Write-Host ""

# 1. uv : installe et gere Python tout seul.
$uv = (Get-Command uv -ErrorAction SilentlyContinue).Source
if (-not $uv) {
    $uv = Join-Path $env:USERPROFILE ".local\bin\uv.exe"
    if (-not (Test-Path $uv)) {
        Write-Host "- Installation de l'outil Python (uv)..."
        $env:UV_NO_MODIFY_PATH = "1"
        Invoke-RestMethod https://astral.sh/uv/install.ps1 | Invoke-Expression | Out-Null
    }
}
Write-Host "- Preparation de Python..."
& $uv python install 3.12 2>$null | Out-Null
$python = (& $uv python find 3.12).Trim()

# 2. Telechargement de l'application (le fichier .env et la base de donnees sont conserves).
Write-Host "- Telechargement de l'application..."
$tmp = Join-Path $env:TEMP ("sl-prospection-" + [guid]::NewGuid())
New-Item -ItemType Directory -Path $tmp | Out-Null
Invoke-WebRequest "https://github.com/agencesl68/sl-agence/archive/refs/heads/$Branche.zip" -OutFile (Join-Path $tmp "app.zip") -UseBasicParsing
Expand-Archive (Join-Path $tmp "app.zip") -DestinationPath $tmp
$src = Get-ChildItem $tmp -Recurse -Directory -Filter "_prospection" | Select-Object -First 1
New-Item -ItemType Directory -Force -Path $Dossier | Out-Null
Get-ChildItem -Force $src.FullName | Copy-Item -Destination $Dossier -Recurse -Force
Remove-Item -Recurse -Force $tmp

# 3. Icone sur le Bureau.
$contenu = "@echo off`r`nrem Double-cliquez pour ouvrir la prospection SL Agence. Laissez cette fenetre ouverte.`r`ncd /d `"$Dossier`"`r`n`"$python`" lancer.py`r`npause`r`n"
[IO.File]::WriteAllText($Lanceur, $contenu, [Text.Encoding]::Default)

Write-Host "- Installation des composants (une seule fois)..."
Push-Location $Dossier
& $python lancer.py --installer-seulement
Pop-Location

Write-Host ""
Write-Host "  C'est installe."
Write-Host "  Chaque matin : double-cliquez sur 'Prospection SL Agence' sur votre Bureau."
Write-Host ""

# 4. Premier lancement.
Start-Process $Lanceur
