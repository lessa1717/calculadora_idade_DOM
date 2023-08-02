//Algoritmo 

//Calcular Idade
//1.Pegar os valores
//2.Calcular a idade
//3.Gerar a classificaçao da idade
//4.Organizar as informaçoes
//5.Salvar os dados na lista





function calcularIdade(event) {
    event.preventDefault(); // Impede que a página seja recarregada

    let dadosUsuarios = pegarValores();
    let idade = calcular(dadosUsuarios.ano);
    let classificacao = classificarIdade(idade); // Chama a função e passa a idade calculada como argumento

    console.log(classificacao);
    let usuarioAtualizado = organizarDados(dadosUsuarios, idade, classificacao);

    cadastrarUsuario(usuarioAtualizado);
}

//Passo 1.Pegar os valores
function pegarValores() {

    let nomeRecebido = document.getElementById("nome").value.trim();
    let diaNascimento = parseInt(document.getElementById("dia-nascimento").value);
    let mesUsuario = parseInt(document.getElementById("mes-nascimento").value);
    let anoUsuario = parseInt(document.getElementById("ano-nascimento").value);
    

    let dadosUsuario = {
        nome : nomeRecebido,
        dia : diaNascimento ,
        mes : mesUsuario,
        ano : anoUsuario 
    }

    console.log(dadosUsuario);

    return dadosUsuario;
}

//Passo 2.Calcular
function calcular(ano) {
    let anoAtual = new Date();

    let idadeAtual = anoAtual.getFullYear()- ano;

    console.log(idadeAtual);

    return idadeAtual;
}

//Passo 3.Classificar Idade

function classificarIdade(idadeAtual) {
    /*  Resultado            Faixa
    0 à 12                Criança
    13 à 17                Adolescente
    18 à 65               Adulto
    Acima de 65         Idoso*/

    if (idadeAtual <= 12) {
        return "Criança";
    } else if (idadeAtual <= 17) {
        return "Adolescente"
    } else if (idadeAtual <= 65) {
        return "Adulto"
    } else {
        return "Idoso"
    }


}

//Passo 4. Organizar Informacoes

function organizarDados(dadosUsuario, idade, classificacao) {
    let dataAtual = new Date();
    let dataNascimento = new Date(dadosUsuario.ano, dadosUsuario.mes - 1, dadosUsuario.dia);

    // Calcula a idade em anos, meses e dias
    let idadeAnos = dataAtual.getFullYear() - dataNascimento.getFullYear();
    let idadeMeses = dataAtual.getMonth() - dataNascimento.getMonth();
    let idadeDias = dataAtual.getDate() - dataNascimento.getDate();

    // Ajuste para verificar se ainda não completou todos os meses do ano atual
    if (idadeMeses < 0 || (idadeMeses === 0 && idadeDias < 0)) {
        idadeAnos--;
        idadeMeses += 12;
    }

    let dadosUsuarioAtt = {
        ...dadosUsuario,
        idadeAnos: idadeAnos,
        idadeMeses: idadeMeses,
        idadeDias: idadeDias,
        classificacao: classificacao,
    };

    return dadosUsuarioAtt;
}







