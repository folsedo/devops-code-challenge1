pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-2'
        AWS_ACCOUNT_ID = '099771438874'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Source code pulled from GitHub'
            }
        }

        stage('Verify Docker') {
            steps {
                sh 'docker --version'
            }
        }

        stage('Verify AWS') {
            steps {
                sh 'aws --version'
                sh 'aws sts get-caller-identity'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t devops-code-challenge1-frontend ./frontend'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker build -t devops-code-challenge1-backend ./backend'
            }
        }
    }
}