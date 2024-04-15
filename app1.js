// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKjleL2Cd37P8JgGY4HGFUKJgefbnCVBE",
  authDomain: "education-5db9e.firebaseapp.com",
  databaseURL:
    "https://education-5db9e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "education-5db9e",
  storageBucket: "education-5db9e.appspot.com",
  messagingSenderId: "315875647114",
  appId: "1:315875647114:web:4a6f90986b25ca7d9bd773",
  measurementId: "G-53QXG4C7GE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  getFirestore,
  collection,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const db = getFirestore()

//Lấy thông tin sinh viên từ ID SV
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

//Lấy thông tin môn học
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
 
  // Lấy thông tin môn học từ Firestore
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

//Gọi hàm khi trang dc tải xong
window.onload = loadCourseDetails;