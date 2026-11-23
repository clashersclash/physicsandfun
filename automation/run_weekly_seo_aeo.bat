@echo off
title Physics & Fun - Weekly SEO & AEO Ranking Booster
cd /d "%~dp0.."
echo =======================================================================
echo   RUNNING WEEKLY SEO & AEO CRAWL RANK BOOSTER FOR PHYSICSANDFUN.RUN.PLACE
echo =======================================================================
python "%~dp0weekly_seo_aeo_booster.py"
echo.
echo Process finished. Log saved to: %~dp0seo_aeo_history.log
if "%1" neq "--silent" pause
