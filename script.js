// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Initialize demo
    initializeDemo();
    
    // Start real-time data simulation
    startDataSimulation();
});

// Demo initialization
function initializeDemo() {
    // Initialize acceleration chart
    initAccelerationChart();
    
    // Set up toggle listeners
    setupToggleListeners();
    
    // Initialize confidence meter
    updateConfidenceMeter(95);
}

// Toggle listeners for demo controls
function setupToggleListeners() {
    const cameraToggle = document.getElementById('camera-toggle');
    const motionToggle = document.getElementById('motion-toggle');
    const healthToggle = document.getElementById('health-toggle');
    
    cameraToggle.addEventListener('change', function() {
        const cameraPanel = document.querySelector('.camera-panel');
        if (this.checked) {
            cameraPanel.style.opacity = '1';
        } else {
            cameraPanel.style.opacity = '0.5';
        }
    });
    
    motionToggle.addEventListener('change', function() {
        const motionPanel = document.querySelector('.motion-panel');
        if (this.checked) {
            motionPanel.style.opacity = '1';
        } else {
            motionPanel.style.opacity = '0.5';
        }
    });
    
    healthToggle.addEventListener('change', function() {
        const healthPanel = document.querySelector('.health-panel');
        if (this.checked) {
            healthPanel.style.opacity = '1';
        } else {
            healthPanel.style.opacity = '0.5';
        }
    });
}

