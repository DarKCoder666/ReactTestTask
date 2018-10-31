# ReactTestTask

Тест по программированию:

Создать приложение-задачник.

Документацию по back-end можно найти тут:
https://uxcandy.com/~shapoval/test-task-backend/docs.html

Задачи состоят из:
- имени пользователя;
- е-mail;
- текста задачи;
- картинки;

Стартовая страница - список задач с возможностью сортировки по имени пользователя, email и статусу. Вывод задач нужно сделать страницами по 3 штуки (с пагинацией). Видеть список задач и создавать новые может любой посетитель без регистрации. 

Перед сохранением новой задачи можно нажать "Предварительный просмотр".

К задаче можно прикрепить картинку. Требования к изображениям - формат JPG/GIF/PNG, не более 320х240 пикселей. При попытке загрузить изображение большего размера, картинка должна быть пропорционально уменьшена до заданных размеров.

Сделайте вход для администратора (логин "admin", пароль "123"). Администратор имеет возможность редактировать текст задачи и поставить галочку о выполнении. Выполненные задачи в общем списке выводятся с соответствующей отметкой. В данный в back-end не реализована возможность логина, потому необходимо вывести форму-фальшивку, значения логина и пароля можно проверить прямо на клиенте.

В приложении нужно использовать React. К дизайну особых требований нет, должно выглядеть аккуратно.

Результат нужно развернуть на любом бесплатном хостинге (например zzz.com.ua), чтобы можно было посмотреть его в действии. На github или bitbucket выкладывать не обязательно.

Для того, чтобы мы могли проверить код, пожалуйста, скопируйте в корневую папку проекта наш онлайн-редактор dayside (https://github.com/boomyjee/dayside). Таким образом редактор будет доступен по url <ваш проект>/dayside/index.php. Нужно дать PHP доступ на исполнение и запись к папке dayside. Попробуйте открыть dayside сами - Вы должны увидеть код своего приложения. При первом запуске редактор попросит установить пароль: пожалуйста, поставьте как в админке "123".

Обратите внимание, аккуратность - это один из главных критериев оценки тестового. Код тестового задания проходит code-review аналогичный ревью всех задач в проектах компании. Не стоит чрезмерно усложнять архитектуру приложения, достаточно выполнить все пункты из условия задачи.
