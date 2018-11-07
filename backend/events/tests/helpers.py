from pathlib import Path
import json
from django.conf import settings


def get_cuny_schools(filepath=None):
    file_ = Path(filepath) if filepath else Path(
        settings.BASE_DIR).joinpath('events/tests/fixtures/schools.json')
    if not file_.is_file():
        raise FileNotFoundError()
    with file_.open(mode='r') as fp:
        ret = json.load(fp)
    return ret
