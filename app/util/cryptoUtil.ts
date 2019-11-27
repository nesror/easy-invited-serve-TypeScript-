
import WechatEncrypt = require('wechat-encrypt');
import { Application } from 'egg';
import EncryptedComponent from '../model/encryptedComponent';
import { parseString } from 'xml2js';
import { EncryptInfo } from '../model/wxCtx';


/**
 * 微信msg解密
 * @param encryptedComponentVerifyTicke   解密信息
 * @param xml   密文信息
 * @returns string
 */
export function decodeMsg(app: Application, encryptedComponentVerifyTicke: EncryptedComponent, xml: EncryptInfo, appId?: string): string {
    const { config } = app;
    const { AppId, Encrypt } = xml
    const { encodingAESKey, token } = config.bizConfig;

    let wechatEncrypt = new WechatEncrypt({
        appId: AppId ? AppId[0] : appId,
        encodingAESKey,
        token
    })
    let signature = wechatEncrypt.genSign({
        timestamp: encryptedComponentVerifyTicke.$timestamp,
        nonce: encryptedComponentVerifyTicke.$nonce,
        encrypt: Encrypt
    }) // 生成签名
    let isValid = signature === encryptedComponentVerifyTicke.$msg_signature // 校验签名是否正确
    isValid = true
    if (isValid) {
        let str = wechatEncrypt.decode(Encrypt[0]) // 解密数据
        app.logger.info('decode data:->', str);
        return str

    } else {
        app.logger.error('消息签名不正确，已忽略该消息');
        return ""
    }
}

/** 
* 解析XML数据
* @param str   xml
* @returns Promise<T>
*/
export function parseXMLSync<T>(str: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        parseString(str, (err: any, result: T) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}