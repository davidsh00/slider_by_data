const sliderData = [
  {
    image: "/assets/img/chemistry.png",
    id: "chemistry",
    title: "title",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nulla sequi adipisci mollitia dicta qui. Laborum illo aut quam similique!",
  },
  {
    image: "/assets/img/retired.png",
    id: "retired",
    title: "title2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nulla sequi adipisci mollitia dicta qui. Laborum illo aut quam similique!",
  },
  {
    image: "/assets/img/supplier.png",
    id: "supplier",
    title: "title3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nulla sequi adipisci mollitia dicta qui. Laborum illo aut quam similique!",
    href: "www.google.com",
  },
];

function addSlider(data, sliderContainer) {
  function setStyle(elem, styleObj) {
    for (const key in styleObj) {
      elem[key] = styleObj[key];
    }
  }
//   define var
  const container = sliderContainer || document.body;
  const sliderWrapper = document.createElement("section");
  const slider = document.createElement("ul");
  const slides = [];

  sliderWrapper.classList.add("slider-wrapper");
  slider.classList.add("slider");

//   create slide
  data.forEach((slide) => {
    const slideContainer = document.createElement("li");
    const slideImg = document.createElement("img");
    const slideContent = document.createElement("div");
    const slideDes = document.createElement("p");

    slideImg.src = slide.image;
    slideImg.alt = slide.title;

    slideContainer.classList.add("slider-slide");
    slideContainer.classList.add(slide.id);

    slideContent.classList.add("slide-content");

    slideDes.innerHTML = slide.description;
    slideContent.append(slideDes);
    if (slide.href) {
      const linkTag = document.createElement("a");
      linkTag.href = slide.href;
      linkTag.append(slideImg, slideContent);
      slideContainer.append(linkTag);
    } else {
      slideContainer.append(slideImg, slideContent);
    }
    slides.push(slideContainer);
  });

  //render slider
  slider.append(...slides);
  sliderWrapper.append(slider);
  container.append(sliderWrapper);
}

addSlider(sliderData);
