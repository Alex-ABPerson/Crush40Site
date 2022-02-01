<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Crush 40</title>
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="The biggest fan-made Crush 40 website on the planet!">
        <meta name="keywords" content="Crush 40, Johnny Gioeli, Jun Senoue, Sonic the Hedgehog, Crush 40 Live, Crush 40 Discography">

        <link href="css/site.css" rel="stylesheet">
        <link href="css/home.css" rel="stylesheet">

        <!-- Crush 40 JavaScript -->
        <script src="js/home.js"></script>
        <script src="js/loading-bar.js"></script>
        <script src="js/site.js"></script>
    </head>
    <body>
        <?php include('base/bodyStart.html') ?>

        <div class="opening section">

            <div class="opening-intro">

                <!-- Logo -->
                <img src="img/logo/FanWebsiteLogo.svg" alt="Crush 40 Logo">

                <!-- Text -->
                <h2>Info, live shows, trivia, history, discography - and more!</h2> 

                <div class="btnSet">
                    <a class="btnLink" href="#intro"><button class="filledButton btnExplore btnWidthNormal">Explore <img src="img/icons/smallDownArrow.svg" alt="Down Arrow"></button></a>
                    <button class="emptyButton btnViewAll btnWidthNormal">View all sections</button>
                </div>
            </div>
        </div>

        <!-- Introducing... Crush 40! -->
        <div class="intro section" id="intro">
            <div class="background-2n2r"></div>

            <h2>Introducing <img src="img/logo/EmptyRed.svg" alt="Crush 40">!</h2>

            <!-- What is Crush 40? -->
            <div class="blockTitle">
                <h3>What is Crush 40?</h3>
            </div>

            <div class="whoIsC40 strip stripUp">
                <div class="stripBack"></div>

                <!-- Text -->
                <div class="stripText">
                    <p>Crush 40 is a <span style="font-size: 150%">hard-rock</span> focused musical group.</p>
                    <p>Most commonly associated with writing vocal themes for the Sonic the Hedgehog series.</p>
                </div>

                <!-- Image -->
                <img data-action="zoom" src="img/content/Both1.jpg" class="stripImg" alt="Johnny Gioeli & Jun Senoue">
            </div>
            
            <!-- Band Members -->
            <div class="blockTitleRight">
                <div class="blockTitle">
                    <h3>Band Members</h3>
                </div>
            </div>

            <div class="bandMembers introSection">

                <!-- Johnny -->
                <p class="johnnyIndicator indicator">VOCALS</p>

                <div class="johnnyTitle">
                    <h4 class="title"><span style="font-size: 150%;">Johnny</span> Gioeli</h4>
                    <p class="johnnyAka aka"><i>(a.k.a. Giovanni Giuseppe Baptista Gioeli)</i></p>
                </div>

                <p class="johnnyDesc">Pelting out strong rock melodies you can't avoid singing along to!</p>
                <img data-action="zoom" class="johnnyImg img" src="img/content/Johnny_Ring.png" alt="Johnny Gioeli">

                <img data-action="zoom" class="johnnyTogetherImg" src="img/content/JohnnyAndJun.png" alt="Johnny & Jun">

                <div class="centreSeparator" data-parallax="backgroundY" data-parallax-speed="4" data-parallax-change-at="1000"></div>

                <!-- Jun -->
                <p class="junIndicator indicator">GUITAR</p>
                <h4 class="junTitle title"><span style="font-size: 180%;">Jun</span> Senoue</h4>
                <p class="junDesc">Laying down irresistable lead and rhythm for every song!</p>
                <img data-action="zoom" class="junImg img" src="img/content/Jun_Ring.png" alt="Jun Senoue">

                <div class="junMrJun">
                    <h5>"Mr Jun Senoue!"</h5>
                    <p>Johnny <i>loves</i> introducing Jun at Crush 40 shows... <b>A lot</b>...</p>
                    <iframe class="contents" src="https://streamable.com/e/kkddda" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>

            <div class="otherBandMembers strip stripDown">
                <div class="stripBack"></div>

                <div class="stripText">
                    <h4>Drums and bass?</h4>
                    <p>"Crush 40" does not have a set drummer and bass player!</p> 
                    <p>They either rely on a <span style="font-size: 120%">backing track</span> live, or some other member to fill in temporarily.</span></p>
                    <p>You can view a complete list of all the drummers/bass players they've used here:</p>
                    <button style="font-size: 100%" class="emptyButton btnWidthWide" data-action="panel" data-page-name="allMembers">View other members</button>
                </div>

                <img data-action="zoom" src="img/content/members/Together.png" class="stripImg" alt="Crush 40 with full band">
            </div>

            <!-- Why "Crush 40"? -->
            <div class="blockTitle">
                <h3>Why "Crush 40"?</h3>
            </div>
            
            <div class="naming introSection">
                <p>The band was originally titled <span style="font-size: 120%">"Sons of Angels"</span> - but they soon discovered a <i>Norwegian rock band</i> already had the same name, and were thinking <span style="font-size: 80%">"Sons of..."</span>.</p>
                <p>At the time, Jun liked the word and drink "Crush" and Johnny didn't want to turn 40, so together they created the new name.</p>
                <div class="imgContainer">
                    <img class="img" src="img/content/info/What_Crush_40_Means.svg" alt="Jun likes the drink Crush, and Johnny wanted to Crush 40">
                </div>
            </div>
        </div>

        <!-- Guitars -->
        <div class="guitars section">
            <div class="guitar guitar-top">
                <img class="body" src="img/content/guitars/Sonic-II/BodyHorizontal.svg" alt="ESP-SONIC-II Guitar Body">
                <div class="neck"></div>
                <img class="headstock headstock-right" src="img/content/guitars/Sonic-II/HeadstockHorizontal.svg" alt="ESP-SONIC-II Guitar Headstock">
            </div>
            <div class="middle">
                <div class="contents">
                    <p class="heading">Oh - and there's even custom "Crush 40" guitars by ESP!</p>
                    <p class="subheading"><i>Jun uses these live!</i></p>
                    <button class="emptyButton btnWidthWide" href="#">Check out their gear</button>
                </div>
            </div>
            <div class="guitar guitar-bottom">
                <img class="body" src="img/content/guitars/Shadow-II/BodyHorizontal.svg" alt="ESP-SHADOW-II Guitar Body">
                <div class="neck"></div>
                <img class="headstock headstock-right" src="img/content/guitars/Shadow-II/HeadstockHorizontal.svg" alt="ESP-SHADOW-II Guitar Headstock">
            </div>
        </div>

        <!-- Trivia -->
        <div class="trivia section">
            <h2>Trivia Quiz</h2>
            <p class="description">Find out how well you know Crush 40 right here on the site - through this interactive trivia quiz!</p>
            <button style="font-size: 125%" class="filledButton btnWidthWide takeTrivia" data-action="panel" data-page-name="trivia">Start the quiz</button>
        </div>

        <?php include('base/bodyEnd.html') ?>
    </body>
</html>