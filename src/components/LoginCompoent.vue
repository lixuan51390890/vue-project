<template>

	<el-container class="loginBg">


		<el-form :model="dataForm" :rules="rules" ref="dataForm" class="demo-dynamic">
			<el-form-item><img class="logo" alt="sp logo" src="../assets/logo.png"></el-form-item>
			<el-form-item prop="username">
				<el-input prefix-icon="el-icon-user-solid" v-model="dataForm.username"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input prefix-icon="el-icon-lock" v-model="dataForm.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-checkbox class="checkPwd">记住密码</el-checkbox>
				<!-- <a href="" class="pwdrest">忘记密码？</a> -->
				<el-link type="info" class="pwdrest">忘记密码？</el-link>
			</el-form-item>
			<el-form-item class="loginBlock">
				<el-button class="loginBtn" v-on:click="loginFun('dataForm')" type="success">提交</el-button>
				<el-button class="reset" @click="resetForm('dataForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-container>

</template>

<script>
	
	export default {
		name: 'LoginCompoent',
		data() {
			return {
				dataForm: {
					username: "",
					password: ""
				},
				rules: {
					username: [{
						required: true,
						message: "请输入用户名"
					}],
					password: [{
						required: true,
						message: "请输入密码"
					}]
				}
			}

		},
		methods: {
			loginFun: function(formName) {


				this.$refs[formName].validate((valid) => {
					if (valid) {
						// var datas = new FormData();
						// datas.set("sys_uLoginName", this.dataForm.username)
						// datas.set("sys_uPwd", this.dataForm.password)
						// console.log(datas)
						var datas = {};
						datas.sys_uLoginName = this.dataForm.username;
						datas.sys_uPwd = this.dataForm.password;
						const loading = this.$loading({
							lock: true,
							text: '正在登录请稍后....',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						});

						axios
							.post(this.$api.url.login, this.$qs.stringify(datas))
							.then(response => {

								var result = response;
								console.log(result)
								if (result.data.success == true) {
									loading.close();
									this.$message({
										message: result.data.msg,
										type: 'success'
									});
									this.$store.commit("setUserName",this.dataForm.username)
									this.$router.push("./home")
								} else {
									loading.close();
									this.$message.error(result.data.msg)
								}

							}).catch(function(error) {
								loading.close();
								console.log(error);
							})
					} else {
						console.log('error submit!!');
						return false;
					}
				});


			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}

	}
</script>

<style scoped>
	.demo-dynamic {
		width: 25%;
		min-width: 200px;
		text-align: center;
		margin: 120px auto;
	}

	.loginBg {
		background: #f2f2f2;
		position:fixed;
		width:100%;
		height:100%;
	}

	.loginBtn,
	.reset {
		width: 45%
	}

	.loginBtn {
		float: left;
	}

	.reset {
		float: right;
	}

	.checkPwd {
		float: left;
		line-height: 0px;
	}

	.pwdrest {
		float: right;

		line-height: 0px;

		display: inline-block;

		line-height: 19px;
		/* padding-right: 5px; */
		color: #e6a23c;
		font-size: 14px;
	}

	.logo {
		width: 100%;
		min-width: 200px;
	}
</style>
