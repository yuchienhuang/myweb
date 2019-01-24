function newListItem(name,content) {
  const item = document.createElement('li');
  item.className = name;  
  item.appendChild(content);
  return item
}

function newNavbarItem(text, url) {
  const itemLink = document.createElement('a');
  itemLink.className = 'nav-item nav-link';
  itemLink.innerHTML = text;
  itemLink.href = url;

  return itemLink
}

function renderNavbar(user) {
  const navbarDiv = document.getElementById('nav-item-container');

  navbarDiv.appendChild(newNavbarItem('Home', '/'));

  if (user._id !== undefined) {
    navbarDiv.appendChild(newNavbarItem('Profile', '/u/profile?'+user._id));
    navbarDiv.appendChild(newNavbarItem('Logout', '/logout'));
  } else {
    navbarDiv.appendChild(newNavbarItem('Login', '/auth/google'));
  }
}



// function newNavbarListItem(text, url) {
//   const itemLink = document.createElement('a');
//   itemLink.className = 'nav-item nav-link';
//   itemLink.innerHTML = text;
//   itemLink.href = url;

//   return itemLink
// }

function renderNavbarList(user) {
  const navbarList = document.getElementById("mm-nav");

  navbarList.appendChild(newListItem("",newNavbarItem('Home', '/')));

  if (user._id !== undefined) {
    navbarList.appendChild(newListItem("",newNavbarItem('Profile','/u/profile?'+user._id)));
    navbarList.appendChild(newListItem("",newNavbarItem('Logout', '/logout')));
  } else {
    navbarList.appendChild(newListItem("",newNavbarItem('Login','/auth/google')));
  }
  // navbarList.appendChild(newListItem("",newNavbarItem('Profile','/u/profile?'+user._id)));


  }

