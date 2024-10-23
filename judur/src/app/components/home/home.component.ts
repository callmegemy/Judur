import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FeedbackService } from '../../feedback.service';
import { BlogPost, BlogService } from '../../services/blog.service';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  testimonials: any[] = [];
  recentPosts: BlogPost[] = [];
  isChatOpen = false;
  chatForm: FormGroup;
  chatMessages: { text: string, fromUser: boolean }[] = [
    { text: 'Hello! How can I assist you today?', fromUser: false }
  ];

  constructor(
    private feedbackService: FeedbackService,
    private blogService: BlogService,
    private fb: FormBuilder,
    private chatbotService: ChatbotService
  ) {
    this.chatForm = this.fb.group({
      message: ['']
    });
  }

  ngOnInit(): void {
    this.loadFeedback();
    this.loadRecentPosts();
  }

  loadFeedback(): void {
    this.feedbackService.getFeedback().subscribe(
      (data) => {
        this.testimonials = data;
        console.log('Feedback:', this.testimonials);
      },
      (error) => {
        console.error('Error fetching feedback:', error);
      }
    );
  }

  loadRecentPosts(): void {
    this.blogService.getPosts().subscribe((posts: BlogPost[]) => {
      this.recentPosts = posts.slice(0, 3);
    });
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    const userMessage = this.chatForm.value.message;
    if (userMessage.trim()) {
      this.chatMessages.push({ text: userMessage, fromUser: true });
      this.chatForm.reset();
      
      this.chatbotService.sendMessage(userMessage).subscribe(
        (response) => {
          this.chatMessages.push({ text: response.answer, fromUser: false });
          this.scrollToBottom();
        },
        (error) => {
          this.chatMessages.push({ text: 'Error: Unable to get response from chatbot.', fromUser: false });
          console.error('Error:', error);
        }
      );
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
