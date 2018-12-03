
import os
import django_heroku

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'ot=6xctd1o9ltmrq)dj0hkxt&umw*xjexfg!2nwob8_n9yd5y)'
TRUSTED_ORIGINS = ['localhost', '127.0.0.1', 'https://studyy-app.herokuapp.com/']
DEBUG = True
DB_BACKEND = None

if os.getenv('DJAPP_ENV', default='DEV') == 'PROD':
    SECRET_KEY = os.getenv('DJAPP_SECRET_KEY')
    DEBUG = False
    # TRUSTED_ORIGINS.append(os.getenv('DJAPP_HOST'))
    # DB_BACKEND = {
    #     'ENGINE': 'django.db.backends.mysql',
    #     'NAME': os.getenv('MYSQL_DBNAME'),
    #     'USER': os.getenv('MYSQL_USERNAME'),
    #     'PASSWORD': os.getenv('MYSQL_PWD'),
    #     'HOST': 'localhost',
    #     'PORT': '3306',
    # }

ALLOWED_HOSTS = TRUSTED_ORIGINS
INTERNAL_IPS = TRUSTED_ORIGINS
CSRF_TRUSTED_ORIGINS = TRUSTED_ORIGINS

AUTHENTICATION_BACKENDS = ['accounts.models.CustomEmailAuth']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
    'accounts',
    'events',
    'rest_framework',
    'rest_framework.authtoken',
    'django_filters',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 50,
    'TEST_REQUEST_DEFAULT_FORMAT': 'json'
}


ROOT_URLCONF = 'root.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'root.wsgi.application'


DATABASES = {
    'default': DB_BACKEND or {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

if "TRAVIS" not in os.environ:
    django_heroku.settings(locals())
    # WHITENOISE_INDEX_FILE = True

# MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')
# MEDIA_URL = '/media/'

CONFIRM_EMAIL = False
# EMAIL_USE_TLS = True
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_HOST_USER = os.getenv('GTEST_EMAIL', default=None)
# EMAIL_HOST_PASSWORD = os.getenv('GTEST_PASSWORD', default=None)
# EMAIL_PORT = 587
# HOST_NAME = 'http://localhost:3000'
# DJANGO_HOST = 'http://localhost:8000'
