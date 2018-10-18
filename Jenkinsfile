pipeline {
  agent any
  stages {
    stage('Create virtualenv') {
      steps {
        if (!fileExists('.venv')){
          echo 'Creating virtualenv ...'
          sh 'python3.6 -m venv --no-site-packages .venv'
        }
      }
    }
    
    stage('Install requirements'){
      if (fileExists('requirements/preinstall.txt')) {
      sh """
      . .venv/bin/activate
      pip install -r requirements.txt
      """
    }
      
    stage("Unit Tests") {
      sh """
      . .venv/bin/activate
      ./manage.py test --noinput
      """
    }
  }
}
