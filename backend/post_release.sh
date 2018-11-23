#!/bin/bash
EXEC='python manage.py'
$EXEC makemigrations
$EXEC migrate
cnt=$(sh -c "$EXEC shell -c 'from events.models import School; print(School.objects.count())'")
if [ $cnt -lt 10 ]
then
    echo $cnt
    $EXEC populatedb --dirpath events/data/
    $EXEC topicsdb --dirpath events/data/topics/topics.json
fi