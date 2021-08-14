function soma(a, b) {
  return a + b;
}

test('calling authenticate with a valid user shall return a JWT token, se eu chamar a rota authenticate com um usuário válido, ela deve me retornar um token JWT', () => {});

test('If I call sum function, with 4 and 5, it should return 9', () => {
  const result = soma(4, 5);

  expect(result).toBe(9);
});
