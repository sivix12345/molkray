/* ====================================
   ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ САЙТА
   ==================================== */

// Основная инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализация сайта "Молочный край"');
    
    // Общие функции для всех страниц
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initFormValidation();
    initEnhancedInteractions();
    
    // Функции для главной страницы
    initProductsSlider();
    
    // Функции для страницы новостей
    initNewsPage();
    initNewsletterSubscription();
    
    // Функции для страницы о компании
    initProductionGallery();
    
    console.log('Инициализация завершена');
});

/* ====================================
   ОБЩИЕ ФУНКЦИИ ДЛЯ ВСЕХ СТРАНИЦ
   ==================================== */

// Мобильное меню
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
}

// Плавная прокрутка для якорных ссылок
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const targetPosition = target.offsetTop - 80; // Учитываем фиксированный header
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Анимации при прокрутке
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Добавляем поэтапную анимацию для дочерних элементов
                const children = entry.target.querySelectorAll('.feature-card, .product-card, .news-card, .nutrition-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Добавляем класс анимации к элементам
    const animateElements = document.querySelectorAll('.features-section, .products-section, .child-nutrition, .news-section');
    
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
    
    // Анимируем отдельные карточки
    const cards = document.querySelectorAll('.feature-card, .product-card, .news-card, .nutrition-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        cardObserver.observe(card);
    });
}

// Эффект прокрутки для header
window.addEventListener('scroll', throttle(() => {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY;
    
    if (scrolled > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 1px 20px rgba(0, 0, 0, 0.05)';
    }
}, 16));

