# Stage 1: Build stage
FROM python:3.10-slim AS build

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y gcc

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY auth_service.py .

# (Optional) Compile Python files to bytecode
# RUN python -m compileall .

# Stage 2: Production stage
FROM python:3.10-slim AS final

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y libpq-dev && rm -rf /var/lib/apt/lists/*

# Copy installed packages from build stage
COPY --from=build /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages

# Copy application code
COPY auth_service.py .
COPY users.txt .

# Expose port
EXPOSE 5001

# Set the entrypoint to run the Flask app
CMD ["python", "auth_service.py"]