// Acceleration chart initialization
function initAccelerationChart() {
    const canvas = document.getElementById('accelerationChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Store chart data
    window.accelData = {
        x: Array(50).fill(0),
        y: Array(50).fill(9.8),
        z: Array(50).fill(0)
    };
    
    drawAccelerationChart(ctx, width, height);
}

// Draw acceleration chart
function drawAccelerationChart(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
    
    const data = window.accelData;
    const pointSpacing = width / (data.x.length - 1);
    const midHeight = height / 2;
    const scale = height / 20; // Scale for acceleration values
    
    // Draw grid lines
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
        const y = (height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
      // Draw acceleration lines
    drawLine(ctx, data.x, pointSpacing, midHeight, scale, '#dc2626'); // X - Red
    drawLine(ctx, data.y, pointSpacing, midHeight, scale, '#3b82f6'); // Y - Blue
    drawLine(ctx, data.z, pointSpacing, midHeight, scale, '#60a5fa'); // Z - Light Blue
}

// Draw individual acceleration line
function drawLine(ctx, data, pointSpacing, midHeight, scale, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let i = 0; i < data.length; i++) {
        const x = i * pointSpacing;
        const y = midHeight - (data[i] * scale);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
}

// Start real-time data simulation
function startDataSimulation() {
    setInterval(updateSensorData, 100); // Update every 100ms
}

// Update sensor data with realistic values
function updateSensorData() {
    // Update acceleration data
    updateAcceleration();
    
    // Update vital signs
    updateVitalSigns();
    
    // Update chart
    const canvas = document.getElementById('accelerationChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        drawAccelerationChart(ctx, canvas.width, canvas.height);
    }
}

// Update acceleration values
function updateAcceleration() {
    const accelX = document.getElementById('accel-x');
    const accelY = document.getElementById('accel-y');
    const accelZ = document.getElementById('accel-z');
    
    if (!window.accelData) return;
    
    // Simulate normal movement with small variations
    const baseX = 0.2 + (Math.random() - 0.5) * 0.4;
    const baseY = 9.8 + (Math.random() - 0.5) * 0.6;
    const baseZ = 0.1 + (Math.random() - 0.5) * 0.3;
    
    // Shift data arrays
    window.accelData.x.shift();
    window.accelData.y.shift();
    window.accelData.z.shift();
    
    // Add new data
    window.accelData.x.push(baseX);
    window.accelData.y.push(baseY);
    window.accelData.z.push(baseZ);
    
    // Update display
    if (accelX) accelX.textContent = baseX.toFixed(1);
    if (accelY) accelY.textContent = baseY.toFixed(1);
    if (accelZ) accelZ.textContent = baseZ.toFixed(1);
}

// Update vital signs
function updateVitalSigns() {
    const heartRate = document.getElementById('heart-rate');
    const spo2 = document.getElementById('spo2');
    const stress = document.getElementById('stress');
    
    // Simulate normal vital signs with small variations
    const currentHR = 72 + Math.floor((Math.random() - 0.5) * 10);
    const currentSpO2 = 98 + Math.floor((Math.random() - 0.5) * 4);
    
    if (heartRate) heartRate.textContent = `${currentHR} BPM`;
    if (spo2) spo2.textContent = `${currentSpO2}%`;
      // Update stress level based on heart rate variability
    if (stress) {
        if (currentHR > 85) {
            stress.textContent = 'Elevated';
            stress.style.color = '#f59e0b';
        } else if (currentHR < 60) {
            stress.textContent = 'Low';
            stress.style.color = '#3b82f6';
        } else {
            stress.textContent = 'Normal';
            stress.style.color = '#3b82f6';
        }
    }
}

// Simulate fall event
function simulateFall() {
    // Change system status
    const alertPanel = document.getElementById('alert-panel');
    const person = document.getElementById('person');
    const cameraStatus = document.querySelector('.camera-status');
    
    // Fall animation
    if (person) {
        person.style.transform = 'rotate(90deg) translateY(20px)';
        person.classList.add('fall-detected');
    }
    
    // Update status
    if (cameraStatus) {
        cameraStatus.textContent = 'FALL DETECTED!';
        cameraStatus.classList.add('fall-alert');
        cameraStatus.style.background = 'rgba(239, 68, 68, 0.8)';
    }
    
    // Update alert panel
    if (alertPanel) {
        const alertHeader = alertPanel.querySelector('.alert-header');
        if (alertHeader) {
            alertHeader.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>EMERGENCY: Fall Detected!</span>';
            alertHeader.style.color = '#ef4444';
        }
    }
    
    // Simulate emergency acceleration data
    simulateEmergencyData();
    
    // Update confidence to 99%
    updateConfidenceMeter(99);
    
    // Reset after 5 seconds
    setTimeout(resetSystem, 5000);
}

// Simulate emergency sensor data
function simulateEmergencyData() {
    if (!window.accelData) return;
    
    // Simulate sudden acceleration spike
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            // Add spike data
            window.accelData.x.shift();
            window.accelData.y.shift();
            window.accelData.z.shift();
            
            const spikeX = (Math.random() - 0.5) * 20;
            const spikeY = -15 + Math.random() * 5; // Negative Y indicates falling
            const spikeZ = (Math.random() - 0.5) * 15;
            
            window.accelData.x.push(spikeX);
            window.accelData.y.push(spikeY);
            window.accelData.z.push(spikeZ);
            
            // Update display
            const accelX = document.getElementById('accel-x');
            const accelY = document.getElementById('accel-y');
            const accelZ = document.getElementById('accel-z');
            
            if (accelX) accelX.textContent = spikeX.toFixed(1);
            if (accelY) accelY.textContent = spikeY.toFixed(1);
            if (accelZ) accelZ.textContent = spikeZ.toFixed(1);
            
        }, i * 100);
    }
    
    // Simulate elevated heart rate
    setTimeout(() => {
        const heartRate = document.getElementById('heart-rate');
        const stress = document.getElementById('stress');
        
        if (heartRate) heartRate.textContent = '120 BPM';        if (stress) {
            stress.textContent = 'Critical';
            stress.style.color = '#ef4444';
        }
    }, 500);
}

// Reset system to normal state
function resetSystem() {
    const person = document.getElementById('person');
    const cameraStatus = document.querySelector('.camera-status');
    const alertPanel = document.getElementById('alert-panel');
    
    // Reset person animation
    if (person) {
        person.style.transform = '';
        person.classList.remove('fall-detected');
    }
      // Reset camera status
    if (cameraStatus) {
        cameraStatus.textContent = 'Normal Activity';
        cameraStatus.classList.remove('fall-alert');
        cameraStatus.style.background = 'rgba(59, 130, 246, 0.8)';
    }
    
    // Reset alert panel
    if (alertPanel) {
        const alertHeader = alertPanel.querySelector('.alert-header');
        if (alertHeader) {
            alertHeader.innerHTML = '<i class="fas fa-shield-check"></i><span>System Status: Normal</span>';
            alertHeader.style.color = '';
        }
    }
    
    // Reset confidence meter
    updateConfidenceMeter(95);
    
    // Reset acceleration data gradually
    resetAccelerationData();
}