// Улучшенные интерактивные эффекты
function initEnhancedInteractions() {
    // Добавляем fade-in анимацию к основным секциям
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
        section.classList.add('fade-in-up');
    });
    
    // Улучшенные взаимодействия с кнопками
    const buttons = document.querySelectorAll('.cta-button, .slider-btn, .form-button, .news-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.disabled && !isMobileDevice()) {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.disabled && !isMobileDevice()) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
        
        button.addEventListener('mousedown', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0) scale(0.98)';
            }
        });
        
        button.addEventListener('mouseup', function() {
            if (!this.disabled && !isMobileDevice()) {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
    });
    
    // Добавляем эффект ripple к карточкам (только для десктопа)
    if (!isMobileDevice()) {
        const cards = document.querySelectorAll('.feature-card, .product-card, .news-card, .latest-news-card');
        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

/* ====================================
   ФУНКЦИИ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ
   ==================================== */

// Слайдер продукции на главной странице
function initProductsSlider() {
    console.log('Инициализация слайдера продукции...');
    
    const sliderTrack = document.getElementById('productsSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!sliderTrack) {
        console.log('Слайдер не найден на данной странице');
        return;
    }
    if (!prevBtn || !nextBtn) {
        console.error('Кнопки слайдера не найдены');
        return;
    }
    
    const cards = Array.from(sliderTrack.children);
    const totalCards = cards.length;
    
    if (totalCards === 0) {
        console.error('Карточки в слайдере не найдены');
        return;
    }
    
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let maxIndex = Math.max(0, totalCards - cardsPerView);
    let isTransitioning = false;
    
    console.log('Слайдер инициализирован:', { totalCards, cardsPerView, maxIndex });
    
    // Настройка стилей слайдера
    sliderTrack.style.display = 'flex';
    sliderTrack.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    sliderTrack.style.willChange = 'transform';
    
    // Обеспечиваем видимость и кликабельность кнопок
    prevBtn.style.pointerEvents = 'auto';
    nextBtn.style.pointerEvents = 'auto';
    prevBtn.style.zIndex = '10';
    nextBtn.style.zIndex = '10';
    
    // Создаем точки навигации
    createDots();
    
    // Устанавливаем начальную позицию
    updateSlider();
    
    // Обработчики событий для кнопок
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isTransitioning) return;
        
        console.log('Нажата кнопка "Назад", текущий индекс:', currentIndex);
        
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
            stopAutoSlide();
            startAutoSlide();
            console.log('Перемещение к индексу:', currentIndex);
        }
    }, { passive: false });
    
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isTransitioning) return;
        
        console.log('Нажата кнопка "Вперед", текущий индекс:', currentIndex, 'максимум:', maxIndex);
        
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
            stopAutoSlide();
            startAutoSlide();
            console.log('Перемещение к индексу:', currentIndex);
        }
    }, { passive: false });
    
    // Автоматическая прокрутка слайдера
    let autoSlideInterval;
    startAutoSlide();
    
    // Приостановка авто-прокрутки при наведении (только для десктопа)
    if (!isMobileDevice()) {
        sliderTrack.addEventListener('mouseenter', stopAutoSlide);
        sliderTrack.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', debounce(() => {
        const oldCardsPerView = cardsPerView;
        cardsPerView = getCardsPerView();
        maxIndex = Math.max(0, totalCards - cardsPerView);
        
        if (oldCardsPerView !== cardsPerView) {
            currentIndex = Math.min(currentIndex, maxIndex);
            createDots();
        }
        
        updateSlider();
        console.log('Размер изменен:', { cardsPerView, maxIndex, currentIndex });
    }, 250));
    
    // Вычисление количества карточек на экране
    function getCardsPerView() {
        const containerWidth = sliderTrack.parentElement.offsetWidth;
        const screenWidth = window.innerWidth;
        
        // Адаптивные размеры карточек
        let cardWidth = 320;
        let gap = 30;
        
        if (screenWidth <= 360) {
            cardWidth = 220;
            gap = 12;
        } else if (screenWidth <= 480) {
            cardWidth = 240;
            gap = 15;
        } else if (screenWidth <= 768) {
            cardWidth = 260;
            gap = 20;
        } else if (screenWidth <= 1024) {
            cardWidth = 280;
            gap = 25;
        }
        
        const cardWithGap = cardWidth + gap;
        const padding = screenWidth <= 480 ? 10 : (screenWidth <= 768 ? 16 : 30);
        const availableWidth = containerWidth - (padding * 2);
        
        const calculated = Math.floor(availableWidth / cardWithGap);
        const result = Math.max(1, Math.min(calculated, totalCards));
        
        console.log('Расчет карточек на экране:', {
            screenWidth,
            containerWidth,
            availableWidth,
            cardWidth,
            gap,
            cardWithGap,
            calculated,
            result
        });
        
        return result;
    }
    
    // Обновление позиции слайдера
    function updateSlider() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Получаем текущую ширину карточки и отступ
        const screenWidth = window.innerWidth;
        let cardWidth = 320;
        let gap = 30;
        
        if (screenWidth <= 360) {
            cardWidth = 220;
            gap = 12;
        } else if (screenWidth <= 480) {
            cardWidth = 240;
            gap = 15;
        } else if (screenWidth <= 768) {
            cardWidth = 260;
            gap = 20;
        } else if (screenWidth <= 1024) {
            cardWidth = 280;
            gap = 25;
        }
        
        const translateX = -(currentIndex * (cardWidth + gap));
        
        console.log('Обновление слайдера:', { 
            currentIndex, 
            translateX, 
            cardWidth, 
            gap,
            screenWidth 
        });
        
        sliderTrack.style.transform = `translateX(${translateX}px)`;
        
        // Обновляем состояние кнопок
        const isAtStart = currentIndex === 0;
        const isAtEnd = currentIndex >= maxIndex;
        
        updateButtonStates(isAtStart, isAtEnd);
        updateDots();
        
        // Сбрасываем флаг после завершения анимации
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    // Обновление состояния кнопок
    function updateButtonStates(isAtStart, isAtEnd) {
        prevBtn.disabled = isAtStart;
        nextBtn.disabled = isAtEnd;
        
        prevBtn.style.opacity = isAtStart ? '0.5' : '1';
        nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
        
        // Улучшенная визуальная обратная связь
        if (isAtStart) {
            prevBtn.style.background = '#cbd5e0';
            prevBtn.style.cursor = 'not-allowed';
            prevBtn.style.transform = 'scale(0.9)';
        } else {
            prevBtn.style.background = 'linear-gradient(135deg, #3b82f6, #06b6d4)';
            prevBtn.style.cursor = 'pointer';
            prevBtn.style.transform = 'scale(1)';
        }
        
        if (isAtEnd) {
            nextBtn.style.background = '#cbd5e0';
            nextBtn.style.cursor = 'not-allowed';
            nextBtn.style.transform = 'scale(0.9)';
        } else {
            nextBtn.style.background = 'linear-gradient(135deg, #3b82f6, #06b6d4)';
            nextBtn.style.cursor = 'pointer';
            nextBtn.style.transform = 'scale(1)';
        }
        
        console.log('Состояние кнопок:', { isAtStart, isAtEnd, maxIndex, totalCards });
    }
    
    // Создание точек навигации
    function createDots() {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        const dotsCount = Math.max(1, maxIndex + 1);
        
        console.log('Создание точек навигации:', dotsCount);
        
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.setAttribute('aria-label', `Перейти к слайду ${i + 1}`);
            dot.addEventListener('click', () => {
                if (isTransitioning) return;
                
                console.log('Нажата точка:', i);
                currentIndex = i;
                updateSlider();
                stopAutoSlide();
                startAutoSlide();
            });
            dotsContainer.appendChild(dot);
        }
        
        updateDots();
    }
    
    // Обновление точек навигации
    function updateDots() {
        if (!dotsContainer) return;
        
        const dots = dotsContainer.children;
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('active', i === currentIndex);
        }
    }
    
    // Запуск автоматической прокрутки
    function startAutoSlide() {
        stopAutoSlide();
        // Запускаем авто-прокрутку только если есть несколько позиций и не на мобильных устройствах
        if (maxIndex > 0 && !isMobileDevice()) {
            autoSlideInterval = setInterval(() => {
                if (isTransitioning) return;
                
                if (currentIndex >= maxIndex) {
                    currentIndex = 0;
                } else {
                    currentIndex++;
                }
                updateSlider();
            }, 5000);
        }
    }
    
    // Остановка автоматической прокрутки
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    // Улучшенные события касания для мобильных устройств
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTime = 0;
    
    sliderTrack.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        startTime = Date.now();
        stopAutoSlide();
        
        // Добавляем визуальную обратную связь
        sliderTrack.style.transition = 'none';
    }, { passive: true });
    
    sliderTrack.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const deltaX = currentX - startX;
        
        // Обеспечиваем визуальную обратную связь во время свайпа
        const currentTransform = -(currentIndex * (getCardWidth() + getGap()));
        const newTransform = currentTransform + (deltaX * 0.5); // Эффект сопротивления
        
        sliderTrack.style.transform = `translateX(${newTransform}px)`;
    }, { passive: true });
    
    sliderTrack.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        
        const deltaX = startX - currentX;
        const deltaTime = Date.now() - startTime;
        const velocity = Math.abs(deltaX) / deltaTime;
        
        // Восстанавливаем переход
        sliderTrack.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Улучшенное определение свайпа
        const threshold = 50;
        const isQuickSwipe = velocity > 0.5;
        const isLongSwipe = Math.abs(deltaX) > threshold;
        
        if (isQuickSwipe || isLongSwipe) {
            if (deltaX > 0 && currentIndex < maxIndex) {
                currentIndex++;
            } else if (deltaX < 0 && currentIndex > 0) {
                currentIndex--;
            }
        }
        
        updateSlider();
        isDragging = false;
        
        // Перезапускаем авто-прокрутку если не на мобильном
        if (!isMobileDevice()) {
            startAutoSlide();
        }
    }, { passive: true });
    
    // Предотвращаем контекстное меню при долгом нажатии
    sliderTrack.addEventListener('contextmenu', function(e) {
        if (isDragging) {
            e.preventDefault();
        }
    });
    
    // Вспомогательные функции для получения размеров
    function getCardWidth() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 360) return 220;
        if (screenWidth <= 480) return 240;
        if (screenWidth <= 768) return 260;
        if (screenWidth <= 1024) return 280;
        return 320;
    }
    
    function getGap() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 360) return 12;
        if (screenWidth <= 480) return 15;
        if (screenWidth <= 768) return 20;
        if (screenWidth <= 1024) return 25;
        return 30;
    }
    
    console.log('Инициализация слайдера завершена!');
}

