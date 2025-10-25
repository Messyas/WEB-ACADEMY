# Instruções de execução

1. Realize o clone do repositório utilizando o comando `git clone https://github.com/Messyas/tp-final-webacademy.git`.
2. Vá para o diretório principal com `cd tp-final-webacademy`.
3. Na pasta container, digite o comando `docker compose up`.
4. Em algum browser, use a url: `http://localhost:8000` para acessar a aplicação.
5. No browser, abra o endereço `http://localhost:8081` para acessar o php admin.
6. Para desligar, use `docker compose down`.

**Obs:** Se ocorrer algo como "address already in use" pro banco, basta usar: `sudo systemctl stop mysql`.
