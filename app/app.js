import * as MODEL from "./model.js";

function route() {
  let hashtagLink = window.location.hash;
  let pageID = hashtagLink.replace("#", "");

  if (pageID == "" || pageID == "home") {
    MODEL.currentPage("home");
  } else if (pageID == "login") {
    MODEL.currentPage("login", initLoginListeners),
      $("body, nav, footer").css("background-color", "var(--yellow)");
    $("body").css("background-image", "none");
  } else if (pageID == "createRecipe") {
    MODEL.currentPage("createRecipe", addRecipe);
  } else {
    MODEL.currentPage(pageID);
  }
}

function initListeners() {
  $(window).on("hashchange", route);
  route();
}

//sign up function
function signUp() {
  let fn = $("#fname").val();
  let ln = $("#lname").val();
  let email = $("#email").val();
  let password = $("#pw").val();

  MODEL.signup(fn, ln, email, password);

  $("#fname").val("");
  $("#lname").val("");
  $("#signup-email").val("");
  $("#signup-password").val("");

  $(".links").html(`
  <a href="#home">Home</a>
  <a href="#browse">Browse</a>
  <a href="#createRecipe">Create Recipe</a>
  <a href="#yourRecipes">Your Recipes</a>
  
  <a class="login" href="#login" id="logout"
    >Logout</a
  >`);
}

//log in function
function login() {
  let email = $("#email").val();
  let password = $("#pw").val();

  MODEL.login(email, password);

  $("#email").val("");
  $("#pw").val("");
  alert("Successful login");

  $(".links").html(`
  <a href="#home">Home</a>
  <a href="#browse">Browse</a>
  <a href="#createRecipe">Create Recipe</a>
  <a href="#yourRecipes">Your Recipes</a>
  <a class="login" href="#login" id="logout"
    >Logout</a
  >
  `);
}

//log out function
function logout() {
  // console.log("log out");

  localStorage.removeItem("currentUser");
  MODEL.logout();
  $(".links").html(`
  <a href="#home">Home</a>
  <a href="#browse">Browse</a>
  <a class="login" id="login" href="#login">Login</a>
  `);
}

function initLoginListeners() {
  $("#signup").on("click", () => {
    signUp();
  });
  $("#login").on("click", login);

  $("#logout").on("click", logout);
}

// add recipe
async function addRecipe(firstName) {
  $(".addIngred").on("click", (e) => {
    // console.log("click");

    alert("Successful log out");
  });

  let recipeObj = {
    image: "",
    name: "",
    desc: "",
    time: "",
    servings: "",
    instructions: [],
    ingredients: [],
  };

  $(".createRecipe").on("click", (e) => {
    e.preventDefault();
    alert("Hello");

    recipeObj.image = $("#rImage")[0].value;
    recipeObj.name = $("#rName")[0].value;
    recipeObj.desc = $("#rDesc")[0].value;
    recipeObj.time = $("#rTime")[0].value;
    recipeObj.servings = $("#rSize")[0].value;

    $(".cRecipe input").each((idx, instr) => {
      recipeObj.instructions.push(instr.value);
    });

    MODEL.addRecipe(recipeObj);
  });
}

//document ready
$(document).ready(function () {
  initListeners();
});
