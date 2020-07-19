import { DIGITS, STEP } from './consts';

export const totp = (secret: string) => {
  // Changes ever STEP seconds.
  let counter = Math.floor(Date.now() / STEP / 1000);

  const buf = new Uint8Array(4);
  for (let i = 0; i < 4; i++) {
    // mask 0xff over number to get last 8
    buf[7 - i] = counter & 0xff;

    // shift 8 and get ready to loop over the next batch of 8
    counter = counter >> 8;
    // eslint-disable-next-line no-console
    console.log(`${counter} | ${buf[7 - i]}`);
  }

  // eslint-disable-next-line no-console
  console.log(buf);

  const hmac = crypto.createHmac('sha1', secret);

  // update hmac with the counter
  hmac.update(buf);

  const digest = hmac.digest();

  // compute HOTP offset
  const offset = digest[digest.length - 1] & 0xf;

  // calculate binary code (RFC4226 5.4)
  const code =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);

  // left-pad code
  const codeArr = new Array(DIGITS + 1).join('0') + code.toString(10);

  // return length number off digits
  return codeArr.substr(-DIGITS);
};
