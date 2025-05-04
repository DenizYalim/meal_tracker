from flask import request, jsonify
from model import Meal, RecipeList, Day, Calendar
from config import app, swagger


@app.route("/recipeList", methods=["GET"])
def get_recipeList():
    recipeList = RecipeList()
    return recipeList.get_recipeList()

@app.route("/addrecipe", methods=["POST"])
def add_recipe():
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

    calendar = Calendar()
    return calendar.get_day(date)

@app.route("/addDay", methods=["POST"])
def add_day():
    date = "todo"
    pass

if __name__ == '__main__':
    app.run(debug=True)
