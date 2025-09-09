class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    
    if (!brinquedosPessoa1 || !brinquedosPessoa2 || !ordemAnimais) {
      return { erro: "Entrada inválida" };
    }

    const listaP1 = brinquedosPessoa1.split(",").map((b) => b.trim());
    const listaP2 = brinquedosPessoa2.split(",").map((b) => b.trim());
    const animaisEntrada = ordemAnimais.split(",").map((a) => a.trim());

    if (new Set(listaP1).size !== listaP1.length || new Set(listaP2).size !== listaP2.length) {
      return { erro: "Brinquedo inválido" };
    }

    const animais = {
      Rex: { tipo: "cao", preferencias: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", preferencias: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", preferencias: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", preferencias: ["RATO", "BOLA"] },
      Bola: { tipo: "cao", preferencias: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cao", preferencias: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", preferencias: ["SKATE", "RATO"] },
    };
    
    if (new Set(animaisEntrada).size !== animaisEntrada.length) {
      return { erro: "Animal inválido" };
    }

    let adotados = [];
    let contadorP1 = 0;
    let contadorP2 = 0;

    function verificaPreferencias(listaBrinquedos, preferencias, animal) {
      if (animal === "Loco") {
        return preferencias.every((pref) => listaBrinquedos.includes(pref));
      }
      
      let idx = -1;
      for (let pref of preferencias) {
        idx = listaBrinquedos.indexOf(pref, idx + 1);
        if (idx === -1) return false;
      }
      return true;
    }

    for (let animal of animaisEntrada) {
      if (!animais[animal]) {
        return { erro: "Animal inválido" };
      }

      const { preferencias } = animais[animal];

      const podeP1 = verificaPreferencias(listaP1, preferencias, animal);
      const podeP2 = verificaPreferencias(listaP2, preferencias, animal);

      let destino = `${animal} - abrigo`;

      if (podeP1 && !podeP2 && contadorP1 < 3) {
        destino = `${animal} - pessoa 1`;
        contadorP1++;
      } else if (podeP2 && !podeP1 && contadorP2 < 3) {
        destino = `${animal} - pessoa 2`;
        contadorP2++;
      } else if (podeP1 && podeP2) {
        destino = `${animal} - abrigo`;
      }

      if (animal === "Loco") {
        if (animaisEntrada.length === 1) {
          destino = "Loco - abrigo";
        } else if (destino !== "Loco - abrigo") {
          if (adotados.filter((x) => !x.includes("Loco") && !x.includes("abrigo")).length === 0) {
            destino = "Loco - abrigo";
          }
        }
      }

      adotados.push(destino);
    }

    adotados.sort((a, b) => {
      const nomeA = a.split(" - ")[0];
      const nomeB = b.split(" - ")[0];
      return nomeA.localeCompare(nomeB);
    });

    return { erro: null, lista: adotados };
  }
}

export { AbrigoAnimais as AbrigoAnimais };