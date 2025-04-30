from flask import Flask
from flasgger import Swagger
# from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS # Cross Origin Request


app = Flask(__name__)
swagger = Swagger(app)
CORS(app) # disables CORS error

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
# app.config["SQLAlCHEMY_TRACK_MODIFICATIONS"] = False

# db = SQLAlchemy(app) # Creats db instance of sqlite:///mydatabase.db

