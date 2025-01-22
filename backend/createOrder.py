import pymongo
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from bson import ObjectId
import json
import sys

# Function to update items in MongoDB by subtracting quantity based on the given JSON object
def update_items_in_db(json_object):
    try:
        # Load environment variables from .env file
        load_dotenv()

        # MongoDB URI
        MONGO_URI = os.getenv("MONGO_URI",
                              "mongodb+srv://jdcabusas201:PHRwUbvQzs3xym3I@testdb.qhgmw.mongodb.net/testdb?retryWrites=true&w=majority&appName=testdb")
        client = MongoClient(MONGO_URI)

        # Specify the database and collection name
        db = client.testdb  # Replace 'testdb' with your database name
        collection = db.test_collection  # Replace 'my_collection' with your collection name

        # Loop through the items in the provided JSON object
        if isinstance(json_object, list):  # Ensure the JSON object is a list
            for item in json_object:
                if isinstance(item, dict):  # Ensure each item is a dictionary
                    item_name = item.get("itemName")
                    quantity_to_subtract = int(item.get("quantity", 0))

                    if item_name and quantity_to_subtract is not None:
                        # Find the item in the database by matching "Item Name"
                        existing_item = collection.find_one({"Item Name": item_name})

                        if existing_item:
                            current_quantity = existing_item.get("Quantity", 0)
                            new_quantity = current_quantity - quantity_to_subtract

                            # Ensure the quantity does not go below zero
                            if new_quantity < 0:
                                new_quantity = 0

                            # Update the "Quantity" field with the new value
                            result = collection.update_one(
                                {"Item Name": item_name},  # Match document based on "Item Name"
                                {"$set": {"Quantity": new_quantity}}  # Set the new quantity
                            )

                            if result.matched_count > 0:
                                print(f"Updated item '{item_name}' to new quantity: {new_quantity}")
                            else:
                                print(f"No matching item found for '{item_name}'")
                        else:
                            print(f"Item '{item_name}' not found in the database.")

                    else:
                        print("Item does not have 'itemName' or 'quantity' field.")
                else:
                    print(f"Invalid item format: {item}. Expected a dictionary.")
        else:
            print("JSON object must be a list of items.")

    except Exception as e:
        print(f"Error: {e}")