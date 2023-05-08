var fundo, atirador, coracao;
var backImg, coracaoImg, coracao2Img, coracao3Img, atirador, atirador2Img, atirador3Img, zumbiImg;
var zumbiGroup, zumbi;

function preload() {
    backImg = loadImage("assets/bg.jpeg");
    coracao1Img = loadImage("assets/heart_1.png");
    coracao2Img = loadImage("assets/heart_2.png");
    coracao3Img = loadImage("assets/heart_3.png");
    atirador1Img = loadImage("assets/shooter_1.png");
    atirador2Img = loadImage("assets/shooter_2.png");
    atirador3Img = loadImage("assets/shooter_3.png");

    zumbiImg = loadImage("assets/zombie.png");



}

function setup() {


    createCanvas(windowWidth, windowHeight);


    //adicione a imagem de fundo
    fundo = createSprite(displayWidth / 2 + 50, displayHeight / 2 + 40, 20, 20);
    fundo.addImage(backImg);
    fundo.scale = 1.3;

    //crie o sprite do jogador
    atirador = createSprite(550, displayHeight - 300, 50, 50);
    atirador.addImage(atirador1Img);
    atirador.scale = 0.5;
    atirador.debug = true;
    atirador.setCollider("rectangle", 0, 0, 300, 400);

    zumbiGroup = new Group();

}

function draw() {
    background(0);

    //mova o jogador para cima e para baixo e torne o jogo compatível com dispositivos móveis usando touches (toques)
    if (keyDown("UP_ARROW") || touches.length > 0) {
        atirador.y = atirador.y - 30;
    }
    if (keyDown("DOWN_ARROW") || touches.length > 0) {
        atirador.y = atirador.y + 30;
    }

    //libere as balas e mude a imagem do atirador para a posição de tiro quando a tecla espaço for pressionada
    if (keyWentDown("space")) {

        atirador.addImage(atirador3Img);
    }
    //o jogador volta à imagem original quando pararmos de pressionar a tecla espaço
    else if (keyWentUp("space")) {
        atirador.addImage(atirador1Img);
    }
    if (zumbiGroup.isTouching(player)) {
        for (var i = 0; i < zumbiGroup.length; i++) {

            if (zumbiGroup[i].isTouching(player)) {
                zumbiGroup[i].destroy()

            }

        }
    }
    spawnZumbi();
    drawSprites();

}

function spawnZumbi() {
    if (frameCount % 100 === 0) {
        var zumbi = createSprite(displayWidth - 150, displayHeight - 300, -150, 50);
        zumbi.y = Math.round(random(displayHeight / 2, displayHeight));
        zumbi.addImage(zumbiImg);
        zumbi.scale = 0.3;
        zumbi.velocityX = random(-10, -3);

        //atribua tempo de vida à variável
        zumbi.lifetime = displayHeight;

        //adicione cada nuvem ao grupo
        zumbiGroup.add(zumbi);
    }

}
