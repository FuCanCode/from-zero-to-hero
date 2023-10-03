#!/bin/bash

cd /home/fu/repos/from-zero-to-hero/17-Modern-JS-Modules-Tooling/starter

code . &

tsc -w &

sleep 1

cd /home/fu/repos/from-zero-to-hero/17-Modern-JS-Modules-Tooling/starter/dist

live-server &



