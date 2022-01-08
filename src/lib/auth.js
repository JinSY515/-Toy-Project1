const util = require('util');
const crypto = require('crypto');

const pbkdf2 = util.promisify(crypto.pbkdf2);
const randomBytes = util.promisify(crypto.randomBytes);

//encrypt 함수 : sha512 알고리즘으로 암호화, 암호화된 데이터를 base64로 인코딩해 출력.
//salting : 텍스트 변조 후 함수 입력값으로 사용.
const generatePassword = async password => {
    const ALGO = 'sha512';
    const KEY_LEN = 64;
    const salt = await randomBytes(32);
    const iter = Math.floor(Math.random() * 20000) + 200000;
    const digest = await pbkdf2(password, salt, iter, KEY_LEN, ALGO);
    return `${ALGO}:${salt.toString('base64')}:${iter}:${KEY_LEN}:${digest.toString('base64')}`;
};

const verifyPassword = async (password, hashedPwd) => {
    const [ algo, encodedSalt, iterStr, keyLenStr, encodedDigest ] = hashedPwd.split(':');
    const salt = Buffer.from(encodedSalt, 'base64');
    const iter = parseInt(iterStr, 10);
    const key_len = parseInt(keyLenStr, 10);
    const digest_stored = Buffer.from(encodedDigest, 'base64');
    const digest = await pbkdf2(password, salt, iter, key_len, algo);
    return Buffer.compare(digest, digest_stored) === 0;
};

module.exports = { generatePassword, verifyPassword };

