jQuery(function ($) {
    // この中であればWordpressでも「$」が使用可能になる

    var topBtn = $(".js-page-top");
    // js-page-topというクラスにtopBtnという名前をつける
    // 名前をつけなくてもいいが、名前をつけた方が、見やすくなります

    topBtn.hide();
    // topBtn、すなわち、js-page-topというクラスは一旦非表示にする

    var windowWidth = $(window).width();
    // 画面幅を計算し、それに対して、windowWidthという名前をつける

    if (windowWidth >= 768) {
        //横幅768px以上のとき（つまりPC時）にこの下の処理を行い、768未満のとき(つまりSP時)はこの下の処理は行わない

        $(window).scroll(function () {
            // 画面をスクロールした時に、この下の処理を実行する

            if ($(this).scrollTop() > 70) {
                // サイトの一番上から、70px以上スクロールした時に

                topBtn.fadeIn();
                // topBtn、すなわち、js-page-topというクラスをフェードインで表示する
            } else {
                // サイトの一番上からのスクロールした量が、70px未満の時に

                topBtn.fadeOut();
                // topBtn、すなわち、js-page-topというクラスをフェードインで表示する
            }
        });
    }

    topBtn.click(function () {
        // ボタンをクリックしたらスクロールして上に戻る
        $("body,html").animate(
            {
                scrollTop: 0,
            },
            300,
            "swing"
        );
        return false;
    });

    //ドロワーメニュー
    $("#MenuButton").click(function () {
        // $(".l-drawer-menu").toggleClass("is-show");
        // $(".p-drawer-menu").toggleClass("is-show");
        $(".js-drawer-open").toggleClass("open");
        $(".drawer-menu").toggleClass("open");
        $("html").toggleClass("is-fixed");
    });

    // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)

    $(document).on("click", 'a[href*="#"]', function () {
        let time = 400;
        let header = $("header").innerHeight();
        let target = $(this.hash);
        if (!target.length) return;
        let targetY = target.offset().top - header;
        $("html,body").animate({ scrollTop: targetY }, time, "swing");
        return false;
    });

    $(".js-hamburger").on("click", function () {
        if ($(this).hasClass("open")) {
            // ドロワーメニューが開いている時の処理
            $(".js-drawer").fadeOut();
            $(this).removeClass("open");
            // $("html").removeClass("fixed");
        } else {
            // ドロワーメニューが閉じている時の処理
            $(".js-drawer").fadeIn();
            $(this).addClass("open");
            // $("html").addClass("fixed");
        }
    });

    $('.header-nav__item a').click(function () {
        $(".js-drawer").fadeOut();
        $('.js-hamburger').removeClass('open');
    });

    $(function () {
        $(".tab__btn").on("click", function () {
            let index = $(".tab__btn").index(this);

            $(".tab__btn").removeClass("js-tab-btn");
            $(this).addClass("js-tab-btn");
            $(".tab__contents").removeClass("js-contents-active");
            $(".tab__contents").eq(index).addClass("js-contents-active");
        });
    });

    $(function () {
        // 最初のコンテンツは表示
        $(".accordion__list:first-of-type .accordion__text").css(
            "display",
            "block"
        );
        // 最初の矢印は開いた時の状態に
        $(".accordion__list:first-of-type .js-accordion-title").addClass(
            "open"
        );
        // タイトルをクリックすると
        $(".js-accordion-title").on("click", function () {
            // クリックしたタイトル以外のopenクラスを外す(－から＋にする)
            $(".js-accordion-title").not(this).removeClass("open");
            // クリックしたタイトル以外のコンテンツを閉じる
            $(".js-accordion-title").not(this).next().slideUp(300);
            // クリックしたタイトルにopenクラスを付け外しして＋と－を切り替える
            $(this).toggleClass("open");
            // クリックしたタイトルの次の要素(コンテンツ)を開閉
            $(this).next().slideToggle(300);
        });
    });
});

