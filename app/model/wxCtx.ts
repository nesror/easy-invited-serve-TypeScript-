import { parseXMLSync, decodeMsg } from '../util/cryptoUtil';
import { Application } from 'egg';
import EncryptedComponent from './encryptedComponent';

/**
 * 微信返回的xml数据
 */
export interface XmlInfo<T> {
    /**
     * xml数据
     */
    xml: T
}

export interface EncryptInfo {
    /**
     * 第三方授权变更返回第三方平台AppId
     */
    AppId: string[]

    /**
     * 公众号消息返回接收方
     */
    ToUserName: string[]
    /**
     * 加密数据
     */
    Encrypt: string[]
}

export class VerifyTicket {
    /**
     * 解密后的ComponentVerifyTicket
     */
    ComponentVerifyTicket: string = ''

    constructor(componentVerifyTickeBuilder: ComponentVerifyTickeBuilder) {
        this.ComponentVerifyTicket = componentVerifyTickeBuilder.componentVerifyTicket
    }

}

/**
 * 构造ComponentVerifyTicket
 */
export class ComponentVerifyTickeBuilder {
    componentVerifyTicket: string = ''
    async buildComponentVerifyTicket(app: Application, encryptedComponentVerifyTicke: EncryptedComponent) {
        let encryptInfo = await parseXMLSync<XmlInfo<EncryptInfo>>(encryptedComponentVerifyTicke.$msg)
        app.logger.debug('some request data->', encryptInfo.xml);
        // 解密数据
        let decodeInfo = decodeMsg(app, encryptedComponentVerifyTicke, encryptInfo.xml)
        let componentVerifyTickeXml = await parseXMLSync<XmlInfo<VerifyTicket>>(decodeInfo)
        this.componentVerifyTicket = componentVerifyTickeXml.xml.ComponentVerifyTicket
        app.logger.debug('component_verify_ticket:->', this.componentVerifyTicket);
    }
}