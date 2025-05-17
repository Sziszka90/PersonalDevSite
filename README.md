# Personal Developer Site

My personal developer website built with **Angular 19** and **SCSS**. It highlights my projects, skills, and professional background.

## 🚀 Tech Stack
- Angular 19 + Angular CLI  
- TypeScript  
- SCSS (modular: variables & mixins)  
- HTML5 / CSS3  


## 🛠️ Getting Started
### Clone
git clone https://github.com/yourusername/personal-developer-site.git
cd personal-developer-site

### Install
npm install

### Dev server
ng serve
### → http://localhost:4200/

### Production build
ng build --configuration=production

### Clone
git clone https://github.com/yourusername/personal-developer-site.git
cd personal-developer-site

### Install
npm install

### Production build
ng build --configuration=production

## 📦 Deployment
Any static host works (GitHub Pages, Netlify, Vercel, Firebase, etc.).

GitHub Pages example

ng build --configuration=production --base-href "/your-repo-name/"

npx angular-cli-ghpages --dir=dist/personal-developer-site

## 🎨 Styling Notes
Global SCSS lives in /src/assets/scss.

Component styles are encapsulated (ViewEncapsulation.Emulated).

Utility mixins + variables keep things DRY and consistent.

## 👤 Author
Szilard Ferencz
szilardferencz.dev • LinkedIn • GitHub

## 📄 License
Distributed under the MIT License. See LICENSE for details.