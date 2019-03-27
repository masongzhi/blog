TAG = $(shell date +%Y%m%d%H%M%S)
BETA_TAG=beta
LASTEST_TAG=latest
REGISTRY=masongzhi
NAME=blog
BRANCH_NAME=$(shell git rev-parse --abbrev-ref HEAD)

base:
	echo building ${NAME}-base:latest
	cp docker/base/Dockerfile .
	docker build -t ${REGISTRY}/${NAME}-base:latest .
	rm Dockerfile
	docker push ${REGISTRY}/${NAME}-base:latest

prod:
	echo building ${NAME}:prod
	cp docker/prod/Dockerfile .
	docker build -t ${REGISTRY}/${NAME}:${TAG} .
	docker tag ${REGISTRY}/${NAME}:${TAG} ${REGISTRY}/${NAME}:prod
	rm Dockerfile
	docker push ${REGISTRY}/${NAME}:${TAG} && docker push ${REGISTRY}/${NAME}:prod
