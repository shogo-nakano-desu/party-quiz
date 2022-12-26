/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });
exec(
  `npx prisma db push --force-reset`,
  {
    env: {
      PATH: process.env.PATH,
      DATABASE_URL: `${process.env.DATABASE_URL}_test`,
    },
  },
  () => process.exit(0),
);
