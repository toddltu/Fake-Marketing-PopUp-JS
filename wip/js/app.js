  export default class FakePop {
    #popImg = '';
    #popContent = '';
    #HTMLImgWrap;
    #HTMLContentWrap;
    #HTMLTemplate;
    #random = true;
    #loop = true;
    #once = false;
    #timeInterval = 3;
    #timeShine = 4;
    #theList = [];
    #greenLight = false;
    #listSeen = [];
    #hitClose = false;

    constructor(option, list){
        if(option instanceof Object){
            if(option.random !== undefined && option.random instanceof Boolean) {
                this.#random = option.random;
            }
            if(option.loop !== undefined && option.loop instanceof Boolean) {
                this.#loop = option.loop;
            }
            if(option.once !== undefined && option.once instanceof Boolean) {
                this.#once = option.once;
            }
            if(option.popAfter !== undefined && option.popAfter instanceof Number) {
                this.#timeInterval = option.popAfter
            }
            if(option.popShow !== undefined && option.popShow instanceof Number) {
                this.#timeShine = option.popShow
            }
        }
        this.#greenLight = this.#setUpItems(list);
    }

    #setTemplate(){
        const theBody = document.body;

        this.#HTMLTemplate = document.createElement('section');
        this.#HTMLTemplate.setAttribute('class', 'custom-social-proof');

        const _custNotf = document.createElement('div');
        _custNotf.setAttribute('class', 'custom-notification');
        this.#HTMLTemplate.append(_custNotf);

        const _custNotfContainer = document.createElement('div');
        _custNotfContainer.setAttribute('class', 'custom-notification-container');
        _custNotf.append(_custNotfContainer);

        this.#HTMLImgWrap = document.createElement('div');
        this.#HTMLImgWrap.setAttribute('class', 'custom-notification-image-wrapper');
        this.#HTMLImgWrap.innerHTML = this.#popImg;
        _custNotfContainer.append(this.#HTMLImgWrap);

        const _custNotfContainerWrap = document.createElement('div');
        _custNotfContainerWrap.setAttribute('class', 'custom-notification-content-wrapper');
        _custNotfContainer.append(_custNotfContainerWrap);

        this.#HTMLContentWrap = document.createElement('p');
        this.#HTMLContentWrap.setAttribute('class', 'custom-notification-content');
        this.#HTMLContentWrap.innerHTML = this.#popContent;
        _custNotfContainerWrap.append(this.#HTMLContentWrap);

        const _close = document.createElement('div');
        _close.setAttribute('class', 'custom-close');
        _custNotf.append(_close);
        _close.addEventListener('click', ()=>{
            $(this.#HTMLTemplate).stop().slideToggle('slow');
            this.#hitClose = true;
        });

        setTimeout(()=>{
            theBody.appendChild(this.#HTMLTemplate);
            this.#fireAnotherOne(this.#timeShine, this.#timeInterval);
        }, (this.#timeInterval * 1000));
    }

    start(){
        if(this.#greenLight){
            const itm = this.#getItem();
            if(itm instanceof Object){
                this.#popImg = '<img src="'+itm.image+'" />';
                this.#popContent = itm.content;
            }
            this.#setTemplate();
        }
    }

    #setUpItems(list){
        if(list instanceof Array && list.length > 0){
            list.forEach(item => {
                if(item instanceof Object){
                    let tmp = {
                        popAfter: this.#timeInterval,
                        popShine: this.#timeShine
                    };
                    if(item.popAfter !== undefined && item.popAfter instanceof Number){
                        tmp.popAfter = item.popAfter;
                    }
                    if(item.popShine !== undefined && item.popShine instanceof Number){
                        tmp.popShine = item.popShine;
                    }
                    if(item.image !== undefined && typeof item.image === 'string'){
                        tmp.image = item.image;
                    }
                    if(item.content !== undefined && typeof item.content === 'string'){
                        tmp.content = item.content;
                    }

                    if(tmp.content !== undefined){
                        this.#theList.push(tmp);
                    }
                }
            });
        }
        return this.#theList.length > 0;
    }

    #getItem(){
        let rendInx = this.#getRandIndex();

        if(this.#loop){
            if(this.#listSeen.length >= this.#theList.length){
                this.#listSeen.length = [];
            }
        }
        
        if(this.#listSeen.length < this.#theList.length){
            if(this.#random){
                if(!this.#once){
                    while(this.#listSeen.includes(rendInx)){
                        rendInx = this.#getRandIndex();
                    }
                }
            } else {
                rendInx = this.#listSeen.length;
            }

            if(!this.#listSeen.includes(rendInx)){
                this.#listSeen.push(rendInx);
            }
            return this.#theList[rendInx];
        }
        return false;
    }

    #getRandIndex(){
        return Math.floor(Math.random() * this.#theList.length);
    }

    #fireAnotherOne(shine, pop){
        const item = this.#getItem();
        const popTotal = shine + pop;

        if(!this.#hitClose){
            setTimeout(()=>{ $(this.#HTMLTemplate).stop().slideToggle('slow'); }, (shine * 1000));
        }

        if(item instanceof Object){
            setTimeout(()=>{
                this.#HTMLImgWrap.innerHTML = '<img src="'+item.image+'" />';
                this.#HTMLContentWrap.innerHTML = item.content;
                $(this.#HTMLTemplate).stop().slideToggle('slow');
                this.#fireAnotherOne(item.popShine, item.popAfter);
            }, (popTotal * 1000));
        }
    }
}
global.FMarketPopUp = FakePop;