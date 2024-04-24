// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "education-5db9e.firebaseapp.com",
  databaseURL:
    "https://education-5db9e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "education-5db9e",
  storageBucket: "education-5db9e.appspot.com",
  messagingSenderId: "315875647114",
  appId: "1:315875647114:web:4a6f90986b25ca7d9bd773",
  measurementId: "G-53QXG4C7GE",
};

//Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

//Truy xuất dữ liệu của các tài liệu tự bộ collection
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const db = getFirestore();

// Hàm hiển thị tên các môn học lên màn hình
async function displayCourses() {
  const colRef = collection(db, "courses");
  const docsSnap = await getDocs(colRef);

  //Hiển thị các mục môn học trên trình duyệt
  const ul = document.getElementById("courses");

  docsSnap.forEach((doc) => {
    const li = document.createElement("li");
    li.innerText = doc.data().courseName;
    li.id = doc.id;
    li.classList.add("hover-pointer");
    ul.appendChild(li);
  });

  //Onclick cho các mục
  const ulPressed = async (event) => {
    const id = event.target.closest("li").getAttribute("id");

    //Lấy tài liệu cụ thể khi onclick
    const docRef = doc(db, "courses", id);
    const docSnap = await getDoc(docRef);

    const courseId = docSnap.id; // Lấy ID của tài liệu môn học
    window.location.href = `course-detail.html?id=${courseId}`;
  };

  ul.addEventListener("click", ulPressed);
}

// Hàm lấy thông tin SV từ ID SV
async function getStudentInfo(studentId) {
  const userRef = doc(db, "users", studentId);
  const userSnapshot = await getDoc(userRef);

  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    return userData;
  } else {
    return null;
  }
}

// Hàm load thông tin chi tiết môn học
async function loadCourseDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("id");

  if (!courseId) {
    alert("Không tìm thấy thông tin môn học.");
    return;
  }

  const docRef = doc(db, "courses", courseId);
  const docSnapshot = await getDoc(docRef);

  if (!docSnapshot.exists()) {
    alert("Không tìm thấy thông tin môn học.");
    return;
  }

  const courseData = docSnapshot.data();
  const courseInfoContainer = document.getElementById("courseInfo");

  // Hiển thị thông tin môn học
  courseInfoContainer.innerHTML = `
        <h2>${courseData.courseCode}</h2>
        <p><strong>Course Name:</strong> ${courseData.courseName}</p>
        <p><strong>Credit:</strong> ${courseData.credit}</p>
        <p><strong>Schedule:</strong> ${courseData.schedule}</p>
        <p><strong>Teacher:</strong> ${courseData.teacher}</p>
        <p><strong>Registered Students:</strong></p>
        <ul id="studentList"></ul>
    `;

  const studentListContainer = document.getElementById("studentList");

  // Duyệt danh sách các sinh viên
  for (const studentId of courseData.studentRegister) {
    const studentData = await getStudentInfo(studentId);
    if (studentData) {
      const li = document.createElement("li");
      li.innerHTML = `      
                <span>${studentData.name}</span>
                <img src="${studentData.image}" alt="${studentData.name}" style="width: 40px; height: 40px;">
            `;
      studentListContainer.appendChild(li);
    }
  }
}

//Điều hướng trang web phù hợp
window.onload = () => {
  const currentLocation = window.location.pathname;
  if (currentLocation.includes("index.html")) {
    displayCourses();
  } else if (currentLocation.includes("course-detail.html")) {
    loadCourseDetails();
  }
};


