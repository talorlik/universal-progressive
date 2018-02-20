import { Component, OnInit } from '@angular/core';
import { TransferState, makeStateKey } from "@angular/platform-browser";

import { CatImage } from './cat-image.model';
import { Button } from './button.model';

const CATS_KEY = makeStateKey("cats");

@Component({
  selector: "app-img-card",
  templateUrl: "./img-card.component.html",
  styleUrls: ["./img-card.component.scss"]
})
export class ImgCardComponent implements OnInit {
  private image: CatImage = {
    message: "Progressive Web Cat",
    api: "https://cataas.com/cat/says/",
    fontsize: 40
  };

  public button: Button = {
    text: "Give me another cat",
    color: "primary",
    disabled: false
  };

  public src: string;

  constructor(private state: TransferState) {}

  ngOnInit() {
    this.generateSrc(null);

    if (!navigator.onLine) {
      this.button.text = "Sorry, you're offline";
      this.button.disabled = true;
    }
  }

  generateSrc(button: HTMLButtonElement): void {
      let now: number = null;
      this.src = this.state.get(CATS_KEY, null as string);
      console.log(this.src);

      if (button !== null) {
          now = Date.now();
      }
      let storedNow = localStorage.getItem("now");

      if (!this.src || (storedNow && +storedNow !== now)) {
        this.src = this.image.api + this.image.message + "?size=" + this.image.fontsize + "&ts=" + now;

        localStorage.setItem("now", ""+now);
        this.state.set(CATS_KEY, this.src as string);
      }
  }
}
