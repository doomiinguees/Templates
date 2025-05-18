@echo off
:: Cria a pasta do projeto
mkdir html
cd html

:: Cria os arquivos HTML principais
echo. > index.html
echo. > navbar.html
echo. > sidebar.html
echo. > footer.html

:: Cria as pastas css e js
mkdir css
mkdir js

:: Cria os arquivos CSS
echo. > css/config.css
echo. > css/theme-light.css
echo. > css/theme-dark.css
echo. > css/main.css

:: Cria o arquivo JS
echo. > js\script.js

echo Estrutura criada com sucesso!
pause
