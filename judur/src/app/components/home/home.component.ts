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
  chatMessages: { text: string, fromUser: boolean }[] = [];
  suggestedQuestions: string[] = [];  

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

  // Toggle Chat Window
  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    
    if (this.isChatOpen && this.chatMessages.length === 0) {
 
      this.loadInitialSuggestions();
    }
  }
  

  // Load initial suggested questions from the chatbot
  loadInitialSuggestions() {
    this.chatbotService.sendMessage('').subscribe(
      (response) => {
        // Display the initial greeting message
        this.chatMessages.push({ text: 'Hello! How can I assist you today?', fromUser: false });
  
        // Display suggested questions
        this.suggestedQuestions = response.suggestions || [];
      },
      (error) => {
        console.error('Error fetching initial suggestions:', error);
      }
    );
  }
  
  sendMessage() {
    const userMessage = this.chatForm.value.message;
    if (userMessage.trim()) {
      this.chatMessages.push({ text: userMessage, fromUser: true });
      this.chatForm.reset();
      
      this.chatbotService.sendMessage(userMessage).subscribe(
        (response) => {
          this.chatMessages.push({ text: response.answer, fromUser: false });
          this.suggestedQuestions = response.suggestions || [];  // Update suggested questions
          this.scrollToBottom();
        },
        (error) => {
          this.chatMessages.push({ text: 'Error: Unable to get response from chatbot.', fromUser: false });
          console.error('Error:', error);
        }
      );
    }
  }

  // Handle suggested question click
  selectSuggestedQuestion(question: string) {
    this.chatForm.patchValue({ message: question });
    this.sendMessage();
  }

  // Scroll to the bottom of the chat window
  private scrollToBottom() {
    setTimeout(() => {
      const chatWindow = document.querySelector('.chat-window');
      if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    }, 0);
  }
}
