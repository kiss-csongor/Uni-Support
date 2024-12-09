#!/bin/bash

# Aktiváljuk a virtuális környezetet
source /home/kisscsongor/Modern-React-UI-UX/backend/env/bin/activate

# Átnavigálunk a megfelelő mappába

cd /home/kisscsongor/Modern-React-UI-UX/backend

# Futassuk a Django alkalmazást
python manage.py runserver