/* ====================================
   ФУНКЦИИ ДЛЯ СТРАНИЦЫ НОВОСТЕЙ
   ==================================== */

// Инициализация страницы новостей
function initNewsPage() {
    if (!document.querySelector('.news-grid')) {
        console.log('Страница новостей не найдена');
        return;
    }
    
    console.log('Инициализация страницы новостей');
    initNewsModal();
    initLoadMore();
}

// Данные новостей
const newsData = {
    '1': {
        image: 'images/news/1june-den-detei.jpg',
        date: '1 июня 2025',
        title: 'С днем защиты детей!',
        content: `
            <p>1 июня — особый день, наполненный светом, радостью и детским смехом. В этот день весь мир отмечает Международный день защиты детей — праздник, который напоминает нам о главном: дети должны расти в любви, заботе и безопасности.</p>
            
            <p>Комбинат детского питания «Молочный край» искренне поздравляет всех родителей, педагогов и, конечно, наших маленьких потребителей с этим важным днём!</p>
            
            <p>Мы создаём продукцию с особым вниманием, ведь здоровье и счастье ребёнка — наш главный приоритет. Пусть в жизни каждого ребёнка будет как можно больше добрых моментов, вкусных завтраков и счастливых улыбок!</p>
            
            <p>С праздником! С любовью — ваш «Молочный край».</p>
        `
    },
    '2': {
        image: 'images/news/9may.jpg',
        date: '9 мая 2025',
        title: 'С Днём Победы!',
        content: `
            <p>Дорогие ветераны, жители Хабаровского края, уважаемые земляки!</p>
            
            <p>Коллектив комбината детского питания «Молочный край» сердечно поздравляет вас с 80-й годовщиной Великой Победы!</p>
            
            <p>Этот день занимает особое место в сердце каждого россиянина. 80 лет назад наши деды и прадеды одержали великую победу, отстояв свободу и мир для будущих поколений. Мы гордимся их подвигом, помним о нём и передаём эту память детям — с благодарностью, уважением и глубоким почтением.</p>
            
            <p>Склоняем головы перед мужеством и стойкостью героев. Спасибо за мирное небо!</p>

            <p>С Днём Победы!</p>
        `
    },
    '3': {
        image: 'images/news/novinki-antoha.jpg',
        date: '17 апреля 2025',
        title: 'НОВИНКА - Творог «Антоха Кроха» с кальцием и витамином D3',
        content: `
            <p>Комбинат детского питания «Молочный край» представляет новинку — творог «Антоха Кроха» с кальцием и витамином D3!</p>
            
            <p>Это не просто вкусный десерт, а полезный продукт, созданный специально для детей. Кальций укрепляет кости и зубы, а витамин D₃ помогает ему усваиваться и поддерживает иммунитет.</p>

            <p>«Антоха Кроха» — это сразу четыре аппетитных вкуса, которые точно понравятся малышам:</p>

            <ul>
                <li>персик,</li>
                <li>клубника,</li>
                <li>черника,</li>
                <li>банан с печеньем.</li>
            </ul>
            
            <p>Нежная текстура, натуральные ингредиенты и забота о здоровье ребёнка — всё это в каждой ложечке нового творожка.</p>
            
            <p>Попробуйте новинку и выберите любимый вкус всей семьёй!</p>
        `
    },
    '4': {
        image: 'images/news/novinka-tvorog.jpg',
        date: '2 апреля 2025',
        title: 'НОВИНКА - Творог 9%',
        content: `
            <p>Комбинат детского питания «Молочный край» представляет новинку — творог 9% жирности!</p>
            
            <p>Это питательный, натуральный продукт с насыщенным вкусом и мягкой текстурой. Идеально подходит как для детского питания, так и для всей семьи — на завтрак, перекус или как основа для любимых блюд.</p>

            <p>Наш творог:</p>

            <ul>
                <li>содержит полноценный белок,</li>
                <li>богат кальцием,</li>
                <li>способствует правильному развитию организма,</li>
                <li>производится без консервантов и лишних добавок.</li>
            </ul>
            
            <p>С «Молочным краем» — вкусно, полезно и с заботой о здоровье!</p>
            
            <p>Попробуйте новый творог 9% — вкус природы в каждой ложке!</p>
        `
    },
    '5': {
        image: 'images/news/8march.jpg',
        date: '8 марта 2025',
        title: 'С Международным женским днём!',
        content: `
            <p>Дорогие женщины! Милые мамы, бабушки, коллеги и партнёрши!</p>

            <p>Комбинат детского питания «Молочный край» от всей души поздравляет вас с 8 Марта — праздником весны, красоты и заботы!</p>

            <p>Вы — источник тепла, добра и вдохновения. Благодаря вашей любви растут счастливые дети, крепнут семьи и развивается наш край.</p>

            <p>Пусть каждый день будет наполнен улыбками, гармонией и радостью, а близкие окружают вас вниманием и заботой.</p>

            <p>Желаем вам здоровья, счастья и весеннего настроения круглый год!</p>

            <p>С праздником, дорогие женщины!</p>
        `
    }
};

