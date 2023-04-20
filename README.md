# FRETEX

<p align="center">
<img src="docs/LandingPage.png" width="1882" height="2000" align="center"/>





&nbsp;
</p>
<p align="center">
<img src="docs/FreteX.png" width="508" height="200" align="center"/>



&nbsp;
</p>
<p>
O sistema se propõe a servir de facilitador para os clientes, que desejam encontrar um freteiro para suas situações diárias, e também para os freteiros que buscam aumentar e controlar sua renda. Fornecendo uma negociação breve e rápida entre as duas partes.
</p>

# ⚙️ Tecnologias Utilizadas

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Django Rest Framework](https://www.django-rest-framework.org/)
- [React](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled-Components](https://styled-components.com/)
- [Docker](https://www.docker.com/)

### 🛠 Padrão de projeto

- Provider Pattern
- Proxy Pattern

# 🔧 Instalação

## Backend
* Comandos executados na pasta /backend

### Sem docker
* `cp core/local_settings_sample.py local_settings.py` # Se quiser usar SQLITE
* `pip install -r requirements.txt`
* `python manage.py migrate`
* `python manage.py runserver`

### Com docker
* `cp core/local_settings_sample.py local_settings.py` # Se quiser usar SQLITE
* `docker compose up`

### Extra
* `pylint --enable=similarities plataform > lint_result.txt`
* `pylint plataform > lint_result.txt`


# 📄 Documentação

[>Link para os documentos do projeto](https://github.com/tads-cnat/fretex/tree/main/docs)



# ✍🏼 Equipe

<table>
  <tr>
    <td align="center"><a href="https://github.com/alessandrojsouza"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/24280654?v=4" width="100px;" alt=""/><br /><sub><b>Alessandro Souza</b></sub></a><br /><a href="https://github.com/alessandrojsouza" title="Orientador">:man_teacher:</a></td>
    <td align="center"><a href="https://github.com/ArthurOnly"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/56327949?v=4" width="100px;" alt=""/><br /><sub><b>Arthur Medeiros</b></sub></a><br /><a href="https://github.com/ArthurOnly" title="Dev">:man_technologist:</a></td>
    <td align="center"><a href="https://github.com/ItaloGSM"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/94062715?v=4" width="100px;" alt=""/><br /><sub><b>Italo Gabriel</b></sub></a><br /><a href="https://github.com/ItaloGSM" title="Dev">:man_technologist:</a></td>
    <td align="center"><a href="https://github.com/Lucas-Veras"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/83588582?v=4" width="100px;" alt=""/><br /><sub><b>Lucas Oliveira</b></sub></a><br /><a href="https://github.com/Lucas-Veras" title="Dev">:man_technologist:</a></td>
    <td align="center"><a href="https://github.com/c4nt"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/78828376?v=4" width="100px;" alt=""/><br /><sub><b>Marcos (inativo)</b></sub></a><br /><a href="https://github.com/c4nt" title="Dev">:x:</a></td>
    <td align="center"><a href="https://github.com/MathewsDantas"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/94187504?v=4" width="100px;" alt=""/><br /><sub><b>Mathews Dantas</b></sub></a><br /><a href="https://github.com/MathewsDantas" title="Dev">:man_technologist:</a></td>
     <td align="center"><a href="https://github.com/savio-84"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/62775935?v=4" width="100px;" alt=""/><br /><sub><b>Sávio Araújo</b></sub></a><br /><a href="https://github.com/savio-84" title="Dev">:man_technologist:</a></td>
  </tr>
</table>
