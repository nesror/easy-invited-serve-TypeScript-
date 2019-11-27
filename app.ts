import { Application } from 'egg';
import { Sequelize } from 'sequelize-typescript';
import { Activity } from './app/model/activity';
import { User } from './app/model/user';
import { UserJoin } from './app/model/userJoin';

export default (app: Application) => {
  app.beforeStart(async () => {

    let sequelize: Sequelize
    if (app.config.mysql) {
      // mysql
      sequelize = new Sequelize({
        dialect: 'mysql',
        host: app.config.sequelize.host,
        username: app.config.sequelize.username,
        password: app.config.sequelize.password,
        port: app.config.sequelize.port,
        database: app.config.sequelize.database
      });
    } else {
      // sqlite
      sequelize = new Sequelize({
        host: 'localhost',
        dialect: 'sqlite',
        storage: __dirname + '/database/db.sqlite'
      });
    }

    sequelize.addModels([Activity, User, UserJoin])

    sequelize
      .sync()
      .then(() => {
        console.log('init db ok')
      })
      .catch(err => {
        console.log('init db error', err)
      })

    app.logger.info('beforeStart->', process.env.HOME + '/database/db.sqlite')

  });
};
