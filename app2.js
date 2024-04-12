// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZR46Z_X40G5uuLcsS7GWECBWDH_82paM",
  authDomain: "test-7eca3.firebaseapp.com",
  projectId: "test-7eca3",
  storageBucket: "test-7eca3.appspot.com",
  messagingSenderId: "948471568180",
  appId: "1:948471568180:web:95ecf6dbc574d9235b3761"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Fetch all documents data from a collection
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const db = getFirestore();
const colRef = collection(db, "countries");

const docsSnap = await getDocs(colRef);

//Show the Items in a list format on the Browser
const ul = document.getElementById("countries");

docsSnap.forEach((doc) => {
  const li = document.createElement("li");
  li.innerText = doc.data().name;
  li.id = doc.id;
  ul.appendChild(li);
});

//Attach Click Event to the list item
const ulPressed = async (event) => {
  const id = event.target.closest("li").getAttribute("id");

//Get specific document dynamically On Click
  const docRef = doc(db, "countries", id);
  const docSnap = await getDoc(docRef);
  const courseData = docSnap.data(); // Lấy thông tin chi tiết về môn học
const courseId = docSnap.id; // Lấy ID của tài liệu môn học

// Chuyển hướng sang trang chi tiết môn học và truyền thông tin qua URL
window.location.href = `course-detail.html?id=${courseId}&code=${courseData.courseCode}`;
};

ul.addEventListener("click", ulPressed);
