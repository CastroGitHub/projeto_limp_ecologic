export const fakeDatabase = {
  users: [
    { nome: "Admin", email: "admin@teste.com", usuario: "admin", senha: "123" }
  ],

  currentUser: null,

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
  ],

  // 🔥 NOVO AQUI
  agendamentos: [
    {
      id: "1",
      dia: 1,
      nome: "Dona Silvia",
      hora: "09:00",
      descricao: "1 sofá e 1 poltrona",
    },
    {
      id: "2",
      dia: 1,
      nome: "Seu Cleber",
      hora: "11:30",
      descricao: "1 sofá e 2 almofadas",
    },
  ],
};

export function editarAgendamento(id, novosDados) {
  const index = fakeDatabase.agendamentos.findIndex(
    (item) => item.id === id
  );

  if (index !== -1) {
    fakeDatabase.agendamentos[index] = {
      ...fakeDatabase.agendamentos[index],
      ...novosDados,
    };
  }
}