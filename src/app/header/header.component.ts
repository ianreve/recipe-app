import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 //          Declation                                  Assignment Value
  // @Output()  featureSelected: EventEmitter<string> = new EventEmitter()
 
  constructor( private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  // public onSelect(feature: string){
  //   //   Emit event to the parent component
  //   this.featureSelected.emit(feature);
  // }

  public onSaveData(){
    this.dataStorageService.storeRecipes().subscribe();
    
  }

  public onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe( data => { 
      console.log(data);
    });
  }


}
