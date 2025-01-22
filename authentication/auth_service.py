from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import os
import jwt
import datetime
from functools import wraps
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Secret key for JWT encoding/decoding
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_secret_key_here')  # Replace with a secure key in production

# File to store user credentials
USERS_FILE = 'users.txt'

def load_users():
    users = {}
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'r') as f:
            for line in f:
                if ':' in line:
                    username, password_hash = line.strip().split(':', 1)
                    users[username] = password_hash
    return users

def save_user(username, password_hash):
    with open(USERS_FILE, 'a') as f:
        f.write(f"{username}:{password_hash}\n")

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # JWT is expected in the Authorization header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            parts = auth_header.split()
            if len(parts) == 2 and parts[0] == 'Bearer':
                token = parts[1]

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = data['username']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401

        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Username and password are required!'}), 400

    username = data['username']
    password = data['password']

    users = load_users()
    if username in users:
        return jsonify({'message': 'User already exists!'}), 400

    password_hash = generate_password_hash(password)
    save_user(username, password_hash)

    return jsonify({'message': 'User registered successfully!'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Username and password are required!'}), 400

    username = data['username']
    password = data['password']

    users = load_users()
    password_hash = users.get(username)

    if not password_hash or not check_password_hash(password_hash, password):
        return jsonify({'message': 'Invalid credentials!'}), 401

    token = jwt.encode({
        'username': username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({'token': token}), 200

@app.route('/protected', methods=['GET'])
@token_required
def protected(current_user):
    return jsonify({'message': f'Hello, {current_user}! This is a protected route.'}), 200

if __name__ == '__main__':
    # Ensure the users file exists
    if not os.path.exists(USERS_FILE):
        open(USERS_FILE, 'w').close()
    app.run(host='0.0.0.0', port=5001)
