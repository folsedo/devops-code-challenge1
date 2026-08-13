pipeline {
    agent any

    environment {
    AWS_REGION = 'us-east-2'
    AWS_ACCOUNT_ID = '099771438874'

    FRONTEND_ECR = '099771438874.dkr.ecr.us-east-2.amazonaws.com/devops-code-challenge1-frontend'
    BACKEND_ECR  = '099771438874.dkr.ecr.us-east-2.amazonaws.com/devops-code-challenge1-backend'
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

        stage('Login to ECR') {
            steps {
                sh '''
                    aws ecr get-login-password --region us-east-2 | \
                    docker login --username AWS --password-stdin \
                    099771438874.dkr.ecr.us-east-2.amazonaws.com
                '''
            }
        }
    }
}

stage('Push Frontend to ECR') {
    steps {
        sh '''
            docker tag devops-code-challenge1-frontend:latest $FRONTEND_ECR:latest
            docker push $FRONTEND_ECR:latest
        '''
    }
}

stage('Push Backend to ECR') {
    steps {
        sh '''
            docker tag devops-code-challenge1-backend:latest $BACKEND_ECR:latest
            docker push $BACKEND_ECR:latest
        '''
    }
}