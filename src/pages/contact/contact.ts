import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing, SocialSharingOriginal } from '@ionic-native/social-sharing';




@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  title = "Grocery";

  items =[];
  errorMessage: string;
  

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController,public dataService: GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharingOriginal) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }

  ionViewDidload(){
    this.loadItems();
  }

  loadItems(){
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error);
  }

  removeItem(id){
    this.dataService.removeItem(id);
  }

  ShareItem(item){
    console.log("Share Item -",item);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item -' + item.name + " ...",
      duration: 3000
    });

    toast.present();

    let message = "Grocery Item - Name:" + item.name + " - Quantity: " + item.quatity;
    let subject = "Shared via Groceries app";

    this.socialSharing.share(message, subject).then(() => {
      //sharing via email is possible
      console.log("Shared successfully");
    }).catch((error) => {
      console.error("Error while sharing ", error);
    });

  }

  editItem(item,index){
    console.log("Edit Item -",item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);
  }
  
  addItem(){
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  
  }
  



  showAddItemPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Groceries Cart',
      message: "Please enter the item to your cart",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item);
            this.dataService.addItem(item);
          }
        }
      ]
      
    });
    prompt.present();
    
  }

  showEditItemPrompt(item,index) {
    const prompt = this.alertCtrl.create({
      title: 'Groceries Cart',
      message: "Please enter the item to your cart",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',   
          handler: item => {
            console.log('Saved clicked', item);
            this.dataService.editItem(item,index);
          }
        }
      ]
      
    });
    prompt.present();
    
  }

  loaditem(){
    return this.dataService.getItems();
  }

  

}







 /*addItem(){
    console.log("Adding Item");
    this.showAddItemPrompt();
    
  } */

  /* showRadio(item,index) {
    let alert = this.alertCtrl.create();
    alert.setTitle(item.name);
    const quantities = ['1', '2', '3', '4','5','6','7','8','9','10'];

    quantities.forEach(quantity => {
        alert.addInput({
            type: 'radio',
            label: quantity,
            value: quantity.toLowerCase(),
            checked: false
        });
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: item => {
        console.log('Saved clicked Item', item);
        this.dataService.editQuantity(item,index);
        
      }
    });
    alert.present();

  }*/

  /* removeItem(item,index){
    console.log("Removing Item - ",item, index);
    const toast = this.toastCtrl.create({
      message: item.name + " " +  "was removed successfully",
      duration: 3000
    });
    toast.present();
    this.dataService.removeItem(index);
  } */