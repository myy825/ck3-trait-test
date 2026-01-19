// CK3 Personality Traits Test
// 17 pairs (excluding sadistic, eccentric)
// Scoring: each pair score 0-100, starts at 50

const STORAGE_KEY = "ck3_traits_test_v1";

const PAIRS = [
  { id:"lustful_chaste", left:{key:"chaste", zh:"忠贞"}, right:{key:"lustful", zh:"色欲"} },
  { id:"gluttonous_temperate", left:{key:"temperate", zh:"节制"}, right:{key:"gluttonous", zh:"暴食"} },
  { id:"greedy_generous", left:{key:"generous", zh:"慷慨"}, right:{key:"greedy", zh:"贪婪"} },
  { id:"lazy_diligent", left:{key:"lazy", zh:"懒惰"}, right:{key:"diligent", zh:"勤勉"} },
  { id:"wrathful_calm", left:{key:"calm", zh:"冷静"}, right:{key:"wrathful", zh:"暴怒"} },
  { id:"patient_impatient", left:{key:"patient", zh:"耐心"}, right:{key:"impatient", zh:"急躁"} },
  { id:"arrogant_humble", left:{key:"humble", zh:"谦卑"}, right:{key:"arrogant", zh:"傲慢"} },
  { id:"deceitful_honest", left:{key:"honest", zh:"诚实"}, right:{key:"deceitful", zh:"狡诈"} },
  { id:"craven_brave", left:{key:"craven", zh:"怯懦"}, right:{key:"brave", zh:"勇敢"} },
  { id:"shy_gregarious", left:{key:"shy", zh:"害羞"}, right:{key:"gregarious", zh:"合群"} },
  { id:"ambitious_content", left:{key:"content", zh:"安于现状"}, right:{key:"ambitious", zh:"野心勃勃"} },
  { id:"arbitrary_just", left:{key:"just", zh:"公正"}, right:{key:"arbitrary", zh:"专断"} },
  { id:"cynical_zealous", left:{key:"cynical", zh:"愤世嫉俗"}, right:{key:"zealous", zh:"狂热"} },
  { id:"paranoid_trusting", left:{key:"paranoid", zh:"多疑"}, right:{key:"trusting", zh:"轻信他人"} },
  { id:"compassionate_callous", left:{key:"compassionate", zh:"慈悲"}, right:{key:"callous", zh:"冷酷"} },
  { id:"forgiving_vengeful", left:{key:"forgiving", zh:"宽宏大量"}, right:{key:"vengeful", zh:"睚眦必报"} },
  { id:"stubborn_fickle", left:{key:"stubborn", zh:"固执"}, right:{key:"fickle", zh:"多变"} },
];

// 5-point options (delta toward RIGHT)
const OPTIONS = [
  { label:"非常不同意", delta:-20 },
  { label:"不同意",     delta:-10 },
  { label:"一般/不确定", delta:  0 },
  { label:"同意",       delta: 10 },
  { label:"非常同意",   delta: 20 },
];

