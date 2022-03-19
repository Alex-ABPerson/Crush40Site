<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Crush 40 - Gear</title>
        
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="A list of the gear used by Crush 40!">
        <meta name="keywords" content="Crush 40, Johnny Gioeli, Jun Senoue, Sonic the Hedgehog, Crush 40 Live, Crush 40 Discography">

        <link href="css/site.css" rel="stylesheet">
        <link href="css/gear.css" rel="stylesheet">

        <!-- Crush 40 JavaScript -->
        <script src="js/loading-bar.js"></script>
        <script src="js/site.js"></script>
        <script src="js/gear.js"></script>
    </head>
    <body>
        <?php include('base/bodyStart.html') ?>

        <!-- Opening -->
        <div class="opening section">

            <div class="opening-intro">

                <!-- Logo -->
                <img src="img/logo/FanWebsiteLogo.svg" alt="Crush 40 Logo">

                <!-- Text -->
                <h2>The gear Crush 40 uses: Guitars, amps, DAWs, hardware - all right here!</h2>

                <div class="btnSet">
                    <a class="btnLink"><button class="filledButton btnAlbums btnWidthNormal">Guitars <img src="img/icons/smallDownArrow.svg" alt="Down Arrow"></button></a>
                    <button class="emptyButton btnViewAll btnWidthNormal">Amplifiers <img src="img/icons/smallDownArrow.svg" alt="Down Arrow"></button>
                </div>
            </div>
        </div>

        <!-- Guitars -->
        <div class="intro">
            <h1>Guitars</h1>

            <div class="start">
                <div class="text">
                    <p>By far the most prominent set of gear for Crush 40 is Jun's <i>guitars</i>.</p>
                    <p>Jun uses custom-made <b>ESP Guitars</b> for his own works and Crush 40. The guitars have different designs on them - some being used for general Sonic/Shadow songs, and some being used for very precise game soundtracks.</p>
                    <p>Jun most commonly plays the <b>ESP GL "SONIC"</b>, <b>ESP SONIC-II</b> and <b>ESP SHADOW-II</b> at most Crush 40 shows, but at some shows he also brings the dedicated game guitars to play.</p>
                    <p>He's been in a sponsership deal with ESP ever since he first worked on Sonic Adventure - and as such is required to use these guitars at his shows, but that's not a problem, because they're awesome and he always sounds great anyway!</p>
                </div>
                <img data-action="zoom" class="img" src="img/content/guitars/AllGuitars.png" alt="Some of Jun's guitars">
            </div>

            <div class="imgSet">
                <div class="imgFrame frame">
                    <p>Jun's guitars backstage for the JGMF2013 show.</p>
                    <img data-action="zoom" class="img" src="img/content/guitars/AllGuitars2.png" alt="Some of Jun's guitars">
                </div>
                <div class="imgFrame frame">
                    <p>An <a href="https://soahcity.com/2016/08/23/jun-senoues-sonic-guitars-on-display-at-esp-museum/">exhibit</a> dedicated to Jun's guitars at the ESP Museum.</p>
                    <img data-action="zoom" class="img" src="img/content/guitars/Exhibition.png" alt="Some of Jun's guitars">
                </div>
                <div class="imgFrame frame">
                    <p>The guitars at the Tokyo 2011 show.</p>
                    <img data-action="zoom" class="img" src="img/content/guitars/Tokyo2011Guitars.jpg" alt="Some of Jun's guitars at Tokyo 2011">
                </div>
            </div>

            <div class="quoteFrame frame">
                <div class="quotation">
                    <p class="mark quotationStart">"</p>
                    <p class="text">Jun Senoue has 742 guitars! And this is #82! Whew. Thank goodness you only brought <i>82</i>.</p>
                    <p class="mark quotationEnd">"</p>
                </div>
                <p class="text">- Johnny Gioeli, <i>2 Nights 2 Remember</i>, 2014.</p>
            </div>

            <div class="zigZag zigZagBottom"></div>
        </div>

        <!-- Guitars Explorer -->
        <div class="explorer section">
            <div class="explorer-intro">
                <h2>Guitar Breakdown</h2>
                <p>Take a look at all the custom-made Jun Senoue guitars - he may not use all of these for Crush 40, but most of them have been used in a Crush 40 work!</p>
            </div>

            <div class="selection">
                <ul class="selectionList">
                    <li class="multiItem">
                        <p>ESP GL "SONIC"</p>
                        <ul>
                            <li data-id="sonic" class="guitarBtn">
                                <p>Original</p>
                                <p><i>ESP GL "SONIC"</i></p>
                            </li>
                            <li data-id="sth130" class="guitarBtn">
                                <p>20th Anniversary</p>
                                <p><i>ESP STH-130</i></p>
                            </li>
                        </ul>
                    </li>
                    <li class="multiItem">
                        <p>ESP SONIC-II</p>
                        <ul>
                            <li data-id="sonicii" class="guitarBtn">
                                <p>Original</p>
                                <p><i>ESP SONIC-II</i></p>
                            </li>
                            <li data-id="sn25th" class="guitarBtn">
                                <p>25th Anniversary</p>
                                <p><i>ESP SN-25th</i></p>
                            </li>
                        </ul>
                    </li>
                    <li class="multiItem">
                        <p>ESP SHADOW-II</p>
                        <ul>
                            <li data-id="shadowii" class="guitarBtn">
                                <p>Original</p>
                                <p><i>ESP SHADOW-II</i></p>
                            </li>
                            <li data-id="sd15th" class="guitarBtn">
                                <p>15th Anniversary</p>
                                <p><i>ESP SD-15th</i></p>
                            </li>
                        </ul>
                    </li>
                    <li data-id="shadow" class="guitarBtn"><p>ESP VP "Shadow"</p></li>
                    <li data-id="knight" class="guitarBtn"><p>ESP MR "Black Knight"</p></li>
                    <li data-id="c82" class="guitarBtn"><p>ESP SEC "82 Custom"</p></li>
                </ul>
            </div>

            <div class="guitar" id="gtrElem">
                <div class="guitarImgContainer">
                    <div class="GSBackContainer"><div class="GSBack" data-parallax="backgroundY" data-parallax-speed="2"></div></div>
                    <img id="gtrImg" src="img/content/guitars/GtrOutline.png">
                    <div class="hover hoverBack" id="hoverPoints">
                        <div class="point" style="left: 200px; top: 200px; width: 100px; height: 100px"></div>
                    </div>
                </div>
            </div>

            <div class="details noGtr" id="belowGtr">
                <div class="otherDetails">
                    <h3 id="gtrTitle">ESP SONIC-II</h3>
                    <p id="gtrDesc">Jun uses this guitar for a significant amount of the Crush 40 shows in existance.</p>
                    <button data-action="panel" data-page-name="guitarView?g=sonic-ii" class="emptyButton">View More Details</button>
                </div>
                <div class="selectInfo">
                    <!--<div class="pickupInfo">
                        <h1>Pickups</h1>
                        <p>The pickups on this guitar are in the following formation:</p>
                        <h2></h2>
                    </div>-->
                    <img src="" class="generalImg" id="selectImg">
                    <div class="text">
                        <h1 id="selectTxt"></h1>
                        <div id="selectDesc"></div>
                    </div>
                </div>
            </div>
        </div>

        <?php include('base/bodyEnd.html') ?>
    </body>
</html>