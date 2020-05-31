# user name and password to local db
POSTGRES_USER ?= stellarguard
POSTGRES_PASSWORD ?= stellarguard

help: ## Show this help
help:
	@grep -E '^[a-zA-Z0-9._-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

docker-start: ## Starts the postgres and redis docker containers in daemon mode
docker-start: 
	docker start stellarguard-postgres || docker run --name stellarguard-postgres -p 5432:5432 -e POSTGRES_USER=$(POSTGRES_USER) -e POSTGRES_PASSWORD=$(POSTGRES_USER) -d postgres
	docker start stellarguard-redis || docker run --name stellarguard-redis -p 6379:6379 -d redis:4

docker-stop: ## Stops the postgres and redis docker containers
docker-stop:
	docker stop stellarguard-postgres
	docker stop stellarguard-redis
