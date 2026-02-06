const myName = "Natchanon Plongkoed";

const typingSpeed = 300;
const deletingSpeed = 100;
const pauseTime = 3000;

const typeTarget = document.getElementById("typing-text");
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = myName.substring(0, charIndex);
    typeTarget.textContent = currentText;

    let typeSpeed = typingSpeed;

    if (isDeleting) {
        charIndex--;
        typeSpeed = deletingSpeed;
    } else {
        charIndex++;
    }

    if (!isDeleting && charIndex === myName.length + 1) {
        typeSpeed = pauseTime;
        isDeleting = true;
        charIndex--;
    }
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

window.addEventListener('load', typeEffect);

const themeBtn = document.getElementById('theme-toggle');
const themeIcon = themeBtn.querySelector('i');
const body = document.body;

const savedTheme = localStorage.getItem('selected-theme');
const savedIcon = localStorage.getItem('selected-icon');

if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedIcon) {
        themeIcon.classList.remove('fa-moon', 'fa-sun');
        themeIcon.classList.add(savedIcon);
    }
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        
        localStorage.setItem('selected-theme', 'dark-mode');
        localStorage.setItem('selected-icon', 'fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');

        localStorage.removeItem('selected-theme');
        localStorage.removeItem('selected-icon');
    }
});
const projectsData = {
    1: {
        title: "Smart Agri AI",
        img: "project1.jpg", // ใส่ชื่อไฟล์รูปโปรเจกต์จริงของคุณ (ถ้าไม่มีให้เว้นว่างไว้)
        desc: "ระบบวิเคราะห์และทำนายผลผลิตทางการเกษตร โดยใช้เทคโนโลยี AI/Machine Learning เข้ามาช่วยประมวลผล Big Data จากเซ็นเซอร์ความชื้นและสภาพอากาศ เพื่อช่วยให้เกษตรกรวางแผนการเก็บเกี่ยวได้อย่างแม่นยำ ลดความเสียหายจากภัยแล้งได้กว่า 30%",
        tech: ["Python", "TensorFlow", "Pandas", "AWS Cloud"],
        link: "https://github.com/yourusername/project1"
    },
    2: {
        title: "IoT Movement Detector",
        img: "project2.jpg",
        desc: "อุปกรณ์ตรวจจับการเคลื่อนไหวอัจฉริยะ สร้างด้วย ESP32 และเขียนโปรแกรมด้วย C++ เชื่อมต่อกับแอปพลิเคชัน Blynk เพื่อแจ้งเตือนเข้ามือถือแบบ Real-time ทันทีที่มีผู้บุกรุก เหมาะสำหรับระบบรักษาความปลอดภัยในบ้าน",
        tech: ["C++", "Arduino IDE", "ESP32", "Blynk IoT"],
        link: "https://github.com/yourusername/project2"
    },
    3: {
        title: "Enterprise Network Design",
        img: "project3.jpg",
        desc: "ออกแบบจำลองระบบเครือข่ายสำหรับองค์กรขนาดใหญ่ โดยมีการแบ่ง VLANs เพื่อความปลอดภัย, ตั้งค่า OSPF Routing เพื่อการเชื่อมต่อที่เสถียร, และกำหนด Access Control List (ACL) เพื่อกรอง Traffic ที่ไม่ได้รับอนุญาต",
        tech: ["Cisco Packet Tracer", "Network Security", "OSPF", "VLANs"],
        link: "#"
    }
};

const modal = document.getElementById("project-modal");
const closeBtn = document.querySelector(".close-btn");

// ฟังก์ชันเปิด Modal
function openModal(id) {
    const project = projectsData[id];
    if (!project) return;

    // ใส่ข้อมูลลงใน Modal
    document.getElementById("modal-title").innerText = project.title;
    document.getElementById("modal-desc").innerText = project.desc;
    document.getElementById("modal-img").src = project.img || "https://via.placeholder.com/600x400?text=No+Image"; // รูปสำรองถ้าไม่มี
    document.getElementById("modal-github").href = project.link;

    // สร้าง Tech Stack Tags
    const techContainer = document.getElementById("modal-tech-stack");
    techContainer.innerHTML = ""; // เคลียร์ของเก่า
    project.tech.forEach(t => {
        const span = document.createElement("span");
        span.innerText = t;
        techContainer.appendChild(span);
    });

    // แสดง Modal
    modal.classList.add("show");
}

// ฟังก์ชันปิด Modal
closeBtn.onclick = function() {
    modal.classList.remove("show");
}

// กดพื้นที่ข้างนอกเพื่อปิด
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove("show");
    }
}