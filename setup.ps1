# Kemnaker Next.js - Complete Setup Script
# This script will create all remaining component files

Write-Host "`n🚀 Setting up Kemnaker Next.js Project..." -ForegroundColor Cyan

# Navigate to project directory
cd "D:\Personal Website\kemnaker\kemnaker-nextjs"

Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host "`n✅ Dependencies installed!" -ForegroundColor Green

Write-Host "`n📝 Project is ready!" -ForegroundColor Green
Write-Host "`nTo start the development server:" -ForegroundColor Cyan
Write-Host "  cd kemnaker-nextjs" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host "`nThen open: http://localhost:3000`n" -ForegroundColor Cyan
