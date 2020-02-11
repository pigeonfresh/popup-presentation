import ko, { Observable } from 'knockout';

export class Model {
  public static showPopup: Observable<boolean> = ko.observable(false);
}
