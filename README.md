<h1> ElysiaAPI <img src="https://github.com/user-attachments/assets/bc6d687c-dd26-4bcd-bcbf-71a8a5681bc3" width="37"/> </h1>
 
Elysia é uma ferramenta inteligente capaz de analisar imagens e dados sensoriais para gerenciar pátios de maneira autônoma.
Através do uso de tecnologias modernas, como IA e IoT, permite a visualização em tempo real do espaço físico e promove
maior controle operacional. 
 
## ⚙️ Tecnologias

- React Native
  - via Expo
- React Navigation
- AsyncStorage
- Firebase Auth
- i18next (PT/ES)
- Temas LIGHT/DARK
- Maps
- Notifications
- Flexbox + componentização

## 🗂 Arquitetura
```
src/
  components/        # BtnContext, BtnLanguage
  context/           # ThemeContext, LanguageContext
  firebase/          # firebaseConfig
  locales/           # pt, es
  notifications/     # notify
  routes/            # AppNavigator, Drawer.routes
  screens/           # Home, Mapa, MotoVaga, Perfil, Sobre, Tecno       /auth/       # Login, Register
  services/          # api, i18n, motoVagaApi
  utils/             # authErrors
```
 
## ☑️ Executar o Projeto

## 1. Clone e navegue para a pasta do repositório
```
https://github.com/ykxtais/Elysia-mobile.git
cd Elysia-mobile
```
 
## 2. Instale as dependências
```
npm install
```
- Garanta compatibilidade com o Expo 53 → `npx expo install --fix`

## 3. Rode o projeto
```
npx expo start
```
ou 
```
npm run android
``` 
- para testar no emulador

---

## ✨ Baixe o aplicativo

- APK: <a href="https://expo.dev/accounts/557553/projects/Elysia/builds/f799bf4c-1779-4335-856b-6c642e6d4d9f">App Elysia</a>
> Observação: o APK foi distribuído via **Firebase App Distribution**. Para instalar, aceite  **instalar apps de fontes desconhecidas** no Android.
 
## ⟢ Integrantes
 
➤ Iris Tavares Alves 557728 </br>
➤ Taís Tavares Alves 557553 </br>
