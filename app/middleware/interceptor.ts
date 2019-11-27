import { Context } from 'egg';

// 这里是你自定义的中间件
export default function interceptor(): any {
    return async (ctx: Context, next: () => Promise<any>) => {
        await next();
        const { app } = ctx
        const { logger } = app
        // http日志
        logger.info(`http->
--------------request----------------
    ---URL:${ctx.request.URL}
    ---headers:${JSON.stringify(ctx.request.headers)}
    ---body:${JSON.stringify(ctx.request.body)}
-------------response----------------
    ---headers:${JSON.stringify(ctx.response.headers)}
    ---body:${JSON.stringify(ctx.response.body)}
---------------------------------------`);
    };
}