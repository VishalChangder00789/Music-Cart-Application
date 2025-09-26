pipeline {
    agent any

    environment {
        APP_DIR = "/var/lib/jenkins/appInstall/Music-Cart-Application"
        BRANCH = "master"
        PM2_NAME = "Music-Cart-Application" // this is just the PM2 process name
        ENTRY_FILE = "server/index.js"      // path to your main file relative to APP_DIR
    }

    stages {
        stage("Pull Latest Code") {
            steps {
                script {
                    sh """
                        # Create APP_DIR if it doesn't exist
                        if [ ! -d "$APP_DIR" ]; then
                            mkdir -p $APP_DIR
                        fi

                        # Clone repo if not already cloned
                        if [ ! -d "$APP_DIR/.git" ]; then
                            git clone https://github.com/VishalChangder00789/Music-Cart-Application.git $APP_DIR
                        fi

                        cd $APP_DIR
                        git fetch origin
                        git reset --hard origin/$BRANCH
                        git clean -fd
                    """
                }
            }
        }

        stage("Install Dependencies") {
            steps {
                dir("$APP_DIR") {
                    sh "npm install --silent"
                }
            }
        }

        stage("Restart App with PM2") {
            steps {
                dir("$APP_DIR") {
                    sh """
                        # Restart if running, otherwise start
                        pm2 describe $PM2_NAME > /dev/null 2>&1
                        if [ \$? -eq 0 ]; then
                            pm2 restart $PM2_NAME
                        else
                            pm2 start $ENTRY_FILE --name $PM2_NAME
                        fi

                        pm2 save
                    """
                }
            }
        }
    }
}