// Добавление обработчиков событий к карточкам новостей
function addNewsCardEventListeners(newsCard, newsId) {
    const cardClickHandler = (e) => {
        if (newsData[newsId]) {
            openNewsModal(newsData[newsId]);
        }
    };
    
    newsCard.addEventListener('click', cardClickHandler);
    
    // Также добавляем обработчик к кнопке, если она существует
    const btn = newsCard.querySelector('.news-btn');
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            cardClickHandler(e);
        });
    }
}

// Инициализация модального окна новостей
function initNewsModal() {
    const newsCards = document.querySelectorAll('.news-card');
    const modal = document.getElementById('newsModal');
    const modalOverlay = document.getElementById('newsModalOverlay');
    const modalClose = document.getElementById('newsModalClose');
    
    if (!modal) {
        console.log('Модальное окно новостей не найдено');
        return;
    }
    
    console.log('Инициализация модального окна новостей');
    
    // Добавляем обработчики к существующим карточкам новостей
    newsCards.forEach(card => {
        const newsId = card.getAttribute('data-id');
        addNewsCardEventListeners(card, newsId);
    });
    
    // Обработчики закрытия модального окна
    modalClose.addEventListener('click', closeNewsModal);
    modalOverlay.addEventListener('click', closeNewsModal);
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeNewsModal();
        }
    });
    
    function openNewsModal(news) {
        const modalImage = document.getElementById('modalNewsImage');
        const modalDate = document.getElementById('modalNewsDate');
        const modalTitle = document.getElementById('modalNewsTitle');
        const modalContent = document.getElementById('modalNewsContent');
        
        modalImage.src = news.image;
        modalImage.alt = news.title;
        modalDate.textContent = news.date;
        modalTitle.textContent = news.title;
        modalContent.innerHTML = news.content;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeNewsModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Делаем функции доступными глобально
    window.openNewsModal = openNewsModal;
    window.closeNewsModal = closeNewsModal;
}

