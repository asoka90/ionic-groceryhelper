import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(private router : Router, private menu : MenuController, private anmteCtrl : AnimationController ) {
   }
  
  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['home'])
      }, 3000);

    
  }

  ionViewWillEnter(){
    this.menu.enable(false);
    const animate = this.anmteCtrl.create()
      .addElement(document.querySelector('.container'))
      .duration(2000)
      .iterations(1)
      .fromTo('transform', 'translateY(100px)', 'translateY(0px)')
      .fromTo('opacity', '0.2', '1');

    animate.play();
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