// 34 questions = 2 per pair
// reverse=false means agreement pushes RIGHT; reverse=true means agreement pushes LEFT
const QUESTIONS = [
  { pairId:"lustful_chaste", reverse:false, text:"我很容易被浪漫/肉体吸引而冲动行动。" },
  { pairId:"lustful_chaste", reverse:true,  text:"在承诺关系中，我更重视克制与边界感。" },

  { pairId:"gluttonous_temperate", reverse:false, text:"只要喜欢，我会放纵自己吃喝/娱乐到很过头。" },
  { pairId:"gluttonous_temperate", reverse:true,  text:"我更擅长适可而止：哪怕喜欢也会主动收手。" },

  { pairId:"greedy_generous", reverse:false, text:"资源有限时，我优先考虑自己拿到更多。" },
  { pairId:"greedy_generous", reverse:true,  text:"哪怕我会吃亏，我也愿意把好处让给别人。" },

  { pairId:"lazy_diligent", reverse:false, text:"我做事常常拖延，能晚点再说就晚点。" },
  { pairId:"lazy_diligent", reverse:true,  text:"我喜欢把任务拆开并持续推进，哪怕很枯燥。" },

  { pairId:"wrathful_calm", reverse:false, text:"被冒犯时，我会很快上头并以强硬方式回应。" },
  { pairId:"wrathful_calm", reverse:true,  text:"即使局面很糟，我也能保持情绪稳定不失控。" },

  { pairId:"patient_impatient", reverse:false, text:"我讨厌等待，事情慢一点我就烦躁。" },
  { pairId:"patient_impatient", reverse:true,  text:"我愿意为了更好的结果而等待、打磨和迭代。" },

  { pairId:"arrogant_humble", reverse:false, text:"我经常觉得自己比周围的人更懂、更强。" },
  { pairId:"arrogant_humble", reverse:true,  text:"我更倾向承认自己的局限，并愿意向人请教。" },

  { pairId:"deceitful_honest", reverse:false, text:"必要时我会隐瞒真相、讲半真半假来达成目的。" },
  { pairId:"deceitful_honest", reverse:true,  text:"即使会吃亏，我也更愿意说真话并保持透明。" },

  { pairId:"craven_brave", reverse:false, text:"面对风险与对抗时，我更倾向回避以保全自己。" },
  { pairId:"craven_brave", reverse:true,  text:"该出头的时候我会顶上，哪怕后果不确定。" },

  { pairId:"shy_gregarious", reverse:false, text:"在人多的场合我会不自在，更喜欢待在角落。" },
  { pairId:"shy_gregarious", reverse:true,  text:"社交会让我充电；认识新朋友让我兴奋。" },

  { pairId:"ambitious_content", reverse:false, text:"我总想更进一步：更高位置、更大影响力、更强掌控。" },
  { pairId:"ambitious_content", reverse:true,  text:"我更享受安稳与满足，不太想为“更大”付出代价。" },

  { pairId:"arbitrary_just", reverse:false, text:"规则可以为我服务：我会按自己喜好灵活裁决。" },
  { pairId:"arbitrary_just", reverse:true,  text:"我看重一致性与程序正义：同样的事应该同样处理。" },

  { pairId:"cynical_zealous", reverse:false, text:"我对理想/信念很容易热血上头，并愿意为之付出。" },
  { pairId:"cynical_zealous", reverse:true,  text:"我通常怀疑动机与宣传，觉得人多半是自私的。" },

  { pairId:"paranoid_trusting", reverse:false, text:"我更倾向相信别人是善意的，愿意先给信任。" },
  { pairId:"paranoid_trusting", reverse:true,  text:"我常担心背后有坑，会反复确认别人的真实意图。" },

  { pairId:"compassionate_callous", reverse:false, text:"做决策时我更看结果与效率，不太被他人感受左右。" },
  { pairId:"compassionate_callous", reverse:true,  text:"即使不划算，我也会因为同情心而愿意帮人。" },

  { pairId:"forgiving_vengeful", reverse:false, text:"别人伤害我后，我很难放下，通常想“讨回来”。" },
  { pairId:"forgiving_vengeful", reverse:true,  text:"只要对方真诚道歉并改正，我愿意翻篇。" },

  { pairId:"stubborn_fickle", reverse:false, text:"我很容易被新想法吸引，计划经常说变就变。" },
  { pairId:"stubborn_fickle", reverse:true,  text:"我一旦做了决定就很难改变，别人劝也没用。" },
];

// ---------- State ----------
function defaultScores() {
  const obj = {};
  for (const p of PAIRS) obj[p.id] = 50;
  return obj;
}

let state = {
  idx: 0,
  answers: Array(QUESTIONS.length).fill(null), // store option index 0..4 or null
  scores: defaultScores(),
};

// ---------- DOM ----------
const elStart  = document.getElementById("screenStart");
const elQuiz   = document.getElementById("screenQuiz");
const elResult = document.getElementById("screenResult");

const btnStart  = document.getElementById("btnStart");
const btnResume = document.getElementById("btnResume");
const btnReset  = document.getElementById("btnReset");

const qCount = document.getElementById("qCount");

const progressText = document.getElementById("progressText");
const progressPct  = document.getElementById("progressPct");
const progressBar  = document.getElementById("progressBar");

const qTitle = document.getElementById("qTitle");
const optionsWrap = document.getElementById("options");

const btnBack = document.getElementById("btnBack");
const btnSkip = document.getElementById("btnSkip");
const btnNext = document.getElementById("btnNext");

const rankList = document.getElementById("rankList");

const btnRetake = document.getElementById("btnRetake");
const btnCopy   = document.getElementById("btnCopy");

// ---------- Utils ----------
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw);
    // minimal validation
    if (!parsed || !Array.isArray(parsed.answers) || !parsed.scores) return false;
    state = parsed;
    return true;
  } catch {
    return false;
  }
}

