import { Component, getModuleFactory, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(private router : Router, private menu : MenuController) {
   }
  
  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['checklist'])
      }, 3000);
  }

  ionViewWillEnter(){
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
