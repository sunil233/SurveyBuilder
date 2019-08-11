import { Component } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  title = 'Survey Builder';

  ngOnInit() {
    $(document).on('click', '[href="#"]', e => e.preventDefault());
  }
}
