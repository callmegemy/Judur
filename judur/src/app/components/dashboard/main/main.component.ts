import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import $ from 'jquery';


Chart.register(...registerables);

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements AfterViewInit, OnInit{
  @ViewChild('myAreaChart') myAreaChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;

  constructor() {}
  ngOnInit(): void {
    // Initialize jQuery functionalities after the component is initialized
    this.initializeJQuery();
  }
  ngAfterViewInit(): void {
    this.createAreaChart();
    this.createPieChart();
  }

  private createAreaChart(): void {
    const ctx = this.myAreaChart.nativeElement.getContext('2d');
    new Chart(ctx!, {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Earnings",
          tension: 0.3,
          backgroundColor: "rgba(78, 115, 223, 0.05)",
          borderColor: "#6A9C89",
          pointRadius: 3,
          pointBackgroundColor: "#6A9C89",
          pointBorderColor: "#6A9C89",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "#6A9C89",
          pointHoverBorderColor: "#6A9C89",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
        }],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 7
            }
          },
          y: {
            ticks: {
              maxTicksLimit: 5,
              callback: (value) => '$' + value.toLocaleString()
            },
            grid: {
              color: "rgb(234, 236, 244)",
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
        }
      }
    });
  }

  private createPieChart(): void {
    const ctx = this.myPieChart.nativeElement.getContext('2d');
    new Chart(ctx!, {
      type: 'doughnut',
      data: {
        labels: ["Doners", "Volunteers", "Examiners"],
        datasets: [{
          data: [165, 75, 13],
          backgroundColor: ['#6A9C89','#4e73df', '#FFA500'],
          hoverBackgroundColor: ['#16423C','#2e59d9', '#FF8C00'],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
        }
      }
    });
  }

  private initializeJQuery(): void {
    // Make sure the jQuery code runs after the DOM is ready
    $(document).ready(() => {
      // Toggle the sidebar when the toggle button is clicked
      $("#sidebarToggle, #sidebarToggleTop").on('click', () => {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");

        // Collapse any open menu items when toggled
        if ($(".sidebar").hasClass("toggled")) {
          $('.sidebar .collapse').hide(); // Use hide instead of collapse
        }
      });

      // Close any open menu accordions when window is resized below 768px
      $(window).resize(() => {
        const windowWidth: number = $(window).width() ?? 0; // Provide a default value of 0

        if (windowWidth < 768) {
          $('.sidebar .collapse').hide(); // Use hide instead of collapse
        }

        // Toggle the sidebar if the window is resized below 480px
        if (windowWidth < 480 && !$(".sidebar").hasClass("toggled")) {
          $("body").addClass("sidebar-toggled");
          $(".sidebar").addClass("toggled");
          $('.sidebar .collapse').hide(); // Use hide instead of collapse
        }
      });

      // Scroll to top button appear
      $(document).on('scroll', () => {
        const scrollDistance: number = $(window).scrollTop() ?? 0; // Provide a default value of 0
        if (scrollDistance > 100) {
          $('.scroll-to-top').fadeIn(); // Show the button
        } else {
          $('.scroll-to-top').fadeOut(); // Hide the button
        }
      });

      // Smooth scrolling when clicking the scroll-to-top button
      $(document).on('click', 'a.scroll-to-top', (e) => {
        e.preventDefault(); // Prevent the default link behavior
        const target = $(e.currentTarget).attr('href'); // Get the target from the anchor
        if (target) {
          $('html, body').stop().animate({
            scrollTop: $(target).offset()?.top ?? 0 // Scroll to the target, provide a default value
          }, 1000, 'easeInOutExpo');
        }
      });
    });
  }
}