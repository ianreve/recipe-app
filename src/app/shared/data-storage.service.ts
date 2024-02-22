import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { Recipe } from "../recipes/recipe.model";

@Injectable({providedIn: 'root'})
export class DataStorageService{

    constructor( private http: HttpClient, private recipeService: RecipeService ){ }

    public storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://ian-recipe-app-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes);

    }

    public fetchRecipes(){
        // specify the type of data that we recieve using generics <Type>
        return this.http.get<Recipe[]>('https://ian-recipe-app-default-rtdb.europe-west1.firebasedatabase.app/recipes.json').pipe(
            tap( recipes => this.recipeService.setRecipes(recipes)
        ));
    }
    
}