// Reset acceleration data gradually
function resetAccelerationData() {
    let resetCount = 0;
    const resetInterval = setInterval(() => {
        if (!window.accelData || resetCount >= 20) {
            clearInterval(resetInterval);
            return;
        }
        
        // Gradually return to normal values
        window.accelData.x.shift();
        window.accelData.y.shift();
        window.accelData.z.shift();
        
        const normalX = 0.2 + (Math.random() - 0.5) * 0.4;
        const normalY = 9.8 + (Math.random() - 0.5) * 0.6;
        const normalZ = 0.1 + (Math.random() - 0.5) * 0.3;
        
        window.accelData.x.push(normalX);
        window.accelData.y.push(normalY);
        window.accelData.z.push(normalZ);
        
        // Update display
        const accelX = document.getElementById('accel-x');
        const accelY = document.getElementById('accel-y');
        const accelZ = document.getElementById('accel-z');
        
        if (accelX) accelX.textContent = normalX.toFixed(1);
        if (accelY) accelY.textContent = normalY.toFixed(1);
        if (accelZ) accelZ.textContent = normalZ.toFixed(1);
        
        resetCount++;
    }, 200);
}

// Update confidence meter
function updateConfidenceMeter(percentage) {
    const confidenceFill = document.getElementById('confidence-fill');
    const confidenceValue = document.getElementById('confidence-value');
    
    if (confidenceFill) {
        confidenceFill.style.width = `${percentage}%`;
        
        // Change color based on percentage
        if (percentage >= 95) {
            confidenceFill.style.background = 'linear-gradient(45deg, #3b82f6, #60a5fa)';
        } else if (percentage >= 80) {
            confidenceFill.style.background = 'linear-gradient(45deg, #f59e0b, #3b82f6)';
        } else {
            confidenceFill.style.background = 'linear-gradient(45deg, #ef4444, #f59e0b)';
        }
    }
    
    if (confidenceValue) {
        confidenceValue.textContent = `${percentage}%`;
    }
}

// Enhanced navbar scroll effect with responsive behavior
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const navBar = document.querySelector('nav') || navbar;
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Original navbar scroll effect for desktop
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(59, 130, 246, 0.2)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Enhanced behavior for responsive design
    if (window.innerWidth >= 600) {
        if (scrollPosition >= documentHeight - 100) {
            navBar.style.opacity = '0'; // Hide the nav at bottom
        } else {
            navBar.style.opacity = '1'; // Show the nav
        }
    } else {
        navBar.style.opacity = '1'; // Always show on mobile
    }
});

// EmailJS Configuration and Form submission
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your configuration
    emailjs.init({
        publicKey: "3vKfHl_F8eO1j_0RR",
    });
    
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const button = form.querySelector('.btn-primary');
            const originalText = button.textContent;
            button.textContent = 'Sending...';
            button.disabled = true;
            
            formStatus.textContent = 'Sending your message...';
            formStatus.className = 'form-status loading';
              // Send email using EmailJS with your configuration
            const templateParams = {
                to_email: 'ethan.christoff@gmail.com',
                from_name: form.user_name.value,
                message: form.message.value,
                reply_to: form.user_email.value,
                organization: form.organization.value || 'Not specified',
                phone: form.phone.value || 'Not provided'
            };

            emailjs.send('service_rbgxt4h', 'template_99bnb6g', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    formStatus.className = 'form-status success';
                    
                    // Reset form
                    form.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                        formStatus.style.opacity = '0';
                    }, 3000);
                    
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error message
                    formStatus.textContent = 'Sorry, there was an error sending your message. Please try again.';
                    formStatus.className = 'form-status error';
                    
                    // Reset button
                    button.textContent = originalText;
                    button.disabled = false;
                    
                    // Hide error message after 5 seconds
                    setTimeout(() => {
                        formStatus.style.opacity = '0';
                    }, 5000);
                });
        });
    }
});

// Intersection Observer for animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.tech-card, .feature-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', setupAnimations);

// Add loading states
function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// Utility function for smooth scrolling
function smoothScroll(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - 80; // Account for fixed navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Add click handlers for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
});

// Additional utility functions
function downloadpdf() {
    const link = document.createElement('a');
    link.href = 'css/images/CV/Ethan.Perera_Resume.pdf'; 
    link.download = 'Ethan.Perera_CV.pdf'; 
    link.click(); 
}

function announcement(){
    alert('Will be made public soon!')
}

function openImage(img_num) {
    const imageUrl_1 = "css/images/promotional-esports-poster.jpg";
    const imageUrl_2 = "css/images/teaser-poster-tes.png";
    const imageUrl_3 = "css/images/t_shirt-design.png";
    switch (img_num){
        case 1:
            window.open(imageUrl_1, '_blank');
            break;
        
        case 2:
            window.open(imageUrl_2, '_blank');
            break;
        
        case 3:
            window.open(imageUrl_3, '_blank');
            break;
    }
}

