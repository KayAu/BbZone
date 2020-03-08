﻿
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

export const progressAnimation = trigger(
    "progressAnimation",
    [
        transition(
            "* => *",
            animate('{{ duration }}', style({ width: "{{width}}" })),
            { params: { duration: '2.5s' } } //Fallback value; else it could crash when no duration is passed
        ),
    ]
);
//export const progressAnimation = trigger('progressAnimation',
//    [
//        state('initial',
//            style({ width: '{{ widthValue }}', overflow: 'hidden' }),
//            { params: { widthValue: '0%' } }
//        ),
//        state('final',
//            style({ width: '{{ widthValue }}' }),
//            { params: { widthValue: '*' } }
//        ),
//        transition('final=>initial', animate('{{ time }}'))
//    ]
//);


//@keyframes move - stock - level {
//    0 % {
//        width: 0 %;
//        animation- timing - function: ease-in;
//}

//100 % {
//    width: 100 %;
//    animation- timing - function: ease-in;
//    }
//}


//trigger('balloonEffect', [state('initial', style({ backgroundColor: 'green', transform: 'scale(1)' })), state('final', style({ backgroundColor: 'red', transform: 'scale(1.5)' })), transition('final=>initial', animate('1000ms')), transition('initial=>final', animate('1500ms'))]),