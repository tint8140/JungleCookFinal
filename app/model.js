export function currentPage(pageID, callback) {
  if (pageID == "" || pageID == "home") {
    $.get(`pages/home.html`, function (data) {
      $("#app").html(data);
    });
  } else if (pageID == "login") {
    $.get(`pages/login.html`, function (data) {
      $("#app").html(data);
      callback();
    });
  } else if (pageID == "createRecipe") {
    $.get(`pages/${pageID}.html`, function (data) {
      $("#app").html(data);
    });
  } else if (pageID == "yourRecipes") {
    $.get(`pages/${pageID}.html`, function (data) {
      $("#app").html(data);
    });
  } else
    $.get(`pages/${pageID}.html`, function (data) {
      $("#app").html(data);
      callback();
    });
}

export async function signup(fname, lname, email, pw) {
  var user = {
    firstName: fname,
    lastName: lname,
    email: email,
    password: pw,
    status: true,
  };

  window.location.hash = "#createRecipe";
}

//log in page
export async function login(username, pw) {
  if (currentUser.username == username) {
    if (currentUser.password == pw) {
      currentUser.status = true;
      // console.log("Logged in");
    } else {
      // console.log("Wrong password!");
    }
  } else {
    // console.log("Wrong username!");
  }
  window.location.hash = "#createRecipe";
}

export function logout() {
  if (localStorage) {
    localStorage.removeItem("currentUser");
  }
}

// export function viewRecipe() {}
// export function editRecipe() {}
// export function updateRecipe() {}
// export function deleteRecipe() {}
