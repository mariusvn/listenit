<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
    <style>
      *{padding:0;margin:0;overflow:hidden;}
      @-webkit-keyframes uil-ellipsis {
        0% {
          -ms-transform: scale(0);
          -moz-transform: scale(0);
          -webkit-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          left: 0px;
          opacity: 1;
        }
        12.5% {
          -ms-transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
        }
        25% {
          left: 0px;
        }
        37.5% {
          left: 70px;
        }
        50% {
          left: 70px;
        }
        62.5% {
          left: 140px;
        }
        75% {
          left: 140px;
          -ms-transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
        }
        87.5% {
          left: 140px;
          -ms-transform: scale(0);
          -moz-transform: scale(0);
          -webkit-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          opacity: 1;
        }
        100% {
          left: 140px;
          opacity: 0;
        }
      }
      @-webkit-keyframes uil-ellipsis {
        0% {
          -ms-transform: scale(0);
          -moz-transform: scale(0);
          -webkit-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          left: 0px;
          opacity: 1;
        }
        12.5% {
          -ms-transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
        }
        25% {
          left: 0px;
        }
        37.5% {
          left: 70px;
        }
        50% {
          left: 70px;
        }
        62.5% {
          left: 140px;
        }
        75% {
          left: 140px;
          -ms-transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
        }
        87.5% {
          left: 140px;
          -ms-transform: scale(0);
          -moz-transform: scale(0);
          -webkit-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          opacity: 1;
        }
        100% {
          left: 140px;
          opacity: 0;
        }
      }
      @-moz-keyframes uil-ellipsis {
        0% {
          -ms-transform: scale(0);
          -moz-transform: scale(0);
          -webkit-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          left: 0px;
          opacity: 1;
        }
        12.5% {
          -ms-transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
        }
        25% {
          left: 0px;
        }
        37.5% {
          left: 70px;
        }
        50% {
          left: 70px;
        }
        62.5% {
          left: 140px;
        }
        75% {
          left: 140px;
          -ms-transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
        }
        87.5% {
          left: 140px;
          -ms-transform: scale(0);
          -moz-transform: scale(0);
          -webkit-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          opacity: 1;
        }
        100% {
          left: 140px;
          opacity: 0;
        }
      }
      @-ms-keyframes uil-ellipsis {
        0% {
          -ms-transform: scale(0);
          -moz-transform: scale(0);
          -webkit-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          left: 0px;
          opacity: 1;
        }
        12.5% {
          -ms-transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
        }
        25% {
          left: 0px;
        }
        37.5% {
          left: 70px;
        }
        50% {
          left: 70px;
        }
        62.5% {
          left: 140px;
        }
        75% {
          left: 140px;
          -ms-transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
        }
        87.5% {
          left: 140px;
          -ms-transform: scale(0);
          -moz-transform: scale(0);
          -webkit-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          opacity: 1;
        }
        100% {
          left: 140px;
          opacity: 0;
        }
      }
      @-moz-keyframes uil-ellipsis {
        0% {
          -ms-transform: scale(0);
          -moz-transform: scale(0);
          -webkit-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          left: 0px;
          opacity: 1;
        }
        12.5% {
          -ms-transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
        }
        25% {
          left: 0px;
        }
        37.5% {
          left: 70px;
        }
        50% {
          left: 70px;
        }
        62.5% {
          left: 140px;
        }
        75% {
          left: 140px;
          -ms-transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
        }
        87.5% {
          left: 140px;
          -ms-transform: scale(0);
          -moz-transform: scale(0);
          -webkit-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          opacity: 1;
        }
        100% {
          left: 140px;
          opacity: 0;
        }
      }
      @-webkit-keyframes uil-ellipsis {
        0% {
          -ms-transform: scale(0);
          -moz-transform: scale(0);
          -webkit-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          left: 0px;
          opacity: 1;
        }
        12.5% {
          -ms-transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
        }
        25% {
          left: 0px;
        }
        37.5% {
          left: 70px;
        }
        50% {
          left: 70px;
        }
        62.5% {
          left: 140px;
        }
        75% {
          left: 140px;
          -ms-transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
        }
        87.5% {
          left: 140px;
          -ms-transform: scale(0);
          -moz-transform: scale(0);
          -webkit-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          opacity: 1;
        }
        100% {
          left: 140px;
          opacity: 0;
        }
      }
      @-o-keyframes uil-ellipsis {
        0% {
          -ms-transform: scale(0);
          -moz-transform: scale(0);
          -webkit-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          left: 0px;
          opacity: 1;
        }
        12.5% {
          -ms-transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
        }
        25% {
          left: 0px;
        }
        37.5% {
          left: 70px;
        }
        50% {
          left: 70px;
        }
        62.5% {
          left: 140px;
        }
        75% {
          left: 140px;
          -ms-transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
        }
        87.5% {
          left: 140px;
          -ms-transform: scale(0);
          -moz-transform: scale(0);
          -webkit-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          opacity: 1;
        }
        100% {
          left: 140px;
          opacity: 0;
        }
      }
      @keyframes uil-ellipsis {
        0% {
          -ms-transform: scale(0);
          -moz-transform: scale(0);
          -webkit-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          left: 0px;
          opacity: 1;
        }
        12.5% {
          -ms-transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
        }
        25% {
          left: 0px;
        }
        37.5% {
          left: 70px;
        }
        50% {
          left: 70px;
        }
        62.5% {
          left: 140px;
        }
        75% {
          left: 140px;
          -ms-transform: scale(1);
          -moz-transform: scale(1);
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
        }
        87.5% {
          left: 140px;
          -ms-transform: scale(0);
          -moz-transform: scale(0);
          -webkit-transform: scale(0);
          -o-transform: scale(0);
          transform: scale(0);
          opacity: 1;
        }
        100% {
          left: 140px;
          opacity: 0;
        }
      }
      .uil-ellipsis-css {
        background: none;
        position: relative;
        width: 200px;
        height: 200px;
      }
      .uil-ellipsis-css .ib {
        width: 100%;
        height: 100%;
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      .uil-ellipsis-css .circle {
        width: 60px;
        height: 60px;
        position: absolute;
        top: 70px;
        opacity: 0;
        text-align: center;
        -ms-animation: uil-ellipsis 1.5s linear infinite;
        -moz-animation: uil-ellipsis 1.5s linear infinite;
        -webkit-animation: uil-ellipsis 1.5s linear infinite;
        -o-animation: uil-ellipsis 1.5s linear infinite;
        animation: uil-ellipsis 1.5s linear infinite;
      }
      .uil-ellipsis-css .circle > div {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        margin: 0px;
      }
      .uil-ellipsis-css .circle:nth-of-type(2n+1) > div {
        background: #403d3d;
      }
      .uil-ellipsis-css .circle:nth-of-type(2n) > div {
        background: #808a80;
      }
      .circle:nth-of-type(1) {
        -ms-animation-delay: 0s;
        -moz-animation-delay: 0s;
        -webkit-animation-delay: 0s;
        -o-animation-delay: 0s;
        animation-delay: 0s;
      }
      .circle:nth-of-type(2) {
        -ms-animation-delay: 0.375s;
        -moz-animation-delay: 0.375s;
        -webkit-animation-delay: 0.375s;
        -o-animation-delay: 0.375s;
        animation-delay: 0.375s;
      }
      .circle:nth-of-type(3) {
        -ms-animation-delay: 0.75s;
        -moz-animation-delay: 0.75s;
        -webkit-animation-delay: 0.75s;
        -o-animation-delay: 0.75s;
        animation-delay: 0.75s;
      }
      .circle:nth-of-type(4) {
        -ms-animation-delay: 1.125s;
        -moz-animation-delay: 1.125s;
        -webkit-animation-delay: 1.125s;
        -o-animation-delay: 1.125s;
        animation-delay: 1.125s;
      }
    </style>
    <script>

    </script>
  </head>
  <body>
    <div id="rl-black" style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.6);"></div>

  </body>
</html>
