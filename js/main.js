$(document).ready(function() {
    //loader
    loadingTl = new TimelineMax();
    loadingTl
        .from("#hero-section .hero-img", 0.4, { height: 0 })
        .staggerFrom("#hero-section h2 span", 0.5, { x: "-20px", opacity: 0 }, 0.1)
        .from("#hero-section h1", 0.5, { y: "-100px", opacity: 0 })
        .staggerFrom(
            "#brand, #nav .toggler, .social-media ul li a",
            0.5, { y: "-20px", opacity: 0 },
            0.2
        )
        .staggerFrom(".scroll-down", 0.5, { y: "-20px", opacity: 0 })

    .eventCallback("onComplete", () => {
        menuTl.play();
    });

    //cursor style and effect
    let $mouseX = 0,
        $mouseY = 0,
        $left = 0,
        $top = 0;

    $(document).mousemove(e => {
        $mouseX = e.clientX;
        $mouseY = e.clientY;
    });

    setInterval(() => {
        $left += ($mouseX - $left) / 12;
        $top += ($mouseY - $top) / 12;
        $("#cursor").css({ left: $left + "px", top: $top + "px" });
    });

    linkHoverTl = new TimelineMax({ paused: true });
    linkHoverTl.to("#cursor", 0.3, { scale: 1.5 });

    $("nav ul li a, .toggler, #nav-t-logo, .social-media ul li a, #scroll-top").hover(() => {
        linkHoverTl.play();
    }, () => {
        linkHoverTl.reverse();
    });

    //hover img cursor
    let seeMoreHover = new TimelineMax({ paused: true })
        .to("#cursor", 0.3, { scale: 2 })
        .to(".more", 0.3, { opacity: 1 });

    $(".img-container").each(function(i, el) {
        let imgHoverTl = new TimelineMax({ paused: true });
        imgHoverTl.to($(this).find("img"), 0.3, { opacity: 0.4 })
            .to($(this).find("a"), 0.3, { opacity: 1, y: "50px" });
        el.animation = imgHoverTl;
    });

    $(".img-container").hover(
        function() {
            this.animation.play()
            seeMoreHover.play()
        },
        function() {
            this.animation.reverse();
            seeMoreHover.reverse();
        }
    );

    //menu nav
    let menuTl = new TimelineMax({ paused: true });

    menuTl
        .from("nav ul li", 0, { display: "none" })
        .staggerFrom("nav ul li", 0.3, { x: 40, opacity: 0 }, 0.1)
        .to(".toggler .open", 0.1, { opacity: 0 })
        .to(".toggler .close", 0.1, { opacity: 1 });

    $(".toggler").click(() => {
        menuTl.reversed() ? menuTl.play() : menuTl.reverse();
    });

    $(document).scroll(function() {
        $(this).scrollTop() > 100 ? menuTl.reverse() : menuTl.play();
    });

});