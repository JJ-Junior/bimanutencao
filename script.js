document.getElementById('loginButton').addEventListener('click', async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const empresas = await fetch('https://api.onepac.com.br/v1/login/empresas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: username, senha: password })
        });

        if (empresas.ok) {
            empresas.json().then(async (emps) => {
                const login = await fetch('https://api.onepac.com.br/v1/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        login: username,
                        senha: password,
                        empresa: emps.at(0).empresa,
                        filial: emps.at(0).filial
                    })
                });
                
                login.json().then(loginData => {
                    document.querySelector("body").style.height = '100vh';
                    document.querySelector("body").innerHTML = `<iframe title='CCB MANUTENÇÃO - Controle Pinturas' width='100%' height='100%' src='https://app.powerbi.com/reportEmbed?reportId=7f18460e-1920-4843-a1bc-926c98b8bf3b&autoAuth=true&ctid=8ff7c543-51ed-4945-93cb-e23df9ce76fe&experience=power-bi&filter=EMPRESA%2FCODIGO%20eq%20${loginData.empresa}' frameborder='0' allowFullScreen='true'></iframe>`
                    document.querySelector('body').style.padding = '0';
                })
            });
        } else {
            const span = document.querySelector('.span');
            span.style.display = 'inline-block';
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Por favor, tente novamente mais tarde.');
    }
});