import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  private id!: number;
  private editMode!: boolean;
  public recipeForm!: UntypedFormGroup;

  constructor( private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params: Params) => {
      console.log(params);
      this.id = params['id'];
      this.editMode = this.id != null; // checks for null or undefined
      this.initForm();
    })
  }

  initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    // let array: any[] = []; 
    let recipeIngredients = new UntypedFormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new UntypedFormGroup({
            'name': new UntypedFormControl(ingredient.name, Validators.required),
            'amount': new UntypedFormControl(ingredient.amount,  [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/) ])
          }))
        }
      }
    }
    this.recipeForm = new UntypedFormGroup({
      'name': new UntypedFormControl(recipeName, Validators.required),
      'imagePath': new UntypedFormControl(recipeImagePath, Validators.required),
      'description': new UntypedFormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  public get ingredientCtrls(){
    console.log(this.recipeForm);
   return (<UntypedFormArray>this.recipeForm?.get('ingredients'))?.controls; // use of ? get the value of something if it is defined, if not don't get the value
  }

  public onSubmit(){
    console.log(this.recipeForm)
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.router.navigate(['/recipes']);
  }

  public onAddIngredient(){
    (<UntypedFormArray>this.recipeForm?.get('ingredients')).push(
      new UntypedFormGroup({
        'name': new UntypedFormControl(null , Validators.required),
        'amount': new UntypedFormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/) ])
      })
    )
    
  }
  public onDeleteIngredient(index: number) {
    (<UntypedFormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}







// Want a onSubmit function - needs to do a check if we're on EditMode or Not 
// If we're on EditMode, we want to call Update recipe on the recipe service (add update recipe function to the recipe service)
// If we're not on EditMode we want to call add Recipe on the recipe service