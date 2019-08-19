import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export const FlowerPrefix = props => {
    const {containerStyles} = props;

    return (
        <View style={[containerStyles]}>
            <Svg width="69" height="134" viewBox="0 0 69 134" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path
                    d="M75.2964 95.5123C76.203 95.2526 76.7275 94.3107 76.4692 93.4088L75.6923 90.6965C75.434 89.7946 74.4904 89.2732 73.5837 89.5329C72.677 89.7926 72.1526 90.7345 72.4109 91.6364L73.1878 94.3487C73.4461 95.2505 74.3905 95.7717 75.2964 95.5123Z"
                    fill="#F7C041"/>
                <Path
                    d="M48.2554 103.257C49.162 102.998 49.6865 102.056 49.4282 101.154L48.6513 98.4417C48.393 97.5398 47.4494 97.0184 46.5427 97.2781C45.6369 97.5375 45.1116 98.4797 45.3699 99.3815L46.1468 102.094C46.4051 102.996 47.3495 103.517 48.2554 103.257Z"
                    fill="#F7C041"/>
                <Path
                    d="M61.9486 99.9881C63.5107 99.5406 64.7327 98.3511 65.2177 96.8064C65.4991 95.9102 64.9986 94.9571 64.0988 94.679C63.7701 94.5771 62.4073 94.4583 61.9617 95.7984C61.7472 96.4407 61.2308 96.6586 61.0129 96.721C60.7958 96.7832 60.2338 96.8806 59.7203 96.4404C59.0062 95.8293 57.9291 95.9104 57.3138 96.6224C56.6985 97.3344 56.7777 98.4082 57.4909 99.0195C58.721 100.073 60.3874 100.435 61.9486 99.9881Z"
                    fill="#F7C041"/>
                <Path
                    d="M92.0572 68.9175C90.617 63.8893 85.3376 60.9753 80.2873 62.4218L75.6112 63.7611C71.4422 59.7005 64.6443 57.7544 57.2768 58.3227L53.5121 45.1788C54.2498 44.9426 54.9915 44.6556 55.7323 44.3109C60.1784 42.2429 64.1151 38.4355 66.8172 33.5908C68.3357 30.8672 69.3656 28.0065 69.8794 25.0902C70.0415 24.1647 69.4216 23.2854 68.4927 23.1252C67.5658 22.9654 66.6811 23.5861 66.518 24.5111C66.0708 27.0529 65.1681 29.554 63.8352 31.9445C60.6374 37.6797 55.6402 41.4779 50.8862 42.3544L58.6342 28.4584C60.2927 25.484 59.3325 21.4958 56.2342 20.079C51.9603 18.1252 48.6211 21.049 47.8178 22.4896L40.0698 36.3856C39.9881 36.1779 37.0242 29.2617 42.0915 19.9457C44.4012 15.7003 47.8332 12.4259 51.6314 10.6595C55.2456 8.97995 58.7849 8.90798 61.5966 10.4603C64.1873 11.8899 65.9567 14.6199 66.5795 18.1469C66.7426 19.0714 67.6272 19.6871 68.5547 19.5227C69.4831 19.358 70.1028 18.4744 69.94 17.5508C69.1362 12.9948 66.7625 9.42067 63.2559 7.48561C60.2127 5.8063 56.6237 5.49481 52.9321 6.55217C43.5134 9.24991 38.8679 18.747 38.7502 18.9722C38.538 18.848 29.6156 13.2223 20.1387 15.9367C16.4591 16.9906 13.5872 19.1471 11.8942 22.172C9.77915 25.951 9.79451 30.5726 11.9365 35.1843C13.9949 39.6138 17.7998 43.5329 22.6529 46.2211C28.3352 49.3696 34.7652 50.39 40.0923 49.0317L43.8578 62.1782C37.3375 65.5979 32.5639 70.8611 31.1778 76.4879L26.5035 77.8268C21.4532 79.2733 18.5162 84.5407 19.9564 89.5689C21.1515 93.7412 25.0395 96.5235 29.2936 96.4327L42.6285 121.499C44.9455 125.853 50.0833 128.024 54.8457 126.66L82.096 118.855C86.8584 117.491 90.0676 112.929 89.728 108.008L87.7703 79.6827C91.39 77.5256 93.2659 73.1374 92.0572 68.9175ZM50.7997 24.1358C51.5438 22.8015 53.2374 22.3164 54.5751 23.0545C55.9136 23.7924 56.3966 25.4787 55.6517 26.8133L46.9748 42.3765C44.2733 42.2904 42.7611 40.3843 42.1228 39.699L50.7997 24.1358ZM37.345 39.4399L28.5559 34.5705C27.9086 34.2118 26.3863 32.6677 27.4853 30.81C28.5849 28.9512 30.6158 29.3757 31.2632 29.7343L35.735 32.2113C36.065 35.3002 37.345 39.4399 37.345 39.4399ZM24.3158 43.2491C20.0878 40.9066 16.7914 37.5332 15.0339 33.7504C13.3613 30.1512 13.3046 26.625 14.8736 23.8226C16.4424 21.0193 19.4679 19.0278 23.4418 18.73C31.5226 18.1241 37.0476 21.9216 37.3431 22.1011C36.5613 24.1718 36.0521 26.284 35.8242 28.3681L32.9263 26.7632C31.4831 25.9632 26.9121 24.693 24.5066 29.1591C22.1003 33.6255 25.449 36.7428 26.8922 37.5427L38.6704 44.0674L39.1558 45.7621C34.6815 46.8697 29.2164 45.9642 24.3158 43.2491ZM42.2452 44.1518C42.3863 44.2376 45.1823 46.6035 50.1627 45.8813L53.8528 58.7648C52.6958 58.9738 51.5338 59.2394 50.3725 59.572C49.2138 59.9039 48.0865 60.294 46.9933 60.7323L42.2444 44.1521L42.2452 44.1518ZM51.3085 62.8399C58.9489 60.6515 66.8203 61.5325 71.6453 64.8971L35.1326 75.3552C37.4312 69.9024 43.6006 65.0477 51.3085 62.8399ZM84.5749 77.3915L36.6567 91.1164C35.7501 91.3761 35.2256 92.318 35.4839 93.2199C35.7424 94.1226 36.6858 94.6431 37.5925 94.3834L84.4382 80.9657L86.323 108.249C86.5535 111.578 84.3816 114.664 81.16 115.587L53.9088 123.393C50.6872 124.315 47.2115 122.846 45.6436 119.9L31.7832 93.8453L31.7809 93.8469C31.4511 93.2279 30.7558 92.8535 30.0196 92.9659C26.9946 93.4291 24.0786 91.5642 23.2378 88.629C22.3138 85.4028 24.1989 82.0219 27.4393 81.0938L81.223 65.6889C84.4634 64.7607 87.8526 66.6309 88.7766 69.8572C89.7007 73.0833 87.8153 76.4634 84.5749 77.3915Z"
                    fill="#F7C041"/>
            </Svg>
        </View>
    );
};

