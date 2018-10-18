pipeline {
  agent any
  stages {
    stage('Create virtualenv') {
      steps {
          echo 'Creating virtualenv ...'
          sh 'rm -rf .venv && python3.6 -m venv --no-site-packages .venv'
        }
      }
    }
    
    stage('Install requirements'){
      sh """
      . .venv/bin/activate
      pip install -r requirements.txt
      """
      }
    }
  
    stage("Unit Tests") {
      sh """
      . .venv/bin/activate
      ./manage.py test --noinput
      """
    }
  }
}
