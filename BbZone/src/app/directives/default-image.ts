import { Directive, Input } from '@angular/core';

@Directive({
    selector: 'img[src]',
    host: {
        '[src]': 'checkPath(src)',
        '(error)': 'onError()'
    }
})
export class DefaultImage {
    @Input() src: string;
    public defaultImg: string = '/images/no_image.png';
    //onError="this.src='./app/assets/images/placeholder.jpg';"
    public onError() {
        this.src = this.defaultImg;
    }

    public checkPath(src) {
        return src ? src : this.defaultImg;
    }
}