function clearSaved() {
  localStorage.removeItem(STORAGE_KEY);
}

function show(screen) {
  elStart.classList.add("hidden");
  elQuiz.classList.add("hidden");
  elResult.classList.add("hidden");
  screen.classList.remove("hidden");
}

// recompute all scores from scratch based on answers
function recomputeScores() {
  const scores = defaultScores();
  for (let i=0;i<QUESTIONS.length;i++){
    const ans = state.answers[i];
    if (ans === null) continue;
    const q = QUESTIONS[i];
    const opt = OPTIONS[ans];
    let delta = opt.delta;
    if (q.reverse) delta = -delta; // reverse-coded
    scores[q.pairId] = clamp(scores[q.pairId] + delta, 0, 100);
  }
  state.scores = scores;
}

function pairById(id){
  return PAIRS.find(p => p.id === id);
}

function traitIconFile(traitKey){
  // put your icons in /assets with names like Trait_forgiving.png
  return `assets/Trait_${traitKey}.png`;
}

// ---------- Quiz Render ----------
function renderQuiz() {
  const total = QUESTIONS.length;
  const i = state.idx;
  const q = QUESTIONS[i];

  progressText.textContent = `第 ${i+1}/${total} 题`;
  const pct = Math.round((i) / total * 100);
  progressPct.textContent = `${pct}%`;
  progressBar.style.width = `${pct}%`;

  qTitle.textContent = q.text;

  // options
  optionsWrap.innerHTML = "";
  const selected = state.answers[i];

  OPTIONS.forEach((op, idx) => {
    const div = document.createElement("div");
    div.className = "option" + (selected === idx ? " selected" : "");
    div.tabIndex = 0;

    const left = document.createElement("div");
    left.className = "label";
    left.textContent = op.label;

    const right = document.createElement("div");
    right.className = "val";
    // Show direction hint relative to RIGHT trait
    //const dir = op.delta === 0 ? "0" : (op.delta > 0 ? `+${op.delta}` : `${op.delta}`);
    //right.textContent = `倾向右侧：${dir}`;

    div.appendChild(left);
    div.appendChild(right);

    div.addEventListener("click", () => {
      state.answers[i] = idx;
      recomputeScores();
      save();
      renderQuiz();
      btnNext.disabled = false;
    });
    div.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") div.click();
    });

    optionsWrap.appendChild(div);
  });

  btnBack.disabled = (i === 0);
  btnNext.disabled = (state.answers[i] === null);

  // if last question, next button text changes
  btnNext.textContent = (i === total-1) ? "查看结果" : "下一题";
}

function goNext() {
  const total = QUESTIONS.length;
  if (state.idx < total-1) {
    state.idx += 1;
    save();
    renderQuiz();
  } else {
    // finish
    recomputeScores();
    save();
    renderResult();
    show(elResult);
  }
}

function goBack() {
  if (state.idx > 0) {
    state.idx -= 1;
    save();
    renderQuiz();
  }
}

function skip() {
  // keep answer null, just move on
  goNext();
}

// ---------- Result Render ----------
function formatPairSummary(p, score) {
  // score is 0-100 toward RIGHT
  const rightScore = score;
  const leftScore  = 100 - score; // symmetric
  const leaning = (score === 50) ? "中立"
    : (score > 50 ? p.right.zh : p.left.zh);
  const strength = Math.abs(score - 50); // 0..50
  return { leaning, strength, leftScore, rightScore };
}

// summary grid removed: UI no longer displays the 17-pair overview

function makeTraitSide(trait, side){
  const wrap = document.createElement("div");
  wrap.className = "trait-side " + (side === "right" ? "right" : "");

  if (side === "right") {
    const name = document.createElement("div");
    name.className = "tname";
    name.textContent = trait.zh;

    const img = document.createElement("img");
    img.className = "icon";
    img.alt = trait.zh;
    img.src = traitIconFile(trait.key);

    wrap.appendChild(name);
    wrap.appendChild(img);
  } else {
    const img = document.createElement("img");
    img.className = "icon";
    img.alt = trait.zh;
    img.src = traitIconFile(trait.key);

    const name = document.createElement("div");
    name.className = "tname";
    name.textContent = trait.zh;

    wrap.appendChild(img);
    wrap.appendChild(name);
  }
  return wrap;
}

