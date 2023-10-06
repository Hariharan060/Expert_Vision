import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css']
})
export class FlashComponent implements OnInit {
  @Input() Time!:string;
  showMessage: boolean = false;
  targetTime!: Date;
  displayDuration: number = 1* 60 * 1000;

  ngOnInit() {
    this.startFlashMessage();
  }

  startFlashMessage() {
    this.targetTime = new Date(this.Time);

    const currentTime = new Date().getTime();
    const targetTime = this.targetTime.getTime();


    if (currentTime >= targetTime && currentTime <= targetTime + this.displayDuration) {
      this.showMessage = true;

      const remainingTime = targetTime + this.displayDuration - currentTime;
      setTimeout(() => {
        this.showMessage = false;
      }, remainingTime);
    }
  }
}
