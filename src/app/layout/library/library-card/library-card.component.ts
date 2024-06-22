import { Component, OnInit, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SmallSongCardComponent } from '../../../shared/small-song-card/small-song-card.component';
import { SongService } from '../../../service/song.service';
import { ReadSong } from '../../../service/model/song.model';
import { SongContentService } from '../../../service/song-content.service';

@Component({
  selector: 'app-library-card',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, SmallSongCardComponent],
  templateUrl: './library-card.component.html',
  styleUrl: './library-card.component.scss'
})
export class LibraryCardComponent implements OnInit {

  private songService = inject(SongService);
  public songs: Array<ReadSong> = [];
  private songContentService = inject(SongContentService);

  constructor() {
    effect(() => {
      if (this.songService.getAllSig().status === "OK") {
        this.songs = this.songService.getAllSig().value!;
      }
    })
  }

  ngOnInit(): void {
    this.fetchSongs();
  }

  private fetchSongs(): void {
    this.songService.getAll();
  }

  onPlaySong(songToPlayFirst: ReadSong): void {
    this.songContentService.createNewQueue(songToPlayFirst, this.songs!);
  }

}
