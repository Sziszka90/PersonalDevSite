import {
    Directive, OnInit, OnChanges,
    ElementRef, Input, Output,
    EventEmitter, SimpleChanges,
    AfterViewInit, 
} from '@angular/core'
import { Typed } from './typed';
import { Observable, Subscription } from 'rxjs';

@Directive({
    selector: '[typingAnimation]'
})
export class TypingAnimationDirective implements OnInit, OnChanges, AfterViewInit {
    typed!: Typed
    @Input('typeSpeed') typeSpeed: number = 0
    @Input('startDelay') startDelay: number = 0
    @Input('condition') condition: boolean = true
    @Input('hideCursorOnComplete') hideCursorOnComplete: boolean = false
    @Input('text') text: any = ''
    @Output('complete') complete: EventEmitter<null> = new EventEmitter()
    typingLock: boolean = false
    contentObservable!: Observable<string>
    contentSubscription!: Subscription

    constructor (private elRef: ElementRef) {}

    ngOnInit () {
        if (!this.checkContent()) {
            return
        }
        this.createTyped()
    }

    ngAfterViewInit () {
        if (this.typed) {
            return
        }

        if (!this.checkContent()) {
            this.contentObservable = new Observable((ob) => {
                if (this.checkContent()) {
                    ob.next(this.text)
                    ob.complete()
                }
            })
    
            this.contentSubscription = this.contentObservable.subscribe((content) => {
                this.createTyped()
                this.contentSubscription.unsubscribe()
            })

            return
        }

        this.createTyped()
    }

    ngOnChanges (changes: SimpleChanges) {
        if (('condition' in changes) && this.typed) {
            if (this.typingLock) {
                return
            }
            if (this.condition) {
                this.typed.begin()
                this.typingLock = true
            }
        }

        if ('text' in changes && this.typed) {
            if (this.typingLock) {
                return;
            }
            if (this.condition) {
                this.typed.textContent = this.text;
                this.typed.begin()
                this.typingLock = true
            }
        }
    }


    private checkContent() {
        return this.text;
    }

    private createTyped () {
        this.typed = new Typed(this.elRef.nativeElement, {
            typeSpeed: this.typeSpeed,
            startDelay: this.startDelay,
            condition: this.condition,
            hideCursorOnComplete: this.hideCursorOnComplete,
            onComplete: () => {
                this.complete.emit(null)
                this.typingLock = false
            }
        },
            this.text
        )

        if (this.condition) {
            this.typed.begin()
            this.typingLock = true
        }
    }
}