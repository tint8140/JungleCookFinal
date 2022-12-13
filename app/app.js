function route() {
  let hashTag = window.location.hash;
  // console.log("hash tag " + hashTag);
  let pageID = hashTag.replace("#/", "");

  if (pageID == "") {
    // navToPage("home");
    MODEL.getMyVariable("home");
  } else {
    // navToPage(pageID);
    MODEL.getMyVariable(pageID);
  }
  //use model
  MODEL.getMyVariable(pageID);
}
// end of mvc

function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("connected");
      // this is pname
      $(".login--hidden").css("display", "block");
    } else {
      console.log("user is not there");
      $(".login--hidden").css("display", "none");
    }
  });
}

function createUser() {
  let password = "password"; //$("password").val();
  let email = "vcejaeli@iu.edu";
  let fName = "Vlad";
  let lName = "Ceja";

  //from firebase
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}

function login() {
  let password = "password";
  let email = "vcejaeli@iu.edu";
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("signed in");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

function initListeners() {
  //MVC
  $(window).on("hashchange", route);
  route();

  //login page login button
  $("login").click(function (e) {
    e.preventDefault();
    let btnID = e.currentTarget.id;
    // console.log("I am clicked");
    if (btnID == "create") {
      createUser();
    } else if (btnID == "login") {
      login();
    } else if (btnID == "signout") {
      signOut();
    }
  });
}

$(document).ready(function () {
  try {
    let app = firebase.app();
    initFirebase();
    initListeners();
  } catch {
    console.error(e);
  }
});