// mv
var swiper = new Swiper(".js-mv-swiper", {
    spaceBetween: 30,
    effect: "fade",
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// look rose
var swiper = new Swiper(".js-look-swiper", {
    effect: "slide", //PC版の左右に少し見えているデザインはfadeでは実装できない。slideに変更しておきましょう！
    loop: true, //5枚目の後に、自動で1枚目がくる設定です。
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        // スライドの表示枚数：768px以上の場合
        768: {
            slidesPerView: 1.65517241, //ここが難しいですが、画面幅(1440px)÷画像一枚の幅(840px)の値を入れましょう！左右の大きさが違いますが、CSSは真ん中を基準に左右を0.8倍にしているので、ここの画像の幅は、真ん中の幅を入れます。
            centeredSlides: true, //PC版では、1枚目が真ん中に来るようにこれを入れておいてください！
        },
    },
});


// gsap

/* ハンバーガーメニュー */
// window.addEventListener('DOMContentLoaded',function(){
//     let btn = document.querySelector('.js-hamburger');
//     let headerMenu = document.querySelector('.js-drawer');
//     let windowHeight = window.innerHeight;
//     let menuTL = gsap.timeline();
//     let scale = windowHeight / btn.clientHeight;
//     // 869 ÷ 64 = 10 - 1 = 9 半径分だから本当は18必要で×２してる
//     // console.log(scale);

//     btn.addEventListener('click',function(){
//         // console.log('click');
//         // すでに開いている時
//         if(btn.classList.contains('open')){
//             menuTL
//             .to('.js-drawer',{scale:0})
//             .add(()=>{
//                 btn.classList.remove('open')
//                 headerMenu.classList.remove('open')
//             })
//         }else{
//             menuTL
//             .add(()=>{
//                 headerMenu.classList.add('open')
//                 btn.classList.add('open')
//             })
//             .to('.js-drawer',{scale:scale*2.2})
//             .fromTo('.header-nav__items li',{autoAlpha:0,y:20},{autoAlpha:1,y:0,duration:.4,stagger:.03},'-=.1')
//         }
//     })
// })


/* フィードインアニメーション(news) */
gsap.utils.toArray('.js-fadeIn').forEach((target)=>{
    gsap.fromTo(target,{autoAlpha:0},{autoAlpha:1,scrollTrigger:{
        trigger:target,
        start:'top 80%'
    }})
})

/* 連続ポップアップアニメーション(news,about) */
gsap.utils.toArray('.js-popUps').forEach((element)=>{
    let targets = element.querySelectorAll(':scope > *');
    gsap.fromTo(targets,{scale:.9,autoAlpha:0},{scale:1,autoAlpha:1,
        ease:"back.out(1.7)",
        stagger:.05,
        scrollTrigger:{
            trigger:element,
            start:'top 70%'
        }
    });
})

/* 颯爽感(about) */
let titleWrappers = document.querySelectorAll('.title__wrapper');
titleWrappers.forEach((titleWrapper)=>{ // 配列
    let title = titleWrapper.querySelectorAll('.title');
    let tl = gsap.timeline({scrollTrigger:{
        trigger:titleWrapper,
        start:'top 80%',
        // markers:true,
    }});
    tl
    .to(titleWrapper,{'--scaleX':1,duration:.4})
    .to(title,{y:'0%'},'-=.25')
    
})

/* マスクエフェクト(cafe menu) */
let textEffectTriggers = document.querySelectorAll('.js-title-effect-trigger');

    textEffectTriggers.forEach((trigger)=>{
        let target = trigger.querySelectorAll('.js-title-effect');
        let textEffectTL = gsap.timeline({
            scrollTrigger:{
                trigger:trigger,
                start:'top 80%',
            }
        });
        textEffectTL
        .to(target,{autoAlpha:1,y:0,stagger:.1})
        .to(target,{'--translateX':'101%'})
})

/* オープニング */
const openingTL = gsap.timeline();
openingTL
.fromTo('.opening__logo',{clipPath:'inset(0 100% 0 0)',scale:1.1,autoAlpha:0},{clipPath:'inset(0 0% 0 0)',scale:1,autoAlpha:1,duration:3,delay:.5,ease:'power4.out'}) // ↑透過度とトリミング,大きさ
.to('.opening__mask',{y:'-100%',duration:2,ease:'power4.out'})
.to('.opening__logo',{autoAlpha:0,duration:1},'>-2')
.to('.opening',{y:'-100%'})