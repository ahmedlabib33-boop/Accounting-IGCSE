@echo off
cd /d "%~dp0"
echo Opening IGCSE Accounting on http://127.0.0.1:5417
npm run dev -- --hostname 127.0.0.1 --port 5417
pause
