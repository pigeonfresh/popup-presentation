import { TimelineMax, TweenMax, Expo } from 'gsap';
import { Subscription } from 'knockout';
import AbstractBlock from '../AbstractBlock';
import { Model } from 'app/data/model';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';


export default class N01Popup extends AbstractBlock {
  public static readonly displayName: string = 'n01-popup';
  private overlay: HTMLSpanElement = this.getElement('[data-overlay]');
  private contentWrapper: HTMLSpanElement = this.getElement('[data-content-wrapper]');
  private closeButton: HTMLButtonElement = this.getElement('[data-close-button]');
  private transitionItems: Array<HTMLElement> = this.getElements('[data-transition-item]');
  private readonly timeline: TimelineMax;
  private popupSubscription: Subscription;

  constructor(el: HTMLElement) {
    super(el);
    this.setCorrectSetting();
    this.popupSubscription = Model.showPopup.subscribe(this.handlePopupState);
    this.timeline = this.setupTimeline();
    this.closeButton.addEventListener('click', this.handleCloseButtonClick);
  }

  private handlePopupState = (): void => {
    this.setCorrectSetting();
    this.animateProgress();
  };

  private animateProgress = (): void => {
    const timeline = this.timeline;
    const duration = Model.showPopup() ? timeline.duration() - timeline.time() : timeline.time() * 0.5;
    const progress = Model.showPopup() ? 1 : 0;
    TweenMax.to(timeline, duration, {
      progress,
    });
  };

  private handleCloseButtonClick = (): void => {
    Model.showPopup(false);
  };

  private setupTimeline = (): TimelineMax => {
    const timeline = new TimelineMax({ paused: true });
    timeline.add(this.animateOverlay());
    timeline.add(this.animateContentWrapper(), 0);
    timeline.add(this.animateTransitionItems(), '-=0.5');
    return timeline;
  };

  private animateTransitionItems = (): Array<TweenMax> => {
    return TweenMax.staggerFromTo(this.transitionItems, 0.6, {
      x: 100,
      autoAlpha: 0,
    }, {
      x: 0,
      autoAlpha: 1,
      ease: Expo.easeInOut,
    }, 0.2)
  };

  private animateOverlay = (): TweenMax => {
    return TweenMax.fromTo(
      this.overlay,
      1,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        ease: Expo.easeInOut,
      },
    );
  };

  private animateContentWrapper = (): TweenMax => {
    return TweenMax.fromTo(
      this.contentWrapper,
      1,
      {
        autoAlpha: 0,
        scale: 0.8,
      },
      {
        autoAlpha: 1,
        scale: 1,
        ease: Expo.easeInOut,
      },
    );
  };

  private setCorrectSetting = (): void => {
    this.element.classList.remove('is-hidden');
    const pointerEvents = Model.showPopup() ? 'auto' : 'none';
    this.element.style.pointerEvents = pointerEvents;
    Model.showPopup() ? disableBodyScroll(this.element) : enableBodyScroll(this.element);
  };

  public dispose() {
    super.dispose();
  }
}
