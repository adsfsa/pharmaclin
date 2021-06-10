# **PharmaClin Mobile**
Projeto aplicando React-Native e Firebase, idealizado desde o primeiro semestre, com potencial para se tornar um sistema nacional futuramente.
Vídeos Explicativos:
  * N1: [Vídeo](https://drive.google.com/file/d/1r7_Weur5N61iIawu8l805PZOjPMM0wK9/view?usp=sharing)
  * N2: [Parte 1 (Login + Perfil)](https://drive.google.com/file/d/1y8j-terp1PCzEwffu17WlOFcG3eZycKR/view?usp=sharing), [Parte 2 (Lembretes + Compras)](https://drive.google.com/file/d/1NJrdm2McmVLu70lC8Ws8140otcTy3x8T/view?usp=sharing), [Parte 3 (Consultas + Final)](https://drive.google.com/file/d/1wnWmNS36k5BIbuI-kMerh7v-Lr8q6oUa/view?usp=sharing)
---
## Curiosidades
  1. Projeto desenvolvido com o [Expo Bare Workflow](https://www.youtube.com/watch?v=ZaDpDlPr25M&t=1236s) para permitir acesso direto às permissões Android e IOS.
  2. Vídeos inspiradores:
       [App de Agendamento para Barbeiros Parte 1](https://www.youtube.com/watch?v=kk_pGWBOkc4&t=9886s);
       [App de Agendamento para Barbeiros Parte 2](https://www.youtube.com/watch?v=wdvxNgGV0sU&t=358s);
       [TO-DO-LIST com Expo](https://www.youtube.com/watch?v=abvpbrwd6ek);
       [Login e Senha com Firebase](https://www.youtube.com/watch?v=FNhmYBxktIs).
  3. [Playlist útil](https://www.youtube.com/playlist?list=PLx4x_zx8csUgyDN7j9L7gykBjxByM_etD)
  4. Também foram encontrados muitos outros vídeos, sites e informações que nos ajudaram e nos ajudam a prosseguir no desenvolvimento deste projeto.
  5. O app tem uma tela Preload que verifica as informações do usuário (se o usuário já fez login uma vez, o sistema sempre reconecta ele automaticamente, mas se nenhum login for encontrado o sistema redireciona para o Login/Cadastro). A exibição desta tela é muito rápida mas ainda assim ela existe e tem sua função bem definida;
  6. O projeto foi projetado para funcionamento mobile. Alguns comandos e escolhas nos código existem para permitir visualizações prévias na web (por exemplo: a escolha do alert() em vez do Alert.alert() em Login e Cadastro, para permitir que o server web também consiga entrar no app), mas isso não significa que o projeto funcione 100% na web. A sua experiência será melhor acessando pelo ExpoGo ou por um emulador.
## Participantes/Fundadores
  * Gileade Teixeira - https://github.com/gileadeteixeira;
  * Ramon Oliveira (Apenas na versão N1)- https://github.com/im-ramon;
  * Sergio Pimentel - https://github.com/srochapimentel;
  * Alexsandro Araujo - https://github.com/alexsaraujo1;
  * Deyse Guedes (não está cursando a disciplina, mas faz parte da equipe fundadora);
  "adsfsa" é apenas fictício, para armazenar o projeto.
## Home, Barra de Navegação e Components
  * Foram criados e enviados previamente para evitar divergências na padronização do app.
  Responsável: Gileade Teixeira.
## Perfil
  * A Seção Perfil é responsável por administrar o CRUD do usuario. Um novo usuário é criado no cadastro, mas é no perfil onde as informações podem ser exibidas, modificadas e excluídas.
  * Dentro da Seção Perfil, existe tambem a tela de informações, com um sistema CRUD particular.
  * A Seção Perfil ainda contém  uma tela para exibir a ficha médica do usuário, mas será implementada posteriormente.
  Responsável: Gileade Teixeira (integração Preload + Login/Cadastro + Perfil).
## Lembretes
  * A Seção Lembretes tem um CRUD único, permitindo que o usuário crie, visualize, edite e exlua um "lembrete", representado por um campo de texto que pode ser modificado. 
  * Esta seção tambem recupera os registros de compras e consultas salvas pelo usuário nas suas respectivas telas.
  Responsáveis: Ramon Oliveira(N1), Sergio Pimentel(N2).
## Compras
  * A Seção Nova Compra é responsável por manipular informações para a criação de uma nova compra. A página carrega dados salvos localmente (por enquanto) exibindo-os.
  * O usuário pode escolher uma das farmácias disponíveis, e o sistema interno associa os produtos, permitindo que o usuário também escolha os produtos ativos. 
  * Também é possível escolher um horário para a chegada da compra. O modal informações permite que a compra seja efetuada, salvando-a na asyncstorage.
  * O usuário pode editar todas as informações como bem quiser, mas precisa ter todas preenchidas caso toque em finalizar a compra.
  Responsável: Alexsandro Araujo.
## Consultas
  * A Seção Nova Consulta é responsável por agendar novas consultas. A página carrega dados salvos localmente (por enquanto) exibindo-os.
  * O usuário pode escolher uma das farmácias disponíveis, e o sistema interno associa os serviços, exibindo-os em um Picker. O Picker só é renderizado após a escolha de uma farmácia (pois sua lista varia de acordo com a farmácia selecionada. Ou seja, se não tivesse uma farmácia era exibido um espaço vazio desproporcional e feio. Por isso optou-se pela renderização condicional).
  * É possível escolher uma data e um horário.
  * O usuário pode editar todas as informações como bem quiser, mas precisa ter todas preenchidas caso toque em finalizar o agendamento.
  Responsável: Sergio Pimentel.
## "Outras Telas"
  * Como o projeto vem sendo idealizado desde o primeiro semestre, já foram criadas telas que futuramente podem vir a ser implementadas. Exemplos: a tela 192 foi pensada para ser uma cópia do uber, mas que solicita uma ambulância em caso de emergência, permitindo o acompanhamento do trajeto; a tela Buscar Farmácias foi pensada para localizar farmácias no mapa, por meio de um sistema de busca; e a tela Mapa foi pensada para exibir as farmácias próximas ao usuário por meio de um sistema de geolocalização.
  * Considerando tais premissas, todas as bibliotecas que poderiam eventualmente ser utilizadas para a  implementação dessas telas foram instaladas previamente no projeto.
