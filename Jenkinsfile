pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-2'
        AWS_ACCOUNT_ID = '099771438874'

        FRONTEND_ECR = '099771438874.dkr.ecr.us-east-2.amazonaws.com/devops-code-challenge1-frontend'
        BACKEND_ECR  = '099771438874.dkr.ecr.us-east-2.amazonaws.com/devops-code-challenge1-backend'

        ECS_CLUSTER = 'devops-code-challenge1-cluster'
        FRONTEND_SERVICE = 'devops-code-challenge1-frontend-service'
        BACKEND_SERVICE  = 'devops-code-challenge1-backend-service'
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
                    aws ecr get-login-password --region $AWS_REGION | \
                    docker login --username AWS --password-stdin \
                    $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                '''
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

        stage('Deploy Frontend to ECS') {
            steps {
                sh '''
                    aws ecs update-service \
                    --cluster $ECS_CLUSTER \
                    --service $FRONTEND_SERVICE \
                    --force-new-deployment \
                    --region $AWS_REGION
                '''
            }
        }

        stage('Deploy Backend to ECS') {
            steps {
                sh '''
                    aws ecs update-service \
                    --cluster $ECS_CLUSTER \
                    --service $BACKEND_SERVICE \
                    --force-new-deployment \
                    --region $AWS_REGION
                '''
            }
        }

        stage('Verify ECS Services') {
            steps {
                sh '''
                    aws ecs describe-services \
                    --cluster $ECS_CLUSTER \
                    --services $FRONTEND_SERVICE $BACKEND_SERVICE \
                    --region $AWS_REGION \
                    --query "services[*].[serviceName,desiredCount,runningCount,pendingCount]" \
                    --output table
                '''
            }
        }
    }
}