import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { ReadSong, SongContent } from './model/song.model';
import { State } from './model/state.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongContentService {

  http = inject(HttpClient);
  private queueToPlay$: WritableSignal<Array<ReadSong>> = signal([]);
  queueToPlay: Signal<ReadSong[]> = computed(() => this.queueToPlay$());
  private play$: WritableSignal<State<SongContent, HttpErrorResponse>>
    = signal(State.Builder<SongContent, HttpErrorResponse>().forInit().build());
  play: Signal<State<SongContent, HttpErrorResponse>> = computed(() => this.play$());

  constructor() { }

  createNewQueue(firstSong: ReadSong, songsToPlay: Array<ReadSong>): void {
    songsToPlay = songsToPlay.filter(song => song.publicId !== firstSong.publicId);
    if (songsToPlay) {
      songsToPlay.unshift(firstSong);
    }
    this.queueToPlay$.set(songsToPlay);
  }

  fetchNextSong(songToPlay: SongContent): void {
    const queryParam: HttpParams = new HttpParams().set('publicId', songToPlay.publicId!);
    this.http.get<SongContent>(`${environment.API_URL}/api/songs/get-content`, { params: queryParam })
      .subscribe({
        next: songContent => {
          this.mapReadSongToSongContent(songContent, songToPlay);
          this.play$.set(State.Builder<SongContent, HttpErrorResponse>().forSuccess(songContent).build());
        },
        error: error => {
          this.play$.set(State.Builder<SongContent, HttpErrorResponse>().forError(error).build());
        }
    })
  }

  mapReadSongToSongContent(songContent: SongContent, songToPlay: ReadSong): void {
    songContent.cover = songToPlay.cover;
    songContent.coverContentType = songToPlay.coverContentType;
    songContent.title = songToPlay.title;
    songContent.author = songToPlay.author;
    songContent.favorite = songToPlay.favorite;
  }
}
