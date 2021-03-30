#!/bin/bash
find . -name "migrations" -type d -exec rm -rf {} +;
find . -name "__pycache__" -type d -exec rm -rf {} +;
rm db.sqlite3