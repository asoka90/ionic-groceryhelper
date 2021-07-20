import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFabhide]',
  host: {
		'(ionScroll)': 'onContentScroll($event)'
	}
})
export class FabhideDirective {
  fabHide;
  constructor(private element: ElementRef, private render: Renderer2) {
    this.fabHide = document.getElementById("fab");
  }

  ngOnInit(){
    this.fabHide = document.getElementById("fab");
    this.render.setStyle(this.fabHide, "webkitTransition", "transform 500ms, opacity 500ms");
  }

  onContentScroll(event){
    if (event.detail.deltaY > 10) {
      console.log('UP');
      this.render.setStyle(this.fabHide, "opacity", "0");
      this.render.setStyle(this.fabHide, "webkitTransform", "scale3d(.1,.1,.1)");
    } else if (event.detail.deltaY < 0) {
      console.log('DOWN');
      this.render.setStyle(this.fabHide, "opacity", "1");
      this.render.setStyle(this.fabHide, "webkitTransform", "scale3d(1,1,1)");
    }
  }

}
