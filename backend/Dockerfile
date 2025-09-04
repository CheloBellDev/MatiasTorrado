FROM python:3.11-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1 \
PYTHONUNBUFFERED=1
WORKDIR /app


# Dependencias del sistema mínimas
RUN apt-get update && apt-get install -y --no-install-recommends \
build-essential \
&& rm -rf /var/lib/apt/lists/*


COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt \
&& pip install --no-cache-dir gunicorn


# Copiá el backend
COPY . .


# (Opcional) collectstatic si tenés static; con EmailBackend consola no hace falta
# RUN python manage.py collectstatic --noinput || true


# Gunicorn
EXPOSE 8000
CMD ["gunicorn", "nutriapp.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--timeout", "60"]