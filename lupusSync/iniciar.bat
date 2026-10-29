@echo off
chcp 65001 >nul
title LupusSync - Base de Datos en Archivos .JSON
color 0B
echo.
echo ====================================================================
echo   LupusSync - Ecosistema eHealth de Seguimiento de Lupus
echo   Base de Datos Local en Archivos .JSON (100%% Gratuita y Offline)
echo   E.E.S.T. Nro 2 "Republica Argentina" - E.A.C.P. 2026
echo ====================================================================
echo.
echo [1/3] Verificando entorno Node.js...

where node >nul 2>nul
if %errorlevel% neq 0 (
  if exist "C:\Program Files\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files\nodejs"
  ) else if exist "C:\Program Files (x86)\nodejs\node.exe" (
    set "PATH=%PATH%;C:\Program Files (x86)\nodejs"
  ) else (
    echo [ERROR] No se encontro Node.js instalado en el sistema.
    echo Por favor instala Node.js desde https://nodejs.org/ o ejecuta index.html directamente.
    pause
    exit /b 1
  )
)

echo [OK] Node.js detectado correctamente.
echo.
echo [2/3] Verificando base de datos en carpeta data...
if not exist "data\paciente.json" (
  echo [INFO] Creando archivos JSON iniciales...
) else (
  echo [OK] Archivos .json encontrados en data\ (paciente, medicamentos, turnos, sintomas, etc.)
)
echo.
echo [3/3] Abriendo navegador e iniciando servidor local en http://localhost:3000 ...
start "" http://localhost:3000
echo.
echo ====================================================================
echo   Servidor activo. Los cambios se guardan directo en disco en data/*.json
echo   Presiona CTRL+C para detener el servidor cuando termines.
echo ====================================================================
echo.
node server.js
pause
