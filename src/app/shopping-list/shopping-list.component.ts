import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from "./shopping-list.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  public ingredients: Ingredient[] = [new Ingredient('Apple',10), new Ingredient('Lemon',5), new Ingredient('Orange',20)];

  private destroy: Subject<void> = new Subject<void>;

  constructor( private shoppingListService: ShoppingListService  ) { }


  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.getIngredientsChanged().pipe(
      takeUntil(this.destroy) 
    ).subscribe((ingredients: Ingredient[]) => {
      console.log(ingredients);
      
      this.ingredients = ingredients;
    })
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onEditItem(index: number){
    this.shoppingListService.startEditing(index);
  }

}
// OnDestroy pipe and subscribe. ngOnInit format