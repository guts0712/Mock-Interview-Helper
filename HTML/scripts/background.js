export function createStarField(canvasId){
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const brightStars = [];
    const galaxyStars = [];


    class Star{

        constructor(){
            const random = Math.random();

            if(random < .92){
                this.radius =
                Math.random() * .8;
            }
            else if(random < .99){
                this.radius =
                Math.random() * 2 + .5;
            }
            else{
                this.radius =
                Math.random() * 4 + 1;
            }

            this.x =
            Math.random() * canvas.width;

            this.y =
            Math.random() * canvas.height;



            this.alpha = Math.random() * .8 + .2;

            this.speed =
            (Math.random() * .003) + .0005;
        }

        update(){

            this.alpha += this.speed;

            if(this.alpha > .8){
                this.speed *= -1;
            }

            if(this.alpha < .05){
                this.speed *= -1;
            }
        }

        draw(){

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
            `rgba(255,255,255,${this.alpha})`;

            ctx.fill();
        }
    }
    class GalaxyStar{

    constructor(){

        this.x =
        Math.random() * canvas.width;

        const centerLine =
        canvas.height * 0.75 -
        this.x * 0.45;

        const gaussian =
        (
            Math.random() +
            Math.random() +
            Math.random() +
            Math.random()
        ) / 4;

        this.y =
        centerLine +
        (gaussian - 0.5) * 650;

        if(Math.random() < 0.92){

            this.radius =
            Math.random() * 0.8;
        }
        else{

            this.radius =
            Math.random() * 2 + 1;
        }

        this.alpha =
        Math.random() * 0.25 + 0.05;

        const clusterX =
        canvas.width * 0.25;

        const clusterY =
        canvas.height * 0.65;

        const distance =
        Math.hypot(
            this.x - clusterX,
            this.y - clusterY
        );

        if(distance < 250){

            this.alpha *= 2.5;

            this.radius *= 1.8;
        }
    }

    draw(){

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
        `rgba(
            255,
            255,
            255,
            ${this.alpha}
        )`;

        if(this.radius > 1){

            ctx.shadowBlur = 8;

            ctx.shadowColor =
            "white";
        }

        ctx.fill();

        ctx.shadowBlur = 0;
    }
}
    class BrightStar{

        constructor(){
            const random = Math.random();

            if(random < 0.08){

                this.color =
                "180,220,255"; // blue giant
            }
            else if(random < 0.16){

                this.color =
                "255,200,120"; // orange giant
            }
            else{

                this.color =
                "255,255,255"; // normal white
            }

            this.x =
            Math.random() * canvas.width;

            this.y =
            Math.random() * canvas.height;

            this.radius =
            Math.random() * 2 + 2;

            this.alpha =
            Math.random() * 0.5 + 0.5;

            this.speed =
            Math.random() * 0.01;
        }

        update(){

            this.alpha += this.speed;

            if(this.alpha > 1){
                this.speed *= -1;
            }

            if(this.alpha < 0.3){
                this.speed *= -1;
            }
        }

        draw(){

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
    `rgba(
        ${this.color},
        ${this.alpha}
    )`;

            ctx.shadowBlur = 25;

            ctx.shadowColor =
    `rgb(${this.color})`;

            ctx.fill();

            ctx.shadowBlur = 0;
        }
    }

    for(let i=0;i<2000;i++){
        stars.push(new Star());
    }

    for(let i=0;i<120;i++){
        brightStars.push(new BrightStar());
    }

    for(
        let i = 0;
        i < 4500;
        i++
    ){
        galaxyStars.push(
            new GalaxyStar()
        );
    }

    function animate(){

        ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
        galaxyStars.forEach(
        (star)=>{
            star.draw();
        }
    );

    stars.forEach(
        (star)=>{
            star.update();
            star.draw();
        }
    );

    brightStars.forEach(
        (star)=>{
            star.update();
            star.draw();
        }
    );

        requestAnimationFrame(
            animate
        );
    }

    animate();

    window.addEventListener(
    "resize",
    ()=>{

        canvas.width =
        window.innerWidth;

        canvas.height =
        window.innerHeight;

        stars.length = 0;
        brightStars.length = 0;
        galaxyStars.length = 0;

        for(let i=0;i<2000;i++){
            stars.push(new Star());
        }

        for(let i=0;i<120;i++){
            brightStars.push(
                new BrightStar()
            );
        }

        for(let i=0;i<4500;i++){
            galaxyStars.push(
                new GalaxyStar()
            );
        }
    }
 );
}