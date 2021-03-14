<!-- index -->
<template>
    <div>
      Index        <wbc-nav></wbc-nav>
        <div class="container">
            <el-row  :gutter="30">
                <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
                    <wbc-sharelist></wbc-sharelist>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import header from '../components/header.vue'
import temSharelist from '../components/temSharelist.vue'
    export default {
        name:'Home',
        data() {
            return {

            }
        },
        methods: {

        },
        components: {
            'wbc-nav':header,
            'wbc-sharelist':temSharelist,
        },
        created() {

        }
    }
</script>

<style>

</style>
