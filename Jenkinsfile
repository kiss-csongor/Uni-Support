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
                    
                    // Stash-elés a módosítások elmentésére
                    sh "git stash"
                    
                    // Git pull
                    sh "git pull origin ${GIT_BRANCH}"
                    
                    // Visszaállítás a stash-ből
                    sh "git stash pop"

                    echo "Building React application"
                    sh """
                    cd ${TARGET_DIR}/react
                    npm run build
                    """
                }
            }
        }

        // További lépések, mint a build és deploy
    }
}
