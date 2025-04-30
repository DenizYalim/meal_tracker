from datetime import datetime
import json

"""class Nutrition:
    def __init__(self, name):
        self.name = name
"""

class Meal:
    def __init__(self, name):
        self.name = name
        self.calories = 0
        self.nutritions = {}

    def set_nutritions(self, n_list):
        self.nutritions = n_list

    def set_calories(self, calories):
        self.calories = calories


class RecipeList:
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(RecipeList, cls).__new__(cls)
            cls.recipeList = []
        return cls.instance
    
    def __init__(self):
        pass

    def get_recipe(self, name, calories = None, nutritions = None):
        if not any(m.name == name for m in self.recipeList):
            self.add_recipe(name)

        for recipe in self.recipeList:
            if recipe.name == name:
                return recipe
        
    
    def add_recipe(self, name, calories = None, nutritions = None):
        """if any(name == m.name for m in self.recipeList):
            return"""
        self.remove_recipe(name)

        m = Meal(name)
        m.set_nutritions(nutritions)
        m.set_calories(calories)

        self.recipeList.append(m)
    
    def remove_recipe(self, name):
        for r in self.recipeList:
            if r.name == name:
                self.recipeList.remove(r)
    
    def get_recipeList(self):
        recipes = [{"name": m.name, "calories": m.calories, "nutritions": m.nutritions} for m in self.recipeList]
        json_output = json.dumps(recipes, indent=4)  # Pretty formatting (optional) 
        return json_output

"""    def edit_recipe(self, name, calories = None, nutritions = None, delete = None):
        self.remove_recipe(name)
"""
  
class Day:
    def __init__(self, date = None):
        if date != None:
            self.date = date
        else:
            self.date = datetime.today().date()
        self.meals = {}
    
    def set_meal(self, meal_name, grams): # meal patlayabilir
        recipeList = RecipeList()
        meal_obj = recipeList.get_recipe(meal_name)
        self.meals[meal_obj] = grams

    def get_day(self):
        return json.dumps({
            'date': str(self.date),
            'meals': {meal.name: {'grams': grams, "nutritions": meal.nutritions} for meal, grams in self.meals.items()}
        }, indent=4)

class Calendar:
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(Calendar,cls).__new__(cls)
            cls.day_list = {}
        return cls.instance
    
    def add_day(day : Day, date : datetime = None):
        if date == None:
            date = datetime.today().date()
        self.instance[date] = day
    
    def get_day(date = None):
        if date == None:
            date = datetime.today().date()
        
        return self.day_list[date].get_day()

if __name__ == "__main__":
    recipeList = RecipeList()
    recipeList.add_recipe("tost", 244, {"prot": 12, "asd": 22})
     

    day = Day()
 
    day.set_meal("tost", 100)
     

    print(recipeList.get_recipeList())