const firebaseConfig = {
apiKey: "YOUR_KEY",
authDomain: "YOUR_DOMAIN",
projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

function register(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value
let role=document.getElementById("role").value

auth.createUserWithEmailAndPassword(email,password)
.then((user)=>{

db.collection("users").doc(user.user.uid).set({
email:email,
role:role
})

alert("Registration Successful")

})

.catch(error=>{
alert(error.message)
})

}

function login(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value

auth.signInWithEmailAndPassword(email,password)

.then(()=>{
alert("Login successful")
})

.catch(error=>{
alert(error.message)
})

}

function addCrop(){

let crop=document.getElementById("crop").value
let price=document.getElementById("price").value

db.collection("crops").add({
crop:crop,
price:price
})

alert("Crop Added")

  function loadCrops(){

db.collection("crops").get()
.then((snapshot)=>{

let productContainer=document.getElementById("products")

productContainer.innerHTML=""

snapshot.forEach((doc)=>{

let data=doc.data()

productContainer.innerHTML+=`

<div class="product-card">

<img src="${data.image}" width="200">

<h3>${data.crop}</h3>

<p>Price: ₹${data.price} / kg</p>

<p>Quantity: ${data.quantity} kg</p>

<button onclick="buyCrop()">Buy</button>

</div>

`

})

})

}

window.onload=loadCrops

}
