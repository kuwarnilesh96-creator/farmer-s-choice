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
let quantity=document.getElementById("quantity").value
let image=document.getElementById("image").value

db.collection("crops").add({

crop:crop,
price:price,
quantity:quantity,
image:image

})

.then(()=>{

alert("Crop added successfully!")

})

}

const crops = [

{
name:"Tomato",
price:30,
quantity:50,
image:"https://images.unsplash.com/photo-1582284540020-8acbe03f4924"
},

{
name:"Potato",
price:20,
quantity:100,
image:"https://images.unsplash.com/photo-1518977676601-b53f82aba655"
},

{
name:"Onion",
price:25,
quantity:80,
image:"https://images.unsplash.com/photo-1615485290382-441e4d049cb5"
},

{
name:"Carrot",
price:40,
quantity:60,
image:"https://images.unsplash.com/photo-1447175008436-054170c2e979"
}

]

function loadCrops(){

const container = document.getElementById("products")

container.innerHTML = ""

db.collection("crops").get()
.then((snapshot)=>{

snapshot.forEach((doc)=>{

let data = doc.data()

container.innerHTML += `

<div class="product-card">

<img src="${data.image}" />

<h3>${data.name}</h3>

<p>₹${data.price} / kg</p>

<p>Available: ${data.quantity} kg</p>

<button onclick="buyCrop()">Buy</button>

</div>

`

})

})

.catch(error=>{
console.log(error)
})

}

window.onload = loadCrops

function buyCrop(){
alert("Order placed! Farmer will contact you.")
}

window.onload=loadCrops
  

