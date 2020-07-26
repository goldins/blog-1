import { STEP } from './consts';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createHmac } = require('crypto');

export const generateToken = (secret: string) => {
  let counter = Math.floor(Date.now() / STEP / 1000);

  const buf = new Uint8Array(8);
  for (let i = 0; i < 8; i++) {
    // mask 0xff = 0b11111111 = 255 over number to get last 8
    buf[7 - i] = counter & 0xff;

    // shift 8 and get ready to loop over the next batch of 8
    counter = counter >> 8;
  }

  const hmac = createHmac('sha1', secret);

  // update hmac with the counter
  hmac.update(buf);

  const digest = hmac.digest();

  // compute HOTP offset (last 4 bin digits of last digest)
  const offset = digest[digest.length - 1] & 0b1111;

  // calculate binary code (RFC4226 5.4)
  const code =
    ((digest[offset] & 127) << 24) |
    ((digest[offset + 1] & 255) << 16) |
    ((digest[offset + 2] & 255) << 8) |
    (digest[offset + 3] & 255);

  const codeArr = code.toString(16).split('');

  // return last digits
  return codeArr[codeArr.length - 1];
};
