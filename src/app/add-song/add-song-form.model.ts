import { FormControl } from "@angular/forms"

export type CreateSongFormContent = {
  title: FormControl<String>,
  author: FormControl<String>,
  cover: FormControl<File | null>,
  file: FormControl<File | null>
}