@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ========================================
echo   Wangchu Official Site Startup
echo ========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not installed or not available in PATH.
  echo Please install Node.js first: https://nodejs.org/
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm is not installed or not available in PATH.
  pause
  exit /b 1
)

if not exist "server\.env" (
  if exist "server\.env.example" (
    echo [INFO] server\.env not found. Creating it from server\.env.example...
    copy "server\.env.example" "server\.env" >nul
  ) else (
    echo [ERROR] server\.env.example not found.
    pause
    exit /b 1
  )
)

if not exist "server\data" (
  mkdir "server\data"
)

set "APP_PORT=4000"
for /f "usebackq tokens=1,* delims==" %%A in ("server\.env") do (
  if /i "%%A"=="PORT" set "APP_PORT=%%B"
)

echo [INFO] Releasing occupied development ports...
for %%P in (%APP_PORT% 24678) do (
  for /f "tokens=5" %%I in ('netstat -ano ^| findstr /R /C:":%%P .*LISTENING"') do (
    for /f "tokens=2 delims==" %%C in ('wmic process where "ProcessId=%%I" get CommandLine /value 2^>nul ^| findstr "CommandLine="') do (
      echo %%C | findstr /I /C:"%CD%" >nul
      if not errorlevel 1 (
        echo [INFO] Stopping existing project process %%I on port %%P...
        taskkill /PID %%I /F >nul 2>nul
      )
    )
  )
)

if not exist "node_modules" (
  echo [INFO] Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo [ERROR] npm install failed.
    pause
    exit /b 1
  )
)

echo [INFO] Syncing database schema...
call npm --workspace server exec prisma -- db push --accept-data-loss
if errorlevel 1 (
  echo [ERROR] Database schema sync failed.
  pause
  exit /b 1
)

echo [INFO] Seeding initial data...
call npm run db:seed
if errorlevel 1 (
  echo [ERROR] Database seed failed.
  pause
  exit /b 1
)

echo.
echo ========================================
echo   Website: http://localhost:%APP_PORT%/
echo   Admin:   http://localhost:%APP_PORT%/admin
echo   API:     http://localhost:%APP_PORT%/api/health
echo.
echo   Default admin account is configured in server\.env
echo ========================================
echo.

call npm run dev
pause
