import {rm,mkdir,cp,readFile,writeFile,rename} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
await rm('dist',{recursive:true,force:true});await mkdir('dist/server',{recursive:true});
execFileSync('npx',['wrangler','deploy','--dry-run','--outdir','dist/server'],{stdio:'inherit'});
await rename('dist/server/worker.js','dist/server/index.js');
await cp('public','dist/client',{recursive:true});await cp('drizzle','dist/server/drizzle',{recursive:true});
const config=JSON.parse(await readFile('wrangler.jsonc','utf8'));config.main='./index.js';config.assets.directory='../client';config.d1_databases[0].migrations_dir='./drizzle';await writeFile('dist/server/wrangler.json',JSON.stringify(config,null,2));
console.log('Built Worker, static assets and database migrations.');
