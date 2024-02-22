import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipeService {

    // public recipeSelected = new EventEmitter<Recipe>(); 
    
    private recipes: Recipe[] = [];
    // [
    //     new Recipe('A test recipe',
    //      'this is a test',
    //       'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg',
    //       [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]),
    //     new Recipe('Big Burger',
    //       'Yum, a burger',
    //       'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg',
    //       [new Ingredient('Cheese', 1), new Ingredient('Bread', 20), new Ingredient('Meat', 1)])
    //   ];
      private recipesChanged = new Subject<Recipe[]>(); 

    constructor(private shoppingListService: ShoppingListService ){}

    public getRecipes(){
        return this.recipes.slice();
    }

    public getRecipeById(id: number){
        return this.recipes[id];
    }

    public addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
      }
    public addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }
    
      public updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
      }
      public getRecipesChangedStream() {
        return this.recipesChanged.asObservable();
      }

      public setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
}