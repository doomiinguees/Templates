window.addEventListener("DOMContentLoaded", () => {
    loadComponent("navbar.html", "navbar");
    loadComponent("sidebar.html", "sidebar");
    loadComponent("footer.html", "footer");
    applySavedTheme();
    applySavedSidebarState();
});

function loadComponent(file, elementId) {
    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error(`Erro ao carregar ${file}`);
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;

            // Atualiza ícone do tema depois de carregar navbar
            if (elementId === "navbar") {
                updateThemeIcon();
                attachToggleSidebarListener(); // tenta anexar botão depois de navbar carregada
            }

            // Aplica colapso se for sidebar
            if (elementId === "sidebar") {
                applySavedSidebarState();
            }
        })
        .catch(error => console.error(error));
}

// Alterna entre tema claro e escuro
function toggleTheme() {
    const themeLink = document.getElementById("theme-style");
    const currentTheme = themeLink.getAttribute("href");

    const isLight = currentTheme.includes("light");
    const newTheme = isLight ? "css/theme-dark.css" : "css/theme-light.css";

    themeLink.setAttribute("href", newTheme);
    localStorage.setItem("preferredTheme", newTheme);
    updateThemeIcon();
}

// Aplica o tema salvo no localStorage
function applySavedTheme() {
    const savedTheme = localStorage.getItem("preferredTheme");
    if (savedTheme) {
        const themeLink = document.getElementById("theme-style");
        themeLink.setAttribute("href", savedTheme);
    }
}

// Atualiza o ícone de tema
function updateThemeIcon() {
    const themeLink = document.getElementById("theme-style");
    const icon = document.getElementById("themeIcon");

    if (!icon || !themeLink) return;

    const isLight = themeLink.getAttribute("href").includes("light");
    icon.classList.remove("fa-sun", "fa-moon");
    icon.classList.add(isLight ? "fa-sun" : "fa-moon");
}

// Aplica o estado salvo da sidebar
function applySavedSidebarState() {
    const savedState = localStorage.getItem("sidebarCollapsed");
    const sidebar = document.querySelector(".sidebar");
    if (sidebar && savedState === "true") {
        sidebar.classList.add("collapsed");
    }
}

// Anexa o listener ao botão de toggle da sidebar
function attachToggleSidebarListener() {
    const toggleBtn = document.getElementById("toggleSidebar");
    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
        const sidebar = document.querySelector(".sidebar");
        if (!sidebar) return;

        sidebar.classList.toggle("collapsed");
        const isCollapsed = sidebar.classList.contains("collapsed");
        localStorage.setItem("sidebarCollapsed", isCollapsed);
    });
}
