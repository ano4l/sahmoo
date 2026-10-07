import {SERVICES} from './config.js';
export function db(env){if(!env.DB)throw new Error('Booking storage is unavailable.');return env.DB;}
export function prepare(env,sql,...params){return db(env).prepare(sql).bind(...params);}
export async function first(env,sql,...params){return prepare(env,sql,...params).first();}
export async function all(env,sql,...params){return (await prepare(env,sql,...params).all()).results;}
export function publicBooking(row){const{id,reference,name,email,phone,service_id,service_name,start_at,end_at,price,deposit,paid_amount,placement,idea,status,payment_status,hold_expires_at,created_at}=row;const service=SERVICES.find(s=>s.id===service_id);return{id,reference,name,email,phone,service_id,service_name:service?service.name+' · '+service.description:service_name,start_at,end_at,price,deposit,paid_amount,placement,idea,status:status==='pending_payment'&&hold_expires_at<new Date().toISOString()?'expired':status,payment_status,hold_expires_at,created_at};}
