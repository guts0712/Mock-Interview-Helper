from dotenv import load_dotenv
import os
load_dotenv()

url = os.getenv("database_url")
api = os.getenv("api_key")
secret_key = os.getenv("secret_key")