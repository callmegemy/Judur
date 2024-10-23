import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  chatForm: FormGroup;
  messages: { text: string, fromUser: boolean }[] = [];

  constructor(private fb: FormBuilder, private chatbotService: ChatbotService) {
    this.chatForm = this.fb.group({
      message: ['']
    });
  }

  sendMessage() {
    const userMessage = this.chatForm.value.message;
    if (userMessage.trim()) {
      this.messages.push({ text: userMessage, fromUser: true });
      this.chatForm.reset();
  
      this.chatbotService.sendMessage(userMessage).subscribe((response) => {
        this.messages.push({ text: response.answer, fromUser: false });
        this.scrollToBottom();
      }, (error) => {
        this.messages.push({ text: 'Error: Unable to get response from chatbot.', fromUser: false });
        console.error('Error:', error);
      });
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      const chatWindow = document.querySelector('.chat-window');
      if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    }, 0);
  }
}
