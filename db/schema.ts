import {sqliteTable,text,integer,index,uniqueIndex} from 'drizzle-orm/sqlite-core';
export const bookings=sqliteTable('bookings',{
 id:text('id').primaryKey(),reference:text('reference').notNull().unique(),tokenHash:text('token_hash').notNull(),idempotencyKey:text('idempotency_key').notNull().unique(),
 name:text('name').notNull(),email:text('email').notNull(),phone:text('phone').notNull(),serviceId:text('service_id').notNull(),serviceName:text('service_name').notNull(),
 startAt:text('start_at').notNull(),endAt:text('end_at').notNull(),price:integer('price').notNull(),deposit:integer('deposit').notNull(),paidAmount:integer('paid_amount').notNull().default(0),
 placement:text('placement').notNull(),idea:text('idea').notNull(),status:text('status').notNull().default('pending_payment'),paymentStatus:text('payment_status').notNull().default('unpaid'),
 holdExpiresAt:text('hold_expires_at').notNull(),createdAt:text('created_at').notNull(),updatedAt:text('updated_at').notNull(),notes:text('notes').notNull().default('')
},t=>[index('idx_bookings_start_status').on(t.startAt,t.status)]);
export const proofs=sqliteTable('proofs',{
 id:text('id').primaryKey(),bookingId:text('booking_id').notNull().references(()=>bookings.id),objectKey:text('object_key').notNull(),filename:text('filename').notNull(),mime:text('mime').notNull(),size:integer('size').notNull(),status:text('status').notNull().default('pending'),createdAt:text('created_at').notNull(),reviewedAt:text('reviewed_at'),reviewer:text('reviewer'),reason:text('reason').notNull().default('')
},t=>[index('idx_proofs_booking').on(t.bookingId)]);
export const payments=sqliteTable('payments',{
 id:text('id').primaryKey(),bookingId:text('booking_id').notNull().references(()=>bookings.id),proofId:text('proof_id').references(()=>proofs.id),amount:integer('amount').notNull(),method:text('method').notNull(),createdAt:text('created_at').notNull(),recordedBy:text('recorded_by').notNull(),note:text('note').notNull().default('')
},t=>[index('idx_payments_booking').on(t.bookingId),uniqueIndex('idx_payments_proof').on(t.proofId)]);
export const activity=sqliteTable('activity',{
 id:text('id').primaryKey(),bookingId:text('booking_id').notNull().references(()=>bookings.id),action:text('action').notNull(),actor:text('actor').notNull(),createdAt:text('created_at').notNull()
},t=>[index('idx_activity_booking').on(t.bookingId)]);
