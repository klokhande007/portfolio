(function () {
  "use strict";

  const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const LEVEL_MAP = {
    beginner: 25,
    novice: 25,
    intermediate: 50,
    proficient: 65,
    advanced: 80,
    expert: 100,
    master: 100
  };

  function el(tag, opts = {}) {
    const node = document.createElement(tag);
    if (opts.className) node.className = opts.className;
    if (opts.text) node.textContent = opts.text;
    if (opts.html) node.innerHTML = opts.html;
    if (opts.attrs) {
      Object.entries(opts.attrs).forEach(([k, v]) => node.setAttribute(k, v));
    }
    return node;
  }

  function formatDate(value) {
    if (!value) return "";
    const parts = String(value).split("-");
    const year = parts[0];
    const monthIndex = parts[1] ? parseInt(parts[1], 10) - 1 : null;
    if (monthIndex !== null && MONTHS[monthIndex]) {
      return `${MONTHS[monthIndex]} ${year}`;
    }
    return year;
  }

  function dateRange(startDate, endDate) {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : "Present";
    if (!start) return "";
    return `${start} — ${end}`;
  }

  function showSection(id) {
    const section = document.getElementById(id);
    if (section) section.hidden = false;
  }

  function addNavLink(id, label) {
    const list = document.getElementById("nav-list");
    const li = el("li");
    const a = el("a", { text: label, attrs: { href: `#${id}` } });
    li.appendChild(a);
    list.appendChild(li);
  }

  function renderBasics(basics) {
    if (!basics) return;

    document.title = basics.name
      ? `${basics.name}${basics.label ? " — " + basics.label : ""}`
      : "Portfolio";

    const nameEl = document.getElementById("basics-heading");
    if (basics.name) {
      nameEl.textContent = basics.name;
      document.getElementById("basics-name").textContent = basics.name;
    }

    const labelEl = document.getElementById("basics-label");
    if (basics.label) {
      labelEl.textContent = basics.label;
    } else {
      labelEl.hidden = true;
    }

    const summaryEl = document.getElementById("basics-summary");
    if (basics.summary) {
      summaryEl.textContent = basics.summary;
    } else {
      summaryEl.hidden = true;
    }

    if (basics.image) {
      const img = document.getElementById("basics-image");
      img.src = basics.image;
      img.alt = `Portrait of ${basics.name || "the profile owner"}`;
      img.hidden = false;
    }

    const contacts = document.getElementById("basics-contacts");
    const contactItems = [];

    if (basics.email) {
      contactItems.push({ href: `mailto:${basics.email}`, text: basics.email });
    }
    if (basics.phone) {
      contactItems.push({ href: `tel:${basics.phone}`, text: basics.phone });
    }
    if (basics.url) {
      contactItems.push({ href: basics.url, text: basics.url });
    }

    const loc = basics.location || {};
    const locationParts = [loc.city, loc.region, loc.countryCode].filter(Boolean);
    if (locationParts.length) {
      contactItems.push({ text: locationParts.join(", ") });
    }

    if (contactItems.length) {
      contactItems.forEach((item) => {
        const li = el("li");
        if (item.href) {
          const a = el("a", { text: item.text, attrs: { href: item.href } });
          li.appendChild(a);
        } else {
          li.textContent = item.text;
        }
        contacts.appendChild(li);
      });
    } else {
      contacts.hidden = true;
    }

    const profiles = document.getElementById("basics-profiles");
    if (Array.isArray(basics.profiles) && basics.profiles.length) {
      basics.profiles.forEach((profile) => {
        const li = el("li");
        const href = /^https?:\/\//i.test(profile.url) ? profile.url : `https://${profile.url}`;
        const a = el("a", {
          text: profile.network ? `${profile.network}` : href,
          attrs: { href, target: "_blank", rel: "noopener noreferrer" }
        });
        li.appendChild(a);
        profiles.appendChild(li);
      });
    } else {
      profiles.hidden = true;
    }
  }

  function renderWork(work) {
    if (!Array.isArray(work) || work.length === 0) return;
    showSection("work");
    addNavLink("work", "Experience");

    const list = document.getElementById("work-list");
    work.forEach((job) => {
      const item = el("div", { className: "timeline-item" });

      const heading = el("h3");
      heading.textContent = job.position || job.name || "";
      item.appendChild(heading);

      if (job.name) {
        const org = el("span", { className: "org", text: job.name });
        item.appendChild(org);
      }

      const range = dateRange(job.startDate, job.endDate);
      if (range) {
        item.appendChild(el("span", { className: "dates", text: range }));
      }

      if (job.summary) {
        item.appendChild(el("p", { className: "role-summary", text: job.summary }));
      }

      if (Array.isArray(job.highlights) && job.highlights.length) {
        const ul = el("ul");
        job.highlights.forEach((h) => ul.appendChild(el("li", { text: h })));
        item.appendChild(ul);
      }

      list.appendChild(item);
    });
  }

  function renderProjects(projects) {
    if (!Array.isArray(projects) || projects.length === 0) return;
    showSection("projects");
    addNavLink("projects", "Projects");

    const list = document.getElementById("projects-list");
    projects.forEach((project) => {
      const card = el("div", { className: "card" });
      if (project.name) card.appendChild(el("h3", { text: project.name }));

      const range = dateRange(project.startDate, project.endDate);
      if (range) card.appendChild(el("p", { text: range }));

      if (project.description) {
        card.appendChild(el("p", { text: project.description }));
      }

      if (Array.isArray(project.highlights) && project.highlights.length) {
        const ul = el("ul");
        project.highlights.forEach((h) => ul.appendChild(el("li", { text: h })));
        card.appendChild(ul);
      }

      if (Array.isArray(project.keywords) && project.keywords.length) {
        const ul = el("ul", { className: "keywords" });
        project.keywords.forEach((k) => ul.appendChild(el("li", { text: k })));
        card.appendChild(ul);
      }

      if (project.url) {
        card.appendChild(
          el("a", {
            text: "View project →",
            attrs: { href: project.url, target: "_blank", rel: "noopener noreferrer" }
          })
        );
      }

      list.appendChild(card);
    });
  }

  function renderSkills(skills) {
    if (!Array.isArray(skills) || skills.length === 0) return;
    showSection("skills");
    addNavLink("skills", "Skills");

    const list = document.getElementById("skills-list");
    skills.forEach((skill) => {
      const card = el("div", { className: "card skill-card" });
      card.appendChild(el("h3", { text: skill.name || "" }));

      if (Array.isArray(skill.keywords) && skill.keywords.length) {
        const ul = el("ul", { className: "keywords" });
        skill.keywords.forEach((k) => ul.appendChild(el("li", { text: k })));
        card.appendChild(ul);
      }

      if (skill.level) {
        const pct = LEVEL_MAP[String(skill.level).toLowerCase()] || 60;
        const bar = el("div", { className: "skill-level", attrs: { role: "img", "aria-label": `Level: ${skill.level}` } });
        const fill = el("span");
        fill.style.width = `${pct}%`;
        bar.appendChild(fill);
        card.appendChild(bar);
      }

      list.appendChild(card);
    });
  }

  function renderEducation(education) {
    if (!Array.isArray(education) || education.length === 0) return;
    showSection("education");
    addNavLink("education", "Education");

    const list = document.getElementById("education-list");
    education.forEach((edu) => {
      const card = el("div", { className: "card" });
      if (edu.studyType || edu.area) {
        const title = [edu.studyType, edu.area].filter(Boolean).join(" in ");
        card.appendChild(el("h3", { text: title }));
      }
      if (edu.institution) card.appendChild(el("p", { text: edu.institution }));

      const range = dateRange(edu.startDate, edu.endDate);
      if (range) card.appendChild(el("p", { text: range }));

      if (edu.score) card.appendChild(el("p", { text: `Score: ${edu.score}` }));

      list.appendChild(card);
    });
  }

  function renderCertificates(certificates) {
    if (!Array.isArray(certificates) || certificates.length === 0) return;
    showSection("certificates");
    addNavLink("certificates", "Certificates");

    const list = document.getElementById("certificates-list");
    certificates.forEach((cert) => {
      const li = el("li");
      const title = el("strong", { text: cert.name || "" });
      li.appendChild(title);

      const metaParts = [cert.issuer, formatDate(cert.date)].filter(Boolean);
      if (metaParts.length) {
        li.appendChild(el("span", { className: "cert-date", text: metaParts.join(" · ") }));
      }

      if (cert.url) {
        li.appendChild(document.createTextNode(" "));
        li.appendChild(
          el("a", { text: "View credential", attrs: { href: cert.url, target: "_blank", rel: "noopener noreferrer" } })
        );
      }

      list.appendChild(li);
    });
  }

  function renderFooter(basics) {
    const footer = document.getElementById("footer-text");
    const year = new Date().getFullYear();
    footer.textContent = basics && basics.name
      ? `© ${year} ${basics.name}. Built with a static, framework-free portfolio site.`
      : `© ${year}. Built with a static, framework-free portfolio site.`;
  }

  function initThemeToggle() {
    const toggle = document.getElementById("theme-toggle");
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", initial);

    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  function render(resume) {
    renderBasics(resume.basics);
    renderWork(resume.work);
    renderProjects(resume.projects);
    renderSkills(resume.skills);
    renderEducation(resume.education);
    renderCertificates(resume.certificates);
    renderFooter(resume.basics);
  }

  function renderError() {
    const main = document.getElementById("main");
    main.innerHTML = "";
    const message = el("div", { className: "container" });
    message.appendChild(el("h1", { text: "Unable to load résumé data" }));
    message.appendChild(
      el("p", { text: "Make sure resume.json is present and you are viewing this site over a local server (not the file:// protocol)." })
    );
    main.appendChild(message);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();

    fetch("resume.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load resume.json");
        return response.json();
      })
      .then(render)
      .catch((err) => {
        console.error(err);
        renderError();
      });
  });
})();
