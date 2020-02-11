import AbstractBlock from '../AbstractBlock';
import { Model } from 'app/data/model';


export default class AwesomeBlock extends AbstractBlock {
  public static readonly displayName:string = 'awesome-block';
  private button: HTMLButtonElement = this.getElement('[data-cta-button]');

  constructor(el:HTMLElement) {
    super(el);
    this.button.addEventListener('click', this.handleButtonClick);
  }

  private handleButtonClick = (): void => {
    Model.showPopup(true);
  };

  public dispose() {
    super.dispose();
  }
}
