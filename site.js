'use strict';
const copy = window.projectContent;
const main = document.querySelector('main');
const nav = document.querySelector('nav');
const menu = document.querySelector('.menu');
const dialogue = document.querySelector('dialog');
const dialogTitle = document.querySelector('#viewer-title');
const dialogContent = document.querySelector('#viewer-content');
const ai = 'https://yusi-dualskin-production.up.railway.app/learn/';
const names = {games:'玩中学', courses:'看听做', practice:'互动练', literacy:'知字理', reading:'学阅读'};
const view = new URLSearchParams(location.search).get('page');
const home = !['games','courses','literacy','reading'].includes(view);
const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const asset = name => './' + name;
const image = (name, alt, eager=false) => `<img src="${asset(name)}" alt="${esc(alt)}"${eager?'':' loading="lazy"'}>`;
const action = (href,label) => `<a class="action" href="${esc(href)}"${href.startsWith('https:')?' target="_blank" rel="noopener noreferrer"':''}>${esc(label)} <span aria-hidden="true">${href.startsWith('https:')?'↗':'→'}</span></a>`;
const pageURL = name => '?page='+name;
const plants = '<span class="sprig sprig-left"></span><span class="sprig sprig-right"></span>';
const sectionEdge = `<div class="section-curve" aria-hidden="true">${plants}</div>`;
nav.innerHTML = Object.entries(names).map(([id,label])=>`<a href="${home?'#'+id:id==='practice'?'./#practice':pageURL(id)}"${view===id?' aria-current="page"':''}>${label}</a>`).join('');
menu.addEventListener('click',()=>{
  menu.setAttribute('aria-expanded',String(nav.classList.toggle('open')));
});
nav.addEventListener('click',event=>{
  if(event.target.closest('a')){
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
  }
});
const feature = (id,title,description,visual,label,classes='') => `<section id="${id}" class="feature ${id}">
  ${sectionEdge}
  <div class="wrap grid"><div><span class="eyebrow">${names[id]}</span><h2>${title}</h2>${description}
  ${action(id==='practice'?ai:pageURL(id),label)}</div><div class="visual ${classes}">${visual}</div></div>
</section>`;
const gameList = `<ul>${copy.games.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`;
const levelNames = ['口语发展','口语提升','阅读发展','读写提升'];
const gameTypes = ['叠叠变','对对碰','掷骰子','敲敲乐','磁拼图','记忆卡'];
const courseGroups = [
  ['动物',['阿木和他的动物朋友','神奇的尾巴','各种形状的动物','十二生肖']],
  ['植物',['植物的生长','神奇的树','美丽的花','超市小帮手']],
  ['食物',[]],
  ['环境',['我们的大中国','天气情况我知道','多彩的四季','太阳月亮和地球']],
  ['家庭',['这是我的家1','这是我的家2','有礼貌的小客人','我的邻居']],
  ['身体',[]],
  ['服装',['不同场合穿什么','不同职业穿什么','美丽的民族服装','漂亮的花纹']],
  ['职业',['绘本《来不及了》','人人都工作','医生和护士','消防员','长大做什么']]
];
const books = {spring:'春天是个魔术师',bridge:'各种各样的桥'};
const readingDirectory = [
  [['上下歌'],['小羊找妈妈'],['找朋友'],['比一比']],
  [['去野餐'],[books.spring,'spring']],
  [[books.bridge,'bridge'],['各种各样的天气'],['小熊采果子'],['谁到我家住']],
  [['谁先来的']]
];
const txt = line => `<p>${esc(line)}</p>`;
const videoButton = (name,title) => `<button class="action" type="button" data-video="${name}" data-title="${esc(title)}">播放示范 <span aria-hidden="true">▶</span></button>`;
function homeCourses(){
  return `<section id="courses" class="feature courses">
    ${sectionEdge}
    <div class="wrap course-showcase">
      <div class="course-intro"><span class="eyebrow">${names.courses}</span><h2>微课与律动视频</h2></div>
      <div class="course-cards">
        <article class="course-card"><h3>主题微课</h3>${txt(copy.courseIntro)}${txt(copy.courseTopics)}
          ${image('course-graphic.webp','主题微课：八个语义范畴')}</article>
        <article class="course-card"><h3>律动视频</h3>${txt(copy.motionIntro)}
          ${image('course-motion.webp','律动视频示例画面')}</article>
      </div>
      ${action(pageURL('courses'),'浏览课程目录')}
    </div>
  </section>`;
}
function homePage(){
  return `<section class="hero">
    <div class="hero-landscape" aria-hidden="true"><span class="sun"></span><span class="cloud cloud-left"></span><span class="cloud cloud-right"></span>${plants}</div>
    <div class="wrap grid">
    <div><h1><span>儿童语言能力</span><span>评估与干预项目</span></h1>${action('#games','查看学习资源')}</div>
    <figure>${image('hero.webp','儿童语言发展游戏盒及教具',true)}</figure>
  </div></section>
  <section class="quote" aria-labelledby="quote-title">${sectionEdge}<div class="wrap grid">
    <div class="portrait">${image('portrait.webp','舒华老师',true)}</div>
    <div><h2 id="quote-title">主编寄语</h2><blockquote>${esc(copy.quote)}</blockquote>
    <div class="byline"><span>${esc(copy.byline)}</span><img class="signature" src="./signature.png" alt="舒华老师亲笔签名"></div></div>
  </div></section>
  ${feature('games','语言发展游戏盒',gameList,image('box-one.webp','一级游戏盒')+image('box-two.webp','二级游戏盒'),'查看游戏盒','game-photos')}
  ${homeCourses()}
  ${feature('practice','AI 语言学习智能体',txt(copy.aiIntro),image('map.webp','AI 学习地图'),'进入 AI 学习')}
  ${feature('literacy','识字教学手册',txt(copy.manualIntro),image('manual.webp','字源识字法教学手册')+image('manual-scene.webp','识字教学手册配图'),'查阅教学手册')}
  ${feature('reading','分级绘本',txt(copy.bookIntro),Object.entries(books).map(([id,title])=>image('book-'+id+'.webp',title)).join(''),'浏览分级绘本','duo books')}`;
}
function detailPage(title,intro,body){
  document.title = title+' ｜ '+copy.title;
  return `<section class="detail-head"><div class="wrap"><div class="crumb"><a href="./">首页</a> / ${names[view]}</div>
    <h1>${title}</h1>${intro}</div></section><div class="detail wrap">${body}</div>`;
}
function gamesPage(){
  const cards = levelNames.map((name,index)=>{
    const suffix = index===0?'one':'two';
    return `<section class="panel"><h2>${index+1} 级 · ${name}</h2>${index<2?`${image('box-chart-'+suffix+'.webp',name+'教具图')}
    <details${index===0?' open':''}><summary>玩法目录</summary><ul>${gameTypes.map((game,gameIndex)=>`<li class="row"><span>${game}</span>${index===0&&gameIndex<2?videoButton(gameIndex===0?'game-stack':'game-match','1 级 · '+game):''}</li>`).join('')}</ul></details>`:''}</section>`;
  }).join('');
  return detailPage('语言发展游戏盒',txt('建立汉字音-形-义心理词典、全面提升听、说、读、写语言能力'),`<div class="levels">${cards}</div>`);
}
function coursesPage(){
  const sidebar = `<aside class="panel course-menu" aria-label="主题单元">${courseGroups.map(([name],i)=>`<a href="#unit-${i+1}">${name}</a>`).join('')}</aside>`;
  const outline = courseGroups.map(([name,lessons],i)=>`<details id="unit-${i+1}"${i===0?' open':''}>
    <summary>${String(i+1).padStart(2,'0')}　${name}</summary>${lessons.length?`<ul>${lessons.map((lesson,index)=>`<li class="row"><span>第 ${index+(i===7?0:1)} 课　${lesson}</span>${i===0&&index===0?videoButton('course-animals',lesson):''}</li>`).join('')}</ul>`:'<ul><li class="row">暂无课次</li></ul>'}
  </details>`).join('');
  return detailPage('微课与律动视频','',`<div class="course-layout">${sidebar}<div>${outline}</div></div>`);
}
function literacyPage(){
  const groups = new Map();
  copy.articles.forEach(([group,title,url])=>{
    if(!groups.has(group)) groups.set(group,[]);
    groups.get(group).push([title,url]);
  });
  const lists = [...groups].map(([group,articles],index)=>`<details${index<2?' open':''}><summary>${esc(group)}</summary><ul>${articles.map(([title,url])=>`<li class="row"><span>${esc(title)}</span>${action(url,'查看微信原文')}</li>`).join('')}</ul></details>`).join('');
  return detailPage('识字教学手册',txt(copy.manualIntro),lists);
}
function readingPage(){
  const directory = readingDirectory.map((booksInGroup,index)=>`<details id="reading-group-${index+1}" open>
    <summary>第 ${index+1} 组 <span class="group-count">${booksInGroup.length} 本</span></summary>
    <ul>${booksInGroup.map(([title,id])=>`<li class="row"><span>${esc(title)}</span>${id
      ? `<button class="action" type="button" data-book="${id}">预览绘本 <span aria-hidden="true">→</span></button>`
      : '<span class="availability">目录条目</span>'}</li>`).join('')}</ul>
  </details>`).join('');
  const samples = `<div class="book-grid">${Object.entries(books).map(([id,title])=>`<article class="panel">
    ${image('book-'+id+'.webp',title+'封面')}<h2>${title}</h2><button class="action" type="button" data-book="${id}">预览绘本 <span aria-hidden="true">→</span></button>
  </article>`).join('')}</div>`;
  return detailPage('分级绘本',txt(copy.bookIntro),`<div class="reading-layout">
    <section aria-labelledby="directory-title"><h2 id="directory-title">绘本目录</h2>${directory}</section>
    <section aria-labelledby="samples-title"><h2 id="samples-title">绘本预览</h2>${samples}</section>
  </div>`);
}
const renderers = {games:gamesPage,courses:coursesPage,literacy:literacyPage,reading:readingPage};
main.innerHTML = home ? homePage() : renderers[view]();
if(view==='courses'){
  document.querySelector('.course-menu').addEventListener('click',event=>{
    const link=event.target.closest('a');
    if(link) document.querySelector(link.hash).open=true;
  });
  if(/^#unit-[1-8]$/.test(location.hash)) document.querySelector(location.hash).open=true;
}
let dialogTrigger;
function show(title,markup,trigger){
  dialogTrigger=trigger;
  dialogTitle.textContent=title;
  dialogContent.innerHTML=markup;
  dialogue.showModal();
  dialogue.querySelector('.close').focus();
}
function bookPreview(id,trigger){
  let page=1;
  const file=()=>asset(id+'-'+page+'.webp');
  show(books[id],`<img class="preview-page" src="${file()}" alt="正文第 1 页">
    <div class="pager"><button class="action" type="button" data-step="-1" disabled>上一页</button>
    <output aria-live="polite">1 / 3</output><button class="action" type="button" data-step="1">下一页</button></div>`,trigger);
  const pager=dialogContent.querySelector('.pager');
  pager.addEventListener('click',event=>{
    const button=event.target.closest('[data-step]');
    if(!button) return;
    page+=Number(button.dataset.step);
    const pageImage=dialogContent.querySelector('img');
    pageImage.src=file();
    pageImage.alt='正文第 '+page+' 页';
    pager.querySelector('output').value=page+' / 3';
    pager.firstElementChild.disabled=page===1;
    pager.lastElementChild.disabled=page===3;
    if(button.disabled) (page===1?pager.lastElementChild:pager.firstElementChild).focus();
  });
}
main.addEventListener('click',event=>{
  const trigger=event.target.closest('button[data-video],button[data-book]');
  if(!trigger) return;
  if(trigger.dataset.book) bookPreview(trigger.dataset.book,trigger);
  else show(trigger.dataset.title,`<video controls playsinline preload="metadata" src="${asset(trigger.dataset.video+'.mp4')}"></video>`,trigger);
});
dialogue.querySelector('.close').addEventListener('click',()=>dialogue.close());
dialogue.addEventListener('close',()=>{
  dialogContent.replaceChildren();
  dialogTrigger?.focus();
});

