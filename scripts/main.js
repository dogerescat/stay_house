document.addEventListener('DOMContentLoaded', function () {
    // const cb = function (el, isIntersecting) {
    //     if(isIntersecting) {
    //         const ta = new TweenTextAnimation(el);
    //         ta.animate();
    //     }
    // }
    // const so = new ScrollObserver('.tween-animate-title', cb);

    // const _inviewanimation = function(el, inview){
    //     if(inview){
    //         el.classList.add('inview');
    //     }
    //     else{
    //         el.classList.remove('inview')
    //     }
    // }

    // const so2 = new ScrollObserver('.cover-slide', _inviewanimation);


    // const header = document.querySelector('.header');
    // const _nuvAnimation = function(el, inview){
    //     if(inview){
    //         header.classList.remove('triggerd');
    //     }
    //     else{
    //         header.classList.add('triggerd');
    //     }
    // }

    // const so3 = new ScrollObserver('.nuv-trigger', _nuvAnimation, {once: false});

    new MobileMenu();
    new Main();

});

class Main{
    constructor(){
        this.header = document.querySelector('.header');
        this._observers = [];
        this._init();
    }

    set observers(val){
        this._observers.push(val);
    }

    get observers(){
        return this._observers;
    }

    _init(){
        new MobileMenu();
        this.hero = new HeroSlider('.swiper-container');
        Pace.on('done',this._PaceDone.bind(this));

    }

    _PaceDone(){
        this._scrollInit();
    }

    _nuvAnimation(el, inview){
        if(inview){
            this.header.classList.remove('triggerd');
        }
        else{
            this.header.classList.add('triggerd');
        }
    }

    _inviewAnimation(el, inview){
        if(inview){
            el.classList.add('inview');
        }
        else{
            el.classList.remove('inview')
        }
    }

    _textAnimation(el, isIntersecting) {
        if(isIntersecting) {
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    }

    _toggleSlideAnimation(el, inview){
        if(inview){
            this.hero.start();
        }
        else{
            this.hero.stop();
        }

    }

    _destroyObserver(){
        this.observers.forEach(ob =>{
            ob.destroy();
        });
    }


    destroy(){
        this._destroyObserver();
    }

    _scrollInit(){
        this.observers = new ScrollObserver('.nuv-trigger', this._nuvAnimation.bind(this), {once: false});
        this.observers = new ScrollObserver('.cover-slide', this._inviewAnimation);
        this.observers = new ScrollObserver('.appear', this._inviewAnimation);
        this.observers = new ScrollObserver('.tween-animate-title', this._textAnimation);
        this.observers = new ScrollObserver('.swiper-container', this._toggleSlideAnimation.bind(this),{once: false});

        console.log(this.observers);
    }
}

