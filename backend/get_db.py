from pymongo import MongoClient
import os
#from dotenv import load_dotenv
from bson import ObjectId

# Load environment variables from .env file
#load_dotenv()

# MongoDB URI
MONGO_URI = os.getenv("MONGO_URI","mongodb+srv://jdcabusas201:PHRwUbvQzs3xym3I@testdb.qhgmw.mongodb.net/testdb?retryWrites=true&w=majority&appName=testdb")
import os
import certifi  # Ensure certifi is installed
from bson import ObjectId

# Load environment variables from .env file (if used)
# from dotenv import load_dotenv
# load_dotenv()

# MongoDB URI
MONGO_URI = os.getenv("MONGO_URI",
                      "mongodb+srv://jdcabusas201:PHRwUbvQzs3xym3I@testdb.qhgmw.mongodb.net/testdb?retryWrites=true&w=majority&appName=testdb")

# Initialize MongoClient with certifi's CA bundle
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())

# Specify the database and collection name
db = client.testdb  # Replace 'testdb' with your database name
collection = db.test_collection  # Replace 'test_collection' with your collection name

def convert_objectid_to_str(document):
    """
    Converts ObjectId fields to strings for JSON serialization.
    """
    if isinstance(document, dict):
        return {
            key: convert_objectid_to_str(value) if isinstance(value, dict) else str(value) if isinstance(value, ObjectId) else value
            for key, value in document.items()
        }
    elif isinstance(document, list):
        return [convert_objectid_to_str(item) for item in document]
    else:
        return document

def retrieve_all_from_mongo():
    try:
        data = list(collection.find({}, {"_id": 0}))  # Exclude '_id' field
        return data
    except Exception as e:
        print(f"Error fetching data from MongoDB: {str(e)}")
        return []

# For testing purposes
if __name__ == "__main__":
    data = retrieve_all_from_mongo()
    print(data)


client = MongoClient(MONGO_URI)

# Specify the database and collection name
db = client.testdb  # Replace 'testdb' with your database name
collection = db.test_collection  # Replace 'my_collection' with your collection name


def convert_objectid_to_str(document):
    """
    This function converts the _id field in the document to a string
    so that it can be serialized to JSON.
    """
    if isinstance(document, dict):
        return {key: convert_objectid_to_str(value) if isinstance(value, dict) else str(value) if isinstance(value,
                                                                                                             ObjectId) else value
                for key, value in document.items()}
    elif isinstance(document, list):
        return [convert_objectid_to_str(item) for item in document]
    else:
        return document


def retrieve_all_from_mongo():
    try:
        data = list(collection.find({}))

        # Remove '_id' from each document
        for item in data:
            item.pop('_id', None)  # Remove '_id' if it exists

        return data

    except Exception as e:
        print(f"Error: {str(e)}")
        return []
