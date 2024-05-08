import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { NavigationComponent } from "./layout/navigation/navigation.component";
import { LibraryCardComponent } from "./layout/library/library-card/library-card.component";
import { HeaderComponent } from "./layout/header/header.component";
import { ToastService } from './service/toast.service';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastInfo } from './service/model/toast-info.model';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, FontAwesomeModule, NavigationComponent, LibraryCardComponent, HeaderComponent, NgbToast]
})
export class AppComponent implements OnInit{
  public title: string = 'spotify-clone-front';
  private faIconLibrary = inject(FaIconLibrary);
  toastService = inject(ToastService);

  ngOnInit(): void {
    this.initFontAwesome();
    this.toastService.show("Welcome to Spotify Clone", "SUCCESS");
  }

  public initFontAwesome(): void {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }

}
