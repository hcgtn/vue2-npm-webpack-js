<template>
    <div>
        <MultipageImgViewBox class="aaa" :images="images"></MultipageImgViewBox>
    </div>
</template>
  
<script>
import MultipageImgViewBox from './MultipageImgViewBox'
export default {
    name: 'ActionTestPage',
    components: {
        MultipageImgViewBox
    },
    props: {

    },
    data() {
        return {
            images: [
                // "http://v18.oss-cn-shanghai.aliyuncs.com/public/productOverview/CN_50180000_005994_FA010080_20230002_005994_20230818_080000_01-1.jpg",
                // "http://v18.oss-cn-shanghai.aliyuncs.com/public/productOverview/CN_50180000_005994_FA010080_20230002_005994_20230818_080000_01-2.jpg",
                // "http://v18.oss-cn-shanghai.aliyuncs.com/public/productOverview/CN_50180000_005994_FA010080_20230002_005994_20230818_080000_01-3.jpg",
                // "http://v18.oss-cn-shanghai.aliyuncs.com/public/productOverview/CN_50180000_005994_FA010080_20230002_005994_20230818_080000_01-4.jpg",
                // "http://v18.oss-cn-shanghai.aliyuncs.com/public/productOverview/CN_50180000_005994_FA010080_20230002_005994_20230818_080000_01-5.jpg",
                // "http://v18.oss-cn-shanghai.aliyuncs.com/public/productOverview/CN_50180000_005994_FA010080_20230002_005994_20230818_080000_01-6.jpg",
                // '/static/imgs/1.jpg',
                // '/static/imgs/2.jpg',
                // '/static/imgs/3.jpg',
                // '/static/imgs/4.jpg',
                // '/static/imgs/5.jpg',
                // '/static/imgs/6.jpg',
                // '/static/imgs/7.jpg',
                // '/static/imgs/8.jpg',
                '/static/imgs/9.jpg',
                '/static/imgs/91.jpg',
                'http://r.ubssdic.com/public/productOverview/CN_50180000_010423_FA010080_20230003_010423_20230718_080000_01-2.jpg',
            ]
        }
    },
}
</script>
  
<style  scoped>
.aaa {
    border: 1px solid #000;
    width: 100%;
}
</style>
    