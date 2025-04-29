// Toggle navigation menu on mobile
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links > li:not(.dropdown)');
    const dropdowns = document.querySelectorAll('.dropdown');
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // 네비게이션이 닫힐 때 모든 드롭다운도 닫기
            if (!nav.classList.contains('nav-active')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
    
    // 모바일에서 드롭다운 메뉴 토글
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('a');
        
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                // 다른 드롭다운 닫기
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // 드롭다운 내부 링크 클릭 시 메뉴 닫기
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }, 300);
            }
        });
    });
    
    // 화면 크기 변경 시 모바일 메뉴 상태 초기화
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // 모바일 메뉴 상태 초기화
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // 애니메이션 초기화
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });
};

// Handle smooth scrolling for navigation links
const smoothScroll = () => {
    const navLinks = document.querySelectorAll('nav a, .hero a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only process hash links (internal page links)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    const nav = document.querySelector('.nav-links');
                    if (nav.classList.contains('nav-active')) {
                        document.querySelector('.burger').click();
                    }
                    
                    // Scroll to the target element
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
};

// Highlight active section in navigation
const highlightNav = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
};

// Form submission handler
const formHandler = () => {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        // Add a success message callback after form submission
        window.addEventListener('DOMContentLoaded', function() {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('success') === 'true') {
                alert('Thank you for your message! I will get back to you soon.');
            }
        });
        
        // We don't need to handle form submission manually anymore as FormSubmit will handle it
        // But we can add some form validation or UI enhancement if needed
        form.addEventListener('submit', (e) => {
            // Let the form submit naturally to FormSubmit service
            // Just log the submission for debugging
            console.log('Form submitted to FormSubmit service');
            
            // We can add additional client-side validation here if needed
            // But we let the form submit naturally
        });
    }
};

// 비디오 요소 디버깅
const debugVideo = () => {
    const video = document.querySelector('.video-container video');
    if (video) {
        // 비디오 로드 이벤트
        video.addEventListener('loadeddata', () => {
            console.log('비디오가 로드되었습니다.');
        });
        
        // 비디오 오류 이벤트
        video.addEventListener('error', (e) => {
            console.error('비디오 로드 오류:', e);
        });
        
        // 비디오 재생 상태 확인
        setTimeout(() => {
            if (video.paused) {
                console.log('비디오가 일시 중지 상태입니다.');
                video.play().catch(e => console.error('비디오 재생 시도 오류:', e));
            } else {
                console.log('비디오가 재생 중입니다.');
            }
        }, 1000);
    } else {
        console.error('비디오 요소를 찾을 수 없습니다.');
    }
};

