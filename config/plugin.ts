import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  redis: {
    enable: false,
    package: 'egg-redis',
  },
  alinode: {
    enable: true,
    package: 'egg-alinode'
  },
  // sequelize: {
  //   enable: true,
  //   package: 'egg-sequelize-ts'
  // }

  static: true,
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  }
};

export default plugin;
