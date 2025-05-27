@echo off

REM Build the Docker image
docker build -t live-page-automation-test-base .

REM Tag the image for the target registry
docker tag live-page-automation-test-base hub.lumigame.com/pentagon-base/live-page-automation-test-base:latest

REM Push the image to the registry
docker push hub.lumigame.com/pentagon-base/live-page-automation-test-base:latest

echo Image successfully built and pushed to hub.lumigame.com/pentagon-base/live-page-automation-test-base:latest 