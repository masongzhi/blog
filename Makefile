TAG = $(shell date +%Y%m%d%H%M%S)
BETA_TAG=beta
LASTEST_TAG=latest
REGISTRY=masongzhi
NAME=blog
BRANCH_NAME=$(shell git rev-parse --abbrev-ref HEAD)

base:
	echo building ${NAME}-base:latest
	cp docker/baseDockerfile ./Dockerfile
	docker build -t ${REGISTRY}/${NAME}-base:latest .
	rm Dockerfile
	docker push ${REGISTRY}/${NAME}-base:latest
beta:
	echo building ${NAME}:${BETA_TAG}
	cp docker/prodDockerfile ./Dockerfile
	docker build -t ${REGISTRY}/${NAME}:${TAG} .
	docker tag ${REGISTRY}/${NAME}:${TAG} ${REGISTRY}/${NAME}:${BETA_TAG}
	docker push ${REGISTRY}/${NAME}:${TAG} && docker push ${REGISTRY}/${NAME}:${BETA_TAG}
prod:
	echo building ${NAME}:prod
	docker build -t ${REGISTRY}/${NAME}:${TAG} .
	docker tag ${REGISTRY}/${NAME}:${TAG} ${REGISTRY}/${NAME}:prod
	docker push ${REGISTRY}/${NAME}:${TAG} && docker push ${REGISTRY}/${NAME}:prod
