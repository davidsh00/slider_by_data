const sliderData = [
  {
    image: "/assets/img/chemistry.png",
    id: "chemistry",
    title: "سامانه آزمایشگاه",
    description:
      "مدیریت خدمات و امور رفاهی( سرپرستی ورزش همگانی) در نظر دارد نسبت به پیش ثبت نام استخر پرسنل بازنشسته و خانواده های محترم ایشان طبق شرایط زیر در سال 1402 اقدام نماید . با توجه به پیاده سازی و اجرای اتوماسیون جدید ورزش و لزوم صدور کارتهای الکترونیکی جهت کنترل ورود استفاده کنندگان از اماکن ورزشی تحت پوشش و طرف قرارداد شرکت سهامی ذوب آهن اصفهان کلیه افراد متقاضی میبایست از طریق این پرتابل نسبت به تکمیل و ویرایش مشخصات خود و افراد تحت تکفل ایشان همچنین بارگذاری عکس جدید پرسنلی اقدام نمایند.",
  },
  {
    image: "/assets/img/retired.png",
    id: "retired",
    title: "سامانه بازنشستگی",
    description:
      "از آنجا که لورم ایپسوم، شباهت زیادی به متن های واقعی دارد، طراحان معمولا از لورم ا",
  },
  {
    image: "/assets/img/supplier.png",
    id: "supplier",
    title: "سامانه مواد اولیه",
    description:
      "اگر در ویرایشگر کدنویسی پلاگین ایمت (emmet) نصب شده است می‌توانید از آن برای تولید خودکار لورم ایپسوم برای پر کردن فضای متنی استفاده کنید.",
    href: "www.google.com",
  },
];
const btn = document.getElementById("btn");
function addSlider(data, sliderContainer) {
  //   define var
  const container = sliderContainer || document.body;
  const sliderWrapper = document.createElement("section");
  const slider = document.createElement("ul");
  const slides = [];
  let sliderPlay;

  sliderWrapper.classList.add("slider-wrapper");
  slider.classList.add("slider");

  //   create slide
  data.forEach((slide, i) => {
    const slideContainer = document.createElement("li");
    const slideImg = document.createElement("img");
    const slideContent = document.createElement("div");
    const slideDes = document.createElement("p");
    const slideDesWrapper = document.createElement("div");
    const slideTitle = document.createElement("h3");

    slideImg.src = slide.image;
    slideImg.alt = slide.title;
    slideImg.classList.add("slide-bg");

    slideContainer.classList.add("slider-slide");
    slideContainer.classList.add(slide.id);
    i == 0 && slideContainer.classList.add("active-slide");

    slideContent.classList.add("slide-content");

    slideDesWrapper.classList.add("slide-des-wrapper");

    slideTitle.innerHTML = slide.title;
    slideDes.innerHTML = slide.description;
    slideDesWrapper.append(slideDes);
    slideContent.append(slideTitle, slideDesWrapper);
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

  function changeSlide(slideId) {
    const slidesArr = [...slides];
    const activeSlideIndex = slidesArr.indexOf(
      slidesArr.find((item) => item.classList.contains("active-slide"))
    );
    slidesArr.forEach((slide) => slide.classList.remove("active-slide"));
    if (slideId) {
      slidesArr[
        slidesArr.indexOf(
          slidesArr.find((item) => item.classList.contains(slideId))
        )
      ].classList.add("active-slide");
    } else {
      slidesArr[(activeSlideIndex + 1) % slidesArr.length].classList.add(
        "active-slide"
      );
    }
  }
  function autoPlay(status) {
    let playStatus = "";
    const timer = 5000;
    let t1;

    function start() {
      playStatus = "start";
      clearTimeout(t1);
      t1 = setTimeout(() => {
        if (playStatus === "start") {
          changeSlide();
          start();
        }
      }, timer);
    }
    function stop() {
      playStatus = "stop";
      clearTimeout(t1);
    }
    function pause() {}
    return { start, stop, pause };
  }
  function sliderExtraCards(cardsArr) {
    cardsArr.forEach(({ card, id }) => {
      card.addEventListener("mouseenter", () => {
        console.log("mouseEnter", id);
        sliderPlay.stop();
        changeSlide(id);
      });
      card.addEventListener("mouseleave", () => {
        console.log("mouse leave", id);
        sliderPlay.start();
      });
    });
  }

  sliderPlay = autoPlay();
  return { changeSlide, autoplay: sliderPlay, extraCards: sliderExtraCards };
}
const slider1 = addSlider(sliderData);

document.getElementById("btn").addEventListener("click", () => {
  slider1.autoplay.start();
});

document.getElementById("btn1").addEventListener("click", () => {
  slider1.autoplay.stop();
});
