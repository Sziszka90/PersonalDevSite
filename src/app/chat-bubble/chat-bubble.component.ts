import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Conversation } from '../../models/conversation.dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  imports: [
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent {
  apiService = inject(ApiService);
  message = '';
  response = '';
  loading = false;
  showBubble = false;
  messages: { text: string, sender: 'user' | 'assistant' }[] = [
    { text: 'Hi! Welcome to my personal website. Feel free to ask me anything about my experience, skills, or projects!', sender: 'assistant' }
  ];
  dragOffsetX = 0;
  dragOffsetY = 0;
  dragging = false;
  bubblePosition = { bottom: 32, right: 32 };
  touchStartTime = 0;
  touchStartX = 0;
  touchStartY = 0;
  touchMoved = false;

  constructor() {
    document.addEventListener('click', this.handleDocumentClick.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleDocumentClick.bind(this));
  }

  handleDocumentClick(event: MouseEvent) {
    const chatBubble = document.querySelector('.chat-bubble');
    if (this.showBubble && chatBubble && !chatBubble.contains(event.target as Node)) {
      this.showBubble = false;
    }
  }

  sendMessage() {
    if (!this.message.trim()) return;
    const msgToSend = this.message;
    this.message = '';
    this.loading = true;
    this.messages.push({ text: msgToSend, sender: 'user' });
    this.apiService.post<Conversation>({ message: msgToSend }).subscribe({
      next: res => {
        const reply = res.message || (res as any).Message || 'No response';
        this.messages.push({ text: reply, sender: 'assistant' });
        this.loading = false;
      },
      error: err => {
        this.messages.push({ text: 'Error sending message.', sender: 'assistant' });
        this.loading = false;
      }
    });
  }

  toggleBubble() {
    this.showBubble = !this.showBubble;
  }

  onDragStart(event: MouseEvent | TouchEvent) {
    this.dragging = true;
    if (event instanceof TouchEvent) {
      event.preventDefault();
      this.dragOffsetX = event.touches[0].clientX;
      this.dragOffsetY = event.touches[0].clientY;
      document.addEventListener('touchmove', this.onDragMove.bind(this), { passive: false });
      document.addEventListener('touchend', this.onDragEnd.bind(this));
    } else {
      this.dragOffsetX = event.clientX;
      this.dragOffsetY = event.clientY;
      document.addEventListener('mousemove', this.onDragMove.bind(this));
      document.addEventListener('mouseup', this.onDragEnd.bind(this));
    }
  }

  onDragMove(event: MouseEvent | TouchEvent) {
    if (!this.dragging) return;
    if (event instanceof TouchEvent) {
      event.preventDefault();
    }
    let clientX, clientY;
    if (event instanceof TouchEvent) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    const dx = clientX - this.dragOffsetX;
    const dy = clientY - this.dragOffsetY;
    const chatBubble = document.querySelector('.chat-bubble') as HTMLElement;
    if (chatBubble) {
      const bubbleRect = chatBubble.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      let newRight = this.bubblePosition.right - dx;
      let newBottom = this.bubblePosition.bottom - dy;
      // Prevent moving out of viewport
      newRight = Math.max(0, Math.min(newRight, viewportWidth - bubbleRect.width));
      newBottom = Math.max(0, Math.min(newBottom, viewportHeight - bubbleRect.height));
      this.bubblePosition.right = newRight;
      this.bubblePosition.bottom = newBottom;
    }
    this.dragOffsetX = clientX;
    this.dragOffsetY = clientY;
  }

  onDragEnd() {
    this.dragging = false;
    document.removeEventListener('mousemove', this.onDragMove.bind(this));
    document.removeEventListener('mouseup', this.onDragEnd.bind(this));
    document.removeEventListener('touchmove', this.onDragMove.bind(this));
    document.removeEventListener('touchend', this.onDragEnd.bind(this));
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartTime = Date.now();
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
    this.touchMoved = false;
    this.onDragStart(event);
  }

  onTouchMove(event: TouchEvent) {
    const dx = event.touches[0].clientX - this.touchStartX;
    const dy = event.touches[0].clientY - this.touchStartY;
    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
      this.touchMoved = true;
    }
    this.onDragMove(event);
  }

  onTouchEnd(event: TouchEvent) {
    this.onDragEnd();
    const tapDuration = Date.now() - this.touchStartTime;
    if (!this.touchMoved && tapDuration < 300) {
      this.toggleBubble();
    }
  }

  onTextareaKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
    // Shift+Enter will insert a new line by default
  }
}
