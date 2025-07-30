function forcarSugestoes(input) {
    const valor = input.value;
    input.value = "";
    setTimeout(() => {
      input.value = valor;
    }, 1);
  }

  function limparRespostaSeguranca(valor) {
    return valor
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .toLowerCase();
  }

  function dominioValidoPerfil(url) {
    try {
      const parsed = new URL(url);
      const dominio = parsed.hostname.toLowerCase();

      return (
        dominio.includes("facebook.com") ||
        dominio.includes("instagram.com") ||
        dominio.includes("twitter.com")

      );
    } catch (err) {
      return false;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const lstUf = document.getElementById("lstUf");
    const campoCidades = document.getElementById("campo-cidades");
    const msgCidadeInfo = document.getElementById("msg-cidade-info");
    const mensagem = document.getElementById("mensagem");
    const form = document.getElementById("formCadastro");
    let cidadesPorUF = {};

    Promise.all([
      fetch("json/ufs.json").then((res) => res.json()),
      fetch("json/cidades.json").then((res) => res.json()),
    ])
      .then(([estados, cidades]) => {
        const stateIdToAbbr = {};
        estados.sort((a, b) => a.name.localeCompare(b.name, "pt-BR")).forEach((estado) => {
          stateIdToAbbr[estado.id] = estado.abbr;
          const opt = document.createElement("option");
          opt.value = estado.abbr;
          opt.textContent = estado.name;
          lstUf.appendChild(opt);
        });

        cidades.forEach((cidade) => {
          const uf = stateIdToAbbr[cidade.state_id];
          if (!uf) return;
          if (!cidadesPorUF[uf]) cidadesPorUF[uf] = [];
          cidadesPorUF[uf].push(cidade.name);
        });

        Object.keys(cidadesPorUF).forEach((uf) => {
          cidadesPorUF[uf].sort((a, b) => a.localeCompare(b, "pt-BR"));
        });
      })
      .catch((erro) => {
        console.error("Erro ao carregar estados/cidades:", erro);
      });

    lstUf.addEventListener("change", () => {
      const uf = lstUf.value;
      campoCidades.innerHTML = "";
      if (!uf) {
        campoCidades.innerHTML = '<span id="msg-cidade-placeholder">Selecione uma cidade</span>';
        return;
      }

      const cidades = cidadesPorUF[uf];
      if (cidades && Array.isArray(cidades)) {
        cidades.slice(0, 1000).forEach((cidade) => {
          const label = document.createElement("label");
          label.innerHTML = `<input type='checkbox' name='cidades' value='${cidade}'> <span>${cidade}</span>`;
          campoCidades.appendChild(label);
        });
      } else {
        campoCidades.innerHTML = "<span>Nenhuma cidade encontrada</span>";
      }

      campoCidades.querySelectorAll("input[type='checkbox']").forEach((cb) => {
        cb.addEventListener("change", function () {
          const selecionados = campoCidades.querySelectorAll("input[type='checkbox']:checked");
          if (selecionados.length > 3) {
            this.checked = false;
            mensagem.textContent = "Selecione no máximo 3 cidades.";
            setTimeout(() => {
              mensagem.textContent = "";
            }, 2000);
          }
        });
      });
    });

    const campoPerfil = document.getElementById("txtPerfilSocial");
    const ajudaPerfil = document.createElement("div");

    ajudaPerfil.style.fontSize = "0.9rem";
    ajudaPerfil.style.color = "#555";
    ajudaPerfil.style.marginTop = "4px";
    campoPerfil.parentNode.insertBefore(ajudaPerfil, campoPerfil.nextSibling);

    campoPerfil.addEventListener("input", () => {
      const valor = campoPerfil.value.trim();

      if (valor === "") {
        ajudaPerfil.textContent = "";
        return;
      }

      let msg = "";

      try {
        const parsed = new URL(valor);
        const host = parsed.hostname.toLowerCase();

        if (host.includes("facebook.com")) {
          msg = "✅ Facebook detectado — link válido.";
        } else if (host.includes("instagram.com")) {
          msg = "✅ Instagram detectado — link válido.";
        } 
        else if (host.includes("twitter.com")) {
          msg = "✅ X (Twitter) detectado — link válido.";
        } else {
          msg = "❌ Insira uma URL válida do Instagram, Facebook ou X-Twitter";
        }
      } catch {
        msg = "❌ Insira uma URL válida do Instagram, Facebook ou X-Twitter";
      }

      ajudaPerfil.textContent = msg;
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      mensagem.textContent = "";

      const nome = document.getElementById("txtNome").value.trim();
      const email = document.getElementById("txtEmail").value.trim().toLowerCase();
      const senha = document.getElementById("txtSenha").value.trim();
      const pergunta = document.getElementById("txtPerguntaSeguranca").value.trim();
      const resposta = document.getElementById("txtRespostaSeguranca").value.trim();
      const perfilSocial = document.getElementById("txtPerfilSocial").value.trim();
      const termos = document.getElementById("chkTermos").checked;

      if (!dominioValidoPerfil(perfilSocial)) {
        mensagem.textContent = "Use um link do Facebook ou Instagram somente.";
        return;
      }

      if (!termos) {
        mensagem.textContent = "Você precisa aceitar os Termos de uso e Condições.";
        return;
      }

      if (!nome || !email || !senha || !pergunta || !resposta || !perfilSocial) {
        mensagem.textContent = "Preencha todos os campos obrigatórios.";
        return;
      }

      const cidadesSelecionadas = Array.from(
        campoCidades.querySelectorAll("input[type='checkbox']:checked")
      ).map((input) => input.value);

      if (cidadesSelecionadas.length === 0) {
        mensagem.textContent = "Selecione pelo menos uma cidade.";
        return;
      }

      if (cidadesSelecionadas.length > 3) {
        mensagem.textContent = "Selecione no máximo 3 cidades.";
        return;
      }

      const respostaNormalizada = limparRespostaSeguranca(resposta);
      mensagem.textContent = "Processando cadastro...";

      try {
        const auth = firebase.auth();
        const db = firebase.firestore();

        const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
        const user = userCredential.user;
        
await db.collection("usuarios").doc(user.uid).set({
  nome: nome,
  email: email,
  linkPerfil: perfilSocial, // <- ALTERADO
  perguntaSeguranca: pergunta,
  respostaSeguranca: respostaNormalizada,
  uf: lstUf.value, // <- ALTERADO
  cidades: cidadesSelecionadas, // ✅ CORRETO: salva o array com até 3 cidades
  criadoEm: firebase.firestore.FieldValue.serverTimestamp()
});


        await auth.signOut();

        mensagem.textContent = "Cadastro realizado com sucesso! Redirecionando para o login...";
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);

} catch (error) {
  console.error("Erro no cadastro:", error);

  switch (error.code) {
    case 'auth/email-already-in-use':
      mensagem.textContent = "Este email já está cadastrado. Tente fazer login ou use outro email.";
      break;
    case 'auth/invalid-email':
      mensagem.textContent = "O email informado é inválido. Verifique se está correto.";
      break;
    case 'auth/weak-password':
      mensagem.textContent = "A senha precisa conter 6 caracteres ou mais.";
      break;
    default:
      mensagem.textContent = "Erro ao cadastrar: " + error.message;
  }
}

    });
  }); 