// Enhanced mobile navigation toggle with menu list support
function toggleMenu(){
    const menuList = document.getElementById("menuList") || document.querySelector('.nav-menu');
    if(menuList) {
        if(menuList.style.maxHeight == "0px" || !menuList.style.maxHeight) {
            menuList.style.maxHeight = "300px";
            menuList.classList.add('active');
        } else {
            menuList.style.maxHeight = "0px";
            menuList.classList.remove('active');
        }
    }
}

// Enhanced responsive menu icons functionality
document.addEventListener("DOMContentLoaded", function() {
    // Check if we have the menu list (for compatibility with different nav structures)
    const menuList = document.querySelectorAll("#menuList li a, .nav-menu li a");
    
    if (menuList.length > 0) {
        const menuItems = [
            { icon: "fa-home", text: "Home" },
            { icon: "fa-cogs", text: "Technology" },
            { icon: "fa-desktop", text: "Live Demo" },
            { icon: "fa-star", text: "Features" },
            { icon: "fa-phone", text: "Contact" }
        ];

        function updateMenuIcons(mediaQuery) {
            menuList.forEach((item, index) => {
                if (index < menuItems.length) {
                    if (mediaQuery.matches) {
                        // On mobile, show text
                        item.innerHTML = menuItems[index].text;
                    } else {
                        // On desktop, show icons
                        const currentText = item.textContent.trim();
                        item.innerHTML = `<i class="fa ${menuItems[index].icon}"></i> ${currentText}`;
                    }
                }
            });
        }

        const mediaQuery = window.matchMedia("(max-width: 768px)");
        updateMenuIcons(mediaQuery);
        mediaQuery.addEventListener('change', updateMenuIcons);
    }

    // Initialize menu list max height for mobile compatibility
    const mobileMenuList = document.getElementById("menuList");
    if (mobileMenuList) {
        mobileMenuList.style.maxHeight = "0px";
    }
});

// Standalone email submission function (alternative method)
function email_submit(event) {
    if (event) {
        event.preventDefault();
    }

    // Try to get form data from multiple possible sources
    const name = document.getElementById('name')?.value || 
                 document.querySelector('input[name="user_name"]')?.value || '';
    const email = document.getElementById('Email')?.value || 
                  document.querySelector('input[name="user_email"]')?.value || '';
    const message = document.getElementById('Message')?.value || 
                    document.querySelector('textarea[name="message"]')?.value || '';
    const organization = document.querySelector('input[name="organization"]')?.value || '';
    const phone = document.querySelector('input[name="phone"]')?.value || '';

    // Enhanced validation
    if (name.trim() === '' || email.trim() === ''){
        showFormStatus('error', 'Please ensure you have entered both your name and email address!');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormStatus('error', 'Please enter a valid email address!');
        return false;
    }

    if (message.trim() === '') {
        showFormStatus('error', 'Please enter a message!');
        return false;
    }

    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalHTML = submitBtn?.innerHTML || '<i class="fas fa-paper-plane me-2"></i>Send Message';
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('btn-loading');
    }

    showFormStatus('loading', 'Sending your message...');

    const templateParams = {
        to_email: 'ethan.christoff@gmail.com',
        from_name: name, 
        message: message, 
        reply_to: email,
        organization: organization || 'Not specified',
        phone: phone || 'Not provided'
    };

    emailjs.send('service_rbgxt4h', 'template_99bnb6g', templateParams)
        .then(function(response) {
            showFormStatus('success', 'Message sent successfully! We will get back to you soon.');
            console.log('SUCCESS!', response.status, response.text);
            
            // Reset form if it exists
            const form = document.getElementById('contact-form') || 
                        document.querySelector('.contact-form form');
            if (form) {
                form.reset();
            }
            
            // Reset button
            if (submitBtn) {
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-loading');
                }, 2000);
            }
        })
        .catch(function(error) {
            showFormStatus('error', 'Failed to send message. Please try again.');
            console.log('FAILED...', error);
            
            // Reset button
            if (submitBtn) {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-loading');
            }
        });

    return false; 
}

// Enhanced form status display function
function showFormStatus(type, message) {
    const statusElement = document.getElementById('form-status');
    if (statusElement) {
        statusElement.className = `form-status ${type}`;
        statusElement.textContent = message;
        statusElement.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 5000);
        }
    }
}
