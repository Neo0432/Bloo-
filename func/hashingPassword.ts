import bcrypt from "bcrypt";

export default function passEnc(password: string) {
  const saltRounds: number = 10;
  return new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        console.log(`[error] Cant generate salt for password: ${err}`);
        return;
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.log(`[error] Cant compute the hash for password: ${err}`);
          return;
        }

        resolve(hash);
      });
    });
  });
}
