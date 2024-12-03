pipeline {
    agent any

    environment {
        TARGET_DIR = '/home/jenkins/Modern-React-UI-UX'
        GIT_REPO_URL = 'https://github.com/kiss-csongor/Modern-React-UI-UX.git'
        GIT_BRANCH = 'main'
    }

    stages {
        stage('Update and Build') {
            steps {
                script {
                    echo "Pulling latest changes in ${TARGET_DIR}"

                    sh """
                    cd ${TARGET_DIR}
                    git pull origin ${GIT_BRANCH}
                    """

                    echo "Building React application"
                    sh """
                    cd ${TARGET_DIR}/react
                    npm run build
                    """
                }
            }
        }
    }
}
