pipeline {
    agent any

    environment {
        // A repository klónozási helye
        TARGET_DIR = '/home/jenkins/uni-support'
        GIT_REPO_URL = 'https://github.com/kiss-csongor/Modern-React-UI-UX.git'  // A GitHub repo URL-je
        GIT_BRANCH = 'main'  // Az ágat is beállíthatod, ha szükséges
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    echo "Cloning repository to ${TARGET_DIR}"
                    // Ha a mappa nem létezik, akkor létrehozza
                    if (!fileExists(TARGET_DIR)) {
                        sh "mkdir -p ${TARGET_DIR}"
                    } else {
                        sh "rm -rf ${TARGET_DIR}"
                    }
                    // Git klónozás
                    sh """
                    git clone --branch ${GIT_BRANCH} ${GIT_REPO_URL} ${TARGET_DIR}
                    cd /home/jenkins/uni-support/react
                    npm run build
                    """
                }
            }
        }

        // Egyéb lépések, mint a build, tesztelés stb.
    }
}

