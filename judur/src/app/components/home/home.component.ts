import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FeedbackService } from '../../feedback.service';
import { BlogPost, BlogService } from '../../services/blog.service';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  testimonials: any[] = [];
  recentPosts: BlogPost[] = [];
  isChatOpen = false;
  chatForm: FormGroup;
  animationClasses: { [key: string]: boolean } = {
    donationSection: false,
    aboutUsSection: false,
    serviceSection: false,
    blogSection: false,
  };

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

  ngAfterViewInit(): void {
    this.setupScrollObservers();
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
    if (this.isChatOpen && this.chatMessages.length === 0) {
      this.loadInitialSuggestions();
    }
  }

  loadInitialSuggestions() {
    this.chatbotService.sendMessage('').subscribe(
      (response) => {
        this.chatMessages.push({ text: 'Hello! How can I assist you today?', fromUser: false });
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
          this.suggestedQuestions = response.suggestions || [];
          this.scrollToBottom();
        },
        (error) => {
          this.chatMessages.push({ text: 'Error: Unable to get response from chatbot.', fromUser: false });
          console.error('Error:', error);
        }
      );
    }
  }

  setupScrollObservers() {
    const sections = [
      { selector: '#donation-section', key: 'donationSection' },
      { selector: '#aboutus', key: 'aboutUsSection' },
      { selector: '#service-section', key: 'serviceSection' },
      { selector: '#blog-section', key: 'blogSection' },
    ];

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const key = sections.find(section => section.selector === `#${entry.target.id}`)?.key;
        if (entry.isIntersecting) {
          if (key) {
            this.animationClasses[key] = true; // Set animation class to true when in view
          }
        } else {
          // Reset animation class when the section is out of view
          if (key) {
            this.animationClasses[key] = false; // Reset the animation class
          }
        }
      });
    }, options);

    sections.forEach(section => {
      const element = document.querySelector(section.selector);
      if (element) {
        observer.observe(element);
      }
    });
  }

  private scrollToBottom() {
    setTimeout(() => {
      const chatWindow = document.querySelector('.chat-window');
      if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    }, 0);
  }

  // Handle suggested question click
  selectSuggestedQuestion(question: string) {
    this.chatForm.patchValue({ message: question });
    this.sendMessage();
  }
}
