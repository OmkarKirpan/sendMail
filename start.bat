if not "%minimized%"=="" goto :minimized
set minimized=true
@echo off
cd "C:\Users\OnkarRameshKirpan\Documents\Projects\sendMail"

@REM start /min cmd /C "node <the script you want to execute>"
start /min cmd /C "npm run start:test"
goto :EOF
:minimized