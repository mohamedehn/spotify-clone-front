import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SaveSong } from '../service/model/song.model';
import { SongService } from '../service/song.service';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';

type FlowStatus = "init" | "validation-file-error" | "validation-cover-error" | "error" | "success";

@Component({
  selector: 'app-add-song',
  standalone: true,
  imports: [ReactiveFormsModule, NgbAlertModule, FontAwesomeModule],
  templateUrl: './add-song.component.html',
  styleUrl: './add-song.component.scss'
})
export class AddSongComponent {

  public songToCreate: SaveSong = {}
  private formBuilder = inject(FormBuilder);
  private songService = inject(SongService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  isCreating: boolean = false;
  flowStatus: FlowStatus = "init";

}