// Функция загрузки дополнительных новостей
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const newsGrid = document.getElementById('newsGrid');
    
    if (!loadMoreBtn || !newsGrid) {
        console.log('Кнопка "Загрузить еще" не найдена');
        return;
    }
    
    console.log('Инициализация кнопки "Загрузить еще"');
    
    // Дополнительные новости для загрузки
    const additionalNews = [
        {
            id: '5',
            image: 'images/news/8march.jpg',
            date: '8 марта 2025',
            title: 'С Международным женским днём!'
        }
    ];
    
    let loadedCount = 0;
    let isLoading = false;
    
    loadMoreBtn.addEventListener('click', function() {
        if (isLoading) return;
        
        isLoading = true;
        const spinner = this.querySelector('.loading-spinner');
        const btnText = this.childNodes[0];
        
        // Показываем состояние загрузки
        btnText.textContent = 'Загрузка...';
        spinner.classList.remove('hidden');
        this.disabled = true;
        
        // Имитируем задержку API запроса
        setTimeout(() => {
            // Добавляем новые новости
            additionalNews.forEach((news, index) => {
                if (loadedCount < additionalNews.length) {
                    const newsCard = createNewsCard(news);
                    newsGrid.appendChild(newsCard);
                    
                    // ВАЖНО: Добавляем обработчик событий для новых карточек
                    addNewsCardEventListeners(newsCard, news.id);
                    
                    // Анимируем новый элемент
                    setTimeout(() => {
                        newsCard.style.opacity = '1';
                        newsCard.style.transform = 'translateY(0)';
                    }, index * 100);
                    
                    loadedCount++;
                }
            });
            
            // Сбрасываем состояние загрузки
            isLoading = false;
            btnText.textContent = 'Загрузить еще новости';
            spinner.classList.add('hidden');
            this.disabled = false;
            
            // Скрываем кнопку, если больше нет контента
            if (loadedCount >= additionalNews.length) {
                this.style.display = 'none';
            }
        }, 2000);
    });
}

