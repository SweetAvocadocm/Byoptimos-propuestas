const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,hov=matchMedia('(hover:hover)').matches,P=Math.PI/180;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
const seen=r=>{$$('.rv,.rl,.rr,.rz,h2',r).forEach(el=>{if(el.tagName==='H2')el.classList.add('ttl');io.observe(el)});$$('.stg',r).forEach(g=>[...g.children].forEach((c,i)=>c.style.setProperty('--n',i)))};seen(document);
const pg=$('#prog');addEventListener('scroll',()=>{pg.style.width=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100+'%'},{passive:true});
const mb=$('#mb'),ul=$('#menu');mb.addEventListener('click',()=>mb.setAttribute('aria-expanded',ul.classList.toggle('o')));
/* vistas con tema: claro (inicio, productos, cómo trabajamos), oscuro (casos, blog), naranja (paneles) */
const views=$$('.view');
function act(v){views.forEach(x=>x.classList.toggle('on',x===v));document.body.classList.remove('t-dk','t-or');if(v.classList.contains('dk'))document.body.classList.add('t-dk');if(v.classList.contains('or'))document.body.classList.add('t-or');seen(v)}
function go(id,smooth){const el=document.getElementById(id);if(!el)return false;let v=el.closest('.view');
if(id==='contacto'&&document.body.classList.contains('t-or'))act($('#v-home'));else if(v&&!v.classList.contains('on'))act(v);
el.scrollIntoView({behavior:smooth&&!rm?'smooth':'auto'});return true}
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a)return;ul.classList.remove('o');mb.setAttribute('aria-expanded','false');
const m=a.getAttribute('href').match(/^(?:\/)?#([\w-]+)$/);if(m&&go(m[1],true)){e.preventDefault();history.replaceState(null,'','#'+m[1])}});
if(location.hash)go(location.hash.slice(1));
const links=$$('nav a[href*="#"]');
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('act',a.getAttribute('href').endsWith('#'+e.target.id)))}),{rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(s=>so.observe(s));
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const el=e.target,t=+el.dataset.to,d=+el.dataset.dec||0,u=el.dataset.suf||'',s=performance.now();(function f(n){const p=Math.min((n-s)/1700,1),v=t*(1-Math.pow(1-p,3));el.textContent=v.toLocaleString('es-CO',{minimumFractionDigits:d,maximumFractionDigits:d})+u;if(p<1)requestAnimationFrame(f)})(s)}));
if(!rm)$$('.cnt').forEach(el=>co.observe(el));
if(!rm&&hov){$$('.tilt').forEach(el=>{el.addEventListener('mousemove',e=>{const b=el.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;el.style.transform=`perspective(800px) rotateY(${x*12}deg) rotateX(${-y*12}deg) scale(1.03)`});el.addEventListener('mouseleave',()=>el.style.transform='')});
$$('.btn').forEach(b=>{b.addEventListener('mousemove',e=>{const q=b.getBoundingClientRect();b.style.translate=`${(e.clientX-q.left-q.width/2)*.18}px ${(e.clientY-q.top-q.height/2)*.28}px`});b.addEventListener('mouseleave',()=>b.style.translate='')})}
$$('.btn').forEach(b=>b.addEventListener('click',e=>{const q=b.getBoundingClientRect(),s=document.createElement('i'),d=Math.max(q.width,q.height);s.className='rip';s.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-q.left-d/2}px;top:${e.clientY-q.top-d/2}px`;b.appendChild(s);setTimeout(()=>s.remove(),600)}));
$$('[data-tabs]').forEach(g=>{const t=$$('.tab',g),p=$$('.tp',g);t.forEach((b,i)=>b.addEventListener('click',()=>t.forEach((x,j)=>{x.setAttribute('aria-selected',i===j);p[j]&&p[j].classList.toggle('on',i===j)})))});
$$('[data-f]').forEach(b=>b.addEventListener('click',()=>{$$('[data-f]').forEach(x=>x.setAttribute('aria-selected',x===b));$$('.arts article').forEach(a=>a.hidden=b.dataset.f!=='todos'&&a.dataset.c!==b.dataset.f)}));
/* HERO: banner en movimiento + red de datos + gráfica 3D giratoria (canvas) */
(function(){const cv=$('#hc');if(!cv)return;const x=cv.getContext('2d'),im=$('#hb'),dpr=Math.min(devicePixelRatio||1,2);let W,H,vis=true;
const rs=()=>{const b=cv.parentElement.getBoundingClientRect();W=b.width;H=b.height;cv.width=W*dpr;cv.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0)};rs();addEventListener('resize',rs);
const N=Array.from({length:44},()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*2e-4,vy:(Math.random()-.5)*2e-4,r:1.5+Math.random()*3}));
const B=[[1.2,'#FFC24D'],[2.1,'#FFFFFF'],[1.6,'#FF9D00'],[2.9,'#FFD9E5'],[2.3,'#FF9D00']];
const sh=(c,k)=>{const n=parseInt(c.slice(1),16);return`rgb(${Math.min(255,(n>>16)*k)|0},${Math.min(255,(n>>8&255)*k)|0},${Math.min(255,(n&255)*k)|0})`};
const F=[[0,1,3,2,.6],[4,5,7,6,1],[0,2,6,4,.75],[1,3,7,5,.8],[2,3,7,6,1.18]];
const draw=t=>{x.clearRect(0,0,W,H);
if(im&&im.complete&&im.naturalWidth){const s=Math.max(W/im.naturalWidth,H/im.naturalHeight)*1.35,w=im.naturalWidth*s,h=im.naturalHeight*s,o=(Math.sin(t/7000)*.5+.5)*(w-W);x.globalAlpha=.2;x.drawImage(im,-o,(H-h)/2,w,h);x.globalAlpha=1}
N.forEach(n=>{n.x=(n.x+n.vx*16+1)%1;n.y=(n.y+n.vy*16+1)%1});
N.forEach((a,i)=>{for(let j=i+1;j<N.length;j++){const b=N[j],d=Math.hypot((a.x-b.x)*W,(a.y-b.y)*H);if(d<150){x.strokeStyle=`rgba(255,255,255,${.28*(1-d/150)})`;x.beginPath();x.moveTo(a.x*W,a.y*H);x.lineTo(b.x*W,b.y*H);x.stroke()}}x.fillStyle=i%3?'rgba(255,255,255,.8)':'#FF9D00';x.beginPath();x.arc(a.x*W,a.y*H,a.r,0,7);x.fill()});
const wide=W>900,S=Math.min(W,H)*(wide?.095:.06),CX=wide?W*.74:W*.5,CY=wide?H*.66:H*.86,an=t/1700;x.globalAlpha=wide?1:.55;
const pj=(X,Y,Z)=>{const c=Math.cos(an),s=Math.sin(an),x1=X*c-Z*s,z1=X*s+Z*c,y2=Y*.84-z1*.54,z2=Y*.54+z1*.84,k=9/(9-z2);return[CX+x1*k*S,CY-y2*k*S,z2]};
x.strokeStyle='rgba(255,255,255,.28)';x.lineWidth=1;for(let i=-4;i<=4;i++){let a=pj(i,0,-4),b=pj(i,0,4);x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);a=pj(-4,0,i);b=pj(4,0,i);x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke()}
const ring=[];for(let k=0;k<=72;k++)ring.push(pj(Math.cos(k*5*P)*3.5,3.6,Math.sin(k*5*P)*3.5));
const rd=f=>{x.strokeStyle='#FF9D00';x.lineWidth=4;x.shadowColor='#FF9D00';x.shadowBlur=18;x.beginPath();let on=false;ring.forEach(p=>{if(f(p[2])){on?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]);on=true}else on=false});x.stroke();x.shadowBlur=0};
rd(z=>z<0);
const fs=[];B.forEach((b,i)=>{const X=(i-2)*1.25,w=.46,h=b[0]*(1+.1*Math.sin(t/500+i))*1.1,v=[];for(let q=0;q<8;q++)v.push(pj(X+(q&1?w:-w),q&2?h:0,q&4?w:-w));F.forEach(f=>fs.push({p:f.slice(0,4).map(k=>v[k]),z:f.slice(0,4).reduce((s,k)=>s+v[k][2],0)/4,c:sh(b[1],f[4])}))});
fs.sort((a,b)=>a.z-b.z).forEach(f=>{x.fillStyle=f.c;x.strokeStyle='rgba(255,255,255,.55)';x.lineWidth=1;x.beginPath();f.p.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.fill();x.stroke()});
rd(z=>z>=0);x.globalAlpha=1};
new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(cv);
if(rm){draw(0);if(im)im.onload=()=>draw(0)}else{const l=t=>{if(vis)draw(t);requestAnimationFrame(l)};requestAnimationFrame(l)}})();
/* GLOBO: América completa, semitransparente */
(function(){const cv=$('#cg');if(!cv)return;const x=cv.getContext('2d'),N=cv.width=cv.height=640,R=250,cx=N/2;
const NA=[[-168,65],[-162,70],[-141,70],[-128,70],[-115,68],[-100,68],[-95,72],[-85,70],[-82,66],[-90,64],[-93,59],[-86,56],[-80,52],[-79,57],[-77,62],[-70,60],[-64,60],[-62,56],[-57,52],[-66,49],[-61,46],[-66,44],[-70,43],[-70,41.5],[-74,40.5],[-76,37],[-76,35],[-81,31],[-80,26],[-82,26],[-84,30],[-89,30],[-94,29.5],[-97,27.5],[-99.5,27.5],[-101,29.7],[-104,29.5],[-106.5,31.8],[-109,31.3],[-114.7,32.7],[-117,32.5],[-120.5,34.5],[-124,40],[-124,46],[-123,49],[-130,54],[-136,58],[-146,60],[-152,58],[-158,56],[-165,54.5],[-160,58],[-166,60]];
const SA=[[-97.7,22],[-96.4,19],[-91,18.8],[-90.4,21],[-87.8,18],[-85,15.9],[-83.5,11],[-81.7,9],[-77.4,8.7],[-75.5,10.7],[-71.3,11],[-64,10.6],[-60,8.5],[-52,5],[-50,1.5],[-44,-2.5],[-35,-5.5],[-37,-12],[-40.5,-22],[-48.5,-26],[-52,-32],[-58,-34.8],[-62,-39],[-65,-42],[-67.5,-46.5],[-69,-51],[-65,-55],[-71,-54.8],[-75,-47],[-73.5,-37],[-71.5,-30],[-70.3,-18],[-76,-14],[-81,-5],[-80.5,0],[-77.5,4],[-79.5,8.8],[-83.5,8.7],[-87.5,13],[-94,16],[-101,17.5],[-105.5,23],[-109.5,26],[-112.5,29.5],[-114.7,31.7],[-110,30],[-106,31.5],[-104,29.5],[-99.5,27.5]];
const inP=(po,lo,la)=>{let r=false;for(let i=0,j=po.length-1;i<po.length;j=i++){const[a,b]=po[i],[c,d]=po[j];if((b>la)!==(d>la)&&lo<(c-a)*(la-b)/(d-b)+a)r=!r}return r};
const dots=[];for(let la=-56;la<=72;la+=2.4)for(let lo=-170;lo<=-34;lo+=2.4)if(inP(NA,lo,la)||inP(SA,lo,la))dots.push([la,lo]);
/* CONFIRMAR países y datos: solo Colombia está verificada con fuentes públicas */
const PE=(h,r)=>({h,r});
const CT=[['Colombia',4.7,-74.1,{h:'Sede en Bogotá y cobertura nacional. RAC Ómnibus con la salud de marca de 144 categorías durante todo el año, Panel Why con personas inscritas en el país y Panel Pet Lovers para hogares con mascotas.',r:'Es nuestro mercado base: aquí nacen más de 45 años de tradición y cada panel. En Colombia más del 60 % de los hogares convive con mascotas, un consumidor que las marcas apenas empiezan a entender.'}],
['México',19.4,-99.1,{r:'Es el mayor mercado de consumo de habla hispana de la región y presenta grandes diferencias entre ciudades, por eso exige estudios con muestras muy bien diseñadas.'}],
['Perú',-12,-77,{r:'Un consumo que crece fuera de la capital y una clase media en expansión: entender las diferencias regionales es clave para el consumo masivo.'}],
['Ecuador',-0.2,-78.5,{r:'Economía dolarizada con precios comparables, útil para estudios de precio y de umbral crítico, y con un consumidor muy ligado al comercio de barrio.'}],
['Chile',-33.4,-70.6,{r:'Alta bancarización y comercio electrónico desarrollado: un buen escenario para medir recorridos de compra entre canales digitales y físicos.'}],
['Argentina',-34.6,-58.4,{r:'Un consumidor muy sensible al precio y a la inflación, donde medir valor percibido y cambio de marca se vuelve prioridad.'}],
['Panamá',9,-79.5,{r:'Centro logístico y financiero de la región, con un consumidor expuesto a marcas internacionales y una oferta que rota con rapidez.'}],
['Costa Rica',9.9,-84.1,{r:'Consumidor informado y con alta adopción digital en Centroamérica, interesante para pruebas de concepto y experiencia de cliente.'}]];
/* CONFIRMAR: qué ha hecho B&OPTIMOS en cada país (campo h). Solo Colombia está documentada con fuentes públicas */
let sel=0,lam=-74,phi=4,tl=-74,tp=4,auto=true,vis=true;const lc=$('#cl');lc.innerHTML=CT.map((c,i)=>`<button class="cc${i?'':' on'}" data-i="${i}">${c[0]}</button>`).join('');
const info=()=>{const c=CT[sel],d=c[3];$('#cd').innerHTML=`<h3>${c[0]}</h3><div class="c2"><div><h4>Qué hicimos</h4><p class="${d.h?'':'mut'}">${d.h||'Proyectos de B&amp;OPTIMOS en este país: pendiente de documentar con el equipo.'}</p></div><div><h4>Por qué es relevante</h4><p>${d.r}</p></div></div>`};
const pick=i=>{sel=i;tl=CT[i][2];tp=CT[i][1]*.6;$$('.cc',lc).forEach((b,j)=>b.classList.toggle('on',j===i));info()};info();
lc.addEventListener('click',e=>{const b=e.target.closest('button');if(b){auto=false;pick(+b.dataset.i)}});
if(!rm)setInterval(()=>auto&&vis&&pick((sel+1)%CT.length),5000);
const pj=(la,lo)=>{const a=la*P,b=(lo-lam)*P,p=phi*P,c=Math.sin(p)*Math.sin(a)+Math.cos(p)*Math.cos(a)*Math.cos(b);return[cx+R*Math.cos(a)*Math.sin(b),cx-R*(Math.cos(p)*Math.sin(a)-Math.sin(p)*Math.cos(a)*Math.cos(b)),c]};
const draw=t=>{lam+=(tl-lam)*.06;phi+=(tp-phi)*.06;x.clearRect(0,0,N,N);
const g=x.createRadialGradient(cx-80,cx-80,20,cx,cx,R);g.addColorStop(0,'rgba(255,157,0,.25)');g.addColorStop(1,'rgba(207,39,96,.1)');x.fillStyle=g;x.beginPath();x.arc(cx,cx,R,0,7);x.fill();x.strokeStyle='rgba(255,157,0,.6)';x.lineWidth=2;x.stroke();
x.strokeStyle='rgba(255,255,255,.1)';x.lineWidth=1;
for(let la=-80;la<=80;la+=20){x.beginPath();let on=false;for(let lo=-180;lo<=180;lo+=4){const q=pj(la,lo);if(q[2]>0){on?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]);on=true}else on=false}x.stroke()}
for(let lo=-180;lo<180;lo+=20){x.beginPath();let on=false;for(let la=-90;la<=90;la+=4){const q=pj(la,lo);if(q[2]>0){on?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1]);on=true}else on=false}x.stroke()}
dots.forEach(d=>{const q=pj(d[0],d[1]);x.fillStyle=q[2]>0?'rgba(255,157,0,.85)':'rgba(255,157,0,.12)';x.fillRect(q[0]-2,q[1]-2,4,4)});
CT.forEach((c,i)=>{const q=pj(c[1],c[2]);if(q[2]<=0)return;const on=i===sel,r=(i?6:9)+(on?3+Math.sin(t/220)*2:0);x.fillStyle=i?'#F0508A':'#fff';x.beginPath();x.arc(q[0],q[1],r,0,7);x.fill();if(on){x.strokeStyle='#fff';x.lineWidth=2;x.beginPath();x.arc(q[0],q[1],r+8+Math.sin(t/220)*3,0,7);x.stroke();x.fillStyle='#fff';x.font='700 22px system-ui';x.fillText(c[0],q[0]+18,q[1]-14)}})};
new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(cv);
if(rm){lam=tl;phi=tp;draw(0);lc.addEventListener('click',()=>setTimeout(()=>{lam=tl;phi=tp;draw(0)},0))}else{const l=t=>{if(vis)draw(t);requestAnimationFrame(l)};requestAnimationFrame(l)}})();
/* DASHBOARD: datos publicados por B&OPTIMOS (Estudio RAC, 6.000 encuestas) + lectura estratégica */
const D=[['Recreación',21.90,'Mayor proporción: más de una quinta parte del uso entre las seis categorías. Funciona como puerta de entrada y construye hábito.','Consumo masivo y retail: activaciones y alianzas donde ya hay tráfico de familias. Turismo: convertir usuarios de recreación en viajeros con paquetes de fin de semana.'],
['Salud',14.59,'Segundo en uso. Es una necesidad de alta frecuencia donde pesa más la confianza que la promoción.','Droguerías y farmacéutico: reforzar confianza, servicio y disponibilidad. Seguros y bienestar: ofertas preventivas.'],
['Subsidios',14.08,'Casi igual a Salud: el beneficio económico directo mueve a las personas a usar el servicio.','Financiero: productos de ahorro o crédito ligados al subsidio. Educación: becas y cuotas apoyadas en subsidios.'],
['Educación',13.41,'Uso cercano a Subsidios: demanda estable ligada a etapas de vida (hijos, formación).','Educación: comunicar antes de matrículas. Tecnología y editorial: paquetes para temporada escolar.'],
['Droguería',12.08,'Canal de compra recurrente de bienestar: refleja hábito de visita frecuente.','Cuidado personal y OTC: visibilidad en el punto de venta y promociones por volumen.'],
['Turismo',9.83,'Menor proporción: uso más ocasional y de mayor inversión. Es la mayor oportunidad si baja la barrera de precio.','Turismo: paquetes accesibles y financiación. Financiero: crédito de viaje.']],K=['rec','sal','sub','edu','dro','tur'],C=['#FF9D00','#CF2760','#FFC24D','#F0508A','#E8590C','#9a8aa6'];
const fmt=v=>v.toFixed(2).replace('.',','),avg=D.reduce((a,d)=>a+d[1],0)/D.length,ic=n=>`<svg class="ico"><use href="#i-${n}"/></svg>`;
const mini=el=>el&&(el.innerHTML=D.map((d,i)=>`<div class="bh"><span>${ic(K[i])}${d[0]}</span><div class="bar"><i style="--w:${d[1]/22*100}%;background:${C[i]}"></i></div><b>${fmt(d[1])}%</b></div>`).join(''));mini($('#mini3'));
(function(){const ch=$('#chart');if(!ch)return;let vw='rank',sel='';const mx=Math.max(...D.map(d=>d[1])),dm=Math.max(...D.map(d=>Math.abs(d[1]-avg)));
const L=()=>D.map((d,i)=>({n:d[0],v:d[1],i:d[2],s:d[3],c:C[i],k:K[i]})).sort((a,b)=>b.v-a.v);
const mark=()=>{$$('.bh',ch).forEach(e=>e.classList.toggle('hl',e.dataset.n===sel));const x=L().find(d=>d.n===sel);
$('#ins').textContent=x?`${x.n}: ${fmt(x.v)}%, ${Math.abs(x.v-avg).toFixed(1).replace('.',',')} puntos ${x.v>=avg?'por encima':'por debajo'} del promedio de las seis (${avg.toFixed(1).replace('.',',')}%).`:'Toca o pasa el cursor sobre una categoría para leer su insight.';
$('#icd').innerHTML=x?`<div class="ic"><h4>Qué nos dice</h4><p>${x.i}</p><h4>Insight por sector</h4><p>${x.s}</p></div><p class="note">Lectura estratégica de B&amp;OPTIMOS: interpretación para validar con la base completa del estudio.</p>`:''};
const build=()=>{ch.className=vw;ch.innerHTML=L().map(d=>{const v=d.v-avg;return vw==='rank'?`<div class="bh" tabindex="0" data-n="${d.n}"><span>${ic(d.k)}${d.n}</span><div class="trk"><i class="fill" style="--w:${d.v/mx*92}%;background:${d.c}"></i><u class="av" style="left:${avg/mx*92}%"></u></div><b>${fmt(d.v)}%</b></div>`:`<div class="bh" tabindex="0" data-n="${d.n}"><span>${ic(d.k)}${d.n}</span><div class="trk dv"><i class="fill ${v>=0?'up':'dn'}" style="--w:${Math.abs(v)/dm*50}%"></i><u class="av" style="left:50%"></u></div><b>${v>=0?'+':'−'}${Math.abs(v).toFixed(1).replace('.',',')} pts</b></div>`}).join('');
$('#cnote').textContent=vw==='rank'?`La línea punteada marca el promedio de las seis categorías (${avg.toFixed(1).replace('.',',')} %).`:'Cada barra muestra cuántos puntos queda una categoría por encima (derecha) o por debajo (izquierda) del promedio.';
requestAnimationFrame(()=>requestAnimationFrame(()=>ch.classList.add('go')));mark()};
const pick=e=>{const q=e.target.closest('[data-n]');if(q&&sel!==q.dataset.n){sel=q.dataset.n;mark()}};
['click','mouseover','focusin'].forEach(t=>ch.addEventListener(t,pick));
$$('[data-vw]').forEach(b=>b.addEventListener('click',()=>{vw=b.dataset.vw;$$('[data-vw]').forEach(x=>x.setAttribute('aria-selected',x===b));build()}));
new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){build();o.disconnect()}}).observe(ch);build()})();
const FN={r:['Recordación: ¿me recuerdan?','Mide qué tan presente está la marca en la mente. Incluye el top of mind (primera marca que nombran sin ayuda), la recordación espontánea (la nombran sin pistas) y la ayudada (la reconocen en una lista).'],a:['Actitud: ¿qué piensan de mí?','Mide lo que las personas sienten hacia la marca: la consideran al comprar, la prefieren sobre otras y la asocian con ciertos atributos. Explica por qué una marca recordada puede no ser elegida.'],c:['Compra: ¿realmente me compran?','Mide el comportamiento: penetración (quién compró en el periodo), frecuencia y lealtad. Es la etapa que se convierte en ventas.']};
$$('.fn button').forEach(b=>b.addEventListener('click',()=>{$$('.fn button').forEach(x=>x.classList.toggle('on',x===b));const f=FN[b.dataset.k];$('#fnt').innerHTML=`<strong>${f[0]}</strong><br>${f[1]}`}));
const GL={'Top of mind':'Primera marca que una persona menciona, sin ayuda, al pensar en una categoría. Es la posición más valiosa.','Awareness':'Conocimiento de marca: espontáneo (la nombra sola) o ayudado (la reconoce en una lista).','Consideración':'Marcas que la persona evaluaría al momento de comprar.','Preferencia':'La marca que elegiría por encima de las demás.','Penetración':'Porcentaje de personas que compró o usó la marca en un periodo.','Lealtad':'Quienes repiten la compra y no cambian fácilmente a la competencia.','Salud de marca':'Lectura conjunta de recordación, actitud y compra: qué tan fuerte está una marca frente a su categoría.'};
const gb=$('#gls');if(gb){gb.innerHTML=Object.keys(GL).map(k=>`<button>${k}</button>`).join('');gb.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('button',gb).forEach(x=>x.classList.toggle('on',x===b));$('#glt').innerHTML=`<strong>${b.textContent}:</strong> ${GL[b.textContent]}`})}
const dz=$('.dz');
if(dz){const fi=$('#fi'),fl=$('#fls'),sh=()=>{fl.textContent='';[...fi.files].forEach(f=>{const li=document.createElement('li');li.textContent=`${f.name} (${Math.ceil(f.size/1024)} KB)`;fl.appendChild(li)})};
fi.addEventListener('change',sh);['dragover','dragenter'].forEach(t=>dz.addEventListener(t,e=>{e.preventDefault();dz.classList.add('over')}));
['dragleave','drop'].forEach(t=>dz.addEventListener(t,e=>{e.preventDefault();dz.classList.remove('over');if(t==='drop'){fi.files=e.dataTransfer.files;sh()}}))}
$$('form[data-netlify]').forEach(f=>f.addEventListener('submit',async e=>{e.preventDefault();const m=$('.ok',f);
try{const q=await fetch('/',{method:'POST',body:new FormData(f)});if(!q.ok)throw 0;f.reset();$('#fls')&&($('#fls').textContent='');m.textContent=f.dataset.ok}catch{m.textContent='No pudimos enviar tu información. Revisa tu conexión (máx. 8 MB de adjuntos) e inténtalo nuevamente.'}}));

const lg=$('#lg');$$('[data-login]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();lg.showModal?lg.showModal():lg.setAttribute('open','')}));
if(lg){$('.x',lg).addEventListener('click',()=>lg.close());$('#lgb').addEventListener('click',()=>{$('.ok',lg).textContent='El acceso para clientes y comunidad estará disponible muy pronto.'})}

$$('[data-pick]').forEach(b=>b.addEventListener('click',()=>{const q=$('#pp');if(q)q.value=b.dataset.pick}));
$$('[data-open]').forEach(b=>b.addEventListener('click',()=>setTimeout(()=>{const t=$$('#paneles .tab')[+b.dataset.open];t&&t.click()},50)));
const cn=$('#coins');if(cn){const bs=$$('button',cn),wf=$('#wf'),wt=$('#wt');const up=n=>{bs.forEach((b,i)=>b.classList.toggle('on',i<n));wf.style.width=n*25+'%';wt.textContent=n===0?'Aún no has completado encuestas.':n<4?`${n} de 4 encuestas completadas. Te faltan ${4-n}.`:'¡Listo! Con 4 encuestas finalizadas (o 100 puntos) ya puedes retirar tu dinero en tu billetera digital.'};
bs.forEach((b,i)=>b.addEventListener('click',()=>up(b.classList.contains('on')&&!(bs[i+1]&&bs[i+1].classList.contains('on'))?i:i+1)))}
