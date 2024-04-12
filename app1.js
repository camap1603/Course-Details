// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKjleL2Cd37P8JgGY4HGFUKJgefbnCVBE",
  authDomain: "education-5db9e.firebaseapp.com",
  databaseURL: "https://education-5db9e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "education-5db9e",
  storageBucket: "education-5db9e.appspot.com",
  messagingSenderId: "315875647114",
  appId: "1:315875647114:web:4a6f90986b25ca7d9bd773",
  measurementId: "G-53QXG4C7GE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
    getFirestore,
    collection,
    doc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const db = getFirestore();

async function loadCourseDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    if (!courseId) {
        alert('Không tìm thấy thông tin môn học.');
        return;
    }

    const docRef = doc(db, 'courses', courseId);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
        alert('Không tìm thấy thông tin môn học.');
        return;
    }

    const courseData = docSnapshot.data();
    const courseInfoContainer = document.getElementById('courseInfo');

    courseInfoContainer.innerHTML = `
        <h2>${courseData.courseCode}</h2>
        <p><strong>Course Name:</strong> ${courseData.courseName}</p>
        <p><strong>Credit:</strong> ${courseData.credit}</p>
        <p><strong>Schedule:</strong> ${courseData.schedule}</p>
        <p><strong>Teacher:</strong> ${courseData.teacher}</p>
        <p><strong>Registered Students:</strong></p>
        <ul>
            ${courseData.studentRegister.map(studentId => `<li>${studentId}</li>`).join('')}
        </ul>
    `;
}

// Gọi hàm loadCourseDetails khi trang được tải
window.onload = loadCourseDetails;