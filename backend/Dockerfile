# Stage 1: Build stage
FROM python:3.10-slim AS build

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy the source code
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Compile Python files to bytecode (.pyc) (optional)
RUN python -m compileall .

# Stage 2: Final image with compiled files and dependencies
FROM python:3.10-slim AS final

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy all files from the build stage
COPY --from=build /app /app

# Reinstall Python dependencies to ensure they're available
RUN pip install --no-cache-dir -r requirements.txt

# Expose the application port (ensure it matches your Flask app's port)
EXPOSE 5000

# Set the entrypoint to execute the source file instead of bytecode
CMD ["python", "app.py"]
