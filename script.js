document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinks = document.querySelector(".nav-links")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      this.classList.toggle("active")
      navLinks.classList.toggle("active")

      if (this.classList.contains("active")) {
        document.body.style.overflow = "hidden"
        navLinks.style.display = "flex"
      } else {
        document.body.style.overflow = "auto"
        setTimeout(() => {
          navLinks.style.display = "none"
        }, 300)
      }
    })
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      if (navLinks.classList.contains("active")) {
        mobileMenuBtn.click()
      }

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Testimonial Slider
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  let currentIndex = 0

  function showTestimonial(index) {
    testimonialCards.forEach((card) => card.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    testimonialCards[index].classList.add("active")
    dots[index].classList.add("active")
    currentIndex = index
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      let newIndex = currentIndex - 1
      if (newIndex < 0) newIndex = testimonialCards.length - 1
      showTestimonial(newIndex)
    })

    nextBtn.addEventListener("click", () => {
      let newIndex = currentIndex + 1
      if (newIndex >= testimonialCards.length) newIndex = 0
      showTestimonial(newIndex)
    })
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showTestimonial(index)
    })
  })

  // Auto-rotate testimonials
  setInterval(() => {
    if (nextBtn) nextBtn.click()
  }, 5000)

  // Animate numbers in Results section
  const resultNumbers = document.querySelectorAll(".result-number")

  function animateNumbers() {
    resultNumbers.forEach((number) => {
      const target = Number.parseInt(number.getAttribute("data-count"))
      const duration = 2000 // 2 seconds
      const step = target / (duration / 16) // 16ms per frame (approx 60fps)
      let current = 0

      const timer = setInterval(() => {
        current += step
        if (current >= target) {
          clearInterval(timer)
          current = target
        }
        number.textContent = Math.floor(current).toLocaleString()
      }, 16)
    })
  }

  // Intersection Observer for animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("results-grid")) {
            animateNumbers()
          }
          entry.target.classList.add("animate")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 },
  )

  // Observe elements for animations
  document.querySelectorAll(".feature-card, .persona-card, .highlight-item, .results-grid").forEach((el) => {
    observer.observe(el)
  })

  // Header scroll effect
  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Add CSS for scrolled header
  const style = document.createElement("style")
  style.textContent = `
    header.scrolled {
      padding: 10px 0;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }
    
    .nav-links.active {
      position: fixed;
      top: 70px;
      left: 0;
      width: 100%;
      height: calc(100vh - 70px);
      background-color: var(--white);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 999;
      transition: all 0.3s ease;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
    
    .feature-card, .persona-card, .highlight-item, .results-grid {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.animate, .persona-card.animate, .highlight-item.animate, .results-grid.animate {
      opacity: 1;
      transform: translateY(0);
    }
    
    .highlight-item:nth-child(2) {
      transition-delay: 0.2s;
    }
    
    .highlight-item:nth-child(3) {
      transition-delay: 0.4s;
    }
  `
  document.head.appendChild(style)
})
