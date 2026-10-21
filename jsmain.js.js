/* ==========================================================================
   Project: Showarea Halab (سامر قصاب)
   Script: Interactive logic, filtering, search, and dynamic local rendering
   ========================================================================== */

// 1. Sample Data (Stored in LocalStorage for Prototype)
const initialTutorials = [
  {
    id: 1,
    title: "شرح شامل لتطبيق ChatGPT وكتابة الأوامر الاحترافية",
    category: "ChatGPT",
    desc: "تعلم كيف تستخرج أفضل النتائج من شات جي بي تي لبناء خطط العمل وتوليد الأفكار.",
    date: "2026-02-15"
  },
  {
    id: 2,
    title: "توليد صور واقعية وبدقة عالية باستخدام الذكاء الاصطناعي",
    category: "إنشاء الصور",
    desc: "أفضل الممارسات والأدوات المتاحة لتصميم صور وشعارات احترافية.",
    date: "2026-03-01"
  },
  {
    id: 3,
    title: "أتمتة نشر المحتوى على شبكات التواصل الاجتماعي",
    category: "الأتمتة والإنتاجية",
    desc: "كيف ترتبط أدوات الـ AI بخدمات الأتمتة لتوفر ساعات من العمل الأسبوعي.",
    date: "2026-03-10"
  },
  {
    id: 4,
    title: "إنشاء فيديوهات كاملة بصوت صانع محتوى افتراضي",
    category: "صناعة الفيديو",
    desc: "خطوات إنشاء مقاطع فيديو يوتيوب قصيرة كاملة دون الحاجة للظهور بنفسك.",
    date: "2026-03-18"
  }
];

// Initialize LocalStorage if empty
if (!localStorage.getItem('tutorials_data')) {
  localStorage.setItem('tutorials_data', JSON.stringify(initialTutorials));
}

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Render Featured Tutorials on Home Page
  const featuredContainer = document.getElementById('featuredTutorials');
  if (featuredContainer) {
    const data = JSON.parse(localStorage.getItem('tutorials_data')) || [];
    featuredContainer.innerHTML = data.slice(0, 3).map(item => createCardHTML(item)).join('');
  }

  // Handle Filtering & Search on Tutorials Page
  const tutorialsGrid = document.getElementById('tutorialsGrid');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');

  if (tutorialsGrid) {
    function renderTutorials() {
      const data = JSON.parse(localStorage.getItem('tutorials_data')) || [];
      const query = searchInput ? searchInput.value.toLowerCase() : '';
      const cat = categoryFilter ? categoryFilter.value : 'ALL';

      const filtered = data.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
        const matchesCategory = cat === 'ALL' || item.category === cat;
        return matchesSearch && matchesCategory;
      });

      if (filtered.length === 0) {
        tutorialsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">لا توجد نتائج مطابقة للبحث.</p>`;
      } else {
        tutorialsGrid.innerHTML = filtered.map(item => createCardHTML(item)).join('');
      }
    }

    renderTutorials();

    if (searchInput) searchInput.addEventListener('input', renderTutorials);
    if (categoryFilter) categoryFilter.addEventListener('change', renderTutorials);
  }

  // Form Submission Demonstrations
  const courseForm = document.getElementById('courseForm');
  if (courseForm) {
    courseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('courseStatus');
      status.style.color = '#00f2fe';
      status.innerText = 'تم تسجيل طلبك بنجاح! سنقوم بالتواصل معك قريباً.';
      courseForm.reset();
    });
  }

  const consultationForm = document.getElementById('consultationForm');
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('consultationStatus');
      status.style.color = '#00f2fe';
      status.innerText = 'تم إرسال طلب الاستشارة بنجاح. سيتم مراجعة الطلب والرد عليك خلال 24 ساعة.';
      consultationForm.reset();
    });
  }
});

// Template Helper for Tutorial Cards
function createCardHTML(item) {
  return `
    <div class="glass-card">
      <div class="card-img">[ فيديو: ${item.title} ]</div>
      <span class="badge">${item.category}</span>
      <h3 style="font-size: 1.1rem; margin-bottom: 10px;">${item.title}</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 15px;">${item.desc}</p>
      <a href="https://youtube.com" target="_blank" class="btn btn-secondary" style="width: 100%; font-size: 0.85rem;">
        ▶ مشاهدة الشرح
      </a>
    </div>
  `;
}