<h1 align="center">ToDo лист</h1>
<ol>
  <li><h2>Описание</h2></li>
  <p>Данный пэт проект (далее - проект) представялет собой ToDo лист с <b>следующим функционалом</b>: <i>регистрация/авторизация, добавление/удаление задач, выбор даты и времени, по истечению которых задача будет просрочена (по умолчанию - до конца текущего дня).</i> <b>Для UX</b> были выполнены задачи: </p>
  <ul>
    <li><i>в шапке аккаунта в имени пользователя отображается только первое слово, при условии, что оно не превышает определённой длины, остальные слова (всего максимум 5) отображаются как первая буква с точкой </i>(пример - Иван Иванов будет отображаться как Иван И.)<i>, задачи в листе отображаются в порядке возрастания даты и времени, к просроченным задачам возле даты и времени добавляется надпись "(просрочено)", дата и время в задачах отображается неполностью, в случае, если эта информация необязательна (рис. 1);</i></li><br>
    <figure>
      <img width="727" alt="Без имени" src="https://github.com/user-attachments/assets/9ebcfd36-2b41-490a-94e3-982bc41f86ea" /><br>
      <figurecaption>Рис. 1 UX для профиля</figurecaption>
    </figure>
    <br><br>
    <li><i> при создании задачи пользователь видит дату и время на выполнение задачи, в том числе и после её изменения (рис. 2).</i></li><br>
    <figure>
      <img width="726" alt="Без имени2" src="https://github.com/user-attachments/assets/06fb81af-710e-4348-a16e-8c088a4094f3" /><br>
      <figurecaption>Рис. 2 UX для окна создания задачи</figurecaption>
    </figure>
    <br><br>
  </ul>
  <p>Проект был разработан с следующими целями: </p>
  <ul>
    <li>изучение связки бэка с фронтом - использовал БД PostgreSQL, сервер на express, для связи с фронтом использовал нативный JavaScript;</li>
    <li>закрепление теоретических знаний React и TypeScript на практике и их расширение;</li> 
    <li>изучение архитектуры FSD;</li> 
    <li>ознакомление с Redux (использовал на базовом уровне).</li>
  </ul><br>
  <li><h2>Используемый стек</h2></li>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>FSD</li>
      <li>БЭМ</li>
    </ul>
  <h3><b>Бэкенд:</b></h3>
    <ul>
      <li>JavaScript</li>
      <li>PostgreSQL</li>
      <li>Express</li>
      <li>bcrypt</li>
      <li>cors</li>
      <li>pg</li>
      <li>pg-hstore</li>
      <li>dotenv</li>
      <li>sequelize</li>
      <li>jsonwebtoken</li>
    </ul>
  <h3><b>Фронтенд:</b></h3>
    <ul>
      <li>TypeScript</li>
      <li>React</li>
      <li>React Router DOM</li>
      <li>Redux</li>
    </ul>
  <li><h2>Инстукция по установке</h2></li>
  <p><b>1)</b> Клонируем репозиторий из GitHub</p><br>
  <p><b>2)</b> У Вас должен быть установлен PostgreSQL (дял удобства управления БД я использовал pgAdmin 4). Далее в файле .env (./server/.env) нужно поменять пароль к Вашей БД (DB_PASSWORD), а также установить порт (DB_PORT) на Ваш или 5432, если Вы его не изменяли по умолчанию. Далее в pgAdmin нужно создать новую БД с именем toDoFullMain. После этого, на всякий случай, можно переустановить зависимости с помощью команды <pre>npm install</pre> и запустить сервер с помощью команды<pre> npm run dev </pre>(для того, чтобы команда выполнилась, должна быть выбрана директория ./server в командной строке)</p><br>
  <p><b>3)</b> Переходим в папку client с помощью команд <pre>cd ../ и cd ./client</pre> уже обязательно устанавливаем зависимости с помощью <pre>npm install</pre> и после установки запускаем приложение командой <pre>npm start</pre> Готово!</p><br>
  <p><b>3.1) Если пошло что-то не так, Вы можете связаться со мной по почте sokhin1992@mail.ru</b></p>
</ol>
