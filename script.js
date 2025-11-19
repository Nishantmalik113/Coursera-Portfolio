// ====== Utility: Current year in footer ======
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ====== Navigation: Hamburger Toggle ======
const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("primary-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Close mobile nav when a link is clicked
document.querySelectorAll("#primary-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (nav && nav.classList.contains("open")) {
      nav.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

// ====== Smooth Scrolling for Nav Links ======
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href")?.substring(1);
    const targetEl = targetId ? document.getElementById(targetId) : null;

    if (targetEl) {
      event.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ====== Project Filtering ======
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

function filterProjects(category) {
  projectCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");

    if (category === "all" || cardCategory === category) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-filter") || "all";

    // Active button styling
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    filterProjects(category);
  });
});

// ====== Lightbox for Project Images ======
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const viewImageButtons = document.querySelectorAll(".view-image-btn");

viewImageButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".project-card");
    const img = card?.querySelector(".project-image");

    if (lightbox && lightboxImg && img) {
      lightboxImg.src = img.src;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    }
  });
});

function closeLightbox() {
  if (lightbox && lightboxImg) {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  }
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("open")) {
    closeLightbox();
  }
});

// ====== Contact Form Validation ======
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

function validateInput(input) {
  const errorMessageEl = input.parentElement.querySelector(".error-message");
  let message = "";

  if (input.validity.valueMissing) {
    message = "This field is required.";
  } else if (input.type === "email" && input.validity.typeMismatch) {
    message = "Please enter a valid email address.";
  }

  if (errorMessageEl) {
    errorMessageEl.textContent = message;
  }

  return message === "";
}

if (form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(input);
      if (formStatus) formStatus.textContent = "";
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let allValid = true;
    inputs.forEach((input) => {
      const valid = validateInput(input);
      if (!valid) {
        allValid = false;
      }
    });

    if (!allValid) {
      if (formStatus) {
        formStatus.textContent =
          "Please correct the errors before submitting the form.";
      }
      return;
    }

    // Simulate a successful submission
    form.reset();
    inputs.forEach((input) => {
      const errorEl = input.parentElement.querySelector(".error-message");
      if (errorEl) errorEl.textContent = "";
    });

    if (formStatus) {
      formStatus.textContent = "Thank you! Your message has been sent.";
    }
  });
}
