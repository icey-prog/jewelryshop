# ============================================================
#  tunnel.ps1  —  SOP EXXOLAB : TUNNEL LOCALHOST.RUN (PWA REACT)
#  Usage: .\tunnel.ps1
# ============================================================

Write-Host ""
Write-Host "======================================================" -ForegroundColor Green
Write-Host "   SOP EXXOLAB : PREPARATION DU TUNNEL (REACT PWA)   " -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Green
Write-Host ""

# 1. Compilation du projet
Write-Host "1. Compilation du projet en cours..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERREUR] Build echoue. Corriger les erreurs et relancer." -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Build termine." -ForegroundColor Green

# 2. Lancement du serveur de preview (port 3000 defini dans vite.config.ts)
Write-Host ""
Write-Host "2. Lancement du serveur Preview (Port 3000)..." -ForegroundColor Cyan
Start-Process cmd -ArgumentList "/c npm run preview" -NoNewWindow
Write-Host "[i] Attente 3 secondes pour le demarrage du serveur..." -ForegroundColor Gray
Start-Sleep -Seconds 3

# 3. Ouverture du tunnel via localhost.run (SSH)
Write-Host ""
Write-Host "3. Initialisation du Tunnel Frontend (Port 3000)..." -ForegroundColor Cyan
Write-Host ""
Write-Host "======================================================" -ForegroundColor Green
Write-Host "   UTILISEZ L'URL CI-DESSOUS SUR VOTRE SMARTPHONE    " -ForegroundColor Green
Write-Host "======================================================" -ForegroundColor Green
Write-Host ""
Write-Host "   (Ctrl+C pour fermer le tunnel)" -ForegroundColor DarkGray
Write-Host ""

ssh -o ServerAliveInterval=60 -R 80:localhost:3000 nokey@localhost.run
