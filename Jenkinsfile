pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {

        stage('Clone Repo') {
            steps {
                git 'https://github.com/itsmetushar09/devops-collab-app'
            }
        }

        stage('Install Backend') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend') {
            steps {
                dir('client') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Backend to Render') {
            steps {
                sh '''
                curl -X POST https://api.render.com/deploy/srv-d7615mma2pns73fm7bk0?key=Hba4GXTETsQ
                '''
            }
        }

        stage('Success') {
            steps {
                echo 'CI/CD Pipeline Completed 🚀'
            }
        }
    }
}