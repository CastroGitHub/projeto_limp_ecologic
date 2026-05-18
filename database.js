// database.js
export const fakeDatabase = {
  // Lista inicial de usuários (pode começar vazia se quiser)
  users: [
    { nome: "Admin", email: "admin@teste.com", usuario: "admin", senha: "123" }
  ],
  
  // Guarda quem conseguiu logar por último para mostrar na Home
  currentUser: null
};