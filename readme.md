# Novel and Writer

This project is a full stack project which contains a list of novels and their authors. The novel and author model form a many-to-many relationship. 

This project uses the following tech stack:
* ExpressJs (Backend / server)
* Embedded JS (Frontend / client)
* Postgres (DB)
* Sequelize (ORM)
* TailwindCSS

Entity Relational Diagram (ERD) for this project is as follows: <br/>
https://dbdiagram.io/d/Novel_Writer-651282ebffbf5169f07fdf20

Below is an API Documentation for this project:

| Method | Route | Keterangan|
| --- | --- | ---|
|GET| `/` | Displays the homepage |
|GET| `/novels` | Displays all novels in the database |
|GET| `/writers` | Displays all writers in the database |
|GET| `/novels/add` | Displays a form page for adding novel data |
|GET| `/writers/add` | Displays a form page for adding writer data |
|POST| `/novels/add` | Receives new novel data |
|POST| `/writers/add` | Receives new writer data |
|GET| `/novels/delete/:id` | Deletes novel data by id |
|GET| `/writers/delete/:id` | Deletes writer data by id |
|GET| `/novels/update/:id` | Displays a form page for updating novel data by id |
|GET| `/writers/update/:id` | Displays a form page for updating writer data by id |
|POST| `/novels/update/:id` | Updates novel data by id |
|POST| `/writers/update/:id` | Updates writer data by id |


How to use this project:
1. Clone the repo
2. Enter the folder <br/>
`cd novel-writer`
3. Install all dependencies <br/>
`npm install`
4. Install postgres https://www.postgresql.org/download/, if you haven't installed it
5. Edit the development database configuration at `config/config.json`
6. Create development database <br/> `npx sequelize-cli db:create`
7. Migrate the model to database <br/> `npx sequelize-cli db:migrate`
8. Run the following command <br/>
`npm run start:dev`
9. Open http://localhost:3000.