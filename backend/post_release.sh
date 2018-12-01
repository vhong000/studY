#!/bin/bash
EXEC='python manage.py'
$EXEC makemigrations
$EXEC migrate
cnt=$(sh -c "$EXEC shell -c 'from events.models import School; print(School.objects.count())'")
user=$(sh -c "$EXEC shell -c 'from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@gmail.com', 'studYpassword')'")
if [ $cnt -lt 10 ]
then
    echo $cnt
    $EXEC populatedb --dirpath events/data/
fi
echo $user
$EXEC topicsdb --dirpath events/data/topics/topics.json
