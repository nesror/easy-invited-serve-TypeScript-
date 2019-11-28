import { Context } from 'egg'
import { HttpResponse } from '../model/httpResponse';
import { stringify } from 'querystring';

export default class HttpClientProxy<T> {
    private httpUrl: string
    private data: any
    private contentType = 'json'
    private dataType = 'json'

    /**
     * 必须先设置url
     * @param httpUrl url
     */
    constructor(httpUrl: string) {
        this.httpUrl = httpUrl;
    }

    /**
     * 设置url上的参数
     * @param urlParam url上的参数
     */
    setUrlParam(urlParam: { [index: string]: string | number }): HttpClientProxy<T> {
        this.httpUrl += '?' + stringify(urlParam)
        return this
    }

    /**
     * 设置post数据
     * @param data data
     */
    setData(data: any): HttpClientProxy<T> {
        this.data = data
        return this
    }

    /**
     * setContentType
     * @param contentType 
     * TODO 有空改成枚举
     */
    setContentType(contentType: string): HttpClientProxy<T> {
        this.contentType = contentType
        return this
    }

    /**
     * setDataType
     * @param dataType 
     * TODO 有空改成枚举
     */
    setDataType(dataType: string): HttpClientProxy<T> {
        this.dataType = dataType
        return this
    }

    /**
     * post请求
     * @param ctx Context
     */
    async post(ctx: Context): Promise<HttpResponse<T>> {
        if (!this.data) {
            throw 'post请求请设置data';
        }
        const res = await ctx.curl<HttpResponse<T>>(this.httpUrl, {
            method: 'POST',
            contentType: this.contentType,
            dataType: this.dataType,
            data: this.data
        })
        ctx.logger.info(`post->
--------------request----------------
    ---URL:${this.httpUrl}
    ---body:${JSON.stringify(this.data)}
-------------response----------------
    ---headers:${JSON.stringify(res.headers)}
    ---body:${JSON.stringify(res.data)}
---------------------------------------`);
        return res
    }

    /**
     * get请求
     * @param ctx Context
     */
    async get(ctx: Context): Promise<HttpResponse<T>> {
        const res = await ctx.curl<HttpResponse<T>>(this.httpUrl, {
            contentType: this.contentType,
            dataType: this.dataType,
            data: this.data
        })

        ctx.logger.info(`get->
--------------request----------------
    ---URL:${this.httpUrl}
    ---DATA:${JSON.stringify(this.data)}
-------------response----------------
    ---headers:${JSON.stringify(res.headers)}
    ---body:${JSON.stringify(res.data)}
---------------------------------------`);
        return res
    }

}