gsap.registerPlugin(ScrollTrigger);

const projectSlider = $(".project-slider")[0];

const projects = Array.from($(projectSlider).children());

projects.forEach((element) => {
    const title = $(element).find(".project-cover-title");

    console.log($(title).width());

    $(title).css({
        top: gsap.utils.clamp(0.1, 0.6, Math.random()) * $(element).height(),
        left:
            $(element).find(".project-cover").width() - 0.5 * $(title).width(),
    });
});

projects.forEach((element, index) => {
    const tl = gsap.timeline({ paused: true });

    ScrollTrigger.create({
        trigger: ".work",
        animation: gsap.to(element, { x: -500 * (index + 8) }),
        scrub: 0.75,
        // markers: true,
        start: "top top",
        pin: true,
        end: "bottom 50%",
    });

    tl.to($(element).find(".project-cover-title h3"), {
        duration: 0.2,
        xPercent: 150,
        ease: "power3.in",
    })
        .to(
            $(element).find(".project-cover-title"),
            {
                duration: 0.3,
                clipPath: "inset(0 0 0 100%)",
                ease: "power3.inOut",
            },
            "-=0.1"
        )

        .to(
            $(element).find(".project-cover img:nth-child(2)"),
            {
                duration: 0.3,
                clipPath: "inset(0 0 0 100%)",
                ease: "power3.inOut",
            },
            "-=0.3"
        )
        .from(
            $(element).find(".project-details"),
            {
                duration: 0.6,
                autoAlpha: 0,
                y: 16,
                ease: "power3.out",
            },
            "-=0.05"
        );

    $(element)
        .find(".project-cover")
        .mouseenter(() => {
            tl.play();
        });

    $(element).mouseleave(() => {
        tl.reverse();
    });
});

// ScrollTrigger.create({
//     trigger: ".header",
//     animation: gsap.from(".floating-nav", {
//         duration: 0.3,
//         ease: "power3.inOut",
//         y: 100,
//     }),
//     toggleActions: "play pause resume reset",
//     start: "16% top",
//     once: false,
//     end: "bottom 50%",
// });

const floatAnimation = gsap.from(".floating-nav", {
    paused: true,

    duration: 0.4,
    ease: "power3.out",

    y: 400,
    scale: 0.9,
});

ScrollTrigger.create({
    start: "100px top",
    end: 99999,

    onLeaveBack: () => {
        floatAnimation.reverse();
    },
    onUpdate: (self) => {
        self.direction === -1
            ? floatAnimation.play()
            : floatAnimation.reverse();
    },
});
