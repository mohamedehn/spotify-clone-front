import { Component, effect, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SongCardComponent } from './song-card/song-card.component';
import { SongService } from '../service/song.service';
import { ToastService } from '../service/toast.service';
import { ReadSong } from '../service/model/song.model';
import { SongContentService } from '../service/song-content.service';
import { FavoriteSongCardComponent } from './favorite-song-card/favorite-song-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, SongCardComponent, FavoriteSongCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private songService = inject(SongService);
  private toastService = inject(ToastService);
  private songContentService = inject(SongContentService);
  public allSongs: Array<ReadSong> | undefined;
  isLoading: boolean = false;

  constructor() {
    this.isLoading = true;
    effect(() => {
      const allSongsResponse = this.songService.getAllSig();
      if (allSongsResponse.status === "OK") {
        this.allSongs = allSongsResponse.value;
      } else if (allSongsResponse.status === "ERROR") {
        this.toastService.show("An error occured when fetching all songs", "DANGER");
      }
      this.isLoading = false;
    });
  }

  onPlaySong(songToPlayFirst: ReadSong): void {
    this.songContentService.createNewQueue(songToPlayFirst, this.allSongs!);
  }

}