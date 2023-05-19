//header
const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
    const active = nav.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', active);
    if (active) {
        event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
    } else {
        event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
    }
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);




//cadastrar dados
function enviarDados() {
    const nome = document.getElementById('nome').value;
    const profissao = document.getElementById('profissao').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('enderecoCompleto').value;
    const dataDeNascimento = document.getElementById('data_nascimento').value;
    const animaisAnteriores = document.getElementById('animaisAnteriores').value;
    const infosAdicionais = document.getElementById('infosAdicionais').value;

    fetch('cadastro', {
        method: 'POST', //método HTTP utilizado

        headers: {
            'Content-Type': 'application/json'
            //isso aqui é o tipo de arquivo que será enviado/carregado lá
        },
        body: JSON.stringify({ nome: nome, profissao: profissao, email: email, telefone: telefone, endereco: endereco, dataDeNascimento: dataDeNascimento, animaisAnteriores: animaisAnteriores, infosAdicionais: infosAdicionais })
    })
        .then(resposta => resposta.json(),
            alert("pessoa cadastrada com sucesso"),
            window.location.reload()
        );
}




//deletar dados
function deletarDados() {
    var id = document.getElementById('id').value;

    //envio dos dados pelo método fetch
    fetch(`cadastro/${id}`, {
        method: 'DELETE', //método HTTP utilizado
    }).then(resposta => resposta.json(),
        alert('O ID foi excluído com sucesso'))
}



//atualizar dados já existentes
function atualizarDados() {
    const nome = document.getElementById('nome').value;
    const profissao = document.getElementById('profissao').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('enderecoCompleto').value;
    const dataDeNascimento = document.getElementById('data_nascimento').value;
    const animaisAnteriores = document.getElementById('animaisAnteriores').value;
    const id = document.getElementById('id').value;
    const infosAdicionais = document.getElementById('infosAdicionais').value;

    if (id == '') {
        Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            text: 'O ID tem de estar preenchido para haver a alteração dos dados',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
    } else {
        alert('Atualização realizada com sucesso')
        fetch(`cadastro/${id}`, {
            method: 'PUT', //método HTTP utilizado

            headers: {
                'Content-Type': 'application/json'
                //isso aqui é o tipo de arquivo que será enviado/carregado lá
            },
            body: JSON.stringify({ nome: nome, profissao: profissao, email: email, telefone: telefone, endereco: endereco, dataDeNascimento: dataDeNascimento, animaisAnteriores: animaisAnteriores, infosAdicionais: infosAdicionais })
        }).then(resposta => resposta.json())
    }
}




//pesquisar usuário
function buscarDados() {
    const id = document.getElementById('id').value;
    const tabela = document.getElementById("ver_tabela");

    fetch(`cadastro/${id}`, {
        method: 'GET'
    }).then(resposta => resposta.json()).then(data => {
        if (data.nome == "" && data.email == '' && data.dataDeNascimento == "") {
            document.getElementById('exibeNome').innerHTML = "Não existem informações neste cadastro";
            document.getElementById('exibeEmail').innerHTML = "";
            document.getElementById('exibeDataDeNexibeDataDeNascimentoascimento').innerHTML = "";
            document.getElementById('exibeProfissao').innerHTML = "";
            document.getElementById('exibeTelefone').innerHTML = "";
            document.getElementById('exibeEndereco').innerHTML = "" + data.endereco;

        } else {
            console.log(data)
            document.getElementById("div_exibicao").style.display = 'block';
            tabela.style.color = 'brown'
            document.getElementById('exibeNome').innerHTML = "<span style='color: #414141;'>Nome completo:</span> " + data.nome;
            document.getElementById('exibeEmail').innerHTML = "<span style='color: #414141;'>Email:</span> " + data.email;
            document.getElementById('exibeDataDeNascimento').innerHTML = "<span style='color: #414141;'>Data de nascimento (ano-mês-dia):</span> " + data.dataDeNascimento;
            document.getElementById('exibeProfissao').innerHTML = "<span style='color: #414141;'>Profissão:</span> " + data.profissao;
            document.getElementById('exibeTelefone').innerHTML = "<span style='color: #414141;'>Telefone:</span> " + data.telefone;
            document.getElementById('exibeEndereco').innerHTML = "<span style='color: #414141;'>Endereço completo:</span> " + data.endereco;
        }
    })
}




function displayDivInfoAdd() {
    const sim = document.getElementById("simAddInfo");
    const nao = document.getElementById("naoAddInfo");
    const div_addInfo = document.getElementById("div_infosAdicionaisINDEX")

    if (sim.checked) {
        console.log('sim checked')
        div_addInfo.style.display = 'block'
    } else if (nao.checked) {
        console.log('não checked')
        div_addInfo.style.display = 'none'

    }
}