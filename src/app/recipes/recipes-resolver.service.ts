import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Observable, of } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
    
    constructor( private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> {

       const recipes = this.recipeService.getRecipes();
       if( recipes.length === 0 ){
            return this.dataStorageService.fetchRecipes();
       } else{
        return of(recipes); // 'of' converts everything to an Observable
       }
    }
    
}