// Создание элемента карточки новости
function createNewsCard(news) {
    const article = document.createElement('article');
    article.className = 'news-card';
    article.setAttribute('data-id', news.id);
    article.style.opacity = '0';
    article.style.transform = 'translateY(20px)';
    article.style.transition = 'all 0.5s ease';
    
    article.innerHTML = `
        <div class="news-image">
            <img src="${news.image}" alt="${news.title}">
        </div>
        <div class="news-content">
            <div class="news-date">${news.date}</div>
            <h3 class="news-title">${news.title}</h3>
            <button class="news-btn">Подробнее</button>
        </div>
    `;
    
    return article;
}

// Подписка на новости
function initNewsletterSubscription() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (!newsletterForm) {
        console.log('Форма подписки на новости не найдена');
        return;
    }
    
    console.log('Инициализация формы подписки на новости');
    
    // URL Google Apps Script
    const SCRIPT_ID = 'AKfycbwa_20aVJMD3Z3nKd803P5BoAiSvWoz6SKDw02X_udXnQ6EglIOIxW7eMhsF1D1aM4H';
    const GOOGLE_SCRIPT_URL = `https://script.google.com/macros/s/AKfycbwa_20aVJMD3Z3nKd803P5BoAiSvWoz6SKDw02X_udXnQ6EglIOIxW7eMhsF1D1aM4H/exec`;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('.newsletter-input');
        const submitBtn = this.querySelector('.newsletter-btn');
        const checkbox = this.querySelector('input[type="checkbox"]');
        
        // Базовая валидация
        if (!emailInput.value.trim()) {
            showNewsletterMessage('Пожалуйста, введите email адрес', 'error');
            return;
        }
        
        if (!isValidEmail(emailInput.value.trim())) {
            showNewsletterMessage('Пожалуйста, введите корректный email адрес', 'error');
            return;
        }
        
        if (!checkbox.checked) {
            showNewsletterMessage('Необходимо согласие на обработку данных', 'error');
            return;
        }
        
        // Показываем состояние загрузки
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
            </div>
            Подписываем...
        `;
        submitBtn.disabled = true;
        
        const email = emailInput.value.trim();
        
        console.log('Отправляем запрос на:', GOOGLE_SCRIPT_URL);
        console.log('Email:', email);
        
        // Используем GET запрос (работает лучше с Google Apps Script)
        const url = `${GOOGLE_SCRIPT_URL}?email=${encodeURIComponent(email)}`;
        
        fetch(url, {
            method: 'GET',
            mode: 'no-cors'
        })
        .then(() => {
            console.log('Запрос на подписку отправлен успешно');
            showNewsletterMessage('Спасибо! Вы успешно подписались на новости', 'success');
            emailInput.value = '';
            checkbox.checked = false;
        })
        .catch(error => {
            console.error('Ошибка подписки:', error);
            showNewsletterMessage('Произошла ошибка. Попробуйте позже', 'error');
        })
        .finally(() => {
            // Сбрасываем состояние кнопки
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Показ сообщения о подписке
function showNewsletterMessage(message, type) {
    const existingMessage = document.querySelector('.newsletter-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `newsletter-message ${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <span class="message-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span>${message}</span>
        </div>
    `;
    
    messageDiv.style.cssText = `
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        margin-top: 15px;
        text-align: center;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
    `;
    
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.appendChild(messageDiv);
    
    // Анимируем появление
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
    
    // Удаляем сообщение через 5 секунд
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 5000);
}

/* ====================================
   ФУНКЦИИ ДЛЯ СТРАНИЦЫ "О КОМПАНИИ"
   ==================================== */

// Галерея производства
function initProductionGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const modalCounter = document.getElementById('modalCounter');
    
    if (!galleryItems.length || !modal) {
        console.log('Галерея производства не найдена');
        return;
    }
    
    console.log('Инициализация галереи производства');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.getAttribute('data-image'),
        alt: item.querySelector('img').getAttribute('alt'),
        caption: item.querySelector('.gallery-overlay p').textContent
    }));
    
    // Открытие модального окна
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openModal();
        });
    });
    
    // События закрытия модального окна
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Навигация
    modalPrev.addEventListener('click', () => {
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
        updateModalImage();
    });
    
    modalNext.addEventListener('click', () => {
        currentImageIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
        updateModalImage();
    });
    
    // Навигация с клавиатуры
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
                updateModalImage();
                break;
            case 'ArrowRight':
                currentImageIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
                updateModalImage();
                break;
        }
    });
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateModalImage();
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function updateModalImage() {
        const currentImage = images[currentImageIndex];
        modalImage.src = currentImage.src;
        modalImage.alt = currentImage.alt;
        modalCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
        
        // Обновляем кнопки навигации
        modalPrev.disabled = false;
        modalNext.disabled = false;
    }
}

/* ====================================
   ФУНКЦИИ ДЛЯ СТРАНИЦЫ КОНТАКТОВ
   ==================================== */

// Валидация форм с поддержкой Google Apps Script
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    // ID Google Apps Script
    const SCRIPT_ID = 'AKfycbwa_20aVJMD3Z3nKd803P5BoAiSvWoz6SKDw02X_udXnQ6EglIOIxW7eMhsF1D1aM4H';
    const GOOGLE_SCRIPT_URL = `https://script.google.com/macros/s/AKfycbwa_20aVJMD3Z3nKd803P5BoAiSvWoz6SKDw02X_udXnQ6EglIOIxW7eMhsF1D1aM4H/exec`;
    
    forms.forEach(form => {
        // Пропускаем форму подписки на новости (она обрабатывается отдельно)
        if (form.id === 'newsletterForm') {
            return;
        }
        
        console.log('Инициализация валидации формы:', form.id);
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            // Очищаем предыдущие ошибки
            form.querySelectorAll('.error-message').forEach(msg => msg.remove());
            form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            
            inputs.forEach(input => {
                const value = input.value.trim();
                
                // Валидация в зависимости от типа поля
                if (!value) {
                    showError(input, 'Это поле обязательно для заполнения');
                    isValid = false;
                } else if (input.type === 'email' && !isValidEmail(value)) {
                    showError(input, 'Введите корректный email адрес');
                    isValid = false;
                } else if (input.type === 'tel' && !isValidPhone(value)) {
                    showError(input, 'Введите корректный номер телефона');
                    isValid = false;
                } else if (input.name === 'name' && value.length < 2) {
                    showError(input, 'Имя должно содержать минимум 2 символа');
                    isValid = false;
                } else if (input.name === 'message' && value.length < 10) {
                    showError(input, 'Сообщение должно содержать минимум 10 символов');
                    isValid = false;
                }
            });
            
            // Проверяем чекбоксы
            const checkboxes = form.querySelectorAll('input[type="checkbox"][required]');
            checkboxes.forEach(checkbox => {
                if (!checkbox.checked) {
                    showError(checkbox.parentElement, 'Необходимо согласие на обработку данных');
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Проверяем, это контактная форма или другая
                if (form.id === 'contactForm') {
                    submitContactForm(form, GOOGLE_SCRIPT_URL);
                } else {
                    // Для других форм используем симуляцию
                    showLoadingState(form);
                    setTimeout(() => {
                        hideLoadingState(form);
                        showSuccessMessage(form);
                        form.reset();
                    }, 2000);
                }
            } else {
                // Прокручиваем к первой ошибке
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
        
        // Валидация в реальном времени
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
            
            input.addEventListener('input', () => {
                // Очищаем ошибку при вводе
                if (input.classList.contains('error')) {
                    clearError(input);
                }
            });
        });
    });
}

// Отправка контактной формы
function submitContactForm(form, scriptUrl) {
    showLoadingState(form);
    
    // Собираем данные формы
    const formData = {
        name: form.querySelector('#name').value.trim(),
        email: form.querySelector('#email').value.trim(),
        phone: form.querySelector('#phone').value.trim(),
        subject: form.querySelector('#subject').value,
        message: form.querySelector('#message').value.trim()
    };
    
    console.log('Отправляем контактную форму:', formData);
    
    // Отправляем данные в Google Apps Script
    fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        console.log('Контактная форма отправлена успешно');
        hideLoadingState(form);
        showSuccessMessage(form, 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
        form.reset();
    })
    .catch(error => {
        console.error('Ошибка отправки контактной формы:', error);
        hideLoadingState(form);
        showErrorMessage(form, 'Произошла ошибка при отправке сообщения. Попробуйте позже или свяжитесь с нами по телефону.');
    });
}

