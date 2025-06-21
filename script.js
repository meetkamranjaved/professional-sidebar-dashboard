document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const sidebarToggleBtns = document.querySelectorAll(".sidebar-toggle");
  const sidebar = document.querySelector(".sidebar");
  const searchForm = document.querySelector(".search-form");
  const themeToggleBtn = document.querySelector(".theme-toggle");
  const themeIcon = themeToggleBtn.querySelector(".theme-icon");
  const menuLinks = document.querySelectorAll(".menu-link");
  const updateThemeIcon = () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    themeIcon.textContent = sidebar.classList.contains("collapsed")
      ? isDark
        ? "light_mode"
        : "dark_mode"
      : "dark_mode";
  };
  const initTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldUseDarkTheme =
      savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    if (shouldUseDarkTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
    updateThemeIcon();
  };
  const toggleTheme = () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon();
  };
  const toggleSidebar = () => {
    sidebar.classList.toggle("collapsed");
    updateThemeIcon();
  };
  const handleSearchFormClick = () => {
    if (sidebar.classList.contains("collapsed")) {
      sidebar.classList.remove("collapsed");
      searchForm.querySelector("input").focus();
    }
  };
  const initEventListeners = () => {
    themeToggleBtn.addEventListener("click", toggleTheme);
    sidebarToggleBtns.forEach((btn) => {
      btn.addEventListener("click", toggleSidebar);
    });
    searchForm.addEventListener("click", handleSearchFormClick);
    if (window.innerWidth > 768) {
      sidebar.classList.remove("collapsed");
    }
  };
  initTheme();
  initEventListeners();
});
