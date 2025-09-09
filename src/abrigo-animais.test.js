import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {
  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar animal duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'LASER', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO', 'BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('Animal vai para o abrigo se ambas as pessoas podem adotar', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,BOLA', 'Rex');
    expect(resultado.lista).toEqual(['Rex - abrigo']);
  });

  test('Deve respeitar limite de 3 animais por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,NOVELO,SKATE,CAIXA',
      'RATO,BOLA,LASER,NOVELO,SKATE,CAIXA',
      'Rex,Mimi,Fofo,Zero,Bola,Bebe'
    );

    expect(resultado.lista.length).toBe(6);    
    const pessoa1 = resultado.lista.filter(x => x.includes('pessoa 1')).length;
    const pessoa2 = resultado.lista.filter(x => x.includes('pessoa 2')).length;
    expect(pessoa1).toBeLessThanOrEqual(3);
    expect(pessoa2).toBeLessThanOrEqual(3);
  });

  test('Loco não exige ordem, mas precisa de companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO', 'BOLA', 'Rex,Loco');
    expect(resultado.lista).toContain('Loco - pessoa 1');
  });

  test('Lista final deve estar em ordem alfabética', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'NOVELO,BOLA', 'Fofo,Rex');
    expect(resultado.lista).toEqual(['Fofo - abrigo', 'Rex - pessoa 1']);
  });
});