// Initialize floating dog images
const initDogImages = () => {
    console.log("Dog initialization function called");
    
    // Get dog elements
    const dogImage1 = document.getElementById('dog-image-1');
    const dogImage2 = document.getElementById('dog-image-2');
    const dogImage3 = document.getElementById('dog-image-3');
    
    if (!dogImage1 || !dogImage2 || !dogImage3) {
        console.error("Dog elements not found!");
        return;
    }
    
    console.log("Found dog elements:", dogImage1, dogImage2, dogImage3);
    
    // Set background images directly
    dogImage1.style.backgroundImage = "url('img/dog1.JPG')";
    // 강아지 얼굴이 더 잘 보이도록 배경 이미지 위치 조정
    dogImage1.style.backgroundPosition = "center 15%";
    dogImage2.style.backgroundImage = "url('img/dog2.JPG')";
    dogImage3.style.backgroundImage = "url('img/dog3.JPG')";
    
    // Simple floating animation with CSS only
    // Remove JS based animation to avoid conflicts
    dogImage1.style.animationDelay = "0s";
    dogImage2.style.animationDelay = "-4s";
    dogImage3.style.animationDelay = "-8s";
    
    // Add more visible cursor style
    [dogImage1, dogImage2, dogImage3].forEach(dog => {
        dog.style.cursor = "pointer";
    });
    
    // 부모 요소를 찾는 함수
    const findParentContainer = (element) => {
        // 이미지의 부모 요소인 .about-image 찾기
        return element.parentElement;
    };
    
    // Create click handler that shows message
    const handleDogClick = function() {
        // Prevent multiple clicks
        if (this.dataset.animating === "true") return;
        this.dataset.animating = "true";
        
        console.log("Dog clicked!");
        
        // 중요: 강아지는 계속 떠다니도록 animation 클래스를 추가하지 않음
        // this.classList.add("dog-reaction"); // 제거
        
        // Create speech bubble
        const bubble = document.createElement("div");
        bubble.className = "speech-bubble";
        
        // Random message
        const messages = [
            "안녕!",
            "반가워!",
            "화이팅!",
            "나는 지몽이야!"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        bubble.textContent = randomMessage;
        
        console.log("Created bubble with message:", randomMessage);
        
        // 말풍선을 이미지가 아닌 부모 컨테이너에 추가
        const container = findParentContainer(this);
        
        // 도그 이미지 기준 위치 계산
        const dogRect = this.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // 컨테이너 내 상대적 위치로 변환
        const relativeTop = dogRect.top - containerRect.top;
        const relativeLeft = dogRect.left - containerRect.left;
        // 말풍선을 좌측 상단에 표시합니다 - 타원형에 맞게 위치 조정
        const leftPos = relativeLeft - 35; // 왼쪽에서 35px 떨어진 위치 (30% 더 가까이)
        const topPos = relativeTop - 42; // 위에서 42px 떨어진 위치 (30% 더 가까이)
        
        // 말풍선에 스타일 적용
        bubble.style.position = "absolute";
        bubble.style.top = `${topPos}px`; 
        bubble.style.left = `${leftPos}px`; 
        bubble.style.transform = "none"; // 중앙 정렬 제거
        
        // "화이팅!" 메시지일 경우 가로 길이 확장
        if (randomMessage === "화이팅!") {
            bubble.style.minWidth = "90px"; // 최소 너비 증가
        }
        
        // 컨테이너에 말풍선 추가
        container.appendChild(bubble);
        
        // Reset after animation
        setTimeout(() => {
            if (bubble.parentNode === container) {
                container.removeChild(bubble);
            }
            // 중요: 강아지 애니메이션 클래스를 제거하지 않음
            // this.classList.remove("dog-reaction"); // 제거
            this.dataset.animating = "false";
            console.log("Animation completed");
        }, 2000);
    };
    
    // Add event listeners to dogs
    dogImage1.addEventListener("click", handleDogClick);
    dogImage2.addEventListener("click", handleDogClick);
    dogImage3.addEventListener("click", handleDogClick);
    
    // Add hover effects
    [dogImage1, dogImage2, dogImage3].forEach(dog => {
        dog.addEventListener("mouseenter", function() {
            this.classList.add("dog-hover");
        });
        
        dog.addEventListener("mouseleave", function() {
            this.classList.remove("dog-hover");
        });
    });
    
    console.log("Dog interactions initialized successfully");
};

// 배경 비디오 로테이션 설정
const setupBackgroundVideo = () => {
    const backgroundVideo = document.getElementById('background-video');
    const overlay = document.querySelector('.overlay');
    
    if (!backgroundVideo || !overlay) return;
    
    // 사용 가능한 비디오 목록
    const videoFiles = [
        './img/background.mp4',
        './img/background2.mp4',
        './img/background3.mp4'
    ];
    
    // 쿠키나 로컬 스토리지에서 마지막으로 보여진 비디오 인덱스를 가져옴
    let lastIndex = localStorage.getItem('lastVideoIndex');
    lastIndex = lastIndex ? parseInt(lastIndex) : -1;
    
    // 랜덤하게 비디오 선택 (직전에 보여진 것 제외)
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * videoFiles.length);
    } while (randomIndex === lastIndex && videoFiles.length > 1);
    
    // 선택된 비디오 인덱스 저장
    localStorage.setItem('lastVideoIndex', randomIndex);
    
    // 소스 엘리먼트 생성 및 비디오에 추가
    const source = document.createElement('source');
    source.src = videoFiles[randomIndex];
    source.type = 'video/mp4';
    
    // background3.mp4가 선택되었을 때 불투명도 조정
    if (randomIndex === 2) { // background3.mp4는 배열의 인덱스 2
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.45)'; // 불투명도를 0.6에서 0.45로 줄여 덜 어둡게 설정
        console.log('background3.mp4가 선택되어 불투명도를 조정했습니다.');
    } else {
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'; // 기본 불투명도
    }
    
    // 기존 소스 제거 및 새 소스 추가
    while (backgroundVideo.firstChild) {
        backgroundVideo.removeChild(backgroundVideo.firstChild);
    }
    backgroundVideo.appendChild(source);
    
    // 비디오 로드 및 재생
    backgroundVideo.load();
    
    console.log(`로드된 배경 비디오: ${videoFiles[randomIndex]}`);
    
    // 비디오 로드 후 이벤트
    backgroundVideo.addEventListener('loadeddata', () => {
        console.log('비디오가 로드되었습니다.');
        backgroundVideo.play().catch(e => {
            console.error('비디오 재생 오류:', e);
        });
    });
    
    // 비디오 오류 처리
    backgroundVideo.addEventListener('error', (e) => {
        console.error('비디오 로드 오류:', e);
        
        // 오류 발생 시 다른 비디오 시도
        if (videoFiles.length > 1) {
            const nextIndex = (randomIndex + 1) % videoFiles.length;
            const backupSource = document.createElement('source');
            backupSource.src = videoFiles[nextIndex];
            backupSource.type = 'video/mp4';
            
            // background3.mp4가 백업으로 선택되었을 때 불투명도 조정
            if (nextIndex === 2) { // background3.mp4는 배열의 인덱스 2
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.45)'; // 불투명도를 0.6에서 0.45로 줄여 덜 어둡게 설정
                console.log('백업으로 background3.mp4가 선택되어 불투명도를 조정했습니다.');
            } else {
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'; // 기본 불투명도
            }
            
            while (backgroundVideo.firstChild) {
                backgroundVideo.removeChild(backgroundVideo.firstChild);
            }
            backgroundVideo.appendChild(backupSource);
            backgroundVideo.load();
            console.log(`백업 비디오 로드: ${videoFiles[nextIndex]}`);
        }
    });
};

