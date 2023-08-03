function calcularIdade(event) {
    event.preventDefault()

    let dadosUsuario = pegarValores();

    let idade = calcular(dadosUsuario.diaNascimento, dadosUsuario.mesNascimento, dadosUsuario.anoNascimento);

    let classificacaoIdade = classificarIdade(idade.idadeAnos);

    let usuarioAtt = organizarDados(dadosUsuario, idade, classificacaoIdade);

    cadastrarUsuario(usuarioAtt);

    window.location.reload();
}

function pegarValores() {
    let nome = document.getElementById("nome").value.trim();
    let diaNascimento = parseInt(document.getElementById("dia-nascimento").value);
    let mesNascimento = parseInt(document.getElementById("mes-nascimento").value);
    let anoNascimento = parseInt(document.getElementById("ano-nascimento").value);

    let dadosUsuario = {
        nome: nome,
        diaNascimento: diaNascimento,
        mesNascimento: mesNascimento,
        anoNascimento: anoNascimento

    }

    return dadosUsuario;
}

function calcular(diaNascimento, mesNascimento, anoNascimento) {
    let dataAtual = new Date();
    let diaAtual = dataAtual.getDate();
    let mesAtual = dataAtual.getMonth() + 1;
    let anoAtual = dataAtual.getFullYear();

    let idadeAnos = anoAtual - anoNascimento;
    let idadeMeses = mesAtual - mesNascimento;
    let idadeDias = diaAtual - diaNascimento;

    if (idadeDias < 0) {
        idadeMeses--;
        idadeDias += 30;
    }

    if (idadeMeses < 0) {
        idadeAnos--;
        idadeMeses += 12;
    }

    return { idadeAnos, idadeMeses, idadeDias };
}

function classificarIdade(idadeAnos) {
    if (idadeAnos >= 0 && idadeAnos <= 12) {
        return "Criança"

    } else if (idadeAnos >= 13 && idadeAnos <= 17) {
        return "Adolescente"

    } else if (idadeAnos >= 18 && idadeAnos <= 65) {
        return "Adulto"

    } else {
        return "Idoso"
    }
}

function organizarDados(dadosUsuario, valorIdade, classificacaoIdade) {
    let dadosUsuarioAtt = {
        ...dadosUsuario,
        idadeAnos: valorIdade.idadeAnos,
        idadeMeses: valorIdade.idadeMeses,
        idadeDias: valorIdade.idadeDias,
        classificacao: classificacaoIdade,
    };

    return dadosUsuarioAtt;
}

function cadastrarUsuario(usuario) {
    let listaUsuarios = [];

    // if (localStorage.getItem("usuariosCadastrados") == true) padrao do if
    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    listaUsuarios.push(usuario)

    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}

function carregarUsuarios() {
    let listaUsuarios = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    if (listaUsuarios.length == 0) {
        let tabela = document.getElementById("corpo-tabela");

        tabela.innerHTML = `<tr class="linha-mensagem">
            <td colspan="6">Nenhum usuário cadastrado !</td>
        </tr>`
    } else {
        montarTabela(listaUsuarios);
    }
}

window.addEventListener('DOMContentLoaded', () => carregarUsuarios());

function montarTabela(listaDeCadastrados) {
    let tabela = document.getElementById("corpo-tabela");

    let template = '';

    listaDeCadastrados.forEach(pessoa => {
        template += ` <tr>
        <td data-cell="nome">${pessoa.nome}</td>
        <td data-cell="data de nascimento">${pessoa.diaNascimento}/${pessoa.mesNascimento}/${pessoa.anoNascimento}</td>
        <td data-cell="idade">${pessoa.idadeAnos}Ano(s), ${pessoa.idadeMeses}Mes(es) e ${pessoa.idadeDias}Dia(s).</td>
        <td data-cell="faixa etária">${pessoa.classificacao}</td>
    </tr>`
    });

    tabela.innerHTML = template;
}

function deletarRegistros() {
    localStorage.removeItem("usuariosCadastrados")
    window.location.reload();
}