export const FlowerSuffix = (props) => {
    const {containerStyles} = props;

    return (
        <View style={[containerStyles]}>
            <Svg width="36" height="134" viewBox="0 0 36 134" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path
                    d="M6.29635 95.5124C7.20302 95.2527 7.7275 94.3108 7.46919 93.4089L6.69231 90.6966C6.434 89.7948 5.49038 89.2733 4.58371 89.533C3.67705 89.7927 3.15257 90.7346 3.41087 91.6365L4.18775 94.3488C4.44606 95.2507 5.39054 95.7718 6.29635 95.5124Z"
                    fill="#F7C041"/>
                <Path
                    d="M-20.7446 103.258C-19.838 102.998 -19.3135 102.056 -19.5718 101.154L-20.3487 98.4418C-20.607 97.5399 -21.5506 97.0185 -22.4573 97.2782C-23.3631 97.5376 -23.8884 98.4798 -23.6301 99.3817L-22.8532 102.094C-22.5949 102.996 -21.6505 103.517 -20.7446 103.258Z"
                    fill="#F7C041"/>
                <Path
                    d="M-7.05136 99.9882C-5.48927 99.5408 -4.26733 98.3512 -3.78234 96.8065C-3.50091 95.9103 -4.00136 94.9572 -4.90116 94.6791C-5.22994 94.5772 -6.59267 94.4585 -7.03826 95.7985C-7.2528 96.4408 -7.76922 96.6587 -7.98713 96.7211C-8.20418 96.7833 -8.76619 96.8808 -9.27972 96.4405C-9.99382 95.8294 -11.0709 95.9105 -11.6862 96.6225C-12.3015 97.3346 -12.2223 98.4083 -11.5091 99.0197C-10.279 100.073 -8.61261 100.435 -7.05136 99.9882Z"
                    fill="#F7C041"/>
                <Path
                    d="M23.0572 68.9176C21.617 63.8895 16.3376 60.9754 11.2873 62.4219L6.61123 63.7613C2.44217 59.7007 -4.35566 57.7545 -11.7232 58.3228L-15.4879 45.1789C-14.7502 44.9427 -14.0085 44.6558 -13.2677 44.311C-8.82163 42.2431 -4.88488 38.4357 -2.18285 33.5909C-0.66427 30.8673 0.365649 28.0067 0.87941 25.0904C1.04148 24.1648 0.42163 23.2855 -0.507282 23.1253C-1.43424 22.9655 -2.31887 23.5862 -2.48205 24.5112C-2.92922 27.0531 -3.83189 29.5542 -5.16477 31.9446C-8.36257 37.6799 -13.3598 41.478 -18.1138 42.3545L-10.3658 28.4585C-8.70731 25.4841 -9.66748 21.4959 -12.7658 20.0791C-17.0397 18.1254 -20.3789 21.0491 -21.1822 22.4897L-28.9302 36.3857C-29.0119 36.178 -31.9758 29.2618 -26.9085 19.9458C-24.5988 15.7004 -21.1668 12.4261 -17.3686 10.6597C-13.7544 8.98007 -10.2151 8.90811 -7.40342 10.4604C-4.81271 11.89 -3.04326 14.62 -2.42048 18.147C-2.25739 19.0715 -1.37277 19.6872 -0.445282 19.5228C0.483062 19.3582 1.10284 18.4745 0.939988 17.5509C0.136224 12.995 -2.23748 9.42079 -5.74412 7.48573C-8.78729 5.80642 -12.3763 5.49493 -16.0679 6.55229C-25.4866 9.25004 -30.1321 18.7472 -30.2498 18.9724C-30.462 18.8481 -39.3844 13.2224 -48.8613 15.9368C-52.5409 16.9907 -55.4128 19.1473 -57.1058 22.1721C-59.2208 25.9512 -59.2055 30.5727 -57.0635 35.1845C-55.0051 39.614 -51.2002 43.5331 -46.3471 46.2212C-40.6648 49.3697 -34.2348 50.3901 -28.9077 49.0319L-25.1422 62.1783C-31.6625 65.598 -36.4361 70.8612 -37.8222 76.488L-42.4965 77.8269C-47.5468 79.2734 -50.4838 84.5408 -49.0436 89.569C-47.8485 93.7413 -43.9605 96.5236 -39.7064 96.4328L-26.3715 121.499C-24.0545 125.853 -18.9167 128.024 -14.1543 126.66L13.096 118.855C17.8584 117.491 21.0676 112.929 20.728 108.008L18.7703 79.6828C22.39 77.5257 24.2659 73.1376 23.0572 68.9176ZM-18.2003 24.136C-17.4562 22.8016 -15.7626 22.3165 -14.4249 23.0546C-13.0864 23.7925 -12.6034 25.4788 -13.3483 26.8134L-22.0252 42.3766C-24.7267 42.2905 -26.2389 40.3844 -26.8772 39.6991L-18.2003 24.136ZM-31.655 39.44L-40.4441 34.5706C-41.0914 34.212 -42.6137 32.6678 -41.5147 30.8101C-40.4151 28.9513 -38.3842 29.3758 -37.7368 29.7345L-33.265 32.2115C-32.935 35.3004 -31.655 39.44 -31.655 39.44ZM-44.6842 43.2492C-48.9122 40.9068 -52.2086 37.5333 -53.9661 33.7505C-55.6387 30.1513 -55.6954 26.6251 -54.1264 23.8227C-52.5576 21.0194 -49.5321 19.0279 -45.5582 18.7302C-37.4774 18.1243 -31.9524 21.9217 -31.6569 22.1012C-32.4387 24.1719 -32.9479 26.2841 -33.1758 28.3682L-36.0737 26.7633C-37.5169 25.9633 -42.0879 24.6931 -44.4934 29.1592C-46.8997 33.6257 -43.551 36.7429 -42.1078 37.5429L-30.3296 44.0675L-29.8442 45.7623C-34.3185 46.8698 -39.7836 45.9643 -44.6842 43.2492ZM-26.7548 44.152C-26.6137 44.2377 -23.8177 46.6037 -18.8373 45.8814L-15.1472 58.765C-16.3042 58.9739 -17.4662 59.2395 -18.6275 59.5722C-19.7862 59.9041 -20.9135 60.2941 -22.0067 60.7324L-26.7556 44.1522L-26.7548 44.152ZM-17.6915 62.84C-10.0511 60.6517 -2.17967 61.5326 2.64532 64.8972L-33.8674 75.3553C-31.5688 69.9025 -25.3994 65.0478 -17.6915 62.84ZM15.5749 77.3916L-32.3433 91.1165C-33.2499 91.3762 -33.7744 92.3181 -33.5161 93.22C-33.2576 94.1227 -32.3142 94.6433 -31.4075 94.3836L15.4382 80.9658L17.323 108.249C17.5535 111.578 15.3816 114.665 12.16 115.587L-15.0912 123.393C-18.3128 124.315 -21.7885 122.847 -23.3564 119.901L-37.2168 93.8454L-37.2191 93.847C-37.5489 93.228 -38.2442 92.8537 -38.9804 92.966C-42.0054 93.4292 -44.9214 91.5644 -45.7622 88.6291C-46.6862 85.4029 -44.8011 82.022 -41.5607 81.0939L12.223 65.689C15.4634 64.7608 18.8526 66.6311 19.7766 69.8573C20.7007 73.0835 18.8153 76.4635 15.5749 77.3916Z"
                    fill="#F7C041"/>
            </Svg>
        </View>
    );
};