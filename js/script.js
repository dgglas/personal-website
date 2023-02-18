// ###### OMNIFOOD 'SCRIPT' JAVASCRIPT ######

///////////////////////////////////////////////////////////
// ////////// MAKE MOBILE NAVIGATION WORK /////////////////
///////////////////////////////////////////////////////////

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
/////////// SMOOTH SCROLLING ANIMATION ////////////////////
///////////////////////////////////////////////////////////

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll down to links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close moile navigation after clicking link
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
/////////// SET 'COPYRIGHT' TO CURRENT YEAR ///////////////
///////////////////////////////////////////////////////////

const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// ////// MAKE TOP NAV 'STICKY' (not scrolling) ///////////
///////////////////////////////////////////////////////////

// Make top nav scroll up with 'hero' section then,
// re-appear and stick when scrolling down past 'hero' then,
// dissapear and go back to top when scrolling back up to hero

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      console.log(ent);

      // document.querySelector(".header").classList.add("sticky");
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      console.log(ent);

      // document.querySelector(".header").classList.add("sticky");
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,

    // event triggered when 'hero' section
    // moves out of view completely
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fix flexbox gap property missing in some Safari versions
///////////////////////////////////////////////////////////

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
