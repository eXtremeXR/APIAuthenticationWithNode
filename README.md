# API Authentication with Node 
This is the project files for CodeWorkr's API Authentication with Node series on YouTube.

### Phase one
1. [Introduction](https://www.youtube.com/watch?v=zx6jnaLuB9Q&t=4s)
2. [Cookies vs Tokens](https://www.youtube.com/watch?v=4Y5a_iKXihw)
3. [Node/Express API Setup](https://www.youtube.com/watch?v=x_HRoXKo2es&t=2s)
4. [Server-Side Validation](https://www.youtube.com/watch?v=XFpV8b5937M)
5. [MongoDB/Mongoose](https://www.youtube.com/watch?v=QCJCglPLUgg)
6. [JSON Web Tokens](https://www.youtube.com/watch?v=YxFZC8FtRao)
7. [Passport and Strategies](https://www.youtube.com/watch?v=lbmOoZuElKI)
8. [Bcrypt Explained](https://www.youtube.com/watch?v=Peww_cdgka4&t=1063s)

Series link: [YouTube Playlist](https://www.youtube.com/watch?v=zx6jnaLuB9Q&list=PLSpJkDDmpFZ7GowbJE-mvX09zY9zfYatI)
### To view desired branch for each episode simply clone this git repo

```bash
$ git clone https://github.com/eXtremeXR/APIAuthenticationWithNode.git
```

then checkout the branch as follow

```bash
$ git checkout 'branch_name'
```

This project uses async/await it would be best if you use **node 8+**
after checkout be sure to run

```bash
$ npm install
```
installing using yarn
```bash
$ yarn install
```
To run the project use
```bash
$ npm run start-dev
```
starting the project using yarn
```bash
$ yarn start-dev
```

run unit tests
```bash
$ yarn test
```

genarate code coverage report
```bash
$ yarn report
```

run unit tests with nyc output in terminal
```bash
$ yarn nyc
```

run unit tests with nyc summery report
```bash
$ yarn text-report
```

##### Code Coverage

|File                  |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
|----------------------|----------|----------|----------|----------|----------------|
|All files             |    90.53 |     62.5 |      100 |    90.43 |                |
| server               |    81.08 |       50 |      100 |    81.08 |                |
|  app.js              |    85.71 |       50 |      100 |    85.71 |          10,17 |
|  passport.js         |    78.26 |       50 |      100 |    78.26 | 19,25,39,47,53 |
| server/configuration |      100 |      100 |      100 |      100 |                |
|  index.js            |      100 |      100 |      100 |      100 |                |
| server/controllers   |      100 |      100 |      100 |      100 |                |
|  users.js            |      100 |      100 |      100 |      100 |                |
| server/helpers       |      100 |       75 |      100 |      100 |                |
|  routeHelpers.js     |      100 |       75 |      100 |      100 |             11 |
| server/models        |    88.24 |      100 |      100 |    88.24 |                |
|  user.js             |    88.24 |      100 |      100 |    88.24 |          29,37 |
| server/routes        |      100 |      100 |      100 |      100 |                |
|  users.js            |      100 |      100 |      100 |      100 |                |

## Happy Coding!
