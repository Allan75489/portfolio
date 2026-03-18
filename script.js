/* ================= MENU ATIVO ================= */
const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});

/* ================= SCROLL SUAVE + ATIVO AUTOMÁTICO ================= */
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;

    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");

        if (scrollY >= top && scrollY < top + height) {
            links.forEach(a => {
                a.classList.remove("active");
                if (a.getAttribute("href") === `#${id}`) {
                    a.classList.add("active");
                }
            });
        }
    });
});

/* ================= ANIMAÇÃO AO ENTRAR NA TELA ================= */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll(".project-card, .skills-card").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});

/* ================= EFEITO DIGITAÇÃO (TYPEWRITER) ================= */
const text = "Web Developer & UI Designer";
let index = 0;
const speed = 80;

function typeEffect() {
    const element = document.querySelector(".typing");

    if (!element) return;

    if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, speed);
    }
}

window.addEventListener("load", typeEffect);

/* ================= BOTÕES (FEEDBACK CLIQUE) ================= */
document.querySelectorAll(".buttons a").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.style.transform = "scale(0.95)";
        setTimeout(() => {
            btn.style.transform = "scale(1)";
        }, 150);
    });
});

/* ================= SCROLL REVEAL (FADE) ================= */
const revealElements = document.querySelectorAll(".hero-content, .projects, .skills");

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
};

window.addEventListener("scroll", revealOnScroll);

/* ================= CONFIG INICIAL ================= */
window.addEventListener("load", () => {
    document.querySelectorAll(".hero-content, .projects, .skills").forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "0.6s ease";
    });

    revealOnScroll();
});