// 스크롤 시 헤더 배경색 변경
const headerScroll = () => {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            // 스크롤 위치가 100px 이상이면 클래스 추가
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
};

// 프로필 이미지 위치 미세 조정 함수
const adjustProfileImage = () => {
    const profileImage = document.getElementById('profile-image');
    
    if (profileImage) {
        // 개발 중에 콘솔에서 이미지 위치를 테스트하기 위한 함수
        window.adjustProfilePosition = (posY) => {
            profileImage.style.backgroundPosition = `center ${posY}%`;
            console.log(`이미지 위치 조정: center ${posY}%`);
            return `현재 위치: center ${posY}%`;
        };
        
        // 기본 위치 설정 (필요에 따라 조정)
        // 콘솔에서 window.adjustProfilePosition(30)과 같이 호출하여 위치 조정 가능
        // profileImage.style.backgroundPosition = 'center 25%';
    }
};

// 프로필 이미지 페이드인 및 애플 스타일 시차 효과
const appleStyleProfileAnimation = () => {
    const profileImage = document.getElementById('profile-image');
    const aboutSection = document.getElementById('about');
    
    if (!profileImage || !aboutSection) return;
    
    // 페이지 로드 시 이미지를 사전 로드
    const preloadImage = new Image();
    preloadImage.src = profileImage.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
    
    // 초기 상태 설정 (페이드인 효과를 위해)
    profileImage.classList.add('apple-parallax');
    
    // 스크롤 중 파라락스 효과 적용
    window.addEventListener('scroll', () => {
        const aboutRect = aboutSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // 이미지가 뷰포트에 들어왔는지 확인
        if (aboutRect.top < windowHeight * 0.8) {
            profileImage.classList.add('fade-in');
            
            // 시차 효과를 위한 스크롤 위치 계산
            const scrollPercentage = (windowHeight * 0.8 - aboutRect.top) / (windowHeight * 0.8);
            const translateY = Math.min(scrollPercentage * 20, 20); // 최대 20px까지 이동
            const scale = 1 + Math.min(scrollPercentage * 0.05, 0.05); // 최대 5%까지 확대
            
            // 애플 스타일 시차 변환 적용
            profileImage.style.transform = `translateY(${translateY}px) scale(${scale})`;
        } else {
            profileImage.classList.remove('fade-in');
            profileImage.style.transform = 'translateY(30px)';
        }
    });
    
    // 페이지 로드 시 스크롤 이벤트 한 번 실행하여 초기 위치 적용
    window.dispatchEvent(new Event('scroll'));
};

// Initialize all functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    smoothScroll();
    highlightNav();
    formHandler();
    setupBackgroundVideo();
    headerScroll();
    adjustProfileImage();
    initSliders();
    appleStyleProfileAnimation();
    
    // Initialize dog images with a short delay to ensure DOM is fully loaded
    setTimeout(() => {
        console.log("Initializing dog images...");
        initDogImages();
    }, 500);
    
    // Add animation for elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all section titles and other elements you want to animate
    document.querySelectorAll('.section-title, .about-content, .education-item, .project-card')
        .forEach(el => observer.observe(el));
});

// PDF 미리보기 토글 함수
function togglePreview(previewId) {
    const previewElement = document.getElementById(previewId);
    if (previewElement.style.display === "block") {
        previewElement.style.display = "none";
    } else {
        previewElement.style.display = "block";
    }
}

// 이미지 슬라이더 초기화 함수
function initSliders() {
    const sliders = document.querySelectorAll('.project-slider');
    
    sliders.forEach(slider => {
        const container = slider.querySelector('.slider-container');
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        
        // 슬라이드 이동 함수
        function moveToSlide(index) {
            if (index < 0) {
                index = totalSlides - 1;
            } else if (index >= totalSlides) {
                index = 0;
            }
            
            currentIndex = index;
            const offset = -index * 100;
            container.style.transform = `translateX(${offset}%)`;
        }
        
        // 이벤트 리스너 등록
        prevBtn.addEventListener('click', () => {
            moveToSlide(currentIndex - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            moveToSlide(currentIndex + 1);
        });
        
        // 3초마다 자동 슬라이드
        setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, 3000);
        
        // 첫 번째 슬라이드로 초기화
        moveToSlide(0);
    });
} 