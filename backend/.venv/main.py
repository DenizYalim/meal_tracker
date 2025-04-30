from flask import request, jsonify
from model import Meal, Day, RecipeList, Calendar
from config import app, swagger


@app.route("/recipeList", methods=["GET"])
def get_recipeList():
    """
    Get recipeList
    ---
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              name:
                type: string
              calories:
                type: number
              nutritions:
                type: object
    responses:
      200:
        description: todo
      400:
        description: todo
    """
    recipeList = RecipeList()
    return recipeList.get_recipeList()

@app.route("/addrecipe", methods=["POST"])
def add_recipe():
    """
    Add a new recipe
    ---
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              name:
                type: string
              calories:
                type: number
              nutritions:
                type: object
    responses:
      200:
        description: Recipe added successfully
      400:
        description: Missing name
    """
    recipeList = RecipeList()

    name = request.json.get("name")
    calories = request.json.get("calories")
    nutritions = request.json.get("nutritions")

    if not name:
        return jsonify({"error": "You must enter a name for this recipe"}), 400

    recipeList.add_recipe(name, calories, nutritions)
    print(recipeList.get_recipeList())
    return jsonify({"message": "All right"}), 200    

@app.route("/getDay/<int:date>", methods=["GET"])
def get_day(date):
    """
    Get get_day
    ---
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              name:
                type: string
              calories:
                type: number
              nutritions:
                type: object
    responses:
      200:
        description: todo
      400:
        description: todo
    """
    calendar = Calendar()
    return calendar.get_day(date)

@app.route("/addDay", methods=["POST"])
def add_day():
    """
    add day
    ---
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              name:
                type: string
              calories:
                type: number
              nutritions:
                type: object
    responses:
      200:
        description: todo
      400:
        description: todo
    """
    date = "todo"
    pass

if __name__ == '__main__':
    app.run(debug=True)
