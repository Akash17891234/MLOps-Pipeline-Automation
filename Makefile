.PHONY: help install test lint train deploy clean

help:
	@echo "MLOps Pipeline Commands"
	@echo "======================="
	@echo "install     - Install dependencies"
	@echo "test        - Run tests"
	@echo "lint        - Run linters"
	@echo "train       - Train model"
	@echo "deploy      - Deploy services"
	@echo "clean       - Clean artifacts"

install:
	pip install -r requirements-ml.txt
	pip install -r requirements-dev.txt

test:
	pytest tests/ --cov=src --cov-report=html

lint:
	black src/ scripts/
	flake8 src/ scripts/ --max-line-length=100
	mypy src/ --ignore-missing-imports

train:
	python scripts/train_model.py

deploy:
	docker-compose up -d

stop:
	docker-compose down

logs:
	docker-compose logs -f

clean:
	rm -rf mlruns/ mlartifacts/ data/models/*.pkl
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete

setup-mlflow:
	python scripts/setup_mlflow.py

setup-dvc:
	python scripts/dvc_setup.py

monitor:
	python scripts/monitor_model.py

check-drift:
	python scripts/check_drift.py
