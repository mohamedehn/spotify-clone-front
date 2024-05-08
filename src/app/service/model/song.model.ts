export interface TitleVO {
  value?: String;
}

export interface AuthorVO {
  value?: String;
}

export interface SongBase {
  publicId?: String;
  title?: TitleVO;
  author?: AuthorVO;
}

export interface SaveSong extends SongBase {
  file?: File;
  fileContentType?: String;
  cover?: File;
  coverContentType?: String;
}