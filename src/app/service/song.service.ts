import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { State } from './model/state.model';
import { ReadSong, SaveSong } from './model/song.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  public http = inject(HttpClient);
  private add$: WritableSignal<State<SaveSong, HttpErrorResponse>> =
    signal(State.Builder<SaveSong, HttpErrorResponse>().forInit().build());
  public addSig = computed(() => this.add$());
  private getAll$: WritableSignal<State<Array<ReadSong>, HttpErrorResponse>> =
    signal(State.Builder<Array<ReadSong>, HttpErrorResponse>().forInit().build());
  public getAllSig = computed(() => this.getAll$());

  constructor() { }

  add(song: SaveSong): void {
    const formData = new FormData();
    formData.append('cover', song.cover!);
    formData.append('file', song.file!);
    const clone = structuredClone(song);
    clone.cover = undefined;
    clone.file = undefined;
    formData.append('dto', JSON.stringify(clone));
    this.http.post<SaveSong>(`${environment.API_URL}/api/songs`, formData)
      .subscribe({
        next: savedSong => this.add$.set(State.Builder<SaveSong, HttpErrorResponse>().forSuccess(savedSong).build()),
        error: err => this.add$.set(State.Builder<SaveSong, HttpErrorResponse>().forError(err).build())
    })
  }

  getAll(): void {
    this.http.get<Array<ReadSong>>(`${environment.API_URL}/api/songs`)
      .subscribe({
        next: songs => this.getAll$.set(State.Builder<Array<ReadSong>, HttpErrorResponse>().forSuccess(songs).build()),
        error: err => this.getAll$.set(State.Builder<Array<ReadSong>, HttpErrorResponse>().forError(err).build())
      });
  }

  reset(): void {
    this.add$.set(State.Builder<SaveSong, HttpErrorResponse>().forInit().build());
  }

}
