#!/bin/bash

export CHROME_BIN="/usr/bin/google-chrome"
export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start &
