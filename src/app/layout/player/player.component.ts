import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SmallSongCardComponent } from '../../shared/small-song-card/small-song-card.component';
import { SongContentService } from '../../service/song-content.service';
import { SongContent } from '../../service/model/song.model';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, SmallSongCardComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  songContentService = inject(SongContentService);

  public currentSong: SongContent | undefined = undefined;
}
