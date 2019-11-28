import { Application } from 'egg';
import { Sequelize } from 'sequelize-typescript';

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
        database: app.config.sequelize.database,
        models: [__dirname + '/app/model/*.model.ts']
      });
    } else {
      // sqlite
      sequelize = new Sequelize({
        host: 'localhost',
        dialect: 'sqlite',
        storage: __dirname + '/database/db.sqlite',
        models: [__dirname + '/app/model/*.model.ts']
      });
    }

    sequelize
      .sync()
      .then(() => {
        app.logger.info('init db ok')
      })
      .catch(err => {
        app.logger.error('init db error', err)
      })

  });
};
