from pickletools import pytuple

from pymongo import MongoClient
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from get_db import retrieve_all_from_mongo
from createOrder import update_items_in_db

app = Flask(__name__)
CORS(app)

# If you're using Flask-Dotenv for environment variables
from dotenv import load_dotenv
load_dotenv()

# Retrieve the MongoDB URI from environment variables or directly
MONGO_URI = os.getenv('MONGO_URI', 'your-mongo-db-connection-string')
#MONGO_URI = "mongodb+srv://jdcabusas201:PHRwUbvQzs3xym3I@testdb.qhgmw.mongodb.net/?retryWrites=true&w=majority&appName=testdb"
client = MongoClient(MONGO_URI)
db = client.testdb  # Default to the database in the URI

@app.route('/')
def index():
    # Test MongoDB connection
    collection = db.my_collection
    collection.insert_one({"test": "data"})
    return "Connected to MongoDB!"

@app.route('/get_all_data', methods=['GET'])
def get_all_data():
    # Call the function to retrieve all data from MongoDB
    data = retrieve_all_from_mongo()

    # Return the data as JSON to the frontend
    return jsonify(data)

@app.route('/create_order', methods=['POST'])
def create_order():
    # Get the JSON data sent from the frontend
    order_data = request.get_json()

    # If no data is received
    if not order_data:
        return jsonify({"message": "No data received"}), 400

    # Print the received data to the console for debugging
    print("Received Order Data:", order_data)

    # Check if 'items' key exists in the received order_data and extract the list
    if 'items' in order_data:
        items = order_data['items']
        # Now pass the extracted list of items to update_items_in_db
        update_items_in_db(items)
    else:
        return jsonify({"message": "Missing 'items' key in the order data"}), 400

    # Return a response indicating the data was received and printed
    return jsonify({"message": "Order data received and printed to console."}), 200

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
