pipeline {
    agent any
    
    environment {
        WEB_SERVER = 'kisscsongor@uni-support.sytes.net'
        WEB_DIR = '/home/kisscsongor/Uni-Support'
        DOCKER_SERVICE = 'docker-vizsgaremek.service'
    }

    stages {
        stage('Deploy') {
            steps {
                sshagent(['my-ssh-key']) {
                    sh "ssh ${WEB_SERVER} \"sudo rm -R /home/kisscsongor/Uni-Support\""
                    sh "ssh ${WEB_SERVER} \"sudo mkdir /home/kisscsongor/Uni-Support\""
                    sh "ssh ${WEB_SERVER} \"sudo chown -R kisscsongor:kisscsongor /home/kisscsongor/Uni-Support\""
                    sh "ssh ${WEB_SERVER} 'git clone https://github.com/kiss-csongor/Uni-Support.git ${WEB_DIR}'"
                    sh "ssh ${WEB_SERVER} \"sudo systemctl restart ${DOCKER_SERVICE}\""
                }
            }
        }
    }

    post {
        success {
            echo 'A deploy sikeres volt!'
        }
        failure {
            echo 'A deploy nem sikerült!'
        }
    }
}
