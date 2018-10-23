#!/usr/bin/env groovy

pipeline {
  agent any

  environment {
    PROJECT_ROOT_DIR = '/home/ubuntu/webapps/swe-project/'
  }

  stages {

    stage('Create virtualenv') {
      steps {
        echo 'Creating virtualenv ...'
        sh 'rm -rf .venv && python3.6 -m venv .venv'
      }
    }    

    stage('Install pip packages'){
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

    stage("UI Tests") {
      steps {
        withEnv(['PATH+EXTRA=/home/ubuntu/.nvm/versions/node/v8.12.0/bin']){
          sh """
          cd frontend && npm install
          #CI=true npm test
          """
        }
      }
    }
    
    stage("Bundle") {
      when {
        branch 'release'  
      }
      
      steps {
        withEnv(['PATH+EXTRA=/home/ubuntu/.nvm/versions/node/v8.12.0/bin']){
          sh """
          cd frontend && npm run build
          cp -r build/ ${PROJECT_ROOT_DIR}
          """
        }
      }
    }
      
    stage("Deploy") {
      when {
        branch 'release'  
      }
      
      steps {
          sh """
          cp -r backend ${PROJECT_ROOT_DIR} && cd ${PROJECT_ROOT_DIR}
          ./deploy.sh
          """
      }
    }

  }
}
