

         const firebaseConfig = {
           apiKey: "AIzaSyCzg9Pr8-7UGv7f451Vx30WpzwRcsGd_qs",
           authDomain: "appref-projeto.firebaseapp.com",
           projectId: "appref-projeto",
           storageBucket: "appref-projeto.appspot.com",
           messagingSenderId: "80380853942",
           appId: "1:80380853942:web:2320fa16fa06f2ffa77017"
         };
         
         if (!firebase.apps.length) {
           firebase.initializeApp(firebaseConfig);
         }
         
         const db = firebase.firestore();
         const auth = firebase.auth();
         
         function showLoginMessage(msg) {
           let msgDiv = document.getElementById('login-msg');
           const form = document.querySelector('.formulario');
           if (!msgDiv) {
             msgDiv = document.createElement('div');
             msgDiv.id = 'login-msg';
             form.insertBefore(msgDiv, form.querySelector('button'));
           }
           msgDiv.textContent = msg;
         }
         
         function renderConsulta(saudacaoHtml, nomeUsuario) {
           const areaConsulta = document.getElementById('area-consulta');
           areaConsulta.innerHTML = `
             ${saudacaoHtml}
             <div><button id="btnLogout">Sair</button></div>
             
             <div>
               <table>
                 <thead>
                   <tr>
                     <th>Link</th>
                     <th>Nome</th>
                     
                     <th>Cidade</th>
                   </tr>
                 </thead>
                 <tbody id="tabela-usuarios"></tbody>
               </table>
             </div>
            <div><br>

<form class="formulario">
  
  <div id="msg-excluir"></div>

<!-- Botão de exclusão inativo -->
<div class="excluir-botao">
  <button id="excluirconta">Excluir minha conta</button>
</div>

  <!-- ... resto do formulário ... -->
  
</form>

            </div>

           `;
         
           const tabela = document.getElementById('tabela-usuarios');
         
         db.collection("usuarios").get().then(snapshot => {
         tabela.innerHTML = "";
         const cidadesUsuario = [];
         const emailUsuario = auth.currentUser.email;
         console.log("Email logado:", emailUsuario);
         
         // Primeiro: capturar as cidades do usuário logado
         snapshot.forEach(doc => {
         const u = doc.data();
         if ((u.email || "").trim().toLowerCase() === emailUsuario.trim().toLowerCase()) {
           console.log("Usuário logado encontrado:", u);
         
           if (Array.isArray(u.cidades)) {
             u.cidades.forEach(c => {
               if (typeof c === 'string') {
                 cidadesUsuario.push(c.trim().toLowerCase());
               }
             });
           } else {
             console.warn("⚠️ Usuário logado não tem cidades definidas como array no Firestore.");
           }
         }
         });
         
         // Segundo: filtrar os usuários para exibir na tabela
         const registros = [];
         snapshot.forEach(doc => {
         const u = doc.data();
         if (!u.email || !u.uf || !u.cidades || !Array.isArray(u.cidades) || !u.linkPerfil || !u.nome) return;
         
         const cidadeIgual = u.cidades.some(c => cidadesUsuario.includes(c.trim().toLowerCase()));
         const mesmoUsuario = (u.email || "").trim().toLowerCase() === emailUsuario.trim().toLowerCase();
         
         if (cidadeIgual || mesmoUsuario) {
           registros.push(u);
         }
         });
         
         // ... continua com o código para agrupar por UF e exibir na tabela
         
         console.log("Registros que serão exibidos:", registros);
         
         
             const agrupadoPorUF = {};
             registros.forEach(u => {
               const uf = (u.uf || u.estados || "").toUpperCase();
               if (!agrupadoPorUF[uf]) agrupadoPorUF[uf] = [];
               agrupadoPorUF[uf].push(u);
             });
         
         
             for (const uf in agrupadoPorUF) {
               const grupo = agrupadoPorUF[uf];
               for (let i = grupo.length - 1; i > 0; i--) {
                 const j = Math.floor(Math.random() * (i + 1));
                 [grupo[i], grupo[j]] = [grupo[j], grupo[i]];
               }
             }
         
             const ufsOrdenadas = Object.keys(agrupadoPorUF).sort();
             ufsOrdenadas.forEach(uf => {
               tabela.innerHTML += `<tr><td colspan="4">Estado: ${uf}</td></tr>`;
         agrupadoPorUF[uf].forEach(usuario => {
         (usuario.cidades || []).forEach(cidade => {
         if (cidadesUsuario.includes(cidade.trim().toLowerCase())) {
           tabela.innerHTML += `
             <tr>
               <td><a href="${usuario.linkPerfil}" target="_blank" rel="noopener">Fale comigo</a></td>
               <td>${usuario.nome}</td>
               
               <td>${cidade}</td>
             </tr>`;
         }
         });
         });
         
             });
           }).catch(() => {
             tabela.innerHTML = '<tr><td colspan="4">Erro ao carregar dados.</td></tr>';
           });
         
           document.getElementById('btnLogout').onclick = function () {
             auth.signOut().then(() => {
               localStorage.removeItem('userCity');
               window.location.reload();
             });
           };
         
           let countdownInterval; 
let countdown = 10; 
let isConfirmingDeletion = false; 

document.getElementById('excluirconta').onclick = function (e) { // <-- Adicione 'e' como parâmetro aqui
  e.preventDefault(); // <-- ADICIONE ESTA LINHA AQUI!

  const user = auth.currentUser;
  const msgDiv = document.getElementById('msg-excluir');
  const btnExcluir = this; 

  if (isConfirmingDeletion) {
    clearInterval(countdownInterval); 
    countdownInterval = null; 
    countdown = 10; 
    isConfirmingDeletion = false; 

    btnExcluir.innerHTML = '<i class="fas fa-trash"></i> Excluir minha conta'; 
    
    msgDiv.textContent = 'Processando exclusão...';
    user.delete().then(() => {
      window.location.href = 'contaexcluida.html';
    }).catch(error => {
      if (error.code === 'auth/requires-recent-login') {
        msgDiv.textContent = 'Por segurança, refaça o login para excluir sua conta.';
        auth.signOut().then(() => window.location.reload());
      } else {
        msgDiv.textContent = 'Erro ao excluir conta: ' + error.message;
      }
    });

  } else {
    isConfirmingDeletion = true; 
    
 

    countdownInterval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        btnExcluir.innerHTML = `Confirme sua exclusão em até ${countdown} segundos, ou aguarde o cancelamento.`;
        
      
      } else {
        clearInterval(countdownInterval); 
        countdownInterval = null; 
        countdown = 10; 
        isConfirmingDeletion = false; 

        btnExcluir.innerHTML = ' Excluir minha conta';
        msgDiv.textContent = 'Tempo esgotado. Exclusão cancelada!';
      }
    }, 1000); 
  }
};
         }
         
         function carregarConsulta() {
           const user = auth.currentUser;
           if (!user) return;
         
           db.collection("usuarios").where("email", "==", user.email).limit(1).get().then(snapshot => {
             let nome = '';
             let cidadeUsuario = '';
             if (!snapshot.empty) {
               const userData = snapshot.docs[0].data();
               nome = userData.nome || '';
               
               localStorage.setItem('userCity', cidadeUsuario);
             }
             const saudacao = nome ? `<div>Paz e Bem,&nbsp;<span>${nome}</span>!</div>` : '';
             renderConsulta(saudacao, nome);
           }).catch(error => {
             console.error("Erro ao buscar dados do usuário:", error);
             renderConsulta('', '');
           });
         }
         
         window.addEventListener('DOMContentLoaded', () => {
           const loginForm = document.querySelector('.formulario');
           const areaConsulta = document.getElementById('area-consulta');
         
           loginForm.addEventListener('submit', function (e) {
             e.preventDefault();
             const email = document.getElementById('email').value.trim();
             const senha = document.getElementById('senha').value.trim();
         
             if (!email || !senha) {
               showLoginMessage('Preencha todos os campos.');
               return;
             }
         
             firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
               .then(() => {
                 return auth.signInWithEmailAndPassword(email, senha);
               })
               .then(() => {
                 showLoginMessage('');
                 loginForm.style.display = 'none';
                 areaConsulta.style.display = 'block';
                 carregarConsulta();
               })
               .catch(error => {
                 showLoginMessage('E-mail ou senha inválidos.');
                 console.error(error);
               });
           });
         
           auth.onAuthStateChanged(user => {
             if (user) {
               document.querySelector('.formulario').style.display = 'none';
               areaConsulta.style.display = 'block';
               carregarConsulta();
             } else {
               document.querySelector('.formulario').style.display = 'flex';
               areaConsulta.style.display = 'none';
               localStorage.removeItem('userCity');
             }
           });
         });

         document.addEventListener("DOMContentLoaded", () => {
           const larguraTela = window.innerWidth;
           const container = document.querySelector('.container');
         
           if (larguraTela < 280) {
             container.style.width = larguraTela + "px";
             container.style.maxWidth = larguraTela + "px";
             container.style.padding = "10px";
           }
         });
