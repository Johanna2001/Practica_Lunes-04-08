pipeline {
    agent any

    tools {
        nodejs "node24"
        dockerTool "docker" 
    }

    stages {
        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }

        stage('Ejecutar Tests') {
            steps {
                sh 'chmod +x ./node_modules/.bin/jest'  // Soluciona el problema de permisos
                sh 'npm test -- --ci --runInBand'
            }
        }

        stage('Construir Imagen Docker') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                sh 'docker build -t hola-mundo-practica:latest .'
            }
        }

        stage('Ejecutar Contenedor Node.js') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                sh '''
                    docker stop hola-mundo-practica || true
                    docker rm hola-mundo-practica || true
                    docker run -d --name hola-mundo-practica -p 3000:3000 hola-mundo-practica:latest
                '''
            }
        }
    }
}
