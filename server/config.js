export const SERVICES=[
{id:'micro',name:'3cm x 3cm',description:'8 tattoos',price:800,duration:60},
{id:'small',name:'7cm x 7cm',description:'4 tattoos',price:950,duration:120},
{id:'medium',name:'10cm x 10cm',description:'3 tattoos',price:1200,duration:180},
{id:'half',name:'Half day',description:'4-hour session',price:1500,duration:240},
{id:'full',name:'Full day',description:'6-hour session · designs up to 30 cm',price:2300,duration:360}
];
export const SCHEDULE={days:[2,3,4,5,6],opensAt:10,closesAt:18,interval:30,timeZone:'Africa/Johannesburg'};
export const BANK={demo:true,bank:'Demo Bank — test details only',accountName:'Sahmoo Tattoos (DEMO)',accountNumber:'0000000000',branchCode:'000000',accountType:'Cheque / Current'};
export function slotsForDate(date,service,now=new Date()){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return [];
 const day=new Date(date+'T12:00:00+02:00');if(Number.isNaN(+day)||day.toISOString().slice(0,10)!==date||!SCHEDULE.days.includes(day.getUTCDay()))return [];
 const slots=[];for(let min=SCHEDULE.opensAt*60;min+service.duration<=SCHEDULE.closesAt*60;min+=SCHEDULE.interval){const time=String(Math.floor(min/60)).padStart(2,'0')+':'+String(min%60).padStart(2,'0');const start=new Date(`${date}T${time}:00+02:00`);if(start>now)slots.push({time,start:start.toISOString(),end:new Date(+start+service.duration*60000).toISOString()});}return slots;
}
