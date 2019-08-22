<template>
	<div>
		<div class="logo">上品服务平台</div>
		<div class="admin">
			<el-dropdown  split-button>
			  <span class="el-dropdown-link">
			    <i class="el-icon-user-solid el-icon--left"></i>{{this.$store.state.loginName}}
			  </span>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item>注销</el-dropdown-item>
			    <el-dropdown-item>修改密码</el-dropdown-item>
			    
			  </el-dropdown-menu>
			</el-dropdown>
		</div> 
	</div>
 
</template>

<script>
export default {
  name: 'HomeTop',
  props: {
    msg: String
  },
	created:function(){
		this.loginName=this.$store.state.loginName;
	},
	data(){
		return{
			loginName:this.$store.state.loginName
		}
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.logo{
	background: #ff6238;
	width: 200px;
	line-height: 60px;
	text-align: center;
	color: #fff;
	font-weight: bold;
	font-size: 20px;
}
.admin{
	position: absolute;
    right: 10px;
    top: 0;
}
</style>
