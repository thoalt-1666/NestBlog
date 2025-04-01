Với MacOS (Homebrew) chạy 2 câu lệnh

1 : brew install postgresql@14 
2 : brew services start postgresql@14 

3 : psql -U postgres
4 : CREATE DATABASE nest_blog;

5 : update file .env theo cấu trúc:
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=nest_blog
NODE_ENV=development

6: Nếu tạo thành công thì trong sell có dạng nest_blog=#, nghĩa là database đã sẵn sàng sử dụng.
7: Nếu đang ở trong PostgreSQL shell (psql), chạy: \l

8 : Nếu thấy nest_blog tức là chạy thành công rồi (như bên dưới là thành công)
   Name    |     Owner     | Encoding | Collate | Ctype |          Access privileges          
-----------+---------------+----------+---------+-------+-------------------------------------
 nest_blog | postgres      | UTF8     | C       | C     | 


 9 : chạy lệnh sau để start server : npm run start:dev 

 10 : dùng postman test API
