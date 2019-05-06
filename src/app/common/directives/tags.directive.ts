import { Directive, HostListener, Input, ElementRef, OnInit, EventEmitter, Output, Renderer2 } from '@angular/core';


const placeholders = {
  'A': '^[a-zA-ZA-zА-яЁё]',
  '0': '\\d'
};

const keys = {
  'BACKSPACE': 8,
  'LEFT': 37,
  'RIGHT': 39,
  'DEL': 46,
  'ENTER':13,
  'SPACE': 32
};


interface IState {
  value: string;
}

@Directive({
  selector: '[tags]'
})
export class TagsDirective implements OnInit {

  Tags: string[] = [];
  String: string = '';

  constructor(private element: ElementRef, private renderer: Renderer2) {
    console.log(element);

  }

  @HostListener('input')
  public onChange(): void {
    this.String = this.getValue();
    // console.log(this.String);
  }

  // @HostListener('keypress', ['$event'])
  // public onKeyPress(event): void {
  //   const key = this.getKey(event);
  //   if(key === keys.BACKSPACE ||key === keys.LEFT || key === keys.RIGHT) return;
  // }

  @HostListener('keydown', ['$event'])
  public onKeyDown(event): void {
    const key = this.getKey(event);
    if((key === keys.ENTER)) {
      this.String += '';
    }
    if(key === keys.SPACE||key === keys.ENTER) {
      this.Tags = this.String.split(' ');
      this.renderer.setStyle(this.element.nativeElement, "background-color", "red");
    }
  }


  public ngOnInit(): void {
  }

  private getKey(event) {
    return event.keyCode || event.charCode;
  }

  private getValue(): string {
    return this.element.nativeElement.value;
  }

  private getCursorPosition(): number {
    return this.element.nativeElement.selectionStart;
  }



}
