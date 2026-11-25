/* Dados de exemplo — mais tarde vêm da base de dados (Supabase) */
const I = [
  {t:'Moradia T3 com jardim',   l:'Cascais, Lisboa',      p:'485 000 €',     n:'Comprar',  q:3, b:2, a:165, s:'Pendente'},
  {t:'Apartamento T2 luminoso', l:'Arroios, Lisboa',      p:'325 000 €',     n:'Comprar',  q:2, b:1, a:92,  s:'Publicado'},
  {t:'Moradia T3 com encanto',  l:'Foz do Douro, Porto',  p:'395 000 €',     n:'Comprar',  q:3, b:2, a:165, s:'Rejeitado'},
  {t:'Apartamento T2 renovado', l:'Matosinhos, Porto',    p:'1 450 € / mês', n:'Arrendar', q:2, b:1, a:88,  s:'Vendido'}
];
const S = {Pendente:'warning', Publicado:'success', Rejeitado:'danger', Vendido:'secondary'};

const $ = s => document.querySelector(s);
const put = (s, h) => { const e = $(s); if (e) e.innerHTML = h; };   // só preenche se o elemento existir nesta página

const card = i => `<div class="col"><a href="imovel.html" class="card imovel h-100 border-0 shadow-sm text-decoration-none text-body">
  <div class="foto"><span class="badge bg-primary">${i.n}</span><span class="fav"><i class="bi bi-heart"></i></span></div>
  <div class="card-body"><div class="preco">${i.p}</div><h3 class="h6 mb-1">${i.t}</h3><p class="text-secondary small">${i.l}</p><hr>
  <small class="text-secondary">${i.q} quartos · ${i.b} casas de banho · ${i.a} m²</small></div></a></div>`;

put('#destaques', I.slice(0, 3).map(card).join(''));
put('#lista', I.map(card).join(''));
put('#linhas', I.map(i => `<tr><td class="ps-3"><div class="d-flex align-items-center gap-3"><div class="foto mini"></div><div><strong>${i.t}</strong><div class="small text-secondary">${i.l}</div></div></div></td>
  <td>${i.p}</td><td><span class="badge text-bg-${S[i.s]}">${i.s}</span></td>
  <td class="text-end pe-3"><a href="adicionar.html" class="btn btn-sm btn-outline-primary">Editar</a> <button class="btn btn-sm btn-link text-danger" data-bs-toggle="modal" data-bs-target="#mRemover">Remover</button></td></tr>`).join(''));
put('#extras', ['Jardim privativo','Piscina','Cozinha equipada','Ar condicionado','Garagem','Varanda'].map(x => `<li class="col"><i class="bi bi-check2 text-success"></i> ${x}</li>`).join(''));

// Filtros: grupos de botões (quartos, casas de banho)
document.querySelectorAll('[data-g]').forEach(g => {
  const [n, v] = g.dataset.g.split(':');
  g.innerHTML = v.split(',').map((x, k) => `<input type="radio" class="btn-check" name="${n}" id="${n}${k}"><label class="btn btn-outline-primary btn-sm" for="${n}${k}">${x}</label>`).join('');
});

// Menu lateral da área do cliente (marca a página atual)
const atual = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.menu').forEach(m => {
  m.innerHTML = `<div class="eyebrow mb-2">Área do cliente</div><div class="list-group">
    <a href="painel.html" class="list-group-item list-group-item-action">Os meus imóveis</a>
    <a href="adicionar.html" class="list-group-item list-group-item-action">Adicionar imóvel</a>
    <span class="list-group-item disabled">A minha conta</span></div>
    <a href="index.html" class="d-block mt-3 small">Voltar ao início</a>`;
  m.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === atual));
});

// Formulários: validam e avançam (simulação, ainda sem backend)
document.querySelectorAll('form[data-to]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  f.classList.add('was-validated');
  if (f.checkValidity()) {
    f.dataset.to === 'modal' ? new bootstrap.Modal('#mEnviado').show() : (location.href = f.dataset.to);
  }
}));