// Валидация отдельного поля
function validateField(input) {
    const value = input.value.trim();
    
    clearError(input);
    
    if (input.hasAttribute('required') && !value) {
        showError(input, 'Это поле обязательно для заполнения');
        return false;
    }
    
    if (input.type === 'email' && value && !isValidEmail(value)) {
        showError(input, 'Введите корректный email адрес');
        return false;
    }
    
    if (input.type === 'tel' && value && !isValidPhone(value)) {
        showError(input, 'Введите корректный номер телефона');
        return false;
    }
    
    return true;
}

// Показать ошибку
function showError(input, message) {
    input.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 5px;
        display: block;
    `;
    
    input.parentNode.insertBefore(errorElement, input.nextSibling);
}

// Очистить ошибку
function clearError(input) {
    input.classList.remove('error');
    const errorMsg = input.parentNode.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// Показать состояние загрузки
function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"], .form-button');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
            </div>
            Отправка...
        `;
    }
}

// Скрыть состояние загрузки
function hideLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"], .form-button');
    if (submitBtn) {
        submitBtn.disabled = false;
        if (form.id === 'contactForm') {
            submitBtn.innerHTML = `
                Отправить сообщение
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        } else if (form.id === 'newsletterForm') {
            submitBtn.innerHTML = `
                Подписаться
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        }
    }
}

