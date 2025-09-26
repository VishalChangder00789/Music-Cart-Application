pipeline {
    agent any

    environment {
        APP_DIR = "/home/ubuntu/appInstall/Music-Cart-Application"
        BRANCH = "master"
        PM2_NAME = "server"
    }

    stages {

        stage("Pull Latest Code") {
            steps {
                dir("$APP_DIR") {
                    sh """
                    if [ ! -d . ]; then
                        git clone https://github.com/VishalChangder00789/Music-Cart-Application.git .
                    fi
                    git fetch origin
                    git reset --hard origin/$BRANCH
                    """
                }
            }
        }

        stage("Install Dependencies") {
            steps {
                dir("$APP_DIR") {
                    sh """
                    npm install
                    """
                }
            }
        }

        stage("Restart App with PM2") {
            steps {
                dir("$APP_DIR") {
                    sh """
                    pm2 restart $PM2_NAME || pm2 start index.js --name $PM2_NAME
                    pm2 save
                    """
                }
            }
        }
    }
}
