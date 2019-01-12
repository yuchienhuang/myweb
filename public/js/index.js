function main() {
  get('/api/whoami', {}).then(function(user) {
    console.log(user);
    renderNavbar(user);
    renderStories(user);
  });
}

main();
