    // ======================
    // CURSOR (DESKTOP ONLY)
    // ======================
    if (window.innerWidth > 768) {

    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursorRing");

    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    document.addEventListener("mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
    });

    function animateCursor() {
        cursor.style.left = mx + "px";
        cursor.style.top = my + "px";

        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;

        ring.style.left = rx + "px";
        ring.style.top = ry + "px";

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", () => {
        ring.style.transform = "translate(-50%, -50%) scale(1.8)";
        });

        el.addEventListener("mouseleave", () => {
        ring.style.transform = "translate(-50%, -50%) scale(1)";
        });
    });
    }


    // ======================
    // PARTICLES BACKGROUND
    // ======================
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const pts = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.5 + 0.5,
    }));

    function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,245,255,0.4)";
        ctx.fill();
    });

    pts.forEach((a, i) => {
        pts.slice(i + 1).forEach((b) => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);

        if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,245,255,${0.15 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
        });
    });

    requestAnimationFrame(drawParticles);
    }

    drawParticles();


    // ======================
    // FADE-IN ON SCROLL
    // ======================
    const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-up");
        }
        });
    },
    { threshold: 0.1 }
    );

    document
    .querySelectorAll(".skill-card, .about-card, .social-card, .project-card")
    .forEach((el) => observer.observe(el));


    // ======================
    // NAV MENU ACTIVE (CLICK)
    // ======================
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        navLinks.forEach((l) => l.classList.remove("active"));
        e.target.classList.add("active");
    });
    });


    // ======================
    // NAV MENU ACTIVE (SCROLL)
    // ======================
    window.addEventListener("scroll", () => {

    let current = "";

    document.querySelectorAll("section").forEach((section) => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
        }
    });
    });