'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const cepInput = document.getElementById('cep');
        const erroDiv = document.getElementById('erro');

        function mostrarErro(mensagem) {
          erroDiv.textContent = mensagem;
          erroDiv.classList.remove('d-none');
        }

        function limparErro() {
          erroDiv.textContent = '';
          erroDiv.classList.add('d-none');
        }

    function buscarCep(cep) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
              if (!data.erro) {
                document.getElementById('endereco').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
                limparErro();
              } else {
                mostrarErro('CEP não encontrado.');
              }
            })
            .catch(() => {
              mostrarErro('Erro ao buscar o CEP.');
            });
        }

    cepInput.addEventListener('input', () => {
          const cep = cepInput.value.replace(/\D/g, '');
          if (cep.length === 8) {
            buscarCep(cep);
          }
        });

    document.getElementById('formCadastro').addEventListener('submit', (e) => {
          const cep = cepInput.value.replace(/\D/g, '');
          if (cep.length !== 8) {
            e.preventDefault();
            mostrarErro('Informe um CEP válido antes de cadastrar.');
          }
        });
});