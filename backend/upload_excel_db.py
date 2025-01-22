import pandas as pd
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# MongoDB URI
MONGO_URI = os.getenv("MONGO_URI",
                      "mongodb+srv://jdcabusas201:PHRwUbvQzs3xym3I@testdb.qhgmw.mongodb.net/testdb?retryWrites=true&w=majority&appName=testdb")
client = MongoClient(MONGO_URI)

# Specify the database and collection name
db = client.testdb  # Replace 'testdb' with your database name
collection = db.test_collection  # Replace 'my_collection' with your desired collection name


def upload_excel_to_mongo(excel_file_path):
    try:
        # Read the Excel file into a pandas DataFrame
        df = pd.read_csv(excel_file_path)

        # Convert DataFrame to list of dictionaries (records)
        data = df.to_dict(orient='records')

        # Insert the data into MongoDB collection
        collection.insert_many(data)

        print(f"Successfully inserted {len(data)} records into MongoDB collection: {collection.name}")

    except Exception as e:
        print(f"Error: {str(e)}")


if __name__ == "__main__":
    # Path to the Excel file
    excel_file_path = "sample.csv"

    # Upload Excel file data to MongoDB
    upload_excel_to_mongo(excel_file_path)
