// database.js
export const fakeDatabase = {
  users: [
    { nome: "Admin", email: "admin@teste.com", usuario: "admin", senha: "123" }
  ],

  currentUser: null,

  // ✅ NOVO: lista de clientes
  clientes: [
    {
      id: "1",
      nome: "Dona Maria",
      telefone: "11912345678",
      cidade: "São Paulo",
      bairro: "Barueri",
      endereco: "Travessa um violeiro toca 566 bloco 2 ap 11",
      status: "Pendente",
      ano: "2026",
      obs: "Cachorro bravo",
    },
    {
      id: "2",
      nome: "João",
      telefone: "11999999999",
      cidade: "São Paulo",
      bairro: "Centro",
      endereco: "Rua qualquer",
      status: "Agendado",
      ano: "2025",
      obs: "",
    },
  ],
};