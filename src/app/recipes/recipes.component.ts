import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {

  public selectedRecipe!: Recipe;

  constructor() {}

  ngOnInit(): void {
    // subscribe function to listen to event that has been emitted
    // this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // })
  }

  // public onRecipeWasSelected(recipe: Recipe){
  //   this.selectedRecipe = recipe;
  // }

}
