document.addEventListener("DOMContentLoaded", () => {
  fetch('menu.html')
    .then(res => res.text())
    .then(html => {
      const menuDiv = document.getElementById('menu');
      if (menuDiv) {
        menuDiv.innerHTML = html;

        const currentPage = location.pathname.split("/").pop();
        document.querySelectorAll('.nav-links a').forEach(link => {
          if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
          }
        });
      }
    })
    .catch(err => console.error("Erro ao carregar menu:", err));
});
