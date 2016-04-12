# Autocompletar endereço no checkout do Magento

Este código permite usar um webservice externo para autocompletar os endereços dos campos de checkout do magento através da digitação do CEP. Usando a versão Magento 1.9.2.4 e o tema Porto Magento Theme junto ao IWD One Page Checkout que tem como dependência a extensão IWD All, consegui inserir um pequeno script jQuery no arquivo head.phtml do tema para disparar uma consulta ao webservice e trazer os dados, não só trazer mas autocompletar as informações.

Quem desejar pode contribuir me ensinando ou fazendo um commit de uma forma de implementar este pequeno script em qualquer tema e checkout independente da sua origem ou forma.

#### Eu coloquei o código do porto_br.js no arquivo head.phtml neste diretório:
app/design/frontend/smartwave/porto/template/page/html/

#### Próxima contribuição:
Fazer funcionar no default
