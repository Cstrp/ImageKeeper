import * as moment from 'moment';

export interface Image {
  id?: string;
  public_id?: string;

  url?: string;
  label?: string;
  preview?: string;
  progress?: number;

  created_at?: moment.Moment;
  updated_at?: moment.Moment;
}
