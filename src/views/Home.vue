
<template>
<el-container class="layout-body">
  
 <el-header style="text-align: right; font-size: 12px;padding: 0;">
   <HomeTop msg="我来组成头部" />
 </el-header>
  <el-container>
    <HomeLeft />
    
    <el-main style="background: #fff; margin: 15px;">
      <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
// @ is an alias to /src
import HomeTop from '../components/HomeTop.vue';
import HomeLeft from '../components/HomeLeft.vue';

export default {
  name: 'home',
  components: {
    HomeTop,HomeLeft
  }
}
</script>



<style>
	.el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
  }
  .layout-body{
		position:fixed;
		width:100%;
		height:100%;
	}
	
  .el-aside {
    color: #333;
  }
	.layout-body{
		background: #f1f4f5;
	}
</style>
