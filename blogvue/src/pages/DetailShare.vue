<!-- detail article -->
<template>
    <div>
        <wbc-nav></wbc-nav>
        <div  class="container" id="detail">
            <el-row  :gutter="30">
                <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
                    <wbc-detail></wbc-detail>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import header from '../components/header.vue'
import temDetail from '../components/temDetail.vue'
    export default {
        name:'DetailShare',
        data() {
            return {
            }
        },
        methods: {

        },
        components: {
            'wbc-nav':header,
            'wbc-detail':temDetail,
        },
        created() {

        },
        mounted(){
        }
    }
</script>

<style>

</style>