function makeBar(score){
  const bar = document.createElement("div");
  bar.className = "bar";

  const fill = document.createElement("div");
  fill.className = "fill";
  fill.style.width = `${score}%`;

  const mark = document.createElement("div");
  mark.className = "mark";

  bar.appendChild(fill);
  bar.appendChild(mark);
  return bar;
}

// Create 34 ranked rows (each pair twice)
// Row definition: leftTrait, rightTrait, fillPct, rightScore
function buildRankRows(){
  const rows = [];
  for (const p of PAIRS) {
    const score = state.scores[p.id]; // toward RIGHT in the "normal" orientation (p.left -> p.right)

    // Normal: left=p.left, right=p.right, fill=score, rightScore=score
    rows.push({
      pairId: p.id,
      left: p.left,
      right: p.right,
      fill: score,
      rightScore: score,
    });

    // Mirror: left=p.right, right=p.left, fill=100-score, rightScore=100-score
    rows.push({
      pairId: p.id,
      left: p.right,
      right: p.left,
      fill: 100 - score,
      rightScore: 100 - score,
    });
  }

  // Sort by rightScore desc, then by fill desc for stability
  rows.sort((a,b) => (b.rightScore - a.rightScore) || (b.fill - a.fill));
  return rows;
}

function renderRankList(){
  rankList.innerHTML = "";
  const rows = buildRankRows();

  rows.forEach((r, idx) => {
    const item = document.createElement("div");
    item.className = "rank-item";

    const row = document.createElement("div");
    row.className = "trait-row";
    row.appendChild(makeTraitSide(r.left, "left"));
    row.appendChild(makeBar(r.fill));
    row.appendChild(makeTraitSide(r.right, "right"));

    const meta = document.createElement("div");
    meta.className = "rank-meta";
    meta.innerHTML = `<span>#${idx+1} · 右侧倾向分：<b>${r.rightScore}</b>/100</span><span class="muted">${r.note} · ${r.left.zh}→${r.right.zh}</span>`;

    item.appendChild(row);
    item.appendChild(meta);
    rankList.appendChild(item);
  });
}

function renderResult(){
  renderRankList();
}

// ---------- Copy result ----------
function buildTextResult(){
  const lines = [];
  lines.push("测试结果");
  lines.push("");

  for (const p of PAIRS){
    const score = state.scores[p.id];
    const leaning = score === 50 ? "中立" : (score > 50 ? p.right.zh : p.left.zh);
    const strength = Math.abs(score - 50);
    lines.push(`${p.left.zh} ↔ ${p.right.zh}：${score}/100（偏向：${leaning}，强度：${strength}/50）`);
  }

  lines.push("");
  //lines.push("34行倾向榜（展示Top10）：");
  const rows = buildRankRows().slice(0,10);
  rows.forEach((r,i)=>{
    lines.push(`#${i+1} 右侧=${r.right.zh} ${r.rightScore}/100（${r.left.zh}→${r.right.zh}，${r.note}）`);
  });

  return lines.join("\n");
}

// ---------- Init ----------
qCount.textContent = QUESTIONS.length.toString();

const hasSaved = load();
if (hasSaved) {
  btnResume.classList.remove("hidden");
}

btnStart.addEventListener("click", () => {
  state = { idx:0, answers:Array(QUESTIONS.length).fill(null), scores:defaultScores() };
  clearSaved();
  save();
  show(elQuiz);
  renderQuiz();
});

btnResume.addEventListener("click", () => {
  // state already loaded
  recomputeScores();
  save();
  show(elQuiz);
  renderQuiz();
});

btnReset.addEventListener("click", () => {
  state = { idx:0, answers:Array(QUESTIONS.length).fill(null), scores:defaultScores() };
  clearSaved();
  save();
  show(elStart);
  btnResume.classList.add("hidden");
});

btnBack.addEventListener("click", goBack);
btnSkip.addEventListener("click", skip);
btnNext.addEventListener("click", goNext);

btnRetake.addEventListener("click", () => {
  state = { idx:0, answers:Array(QUESTIONS.length).fill(null), scores:defaultScores() };
  clearSaved();
  save();
  show(elQuiz);
  renderQuiz();
});

btnCopy.addEventListener("click", async () => {
  const text = buildTextResult();
  try{
    await navigator.clipboard.writeText(text);
    btnCopy.textContent = "已复制";
    setTimeout(()=>btnCopy.textContent="复制文字结果", 1200);
  }catch{
    alert("复制失败：你的浏览器可能不允许 clipboard。你可以手动选中结果复制。");
  }
});

// Default show start
show(elStart);
