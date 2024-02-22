import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  public recipes: Recipe[] = [];

  constructor( private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
   this.recipes = this.recipeService.getRecipes(); 

   this.recipeService.getRecipesChangedStream().subscribe(recipes => this.recipes = recipes ) // Update the component with the changeRecipe from the service
  }
  public onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
