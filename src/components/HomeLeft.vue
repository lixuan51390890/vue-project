<template>
	<el-aside width="200px" style="background: #545c64;">
		<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
			
			<el-submenu class="item-left"  v-bind:index="list.name" v-for="(list,index) in sources">
				<template slot="title">
					<!-- <i class="el-icon-location"></i> -->
					<span>{{list.name}}</span>
				</template>
				<el-menu-item-group  v-for="listChild in list.child">
					<template slot="title">{{listChild.childName}}</template>
					<el-menu-item @click="openNewLink(listChildEnd.data_url)" v-bind:index="listChildEnd.grandName" v-for="listChildEnd in listChild.grandson">{{listChildEnd.grandName}}</el-menu-item>
				</el-menu-item-group>
			
			</el-submenu>

		</el-menu>
	</el-aside>

</template>
<script>
	export default {
		name: "HomeLeft",
		data(){
			return {
				sources:""
			}
				
		},
		created: function() {
			this.getSources()
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			openNewLink(index){
				console.log(index)
				this.$router.push('/'+index)
			},
			getSources: function() {
				var datas = {
					"sys_uLoginName": "lixuan"
				};
				var datas = new FormData();
				datas.set("sys_uLoginName", "lixuan")
				
				axios
					.post(this.$api.url.getSourcesByUserName, datas, {
						headers: {
							"Content-Type": "multipart/from-data",
						}
					})
					.then(response => {

						var result = response;
						
						this.sources=result.data;
						
						console.log(this.sources)

					}).catch(function(error) {
						console.log(error);
					})



			}
		}
	}
</script>

<style>
	.item-left {
		text-align: left;
	}
</style>
