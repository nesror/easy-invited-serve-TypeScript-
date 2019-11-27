import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  // redis
  config.redis = {
    client: {
      cluster: true,
      nodes: [{
        host: '',
        port: 6379,
        password: '',
        db: 0,
      }, {
        host: '',
        port: 6379,
        password: '',
        db: 0,
      }]
    },
  };
  return config;
};
