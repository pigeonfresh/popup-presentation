import AbstractBlock from '../AbstractBlock';
import { Model } from 'app/data/model';

export default class ScrollBlock extends AbstractBlock {
  public static readonly displayName: string = 'scroll-block';

  constructor(el: HTMLElement) {
    super(el);
    this.setupObserver()
  }

  private setupObserver = (): void => {
    const observer = new IntersectionObserver(this.handleObserver, { rootMargin: '-100px'});
    observer.observe(this.element);
  };

  private handleObserver = (entries: Array<IntersectionObserverEntry>): void => {
    entries.forEach(entry => entry.isIntersecting ? Model.showPopup(true) : Model.showPopup(false) )
  };

  public dispose() {
    super.dispose();
  }
}
