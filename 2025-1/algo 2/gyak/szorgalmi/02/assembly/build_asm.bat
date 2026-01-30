@echo off
setlocal enabledelayedexpansion
echo =========================
echo   FORDITAS ES LINKELES
echo =========================

REM regi buildek torlese
if exist heki.obj del heki.obj
if exist heki.lst del heki.lst
if exist heki.exe del heki.exe

REM vs dev cmd prompt betolt
echo visual studio env betoltese...

set "VSDEV_PATH0=C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat"
set "VSDEV_PATH1=C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\Common7\Tools\VsDevCmd.bat"
set "VSDEV_PATH2=C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\Common7\Tools\VsDevCmd.bat"

set "VSDEV_FOUND=0"
for %%i in (0 1 2) do (
    call set "VSDEV_PATH=%%VSDEV_PATH%%i%%"
    if exist !VSDEV_PATH! (
        call "!VSDEV_PATH!" >nul 2>&1
        if not errorlevel 1 (
            set "VSDEV_FOUND=1"
            goto :VSDEV_OK
        )
    )
)

echo HIBA: Nem talaltam telepitett visual studio-t!
pause
exit /b 1

:VSDEV_OK
echo vs env betoltve.



REM assembler meghivasa
echo assembly fajl forditasa...
ml /c /coff /Zi /Fl heki.asm

if errorlevel 1 (
    echo HIBA: assembly forditas sikertelen!
    echo    szintaxis hiba.
    pause
    exit /b 1
) else (
    echo    assembly forditas sikeres!
    echo    object fajl letrehozva:     heki.obj
    echo    listing fajl letrehozva:    heki.lst
)

REM linkeles
echo executable linkelese...
link /SUBSYSTEM:CONSOLE heki.obj kernel32.lib /OUT:heki.exe

if errorlevel 1 (
    echo HIBA: linkeles sikertelen!
    echo    fuggveny deklaracios hiba vagy nincs elerheto MASM assembler.
    pause
    exit /b 1
) else (
    if exist heki.obj del heki.obj
    if exist heki.lst del heki.lst
    echo    linkeles sikeres
    echo    object file torolve:        heki.obj
    echo    listing file torolve:       heki.lst
    echo    executable letrehozva:      heki.exe
)

echo.
echo =================
echo      kimenet
echo =================

REM program futtatasa
echo program futtatasa:
echo.
heki.exe
echo.

pause