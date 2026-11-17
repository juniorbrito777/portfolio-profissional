# Portfólio Profissional

Site portfólio em **HTML5, CSS3 e JavaScript puro**, sem frameworks e sem dependências. Pronto para o **GitHub Pages**.

## Estrutura

```text
portfolio-profissional/
├── index.html
├── README.md
└── assets/
    ├── css/style.css
    ├── js/script.js
    └── img/
        ├── petjunior/   (fotos do projeto PetJunior)
        └── (perfil.jpg e favicon.svg)
```

## Personalizar

1. Todos os textos, links e a foto já estão preenchidos com os dados do cliente. Para mudar algo, edite o `index.html`.
2. Para trocar o e-mail que recebe as mensagens do formulário, edite a constante `MEU_EMAIL` no `assets/js/script.js`.
3. A foto de perfil é `assets/img/perfil.jpg` (quadrada, 800x800). As fotos do projeto ficam em `assets/img/petjunior/`; se tiver um print da tela do site PetJunior, ele pode substituir `hero.jpg` como capa do projeto.
4. Todos os caminhos são **relativos** (`./assets/...`), então nada quebra ao subir para o GitHub.

## Publicar no GitHub Pages (menos de 3 minutos)

1. Crie um repositório público em github.com (ex.: `portfolio`).
2. Envie os arquivos:
   - **Pelo site:** *Add file → Upload files*, arraste **o conteúdo** da pasta `portfolio-profissional` (o `index.html` precisa ficar na raiz do repositório) e clique em *Commit changes*.
   - **Pelo terminal:**
     ```bash
     cd portfolio-profissional
     git init
     git add .
     git commit -m "Primeira versão do portfólio"
     git branch -M main
     git remote add origin https://github.com/SEU-USUARIO/portfolio.git
     git push -u origin main
     ```
3. No repositório, vá em **Settings → Pages**.
4. Em *Build and deployment*, escolha **Source: Deploy from a branch**, branch **main** e pasta **/ (root)**, e clique em **Save**.
5. Aguarde 1 a 2 minutos. O site ficará em `https://SEU-USUARIO.github.io/portfolio/`.

> Dica: se o repositório se chamar `SEU-USUARIO.github.io`, o site abre direto em `https://SEU-USUARIO.github.io/`.

## Testar localmente

Abra o `index.html` no navegador. Se quiser um servidor local: `python3 -m http.server 8000` e acesse `http://localhost:8000`.
