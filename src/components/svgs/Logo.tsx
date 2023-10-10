import React from "react";

interface Props {
  color?: string;
  height?: string;
}

export const Logo: React.FC<Props> = ({
  color = "white",
  height = "219px",
}) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height }}
      viewBox="0 50 550 370"
    >
      <g
        fill={color}
        fill-rule="nonzero"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
        style={{ mixBlendMode: "normal" }}
      >
        <g data-paper-data='{"isGlobalGroup":true,"bounds":{"x":73.88731219923679,"y":115,"width":402.22537560152637,"height":240}}'>
          <g data-paper-data='{"isPrimaryText":true}' id="element-id-96374">
            <path
              d="M77.20084,314.8695c5.15438,0 9.57241,0 14.72679,0c5.76799,0 11.84279,2.3931 11.90415,9.08152c0,6.81114 -6.93386,8.09973 -12.33368,8.09973h-14.29726zM77.20084,295.11107h14.29726c5.33846,0 10.98373,2.63855 10.98373,8.89743c0,6.13616 -5.39982,7.73156 -10.5542,7.73156h-14.72679zM91.4981,292.28843c-6.25888,0 -11.41326,0 -17.61078,0v42.95313c6.25888,0 11.3519,0 17.61078,0c7.36339,0 15.58585,-2.3931 15.58585,-11.22918c0,-4.97029 -3.06808,-9.32697 -8.4679,-10.79964c4.29531,-1.34996 6.99522,-4.78621 6.99522,-9.20424c0,-8.16109 -6.8725,-11.72007 -14.11317,-11.72007z"
              data-paper-data='{"glyphName":"B","glyphIndex":0,"firstGlyphOfWord":true,"word":1}'
              id="element-id-2494"
            ></path>
            <path
              d="M141.81462,335.24156v-30.374h-3.00672v16.87444c0,6.25888 -4.35667,10.98373 -10.61556,11.04509c-6.56569,0.06136 -10.79964,-3.62034 -10.79964,-10.49284v-17.4267h-3.00672v17.48806c0,8.40654 5.58391,13.37683 13.68364,13.37683c4.23395,-0.06136 8.4679,-1.77949 10.79964,-5.95208v5.46118z"
              data-paper-data='{"glyphName":"u","glyphIndex":1,"word":1}'
              id="element-id-97385"
            ></path>
            <path
              d="M163.41391,307.32203c6.99522,0 12.39505,5.15438 12.39505,12.70185c0,7.54748 -5.2771,12.76322 -12.39505,12.76322c-6.81114,0 -12.39505,-4.29531 -12.39505,-12.70185c0,-8.52926 5.58391,-12.76322 12.39505,-12.76322zM175.87031,292.28843v19.26755c-2.45446,-4.90893 -7.36339,-7.11795 -12.57913,-7.11795c-8.4679,0 -15.21768,5.64527 -15.21768,15.64721c0,10.0633 6.68842,15.64721 15.15632,15.64721c5.15438,0 10.12467,-2.57719 12.64049,-7.17931v6.68842h2.94536v-42.95313z"
              data-paper-data='{"glyphName":"d","glyphIndex":2,"word":1}'
              id="element-id-16403"
            ></path>
            <path
              d="M208.88286,307.13794c-2.33174,-1.65676 -5.52255,-2.76127 -8.59063,-2.76127c-7.85429,0 -14.23589,5.33846 -14.23589,14.78815c0,8.09973 5.46118,14.66543 14.23589,14.66543c5.64527,0 11.47462,2.57719 11.47462,9.08152c0,6.44297 -5.39982,9.14288 -11.47462,9.14288c-6.0748,0 -11.3519,-2.94536 -11.3519,-9.14288h-3.00672c0,7.6702 6.32025,12.08824 14.35862,12.08824c8.03837,0 14.41998,-3.92714 14.41998,-12.08824c0,-5.21574 -2.94536,-8.9588 -8.28382,-10.86101c5.03165,-2.27038 8.16109,-7.60884 8.16109,-12.88594c0,-4.90893 -1.5954,-7.97701 -3.74306,-10.30875l2.94536,-3.43625l-1.96357,-1.71813zM200.29224,307.38339c6.25888,0 11.3519,4.11123 11.3519,11.78143c0,6.25888 -5.09301,11.65871 -11.3519,11.65871c-6.93386,0 -11.22918,-5.39982 -11.22918,-11.65871c0,-7.91565 5.03165,-11.78143 11.22918,-11.78143z"
              data-paper-data='{"glyphName":"g","glyphIndex":3,"word":1}'
              id="element-id-43577"
            ></path>
            <path
              d="M234.47065,335.67109c4.84757,0 10.12467,-1.96357 13.07002,-5.82935l-2.14766,-1.71813c-2.27038,3.00672 -6.93386,4.60212 -10.92237,4.60212c-6.25888,0 -11.72007,-4.11123 -12.33368,-11.22918h27.30592c1.16587,-11.84279 -6.44297,-17.05853 -14.97223,-17.05853c-8.52926,0 -15.40176,6.56569 -15.40176,15.64721c0,9.63377 6.8725,15.58585 15.40176,15.58585zM222.13697,318.85801c0.67498,-7.42476 6.0748,-11.65871 12.33368,-11.65871c7.30203,0 12.21096,4.17259 12.27232,11.65871z"
              data-paper-data='{"glyphName":"e","glyphIndex":4,"word":1}'
              id="element-id-37276"
            ></path>
            <path
              d="M261.22432,296.09285v8.83607h-6.44297v2.51583h6.44297v18.46985c0,5.95208 2.08629,9.7565 8.52926,9.7565c1.90221,0 3.80442,-0.61362 5.70663,-1.53404l-1.04315,-2.45446c-1.53404,0.73634 -3.1908,1.22723 -4.66348,1.22723c-4.72484,0 -5.58391,-2.884 -5.58391,-6.99522v-18.46985h10.30875v-2.51583h-10.30875v-9.14288z"
              data-paper-data='{"glyphName":"t","glyphIndex":5,"lastGlyphOfWord":true,"word":1}'
              id="element-id-25969"
            ></path>
            <path
              d="M302.21388,314.8695c5.15438,0 9.57241,0 14.72679,0c5.76799,0 11.84279,2.3931 11.90415,9.08152c0,6.81114 -6.93386,8.09973 -12.33368,8.09973h-14.29726zM302.21388,295.11107h14.29726c5.33846,0 10.98373,2.63855 10.98373,8.89743c0,6.13616 -5.39982,7.73156 -10.5542,7.73156h-14.72679zM316.51113,292.28843c-6.25888,0 -11.41326,0 -17.61078,0v42.95313c6.25888,0 11.3519,0 17.61078,0c7.36339,0 15.58585,-2.3931 15.58585,-11.22918c0,-4.97029 -3.06808,-9.32697 -8.4679,-10.79964c4.29531,-1.34996 6.99522,-4.78621 6.99522,-9.20424c0,-8.16109 -6.8725,-11.72007 -14.11317,-11.72007z"
              data-paper-data='{"glyphName":"B","glyphIndex":6,"firstGlyphOfWord":true,"word":2}'
              id="element-id-51474"
            ></path>
            <path
              d="M366.82765,335.24156v-30.374h-3.00672v16.87444c0,6.25888 -4.35667,10.98373 -10.61556,11.04509c-6.56569,0.06136 -10.79964,-3.62034 -10.79964,-10.49284v-17.4267h-3.00672v17.48806c0,8.40654 5.58391,13.37683 13.68364,13.37683c4.23395,-0.06136 8.4679,-1.77949 10.79964,-5.95208v5.46118z"
              data-paper-data='{"glyphName":"u","glyphIndex":7,"word":2}'
              id="element-id-26760"
            ></path>
            <path
              d="M388.42694,307.32203c6.99522,0 12.39505,5.15438 12.39505,12.70185c0,7.54748 -5.2771,12.76322 -12.39505,12.76322c-6.81114,0 -12.39505,-4.29531 -12.39505,-12.70185c0,-8.52926 5.58391,-12.76322 12.39505,-12.76322zM400.88335,292.28843v19.26755c-2.45446,-4.90893 -7.36339,-7.11795 -12.57913,-7.11795c-8.4679,0 -15.21768,5.64527 -15.21768,15.64721c0,10.0633 6.68842,15.64721 15.15632,15.64721c5.15438,0 10.12467,-2.57719 12.64049,-7.17931v6.68842h2.94536v-42.95313z"
              data-paper-data='{"glyphName":"d","glyphIndex":8,"word":2}'
              id="element-id-21886"
            ></path>
            <path
              d="M426.16433,307.32203c6.99522,0 12.39505,5.15438 12.39505,12.70185c0,7.54748 -5.2771,12.76322 -12.39505,12.76322c-6.81114,0 -12.39505,-4.29531 -12.39505,-12.70185c0,-8.52926 5.58391,-12.76322 12.39505,-12.76322zM438.62074,292.28843v19.26755c-2.45446,-4.90893 -7.36339,-7.11795 -12.57913,-7.11795c-8.4679,0 -15.21768,5.64527 -15.21768,15.64721c0,10.0633 6.68842,15.64721 15.15632,15.64721c5.15438,0 10.12467,-2.57719 12.64049,-7.17931v6.68842h2.94536v-42.95313z"
              data-paper-data='{"glyphName":"d","glyphIndex":9,"word":2}'
              id="element-id-389"
            ></path>
            <path
              d="M472.86052,304.92892l-7.60884,17.85623l-3.49761,8.83607l-3.55897,-8.77471l-7.05659,-17.91759h-3.25217l12.1496,29.94447l-5.58391,13.00866h3.1908l18.46985,-42.95313z"
              data-paper-data='{"glyphName":"y","glyphIndex":10,"lastGlyphOfWord":true,"word":2}'
              id="element-id-61378"
            ></path>
          </g>
          <g
            data-paper-data='{"fillRule":"nonzero","fillRuleOriginal":"nonzero","isIcon":true,"iconStyle":"standalone","selectedEffects":{"container":"enclosed_circle_outline2","transformation":"","pattern":""},"bounds":{"x":196.7052176361775,"y":115,"width":156.58956472764498,"height":145.98408331582613},"widthRatioIconToContainer":0.7580276080290158,"heightRatioIconToContainer":1,"relativeBoundsIconToContainer":{"top":0,"left":0.09843616815368543},"iconType":"initial","initialText":"B","rawInitialId":339,"blockLetter":"O","suitableAsStandaloneIcon":true}'
            id="element-id-8338"
          >
            <path
              d="M332.43679,178.13364c5.31092,4.24874 9.52648,9.49328 12.64665,15.73362c3.12017,6.24034 4.68025,13.07816 4.68025,20.51345c0,6.37311 -1.22816,12.41429 -3.68446,18.12354c-2.45631,5.70925 -5.77563,10.65504 -9.95798,14.8374c-4.18236,4.18236 -9.12815,7.50168 -14.8374,9.95798c-5.70925,2.45631 -11.75043,3.68446 -18.12354,3.68446h-72.09583v-70.50255h72.09583c3.31933,0 6.40631,0.63067 9.26092,1.89202c2.85462,1.26135 5.37732,2.9874 7.56807,5.17815c2.19076,2.19076 3.9168,4.71345 5.17815,7.56807c1.26135,2.85462 1.89202,5.9416 1.89202,9.26092c0,3.31933 -0.63067,6.40631 -1.89202,9.26092c-1.26135,2.85462 -2.9874,5.37732 -5.17815,7.56807c-2.19076,2.19076 -4.71345,3.9168 -7.56807,5.17815c-2.85462,1.26135 -5.9416,1.89202 -9.26092,1.89202h-49.78994v-36.04791h-10.55547v47.0017h60.34541c4.77983,0 9.29412,-0.89622 13.54286,-2.68866c4.24874,-1.79244 7.9332,-4.28193 11.05337,-7.46849c3.12017,-3.18656 5.60966,-6.90421 7.46849,-11.15294c1.85883,-4.24874 2.78823,-8.76302 2.78823,-13.54286c0,-4.77983 -0.92942,-9.29412 -2.78823,-13.54286c-1.85883,-4.24874 -4.34832,-7.9664 -7.46849,-11.15294c-3.12017,-3.18656 -6.80463,-5.70925 -11.05337,-7.56807c-4.24874,-1.85883 -8.76302,-2.78823 -13.54286,-2.78823h-72.09583v-64.3286h62.33701c5.97479,0 11.61765,1.12857 16.92858,3.38571c5.31092,2.25715 9.95798,5.37732 13.94118,9.36051c3.98319,3.98319 7.10337,8.63025 9.36051,13.94118c2.25715,5.31092 3.38571,10.95378 3.38571,16.92858c0,6.63866 -1.52689,13.14455 -4.58067,19.51765zM242.8149,167.57817h10.55547v-29.87396h40.03111c2.921,0 5.64286,0.56429 8.16555,1.69286c2.52269,1.12857 4.71345,2.62228 6.57228,4.48109c1.85883,1.85883 3.35252,4.04958 4.48109,6.57228c1.12857,2.52269 1.69286,5.24454 1.69286,8.16555c0,3.71765 -0.79664,7.03698 -2.38992,9.95798c1.85883,0.26555 3.65126,0.69706 5.37732,1.29454c1.72605,0.59748 3.4521,1.22816 5.17815,1.89202c1.85883,-4.11596 2.78823,-8.49748 2.78823,-13.14455c0,-4.38152 -0.82983,-8.49748 -2.4895,-12.3479c-1.65966,-3.85042 -3.95,-7.23614 -6.87101,-10.15715c-2.921,-2.921 -6.30672,-5.21135 -10.15715,-6.87101c-3.85042,-1.65966 -7.9664,-2.4895 -12.3479,-2.4895h-50.58658zM295.99055,167.57817c1.9916,-0.66387 3.58487,-1.82563 4.77983,-3.48529c1.19496,-1.65966 1.79244,-3.48529 1.79244,-5.47689c0,-2.65546 -0.89622,-4.87942 -2.68866,-6.67185c-1.79244,-1.79244 -3.95,-2.68866 -6.47269,-2.68866h-28.28069v18.3227zM265.12079,226.52946h38.03951c3.31933,0 6.17395,-1.16176 8.56386,-3.48529c2.38992,-2.32353 3.58487,-5.21135 3.58487,-8.66345c0,-3.4521 -1.19496,-6.33992 -3.58487,-8.66345c-2.38992,-2.32353 -5.24454,-3.48529 -8.56386,-3.48529h-38.03951zM219.63727,132.62923c2.24564,-2.24564 4.59487,-4.33368 7.04768,-6.2641v4.17874c-1.6363,1.38167 -3.22215,2.8402 -4.75753,4.37559c-6.9259,6.9259 -12.28782,14.87854 -16.08578,23.8579c-3.93175,9.29569 -5.89763,19.03392 -5.89763,29.21471c0,10.18078 1.96588,19.91906 5.89763,29.21484c3.79794,8.97937 9.15987,16.93188 16.08578,23.85753c1.53539,1.53543 3.12122,2.994 4.75753,4.37569v4.17893c-2.4528,-1.93046 -4.80203,-4.01854 -7.04768,-6.26422c-7.22375,-7.22383 -12.8166,-15.51925 -16.77854,-24.88626c-4.10234,-9.69914 -6.15351,-19.85797 -6.15351,-30.47651c0,-10.61866 2.05116,-20.77746 6.15351,-30.47638c3.96199,-9.36725 9.55483,-17.66273 16.77854,-24.88643zM347.14171,157.51566c4.10205,9.69889 6.15308,19.85768 6.15308,30.47638c0,4.25059 -0.32866,8.42752 -0.98597,12.53079l-0.31235,-1.09061l-0.04287,-0.13977l-0.44851,-1.38964l-0.04783,-0.13915l-0.49511,-1.37288l-0.0528,-0.13852l-0.54107,-1.35548l-0.05715,-0.13604l-0.46479,-1.05955c0.13965,-1.88733 0.20947,-3.79037 0.20947,-5.70914c0,-10.1807 -1.96571,-19.91894 -5.89714,-29.21471c-0.96007,-2.26979 -2.02008,-4.47398 -3.18004,-6.61257l-0.18754,-1.30598l-0.02361,-0.14704l-0.25718,-1.43698l-0.02858,-0.14785l-0.30626,-1.42729l-0.03417,-0.14785l-0.35533,-1.41586l-0.03976,-0.14722l-0.40441,-1.40263l-0.04473,-0.1458l-0.45348,-1.38772l-0.04969,-0.14368l-0.25465,-0.69736c3.42287,4.73637 6.29035,9.83776 8.60246,15.30415z"
              data-paper-data='{"isPathIcon":true}'
              id="element-id-8578"
            ></path>
          </g>
        </g>
      </g>
      <rect
        data-element-id="element-id-96374"
        stroke-width="2"
        fill="transparent"
        className="invisible-element-box grouping-element"
        x="74"
        y="292"
        width="402"
        height="63"
        data-element-name="isPrimaryText"
      ></rect>
      <rect
        data-element-id="element-id-8338"
        stroke-width="2"
        fill="transparent"
        className="invisible-element-box grouping-element"
        x="197"
        y="115"
        width="157"
        height="146"
        data-element-name="isIcon"
      ></rect>
      <rect
        data-element-id="element-id-8578"
        stroke-width="2"
        fill="transparent"
        className="invisible-element-box individual-element"
        x="197"
        y="115"
        width="157"
        height="146"
      ></rect>
      <rect
        data-element-id="element-id-43577"
        stroke-width="2"
        fill="transparent"
        className="invisible-element-box individual-element"
        x="186"
        y="304"
        width="29"
        height="51"
      ></rect>
      <rect
        data-element-id="element-id-2494"
        stroke-width="2"
        fill="transparent"
        className="invisible-element-box individual-element"
        x="74"
        y="292"
        width="33"
        height="43"
      ></rect>
      <rect
        data-element-id="element-id-51474"
        stroke-width="2"
        fill="transparent"
        className="invisible-element-box individual-element"
        x="299"
        y="292"
        width="33"
        height="43"
      ></rect>
      <rect
        data-element-id="element-id-16403"
        stroke-width="2"
        fill="transparent"
        className="invisible-element-box individual-element"
        x="148"
        y="292"
        width="31"
        height="43"
      ></rect>
      <rect
        data-element-id="element-id-21886"
        stroke-width="2"
        fill="transparent"
        className="invisible-element-box individual-element"
        x="373"
        y="292"
        width="31"
        height="43"
      ></rect>
      <rect
        data-element-id="element-id-389"
        stroke-width="2"
        fill="transparent"
        className="invisible-element-box individual-element"
        x="411"
        y="292"
        width="31"
        height="43"
      ></rect>
      <rect
        data-element-id="element-id-61378"
        stroke-width="2"
        fill="transparent"
        className="invisible-element-box individual-element"
        x="448"
        y="305"
        width="28"
        height="43"
      ></rect>
      <rect
        data-element-id="element-id-37276"
        stroke-width="2"
        fill="transparent"
        className="invisible-element-box individual-element"
        x="219"
        y="304"
        width="30"
        height="31"
      ></rect>
      <rect
        data-element-id="element-id-25969"
        stroke-width="2"
        fill="transparent"
        className="invisible-element-box individual-element"
        x="255"
        y="296"
        width="21"
        height="40"
      ></rect>
      <rect
        data-element-id="element-id-97385"
        stroke-width="2"
        fill="transparent"
        className="invisible-element-box individual-element"
        x="114"
        y="305"
        width="27"
        height="31"
      ></rect>
      <rect
        data-element-id="element-id-26760"
        stroke-width="2"
        fill="transparent"
        className="invisible-element-box individual-element"
        x="339"
        y="305"
        width="27"
        height="31"
      ></rect>
    </svg>
  );
};
