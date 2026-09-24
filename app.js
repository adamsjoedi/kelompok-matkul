(function () {
  const COURSES_DATA = window.COURSES_DATA || [];

  if (!COURSES_DATA || COURSES_DATA.length === 0) {
    console.error('Data kelompok (COURSES_DATA) tidak ditemukan.');
    return;
  }

  let activeCourseId = COURSES_DATA[0].id;
  let searchQuery = '';

  const tabsContainer = document.getElementById('course-tabs');
  const courseTitleEl = document.getElementById('course-title');
  const statKelompokEl = document.getElementById('stat-kelompok');
  const statMahasiswaEl = document.getElementById('stat-mahasiswa');
  const groupsContainer = document.getElementById('groups-container');
  const emptyStateEl = document.getElementById('empty-state');
  const emptyCourseNameEl = document.getElementById('empty-course-name');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const copyWABtn = document.getElementById('copy-wa-btn');
  const toastEl = document.getElementById('toast');
  const toastMessageEl = document.getElementById('toast-message');

  function showToast(message) {
    if (!toastEl || !toastMessageEl) return;
    toastMessageEl.textContent = message;
    toastEl.classList.remove('hidden');
    setTimeout(() => {
      toastEl.classList.add('hidden');
    }, 2500);
  }

  function getActiveCourse() {
    return COURSES_DATA.find((c) => c.id === activeCourseId) || COURSES_DATA[0];
  }

  function renderTabs() {
    if (!tabsContainer) return;
    tabsContainer.innerHTML = '';

    COURSES_DATA.forEach((course) => {
      const isActive = course.id === activeCourseId;
      const totalMahasiswa = course.kelompok.reduce((acc, k) => acc + k.anggota.length, 0);
      const isPending = course.kelompok.length === 0;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
        isActive
          ? 'bg-slate-900 text-white shadow-sm'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
      }`;

      btn.innerHTML = `
        <span>${course.nama}</span>
        <span class="text-[11px] font-mono px-1.5 py-0.5 rounded ${
          isActive ? 'bg-slate-800 text-slate-200' : 'bg-slate-200/80 text-slate-600'
        }">
          ${isPending ? 'Menyusul' : `${course.kelompok.length} Kel / ${totalMahasiswa} Mhs`}
        </span>
      `;

      btn.addEventListener('click', () => {
        activeCourseId = course.id;
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
        renderTabs();
        renderContent();
      });

      tabsContainer.appendChild(btn);
    });
  }

  function highlightMatch(text, query) {
    if (!text) return '';
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-amber-200 text-slate-900 rounded-xs px-0.5 font-semibold">$1</mark>');
  }

  function copyGroupText(group, courseName) {
    let text = `*${courseName}*\n*${group.nama}*\n`;
    if (group.judul) {
      text += `Judul Project: ${group.judul}\n`;
    }
    group.anggota.forEach((m, idx) => {
      text += `${idx + 1}. ${m.nama} (${m.nim})\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
      showToast(`Daftar ${group.nama} berhasil disalin!`);
    });
  }

  function copyAllWhatsApp() {
    const course = getActiveCourse();
    if (course.kelompok.length === 0) {
      showToast('Belum ada data kelompok untuk disalin.');
      return;
    }

    let text = `*PORTAL KELOMPOK STUDI*\n*${course.nama}*\n\n`;
    course.kelompok.forEach((g) => {
      text += `*${g.nama}*\n`;
      if (g.judul) {
        text += `Judul Project: ${g.judul}\n`;
      }
      g.anggota.forEach((m, idx) => {
        text += `${idx + 1}. ${m.nama} (${m.nim})\n`;
      });
      text += `\n`;
    });

    const totalMhs = course.kelompok.reduce((acc, k) => acc + k.anggota.length, 0);
    text += `_Total: ${course.kelompok.length} Kelompok, ${totalMhs} Mahasiswa_`;

    navigator.clipboard.writeText(text).then(() => {
      showToast('Format WhatsApp berhasil disalin ke clipboard!');
    });
  }

  function renderContent() {
    const course = getActiveCourse();
    if (!course) return;

    if (courseTitleEl) courseTitleEl.textContent = course.nama;

    const totalGroups = course.kelompok.length;
    const totalStudents = course.kelompok.reduce((acc, k) => acc + k.anggota.length, 0);

    if (statKelompokEl) statKelompokEl.textContent = totalGroups;
    if (statMahasiswaEl) statMahasiswaEl.textContent = totalStudents;

    if (totalGroups === 0) {
      if (groupsContainer) groupsContainer.classList.add('hidden');
      if (emptyStateEl) emptyStateEl.classList.remove('hidden');
      if (emptyCourseNameEl) emptyCourseNameEl.textContent = course.nama;
      return;
    }

    if (emptyStateEl) emptyStateEl.classList.add('hidden');
    if (groupsContainer) {
      groupsContainer.classList.remove('hidden');
      groupsContainer.innerHTML = '';
    }

    const q = searchQuery.toLowerCase().trim();

    const filteredGroups = course.kelompok.filter((group) => {
      if (!q) return true;
      const matchGroupName = group.nama.toLowerCase().includes(q);
      const matchJudul = (group.judul || '').toLowerCase().includes(q);
      const matchMember = group.anggota.some(
        (m) => m.nama.toLowerCase().includes(q) || m.nim.toLowerCase().includes(q)
      );
      return matchGroupName || matchJudul || matchMember;
    });

    if (filteredGroups.length === 0) {
      if (groupsContainer) {
        groupsContainer.innerHTML = `
          <div class="col-span-full bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <p class="text-slate-500 text-sm">Tidak ditemukan kelompok, judul project, atau mahasiswa dengan kata kunci "${searchQuery}".</p>
          </div>
        `;
      }
      return;
    }

    filteredGroups.forEach((group) => {
      const card = document.createElement('div');
      card.className = 'bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between';

      let membersHtml = '';
      group.anggota.forEach((m, idx) => {
        membersHtml += `
          <li class="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/70 border border-slate-200/50">
            <span class="w-5 h-5 shrink-0 rounded-full bg-slate-200/80 text-[11px] font-mono font-semibold text-slate-700 flex items-center justify-center">
              ${idx + 1}
            </span>
            <div class="min-w-0 flex-1">
              <p class="text-xs sm:text-sm font-semibold text-slate-800">
                ${highlightMatch(m.nama, q)}
              </p>
              <p class="text-xs font-mono text-slate-500 tabular-nums">
                NIM: ${highlightMatch(m.nim, q)}
              </p>
            </div>
          </li>
        `;
      });

      const judulHtml = group.judul
        ? `
          <div class="mt-2.5 p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100/80">
            <span class="text-[10px] font-semibold uppercase tracking-wider text-indigo-700 block mb-0.5">
              Judul / Tema Project:
            </span>
            <p class="text-xs sm:text-sm font-bold text-indigo-950 leading-snug">
              ${highlightMatch(group.judul, q)}
            </p>
          </div>
        `
        : '';

      card.innerHTML = `
        <div>
          <div class="flex items-start justify-between pb-3 border-b border-slate-100">
            <div>
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                <h3 class="text-base font-bold text-slate-900">${group.nama}</h3>
              </div>
              <p class="text-xs text-slate-500 mt-0.5">${group.anggota.length} Mahasiswa</p>
            </div>
            <button
              type="button"
              class="copy-single-btn p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Salin kelompok ini"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>

          ${judulHtml}

          <div class="pt-3">
            <p class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Daftar Anggota
            </p>
            <ul class="space-y-2">
              ${membersHtml}
            </ul>
          </div>
        </div>
      `;

      const copySingleBtn = card.querySelector('.copy-single-btn');
      if (copySingleBtn) {
        copySingleBtn.addEventListener('click', () => copyGroupText(group, course.nama));
      }

      groupsContainer.appendChild(card);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        if (searchQuery) {
          clearSearchBtn.classList.remove('hidden');
        } else {
          clearSearchBtn.classList.add('hidden');
        }
      }
      renderContent();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      clearSearchBtn.classList.add('hidden');
      renderContent();
    });
  }

  if (copyWABtn) {
    copyWABtn.addEventListener('click', copyAllWhatsApp);
  }

  renderTabs();
  renderContent();
})();
