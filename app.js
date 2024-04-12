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

//Truy xuất dữ liệu của các tài liệu tự bộ collection
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const db = getFirestore();
const colRef = collection(db, "courses");

const docsSnap = await getDocs(colRef);

//Hiển thị các mục trên trình duyệt
const ul = document.getElementById("courses");

docsSnap.forEach((doc) => {
  const li = document.createElement("li");
  li.innerText = doc.data().courseCode;
  li.id = doc.id;
  li.classList.add('hover-pointer');
  ul.appendChild(li);
});

//Onclick cho các mục
const ulPressed = async (event) => {
  const id = event.target.closest("li").getAttribute("id");

  //Lấy tài liệu cụ thể khi onclick
  const docRef = doc(db, "courses", id);
  const docSnap = await getDoc(docRef);
  const courseData = docSnap.data(); 
  const courseId = docSnap.id; // Lấy ID của tài liệu môn học

   // Chuyển hướng sang trang chi tiết môn học và truyền thông tin qua URL
   window.location.href = `course-detail.html?id=${courseId}`;  
};

ul.addEventListener("click", ulPressed);
