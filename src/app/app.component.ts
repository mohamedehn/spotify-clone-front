import { Component, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { NavigationComponent } from "./layout/navigation/navigation.component";
import { LibraryCardComponent } from "./layout/library/library-card/library-card.component";
import { HeaderComponent } from "./layout/header/header.component";
import { ToastService } from './service/toast.service';
import { NgbModal, NgbModalRef, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastInfo } from './service/model/toast-info.model';
import { PlayerComponent } from './layout/player/player.component';
import { AuthPopupState, AuthService } from './service/auth.service';
import { AuthPopupComponent } from './layout/auth-popup/auth-popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, FontAwesomeModule, NavigationComponent, LibraryCardComponent, HeaderComponent, NgbToast, PlayerComponent]
})
export class AppComponent implements OnInit {
  public title: string = 'spotify-clone-front';
  private faIconLibrary = inject(FaIconLibrary);
  toastService = inject(ToastService);
  private authService = inject(AuthService);
  private modalService = inject(NgbModal);
  private authModalRef: NgbModalRef | null = null;

  constructor() {
    effect(() => {
      this.openOrCloseAuthModal(this.authService.authPopupStateChange());
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.initFontAwesome();
    this.toastService.show("Welcome to Spotify Clone", "SUCCESS");
  }

  public initFontAwesome(): void {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }

  private openOrCloseAuthModal(state: AuthPopupState): void {
    if (state === "OPEN") {
      this.openAuthPopup()
    } else if (this.authModalRef !== null && state === 'CLOSE' && this.modalService.hasOpenModals()) {
      this.authModalRef.close();
    }
  }

  private openAuthPopup(): void {
    this.authModalRef = this.modalService.open(AuthPopupComponent, { ariaDescribedBy: 'authentification-modal', centered: true });
    this.authModalRef.dismissed.subscribe({
      next: () => {
        this.authService.openOrCloseAuthPopup("CLOSE");
      }
    });
    this.authModalRef.closed.subscribe({
      next: () => {
        this.authService.openOrCloseAuthPopup("CLOSE");
      }
    })
  }

}