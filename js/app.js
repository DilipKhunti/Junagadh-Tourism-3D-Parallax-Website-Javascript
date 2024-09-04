const parallax_element = document.querySelectorAll(".parallax");

let valueX = 0;
let valueY = 0;
let rotateDegree = 0;

function update(cursorPosition) {
  parallax_element.forEach((el) => {
    let speedX = el.dataset.speedx;
    let speedY = el.dataset.speedy;
    let speedZ = el.dataset.speedz;
    let rotate = el.dataset.rotate;

    let isInLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;

    let valueZ =
      (cursorPosition - parseFloat(getComputedStyle(el).left)) * 0.1 * isInLeft;
    el.style.transform = `translateX(calc(-50% + ${
      -valueX * speedX
    }px)) rotateY(${rotateDegree * rotate}deg) translateY(calc(-50% + ${
      valueY * speedY
    }px)) perspective(2300px) translateZ(${valueZ * speedZ}px)`;
  });
}

update(0);

window.addEventListener("mousemove", (e) => {
  if (timeline.isActive()) return;

  valueX = e.clientX - window.innerWidth / 2;
  valueY = e.clientY - window.innerHeight / 2;
  rotateDegree = (valueX / (window.innerWidth / 2)) * 50;

  update(e.clientX);
});

let timeline = gsap.timeline();

Array.from(parallax_element)
  .filter((el) => !el.classList.contains("text"))
  .forEach((el) => {
    timeline.from(
      el,
      {
        top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
        duration: 3.5,
        ease: "power3.out",
      },
      "1"
    );
  });

timeline
  .from(
    ".text h1",
    {
      y:
        window.innerHeight -
        document.querySelector(".text h1").getBoundingClientRect().top +
        200,
      duration: 2,
    },
    "2.5"
  )
  .from(
    ".text h2",
    {
      y: -150,
      opacity: 0,
      duration: 1.5,
    },
    "3"
  )
  .from(
    ".hide",
    {
      opacity: 0,
      duration: 1.5,
    },
    "3"
  );
