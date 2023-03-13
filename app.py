import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
try:
    # reflect an existing database into a new model
    Base = automap_base()
    
    engine = create_engine("sqlite:///static/data/iWars.sqlite")

    
    # reflect the tables
    Base.prepare(autoload_with=engine)
    print("All about that base")
    print(Base)
    # Save reference to the table
    tribes = Base.classes.Tribes
    print("Tribes: ")
    stmt = "select([Tribes.c.TribeName])"
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            print(f"{row.TribeName}")

    warsTable = Base.classes.Wars
    print("yes no maybe")
except Exception as e:
    print("Hey what's up looks like something gnarly happened")
    print(e)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        # f"/api/v1.0/tribes<br/>"
        f"/api/v1.0/listwars<br/>"
    )

@app.route("/api/v1.0/listwars")
def warsRoute():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all
    results = session.query(warsTable.WarID).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_passengers = []
    for id in results:
        wars_dict = {}
        wars_dict["id"] = id
        all_passengers.append(wars_dict)

    return jsonify(all_passengers)


if __name__ == '__main__':
    app.run(debug=True)

# @app.route("/api/v1.0/tribes")
# def tribes():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of all passenger names"""
#     # Query all passengers
#     results = session.query(tribes.TribeName).all()

#     session.close()

#     # Convert list of tuples into normal list
#     all_tribes = list(np.ravel(results))

#     return jsonify(all_tribes)

# @app.route("/api/v1.0/getname/<name>")
# def getnames(name):
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     #Return a list of all passenger names
#     # Query all passengers
#     results = session.query(Passenger.name).filter(Passenger.name == name).all()

#     session.close()

#     # Convert list of tuples into normal list
#     all_names = list(np.ravel(results))

#     return jsonify(all_names)


