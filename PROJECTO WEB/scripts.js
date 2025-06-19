// Funcionalidad del menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Slider de testimonios
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (testimonials.length > 0 && prevBtn && nextBtn) {
        let currentTestimonial = 0;
        
        // Función para mostrar un testimonio específico
        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            testimonials[index].classList.add('active');
        }
        
        // Evento para el botón anterior
        prevBtn.addEventListener('click', function() {
            currentTestimonial--;
            if (currentTestimonial < 0) {
                currentTestimonial = testimonials.length - 1;
            }
            showTestimonial(currentTestimonial);
        });
        
        // Evento para el botón siguiente
        nextBtn.addEventListener('click', function() {
            currentTestimonial++;
            if (currentTestimonial >= testimonials.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        });
        
        // Cambio automático de testimonios cada 5 segundos
        setInterval(function() {
            currentTestimonial++;
            if (currentTestimonial >= testimonials.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Funcionalidad de login en el panel de estudiante
    const loginForm = document.getElementById('login-form');
    const studentDashboard = document.getElementById('student-dashboard');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulación de autenticación (en un entorno real, esto se haría con una API)
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username && password) {
                // Ocultar formulario de login y mostrar dashboard
                document.querySelector('.login-section').classList.add('hidden');
                if (studentDashboard) {
                    studentDashboard.classList.remove('hidden');
                    
                    // Actualizar información del estudiante (simulado)
                    document.getElementById('student-name').textContent = 'Ana García';
                    document.getElementById('student-full-name').textContent = 'Ana García Rodríguez';
                    document.getElementById('student-grade').textContent = 'Grado: 3° Primaria';
                }
            } else {
                alert('Por favor, ingresa tu usuario y contraseña.');
            }
        });
    }

    // Funcionalidad de logout
    const logoutBtn = document.getElementById('logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Ocultar dashboard y mostrar formulario de login
            if (studentDashboard) {
                studentDashboard.classList.add('hidden');
            }
            document.querySelector('.login-section').classList.remove('hidden');
            
            // Limpiar campos del formulario
            if (document.getElementById('username')) {
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
            }
        });
    }

    // Navegación por pestañas en el dashboard
    const dashboardTabs = document.querySelectorAll('.dashboard-menu li');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (dashboardTabs.length > 0 && tabContents.length > 0) {
        dashboardTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remover clase active de todas las pestañas
                dashboardTabs.forEach(t => t.classList.remove('active'));
                
                // Agregar clase active a la pestaña actual
                this.classList.add('active');
                
                // Ocultar todos los contenidos
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Mostrar el contenido correspondiente
                const tabId = this.getAttribute('data-tab');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }

    // Funcionalidad para el selector de emociones
    const emotionBtns = document.querySelectorAll('.emotion-btn');
    
    if (emotionBtns.length > 0) {
        emotionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover selección previa
                emotionBtns.forEach(b => b.classList.remove('selected'));
                
                // Seleccionar la emoción actual
                this.classList.add('selected');
                
                // Aquí se podría guardar la emoción seleccionada (en un entorno real)
                const emotion = this.getAttribute('data-emotion');
                console.log('Emoción seleccionada:', emotion);
            });
        });
    }

    // Filtrado de recursos para padres
    const categoryFilter = document.getElementById('category-filter');
    const formatFilter = document.getElementById('format-filter');
    const ageFilter = document.getElementById('age-filter');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    function filterResources() {
        if (!categoryFilter || !formatFilter || !ageFilter || resourceCards.length === 0) return;
        
        const categoryValue = categoryFilter.value;
        const formatValue = formatFilter.value;
        const ageValue = ageFilter.value;
        
        resourceCards.forEach(card => {
            const categoryMatch = categoryValue === 'all' || card.getAttribute('data-category') === categoryValue;
            const formatMatch = formatValue === 'all' || card.getAttribute('data-format') === formatValue;
            const ageMatch = ageValue === 'all' || card.getAttribute('data-age') === ageValue;
            
            if (categoryMatch && formatMatch && ageMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    if (categoryFilter) categoryFilter.addEventListener('change', filterResources);
    if (formatFilter) formatFilter.addEventListener('change', filterResources);
    if (ageFilter) ageFilter.addEventListener('change', filterResources);

    // Búsqueda de recursos
    const searchBtn = document.getElementById('search-btn');
    const resourceSearch = document.getElementById('resource-search');
    
    if (searchBtn && resourceSearch) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = resourceSearch.value.toLowerCase();
            
            resourceCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        // Búsqueda al presionar Enter
        resourceSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
                e.preventDefault();
            }
        });
    }

    // Funcionalidad para el slider de recursos destacados
    const featuredSlides = document.querySelectorAll('.featured-slide');
    const featuredPrev = document.querySelector('.featured-prev');
    const featuredNext = document.querySelector('.featured-next');
    
    if (featuredSlides.length > 0 && featuredPrev && featuredNext) {
        let currentSlide = 0;
        
        function showSlide(index) {
            featuredSlides.forEach(slide => slide.classList.remove('active'));
            featuredSlides[index].classList.add('active');
        }
        
        featuredPrev.addEventListener('click', function() {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = featuredSlides.length - 1;
            }
            showSlide(currentSlide);
        });
        
        featuredNext.addEventListener('click', function() {
            currentSlide++;
            if (currentSlide >= featuredSlides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        });
        
        // Cambio automático cada 6 segundos
        setInterval(function() {
            currentSlide++;
            if (currentSlide >= featuredSlides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }, 6000);
    }

    // Funcionalidad para el formulario de solicitud de recursos
    const resourceRequestForm = document.getElementById('resource-request-form');
    
    if (resourceRequestForm) {
        resourceRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulación de envío (en un entorno real, esto se haría con una API)
            alert('¡Gracias por tu solicitud! La procesaremos lo antes posible.');
            this.reset();
        });
    }

    // Funcionalidad para el login de comunicación
    const commLoginForm = document.getElementById('comm-login-form');
    const communicationDashboard = document.getElementById('communication-dashboard');
    
    if (commLoginForm) {
        commLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulación de autenticación
            const username = document.getElementById('comm-username').value;
            const password = document.getElementById('comm-password').value;
            
            if (username && password) {
                // Ocultar formulario y mostrar dashboard
                document.querySelector('.login-section').classList.add('hidden');
                if (communicationDashboard) {
                    communicationDashboard.classList.remove('hidden');
                    
                    // Actualizar información del usuario (simulado)
                    document.getElementById('user-name').textContent = 'Laura Rodríguez';
                    document.getElementById('user-role').textContent = 'Madre de Familia';
                }
            } else {
                alert('Por favor, ingresa tu usuario y contraseña.');
            }
        });
    }

    // Funcionalidad de logout en comunicación
    const commLogoutBtn = document.getElementById('comm-logout-btn');
    
    if (commLogoutBtn) {
        commLogoutBtn.addEventListener('click', function() {
            // Ocultar dashboard y mostrar formulario
            if (communicationDashboard) {
                communicationDashboard.classList.add('hidden');
            }
            document.querySelector('.login-section').classList.remove('hidden');
            
            // Limpiar campos
            if (document.getElementById('comm-username')) {
                document.getElementById('comm-username').value = '';
                document.getElementById('comm-password').value = '';
            }
        });
    }

    // Navegación por pestañas en comunicación
    const commTabs = document.querySelectorAll('.communication-menu li');
    const commTabContents = document.querySelectorAll('.comm-tab-content');
    
    if (commTabs.length > 0 && commTabContents.length > 0) {
        commTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remover clase active de todas las pestañas
                commTabs.forEach(t => t.classList.remove('active'));
                
                // Agregar clase active a la pestaña actual
                this.classList.add('active');
                
                // Ocultar todos los contenidos
                commTabContents.forEach(content => content.classList.remove('active'));
                
                // Mostrar el contenido correspondiente
                const tabId = this.getAttribute('data-tab');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }

    // Funcionalidad para los contactos en mensajería
    const contacts = document.querySelectorAll('.contact');
    
    if (contacts.length > 0) {
        contacts.forEach(contact => {
            contact.addEventListener('click', function() {
                // Remover selección previa
                contacts.forEach(c => c.classList.remove('active'));
                
                // Seleccionar el contacto actual
                this.classList.add('active');
                
                // Aquí se cargarían los mensajes del contacto seleccionado (en un entorno real)
            });
        });
    }

    // Funcionalidad para enviar mensajes
    const sendBtn = document.querySelector('.send-btn');
    const chatInput = document.querySelector('.chat-input textarea');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (sendBtn && chatInput && chatMessages) {
        sendBtn.addEventListener('click', function() {
            const message = chatInput.value.trim();
            
            if (message) {
                // Crear elemento de mensaje
                const messageElement = document.createElement('div');
                messageElement.className = 'message-bubble sent';
                
                const messageContent = document.createElement('div');
                messageContent.className = 'message-content';
                messageContent.innerHTML = `<p>${message}</p>`;
                
                const messageTime = document.createElement('div');
                messageTime.className = 'message-time';
                
                // Obtener hora actual
                const now = new Date();
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                messageTime.textContent = `${hours}:${minutes}`;
                
                messageElement.appendChild(messageContent);
                messageElement.appendChild(messageTime);
                
                // Agregar mensaje al chat
                chatMessages.appendChild(messageElement);
                
                // Limpiar campo de entrada
                chatInput.value = '';
                
                // Scroll al final del chat
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        });
        
        // Enviar mensaje al presionar Enter
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                sendBtn.click();
                e.preventDefault();
            }
        });
    }

    // Funcionalidad para el calendario
    const calendarDates = document.getElementById('calendar-dates');
    const currentMonthElement = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    if (calendarDates && currentMonthElement) {
        // Fecha actual
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();
        
        // Eventos de ejemplo (en un entorno real, estos vendrían de una base de datos)
        const events = [
            { date: new Date(2025, 4, 19), title: 'Reunión de Padres' },
            { date: new Date(2025, 4, 22), title: 'Feria de Ciencias' },
            { date: new Date(2025, 4, 26), title: 'Día No Laborable' },
            { date: new Date(2025, 5, 5), title: 'Festival Cultural' }
        ];
        
        function renderCalendar() {
            // Actualizar título del mes
            const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
            
            // Limpiar calendario
            calendarDates.innerHTML = '';
            
            // Obtener el primer día del mes
            const firstDay = new Date(currentYear, currentMonth, 1);
            const startingDay = firstDay.getDay(); // 0 = Domingo, 1 = Lunes, etc.
            
            // Obtener el último día del mes
            const lastDay = new Date(currentYear, currentMonth + 1, 0);
            const totalDays = lastDay.getDate();
            
            // Agregar días vacíos al principio
            for (let i = 0; i < startingDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day empty';
                calendarDates.appendChild(emptyDay);
            }
            
            // Agregar días del mes
            for (let day = 1; day <= totalDays; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                
                // Verificar si hay eventos en este día
                const currentDateCheck = new Date(currentYear, currentMonth, day);
                const hasEvent = events.some(event => 
                    event.date.getDate() === currentDateCheck.getDate() && 
                    event.date.getMonth() === currentDateCheck.getMonth() && 
                    event.date.getFullYear() === currentDateCheck.getFullYear()
                );
                
                if (hasEvent) {
                    dayElement.classList.add('has-event');
                    
                    // Obtener eventos para este día
                    const dayEvents = events.filter(event => 
                        event.date.getDate() === currentDateCheck.getDate() && 
                        event.date.getMonth() === currentDateCheck.getMonth() && 
                        event.date.getFullYear() === currentDateCheck.getFullYear()
                    );
                    
                    // Agregar tooltip con eventos
                    const tooltip = document.createElement('div');
                    tooltip.className = 'day-tooltip';
                    
                    dayEvents.forEach(event => {
                        const eventItem = document.createElement('div');
                        eventItem.textContent = event.title;
                        tooltip.appendChild(eventItem);
                    });
                    
                    dayElement.appendChild(tooltip);
                }
                
                // Resaltar día actual
                if (day === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) {
                    dayElement.classList.add('current-day');
                }
                
                calendarDates.appendChild(dayElement);
            }
        }
        
        // Renderizar calendario inicial
        renderCalendar();
        
        // Eventos para cambiar de mes
        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', function() {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                renderCalendar();
            });
        }
        
        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', function() {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                renderCalendar();
            });
        }
    }

    // Filtrado de noticias
    const newsFilterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    const newsCards = document.querySelectorAll('.news-card');
    
    if (newsFilterBtns.length > 0 && newsCards.length > 0) {
        newsFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover clase active de todos los botones
                newsFilterBtns.forEach(b => b.classList.remove('active'));
                
                // Agregar clase active al botón actual
                this.classList.add('active');
                
                // Filtrar noticias
                const filter = this.getAttribute('data-filter');
                
                newsCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // NUEVA FUNCIONALIDAD: Búsqueda de noticias
    const searchNewsInput = document.querySelector('.search-news input');
    const searchNewsBtn = document.querySelector('.search-news button');
    
    if (searchNewsInput && searchNewsBtn && newsCards.length > 0) {
        // Función para buscar noticias
        function searchNews() {
            const searchTerm = searchNewsInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Si el campo está vacío, mostrar todas las noticias
                newsCards.forEach(card => {
                    card.style.display = 'block';
                });
                return;
            }
            
            // Filtrar noticias según el término de búsqueda
            newsCards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();
                const category = card.querySelector('.news-category').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        // Evento de clic en el botón de búsqueda
        searchNewsBtn.addEventListener('click', searchNews);
        
        // Evento de presionar Enter en el campo de búsqueda
        searchNewsInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchNews();
                e.preventDefault();
            }
        });
    }

    // NUEVA FUNCIONALIDAD: Paginación de noticias
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const itemsPerPage = 6; // Número de noticias por página
    
    if (paginationBtns.length > 0 && newsCards.length > 0) {
        // Función para mostrar una página específica
        function showPage(pageNumber) {
            // Calcular índices de inicio y fin para los elementos a mostrar
            const startIndex = (pageNumber - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            
            // Ocultar todas las noticias primero
            newsCards.forEach((card, index) => {
                if (index >= startIndex && index < endIndex) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Actualizar estado activo de los botones de paginación
            paginationBtns.forEach(btn => {
                if (btn.textContent === pageNumber.toString() || 
                    (btn.classList.contains('next') && pageNumber === paginationBtns.length)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
        
        // Configurar eventos para los botones de paginación
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('next')) {
                    // Si es el botón "siguiente", ir a la siguiente página
                    const currentPage = Array.from(paginationBtns).findIndex(btn => btn.classList.contains('active')) + 1;
                    if (currentPage < paginationBtns.length - 1) { // -1 porque el último botón es "siguiente"
                        showPage(currentPage + 1);
                    }
                } else {
                    // Si es un botón numérico, ir a esa página
                    showPage(parseInt(this.textContent));
                }
            });
        });
        
        // Mostrar la primera página al cargar
        showPage(1);
    }

    // Filtrado de blog
    const blogFilterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (blogFilterBtns.length > 0 && blogCards.length > 0) {
        blogFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover clase active de todos los botones
                blogFilterBtns.forEach(b => b.classList.remove('active'));
                
                // Agregar clase active al botón actual
                this.classList.add('active');
                
                // Filtrar posts
                const filter = this.getAttribute('data-filter');
                
                blogCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Funcionalidad para las FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                // Toggle clase active
                this.classList.toggle('active');
                
                // Toggle visibilidad de la respuesta
                const answer = this.nextElementSibling;
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                    this.querySelector('.faq-toggle').textContent = '+';
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    this.querySelector('.faq-toggle').textContent = '-';
                }
            });
        });
    }

    // Funcionalidad para el formulario de contacto
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulación de envío (en un entorno real, esto se haría con una API)
            alert('¡Gracias por tu mensaje! Te responderemos lo antes posible.');
            this.reset();
        });
    }

    // Funcionalidad para el formulario de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulación de suscripción
            alert('¡Gracias por suscribirte a nuestro boletín!');
            this.reset();
        });
    }

    // Inicialización de gráficos (simulado)
    const gradesChart = document.getElementById('gradesChart');
    
    if (gradesChart) {
        // Aquí se inicializaría un gráfico real con una biblioteca como Chart.js
        console.log('Gráfico de calificaciones inicializado');
    }

    // Generación de calendarios emocionales y de asistencia (simulado)
    const emotionalCalendar = document.getElementById('emotional-calendar');
    const attendanceCalendar = document.getElementById('attendance-calendar');
    
    if (emotionalCalendar) {
        // Aquí se generaría un calendario emocional real
        console.log('Calendario emocional inicializado');
    }
    
    if (attendanceCalendar) {
        // Aquí se generaría un calendario de asistencia real
        console.log('Calendario de asistencia inicializado');
    }
});