// Показать сообщение об успехе с поддержкой кастомного сообщения
function showSuccessMessage(form, customMessage = null) {
    const message = customMessage || 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.';
    
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✓</span>
            <span>${message}</span>
        </div>
    `;
    
    successMessage.style.cssText = `
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        margin-top: 15px;
        text-align: center;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
    `;
    
    form.appendChild(successMessage);
    
    // Анимируем появление
    setTimeout(() => {
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            successMessage.remove();
        }, 300);
    }, 5000);
}

// Показать сообщение об ошибке
function showErrorMessage(form, message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message-form';
    errorMessage.innerHTML = `
        <div class="message-content">
            <span class="message-icon">⚠</span>
            <span>${message}</span>
        </div>
    `;
    
    errorMessage.style.cssText = `
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        margin-top: 15px;
        text-align: center;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
    `;
    
    form.appendChild(errorMessage);
    
    // Анимируем появление
    setTimeout(() => {
        errorMessage.style.opacity = '1';
        errorMessage.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        errorMessage.style.opacity = '0';
        errorMessage.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            errorMessage.remove();
        }, 300);
    }, 7000);
}

// Проверка валидности email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Проверка валидности телефона
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

/* ====================================
   ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
   ==================================== */

// Определение мобильного устройства
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
}

// Функция debounce для оптимизации
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Функция throttle для оптимизации
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Оптимизация изменения размера окна
const debouncedResize = debounce(() => {
    window.dispatchEvent(new Event('optimizedResize'));
}, 250);

window.addEventListener('resize', debouncedResize);

/* ====================================
   ДОПОЛНИТЕЛЬНЫЕ СТИЛИ ДЛЯ JS
   ==================================== */

// Добавление дополнительных CSS стилей
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    .message-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    
    .message-icon {
        font-size: 1.2rem;
    }
    
    .loading-spinner {
        display: inline-flex;
        align-items: center;
        gap: 8px;
    }
    
    .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .success-message {
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .error-message {
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 5px;
        display: block;
    }
`;

// Внедрение дополнительных стилей
if (!document.querySelector('#additional-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'additional-styles';
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
}

/* ====================================
   ИНИЦИАЛИЗАЦИЯ ЗАВЕРШЕНА
   ==================================== */

console.log('Файл script.js загружен и готов к работе');