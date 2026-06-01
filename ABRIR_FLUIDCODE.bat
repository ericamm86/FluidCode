@echo off
setlocal
cd /d "%~dp0frontend"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js nao foi encontrado.
  echo Instale o Node.js 22 ou superior e execute este arquivo novamente.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Instalando dependencias do projeto...
  npm install
  if errorlevel 1 (
    echo Nao foi possivel instalar as dependencias.
    pause
    exit /b 1
  )
)

echo Gerando versao de apresentacao...
npm run build
if errorlevel 1 (
  echo Nao foi possivel gerar a versao de apresentacao.
  pause
  exit /b 1
)

echo.
echo Abrindo FluidCode em servidor local.
echo Se o navegador nao abrir sozinho, acesse o endereco exibido abaixo.
echo.
npm run preview -- --host 127.0.0.1

pause
