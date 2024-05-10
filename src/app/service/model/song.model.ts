export interface TitleVO {
  value?: String;
}

export interface AuthorVO {
  value?: String;
}

export interface SongBase {
  publicId?: string;
  title?: TitleVO;
  author?: AuthorVO;
}

export interface SaveSong extends SongBase {
  file?: File;
  fileContentType?: string;
  cover?: File;
  coverContentType?: string;
}

export interface ReadSong extends SongBase{
  cover?: string;
  coverContentType?: string;
  favorite?: boolean;
  displayPlay?: boolean;
}