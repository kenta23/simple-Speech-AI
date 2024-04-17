'use server'

import { Readable } from 'stream';

export async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => {
      if (Buffer.isBuffer(chunk)) {
        chunks.push(chunk);
      } else {
        reject(new Error('Received non-Buffer chunk'));
      }
    });
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
}
