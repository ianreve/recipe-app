import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  // View = HTML, Access the ID 
  // @ViewChild('nameInput') nameInputRef!: ElementRef;
  // @ViewChild('amountInput') amountInputRef!: ElementRef;

  public editMode = false;
  private editedItemIndex!: number;

  @ViewChild('form') shoppingListForm!: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListService.getStartEditing().subscribe( (index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      const ingredient = this.shoppingListService.getIngredientByIndex(index);
      this.shoppingListForm.setValue(ingredient);

      // this.editedItemIndex = index;
    })
  }

  onAddItem(form: NgForm) {

    // Format for usign viewChild
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);

    const formValue = form.value;
    const newIngredient = new Ingredient(formValue.name , formValue.amount );
    if (this.editMode){
      this.shoppingListService.updateIngredients(this.editedItemIndex, newIngredient)
    } 
    else{
    this.shoppingListService.addIngredient(newIngredient);
    }
    this.onClear();
  }

  onDeleteItem(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }


}
