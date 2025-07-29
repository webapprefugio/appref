
      const firebaseConfig = {
        apiKey: "AIzaSyCzg9Pr8-7UGv7f451Vx30WpzwRcsGd_qs",
        authDomain: "appref-projeto.firebaseapp.com",
        projectId: "appref-projeto",
        storageBucket: "appref-projeto.appspot.com",
        messagingSenderId: "80380853942",
        appId: "1:80380853942:web:2320fa16fa06f2ffa77017",
      };

      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      const auth = firebase.auth();
      const db = firebase.firestore();

      function normalizarTexto(str) {
        return str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "")
          .toLowerCase();
      }

      document.getElementById("email").addEventListener("blur", async function () {
        const email = this.value.trim().toLowerCase();
        const mensagem = document.getElementById("mensagem");
        mensagem.textContent = "";

        if (!email) {
          document.getElementById("perguntaContainer").style.display = "none";
          return;
        }

        try {
          const query = await db.collection("usuarios").where("email", "==", email).limit(1).get();

          if (query.empty) {
            mensagem.textContent = "E-mail não encontrado.";
            document.getElementById("perguntaContainer").style.display = "none";
            return;
          }

          const doc = query.docs[0].data();
          document.getElementById("perguntaSeguranca").textContent = doc.perguntaSeguranca || "";
          document.getElementById("perguntaContainer").style.display = "block";
        } catch (erro) {
          mensagem.textContent = "Erro ao buscar pergunta de segurança.";
          document.getElementById("perguntaContainer").style.display = "none";
        }
      });

      document.getElementById("formAlterarSenha").addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const resposta = document.getElementById("respostaUsuario").value.trim();
        const mensagem = document.getElementById("mensagem");
        const btnSubmit = document.querySelector("#formAlterarSenha button[type=submit]");
        mensagem.textContent = "";

        if (!email || !resposta) {
          mensagem.textContent = "Preencha o e-mail e a resposta.";
          return;
        }

        btnSubmit.disabled = true;

        try {
          const query = await db.collection("usuarios").where("email", "==", email).limit(1).get();

          if (query.empty) {
            mensagem.textContent = "E-mail não encontrado.";
            btnSubmit.disabled = false;
            return;
          }

          const doc = query.docs[0].data();
          const respostaSalva = normalizarTexto(doc.respostaSeguranca || "");
          const respostaNormalizada = normalizarTexto(resposta);

          if (respostaNormalizada !== respostaSalva) {
            mensagem.textContent = "❌ Resposta incorreta.";
            btnSubmit.disabled = false;
            return;
          }

          await auth.sendPasswordResetEmail(email);
          mensagem.innerHTML =
            "✅ Link de redefinição enviado para o seu e-mail.<br>Verifique também sua caixa de spam.";
          document.getElementById("email").style.display = "none";
          document.getElementById("perguntaContainer").style.display = "none";
          btnSubmit.style.display = "none";
          document.querySelector("#formAlterarSenha button.alt-btn").style.display = "none";
          mostrarBotaoLogin();
        } catch (error) {
          console.error("Erro ao enviar redefinição:", error);
          mensagem.textContent = "Erro ao enviar o e-mail de redefinição.";
          btnSubmit.disabled = false;
        }
      });

      function mostrarBotaoLogin() {
        const container = document.querySelector(".container");
        if (document.getElementById("btnLogin")) return;

        const btn = document.createElement("button");
        btn.id = "btnLogin";
        btn.textContent = "Ir para Login";
        btn.onclick = () => (window.location.href = "login.html");
        container.appendChild(btn);
      }
