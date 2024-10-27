(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow');
            } else {
                $('.fixed-top').removeClass('bg-dark shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-dark shadow').css('top', 0);
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Causes progress
    $('.causes-progress').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    
})(jQuery);


// Dummy data (to be replaced with real data fetching via API)
const donations = [
    { date: '2024-09-01', amount: 100, item: 'Clothes', status: 'Completed' },
    { date: '2024-09-05', amount: 250, item: 'Food', status: 'Pending' },
    { date: '2024-09-10', amount: 300, item: 'Books', status: 'Completed' },
];

const activities = [
    'Attended community event on 2024-09-01',
    'Volunteered at local shelter on 2024-09-10',
    'Donated food items on 2024-09-05',
];

// Populate Donations Table
const donationTableBody = document.getElementById('donationTableBody');
donations.forEach(donation => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${donation.date}</td>
        <td>$${donation.amount}</td>
        <td>${donation.item}</td>
        <td>${donation.status}</td>
    `;
    donationTableBody.appendChild(row);
});

// Populate Activity Log
const activityLogList = document.getElementById('activityLogList');
activities.forEach(activity => {
    const listItem = document.createElement('li');
    listItem.textContent = activity;
    activityLogList.appendChild(listItem);
});

// script.js
const ctx = document.getElementById('donationChart').getContext('2d');
const donationChart = new Chart(ctx, {
    type: 'bar', // You can change this to 'line', 'pie', etc.
    data: {
        labels: ['January', 'February', 'March'], // X-axis labels
        datasets: [{
            label: 'Donation Amount ($)',
            data: [500, 300, 700], // Corresponding data for each label
            backgroundColor: [
                'rgba(22, 66, 60, 0.5)',
                'rgba(106, 156, 137, 0.5)',
                'rgba(22, 66, 60, 0.5)'
            ],
            borderColor: [
                'rgba(22, 66, 60, 1)',
                'rgba(106, 156, 137, 1)',
                'rgba(22, 66, 60, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});



