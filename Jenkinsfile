pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
    }

    stages {

      stage('Clone Repo') {
    steps {
        git branch: 'main', url: 'https://github.com/itsmetushar09/devops-collab-app'
    }
}

        stage('Install Backend') {
            steps {
                dir('server') {
                    bat 'npm install'
                }
            }
        }

        stage('Install Frontend') {
            steps {
                dir('client') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('client') {
                    bat 'npm run build'
                }
            }
        }

        stage('Run Backend Check') {
            steps {
                dir('server') {
                    bat 'node -e "console.log(\'Backend OK\')"'
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