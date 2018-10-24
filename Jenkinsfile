#!/usr/bin/env groovy

pipeline {
  agent any

  environment {
    PROJECT_ROOT_DIR = '/home/ubuntu/webapps/swe-project/'
  }

  stages {

    stage('Build') {
      steps {
        echo 'Creating virtualenv ...'
        sh 'rm -rf .venv && python3.6 -m venv .venv'
        echo 'Install pip packages...'
        sh '''
        . .venv/bin/activate
        pip install -r ./backend/requirements.txt
        '''
      }
    }    

    stage('Test: Backend') {
      steps {
        sh '''
        . .venv/bin/activate
        cd backend
        coverage run --source='.' manage.py test --noinput
        coverage xml
        '''
      }
    }

    stage("Test: UI") {
      steps {
        withEnv(['PATH+EXTRA=/home/ubuntu/.nvm/versions/node/v8.12.0/bin']){
          sh """
          cd frontend && npm install
          CI=true npm test
          """
        }
      }
    }
    
    stage ("Release") {
      when {
          allOf {
              branch 'master'
              not {changeRequest()}
            }
          }

      stages {
        
        stage("Bundle") {
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
          steps {
              sh """
              cp -r backend ${PROJECT_ROOT_DIR} && cd ${PROJECT_ROOT_DIR}
              ./deploy.sh
              """
          }
        }
      }
    }
  }

  post {
        always {
            junit 'backend/coverage.xml'
            deleteDir()
        }
  }
}
