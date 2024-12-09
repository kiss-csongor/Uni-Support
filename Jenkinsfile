pipeline {
    agent any

    environment {
        TARGET_DIR = '/home/jenkins/Modern-React-UI-UX'
        GIT_REPO_URL = 'https://github.com/kiss-csongor/Modern-React-UI-UX.git'
        GIT_BRANCH = 'main'
    }

    stages {
        stage('Pull Latest Changes') {
            steps {
                script {
                    echo "Pulling latest changes from the repository"
                    
                    // Git safe directory hozzáadása
                    sh "git config --global --add safe.directory ${TARGET_DIR}"
                    
                    // Tisztítjuk a nem követett fájlokat (pl. node_modules/), ha szükséges
                    sh "git clean -fd"
                    
                    // Git pull
                    sh "git pull origin ${GIT_BRANCH}"

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
