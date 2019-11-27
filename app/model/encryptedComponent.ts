/**
 * 微信返回的解密需要的数据
 */
export default class EncryptedComponent {
    private msg: string;
    private timestamp: string | Date;
    private nonce: string;
    private msg_signature: string;

    constructor($msg: string, $timestamp: string | Date, $nonce: string, $msg_signature: string) {
        this.msg = $msg;
        this.timestamp = $timestamp;
        this.nonce = $nonce;
        this.msg_signature = $msg_signature;
    }

    /**
     * Getter $msg
     * @return {string}
     */
    public get $msg(): string {
        return this.msg;
    }

    /**
     * Getter $timestamp
     * @return {string}
     */
    public get $timestamp(): string | Date {
        return this.timestamp;
    }

    /**
     * Getter $nonce
     * @return {string}
     */
    public get $nonce(): string {
        return this.nonce;
    }

    /**
     * Getter $msg_signature
     * @return {string}
     */
    public get $msg_signature(): string {
        return this.msg_signature;
    }

    /**
     * Setter $msg
     * @param {string} value
     */
    public set $msg(value: string) {
        this.msg = value;
    }

    /**
     * Setter $timestamp
     * @param {string} value
     */
    public set $timestamp(value: string | Date) {
        this.timestamp = value;
    }

    /**
     * Setter $nonce
     * @param {string} value
     */
    public set $nonce(value: string) {
        this.nonce = value;
    }

    /**
     * Setter $msg_signature
     * @param {string} value
     */
    public set $msg_signature(value: string) {
        this.msg_signature = value;
    }


}