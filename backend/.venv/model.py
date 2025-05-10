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

        if grams == 0:
            self.meals.pop(meal_obj) # Delete the meal if grams are set to 0

    def get_day(self):
        return json.dumps({
            'date': str(self.date),
        'meals': {meal.name: { 'grams': grams,  'nutritions': {nutrition: gram*grams/100 for nutrition, gram in (meal.nutritions or {}).items()}} for meal, grams in self.meals.items() }}, indent=4)
        
    def calculate_totals(self):
        totals = {}
        for meal, grams in self.meals.items():
            for n, val in meal.nutritions.items():
                totals[n] = totals.get(n, 0) + val * grams / 100
        return totals




class Calendar:
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(Calendar,cls).__new__(cls)
            cls.day_list = {}
        return cls.instance
        
    def add_meal_to_day(self, date : None, meal_name, grams):
        self.get_day(date)
        
        self.day_list[date].set_meal(meal_name, grams)
    
    def get_day(self, date=None):
        if date is None:
            date = datetime.today().date()

        if date not in self.day_list or self.day_list[date] is None:
            self.day_list[date] = Day(date)
        
        return self.day_list[date].get_day()  # Call the method to return JSON
    
    def calculate_totals(self, date = None):
        if date is None:
            date = datetime.today().date()

        self.get_day(date)

        return self.day_list[date].calculate_totals()

if __name__ == "__main__":
    recipeList = RecipeList()
    recipeList.add_recipe("tost", 244, {"prot": 12, "asd": 22})
    
    print(recipeList.get_recipeList())
