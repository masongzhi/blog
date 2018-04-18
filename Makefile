TAG = $(shell date +%Y%m%d%H%M%S)
FIXTAG=prod
BETA_TAG=beta
LASTEST_TAG=latest
REGISTRY=masongzhi
NAME=blog
BRANCH_NAME=$(shell git rev-parse --abbrev-ref HEAD)

buildBeta:
	docker build -t ${REGISTRY}/${NAME}:${TAG} .
	docker tag ${REGISTRY}/${NAME}:${TAG} ${REGISTRY}/${NAME}:${BETA_TAG}
	docker push ${REGISTRY}/${NAME}:${TAG} && docker push ${REGISTRY}/${NAME}:${BETA_TAG}
buildBranch:
	docker build -t ${REGISTRY}/${NAME}:${TAG} .
	docker tag ${REGISTRY}/${NAME}:${TAG} ${REGISTRY}/${NAME}:${BRANCH_NAME}
	docker push ${REGISTRY}/${NAME}:${TAG} && docker push ${REGISTRY}/${NAME}:${BRANCH_NAME}
buildProd:
	docker build -t ${REGISTRY}/${NAME}:${TAG} .
	docker tag ${REGISTRY}/${NAME}:${TAG} ${REGISTRY}/${NAME}:${FIXTAG}
	docker push ${REGISTRY}/${NAME}:${TAG} && docker push ${REGISTRY}/${NAME}:${FIXTAG}
autobuild:
	echo building ${NAME}:predev
	docker build -t ${REGISTRY}/${NAME}:predev .
	docker push "${REGISTRY}/${NAME}:predev"
