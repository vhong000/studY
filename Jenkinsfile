pipeline {
  agent any
  stages {
    stage('Create virtualenv') {
      steps {
        echo 'Creating virtualenv ...'
        sh 'rm -rf .venv && python3.6 -m venv .venv'
      }
    }
    stage('Install requirements') {
      steps {
        sh '''
        . .venv/bin/activate
        pip install -r ./backend/requirements.txt
        '''
      }
    }
    stage('Django Tests') {
      steps {
        sh '''
        . .venv/bin/activate
        ./backend/manage.py test backend --noinput
        '''
      }
    }
  }
}