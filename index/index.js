// Get all items with class "nav"
const navItems = document.querySelectorAll('.nav');

// Find the navitem that has the id "home" using a for loop
for (let i = 0; i < navItems.length; i++) {
	if (navItems[i].id === 'home') {
		navItems[i].classList.add('text-highlight');
		break;
	}
}
