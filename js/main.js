// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Animation Logic
document.addEventListener('DOMContentLoaded', () => {

    // 0. Preloader & Cursor Logic
    const preloader = document.querySelector('.preloader');
    const preloaderText = document.querySelector('.preloader-text');
    
    // Preloader Animation
    const tlLoader = gsap.timeline();
    
    tlLoader.to(preloaderText, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    })
    .to(preloaderText, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5
    })
    .to(preloader, {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut"
    }, "-=0.2");

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const hoverTriggers = document.querySelectorAll('.hover-trigger'); // Links, Buttons

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with slight delay (using GSAP for smoothness)
        gsap.to(cursorOutline, {
            left: posX,
            top: posY,
            duration: 0.12, // Slightly faster to keep them closer
            ease: "power2.out"
        });
    });

    // Hover Effects for Cursor
    hoverTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        trigger.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });

    // Mobile Menu Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger bars (Simple toggle class or inline styles)
        // For now, just toggle menu. 
        if(mobileMenu.classList.contains('active')) {
            lenis.stop(); // Stop scrolling when menu is open
        } else {
            lenis.start();
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            lenis.start();
        });
    });

    
    // 1. Hero Animations (Run after preloader)
    const heroTimeline = gsap.timeline({ delay: 2.8 }); // Delay to wait for preloader

    // Breathing Background Animation
    gsap.to('.hero-bg-shape', {
        scale: 1.2,
        opacity: 0.8,
        duration: 6, // 4-7-8 breathing rhythm simulation (simplified to slow cycle)
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
    });

    // Text Fade Up
    heroTimeline.from('.hero-title .line', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
    })
    .to('.hero-subtitle', {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5")
    .from('.hero-cta-wrapper', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.8")
    .from('.scroll-indicator', {
        opacity: 0,
        duration: 1,
        delay: 0.5
    }, "-=1");


    // 2. Section Animations (ScrollTrigger)
    
    // Reveal Images
    const revealImages = document.querySelectorAll('.reveal-image');
    revealImages.forEach(container => {
        // let image = container.querySelector('img'); 
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top 80%", // When top of container hits 80% of viewport height
                toggleActions: "play none none reverse"
            }
        });

        tl.from(container, {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: "power3.out"
        });
        
        // Slight scale up of image inside for "reveal" effect
        // tl.from(image, {
        //     scale: 1.2,
        //     duration: 1.5,
        //     ease: "power3.out"
        // }, "-=1.5");
    });

    // Text Animations
    const textSections = document.querySelectorAll('.philosophy-text, .visit-content, .section-title, .classes-grid');
    textSections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });


    // 3. Parallax Effect
    // Select elements with data-speed attribute
    const parallaxElements = document.querySelectorAll('[data-speed]');
    
    // Refined Parallax Logic (Movement relative to scroll)
    parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed'));
        // If speed > 1, it moves faster (looks closer). If < 1, moves slower (looks further).
        // We want to move the element on the Y axis as we scroll.
        
        // Reset previous animation to avoid conflict if any
        gsap.killTweensOf(el); 
        
        gsap.to(el, {
            y: () => (1 - speed) * 100, // Move 100px * factor
            ease: "none",
            scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Micro-interaction: Button Magnetic Effect
    const buttons = document.querySelectorAll('.btn-primary, .nav-cta');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                duration: 0.3,
                x: x * 0.2,
                y: y * 0.2,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.3,
                x: 0,
                y: 0,
                ease: "power2.out"
            });
        });
    });

});