let html5QrCode;

function abrirLeitorQR() {
  const overlay = document.getElementById("popup-qr-overlay");
  overlay.style.display = "flex";

  if (typeof Html5Qrcode !== "undefined") {
    html5QrCode = new Html5Qrcode("scanner");

    html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250,
        aspectRatio: 1
      },
      (decodedText) => {
        document.getElementById("txtPerfilSocial").value = decodedText;
        document.getElementById("txtNome").focus();
        fecharLeitorQR();
      },
      (errorMessage) => {
        // Erros esperados
      }
    ).catch((err) => {
      console.error("Erro ao abrir scanner:", err);
      document.getElementById("scanner").innerHTML = "<p style='color:red;'>Erro ao acessar câmera.</p>";
    });
  } else {
    console.error("Html5Qrcode não está disponível.");
    document.getElementById("scanner").innerHTML = "<p style='color:red;'>Biblioteca de QR não carregada.</p>";
  }
}


function fecharLeitorQR() {
  const overlay = document.getElementById("popup-qr-overlay");

  if (html5QrCode) {
    html5QrCode.stop().then(() => {
      html5QrCode.clear();
      overlay.style.display = "none";
      html5QrCode = null;
    }).catch((err) => {
      console.warn("Erro ao parar scanner:", err);
      overlay.style.display = "none"; // Fecha mesmo com erro
    });
  } else {
    overlay.style.display = "none";
  }
}


