pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials-id'  
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo '📥 Checking out source code...'
                checkout scm
                git branch: 'main', url: 'https://github.com/DhanushNadar/Argoify.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                sh '''
                    docker build -t $IMAGE_NAME:$BUILD_NUMBER .
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                echo '📤 Pushing Docker image to DockerHub...'
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh '''
                        echo "$PASSWORD" | docker login -u "$USERNAME" --password-stdin
                        docker push $IMAGE_NAME:$BUILD_NUMBER
                    '''
                }
            }
        }

        stage('Update Kubernetes Manifest') {
            steps {
                echo '📝 Updating deployment manifest with new image tag...'
                sh '''
                    sed -i 's|image: .*$|image: '"$IMAGE_NAME:$BUILD_NUMBER"'|' manifests/stable-deploy.yml
                '''
            }
        }

        stage('Commit and Push Changes') {
            steps {
                echo '🔄 Committing updated manifest to GitHub...'
                withCredentials([usernamePassword(credentialsId: 'github-credentials-id', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                    sh '''
                        git config user.name "$GIT_USERNAME"
                        git config user.email "3701dhanushsvjc@gmail.com"
                        git add manifests/deployment.yml
                        git commit -m "Update deployment image to build $BUILD_NUMBER"
                        git push https://$GIT_USERNAME:$GIT_PASSWORD@github.com/DhanushNadar/Argoify.git main
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment pipeline completed successfully!'
        }
        failure {
            echo '❌ Deployment pipeline failed.'
        }
    }
}
