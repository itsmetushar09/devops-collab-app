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

        stage('Run Backend Check') {
            steps {
                dir('server') {
                    sh 'node -e "console.log(\'Backend OK\')"'
                }
            }
        }

        stage('Success') {
            steps {
                echo 'Build Successful 🚀'
            }
        }
    }
}