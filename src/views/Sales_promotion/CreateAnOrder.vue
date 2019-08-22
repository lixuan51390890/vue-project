<template>
	<el-form class="formBlock" :model="formData" ref="formData" :rules="formDataRule" label-width="130px">
		<el-form-item label="活动类型:">
			<el-radio-group @change="promotionTypeCheck" v-model="formData.promotionType">
				<el-radio label="0">单品特价</el-radio>
				<el-radio label="1">折扣活动</el-radio>
				<el-radio label="4">减额活动</el-radio>
				<el-radio label="2">包邮活动</el-radio>
				<el-radio label="3">赠送活动</el-radio>
				<el-radio label="5">领取活动</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="活动名称(内显):" prop="name">
			<el-input v-model="formData.name" class="name" placeholder="请输入内显活动名称"></el-input>
		</el-form-item>
		<el-form-item label="活动名称(外显):" prop="nameAlias">
			<el-input v-model="formData.nameAlias" class="nameAlias" placeholder="请输入外显活动名称"></el-input>
		</el-form-item>
		<el-form-item v-for="(item,index) in itemArr" :key="index" label="活动时间:" prop="time">
			<el-date-picker v-model="formData.time[index]" type="datetimerange" range-separator="至" start-placeholder="开始日期"
			 end-placeholder="结束日期">
			</el-date-picker>&nbsp;&nbsp;<el-button @click="addExceptPrice">添加</el-button>&nbsp;&nbsp;<el-button @click="deleteExceptPrice(index)" v-if="index==ele">删除</el-button>
		</el-form-item>
		<el-form-item label="活动所属:">
			<el-radio-group @change="promotionFlagCheck" v-model="formData.promotionFlag">
				<el-radio label="2">供应商活动</el-radio>
				<el-radio label="1">官方活动</el-radio>
			</el-radio-group>

		</el-form-item>
		<el-form-item label="所属档期:">
			<el-radio-group @change="scheduleSidCheck" v-model="formData.scheduleSid">
				<el-radio label="1">有</el-radio>
				<el-radio label="0">无</el-radio>
				<el-select v-if="formData.scheduleSid==1" v-model="formData.dangqiSelect" placeholder="请选择">
					<el-option v-for="(item,index) in grade" :key="index" :label="item.name" :value="item.sid">
					</el-option>
				</el-select>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="活动叠加:" v-if="formData.promotionType!=5">
			<el-radio-group v-model="formData.overlyingFlag">
				<el-radio label="0">不叠加</el-radio>
				<el-radio label="1">叠加</el-radio>
			</el-radio-group>
		</el-form-item>

		<div v-if="formData.promotionType!=5">
			<el-form-item label="优惠券:" prop="couponsVal" :rules="formData.ticketOverlying==1?formDataRule.couponsVal:[{ required: false}]">
				<el-radio-group v-model="formData.ticketOverlying">
					<el-radio label="0">不叠加</el-radio>
					<el-radio label="1">叠加</el-radio>
				</el-radio-group>
				<el-checkbox-group v-if="formData.ticketOverlying==1" v-model="formData.couponsVal">
					<el-checkbox label="1001" name="couponsVal">上品券</el-checkbox>
					<el-checkbox label="1002" name="couponsVal">供应商券</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
		</div>
		<el-form-item label="运营渠道:" prop="channelInfoC">
			<el-checkbox-group v-model="formData.channelInfoC">
				<el-checkbox label="1001">王府井店</el-checkbox>
				<el-checkbox label="1002">上品+店</el-checkbox>
				<el-checkbox label="1004">五棵松店</el-checkbox>
				<el-checkbox label="1008">来广营店</el-checkbox>
				<el-checkbox label="1011">草桥店</el-checkbox>
				<el-checkbox label="1010">回龙观店</el-checkbox>
				<el-checkbox label="26">APP</el-checkbox>
				<el-checkbox label="16">微商城</el-checkbox>
				<el-checkbox label="0">本网</el-checkbox>
				<el-checkbox label="27">wap站</el-checkbox>
			</el-checkbox-group>
		</el-form-item>

		<el-form-item label="身份资格:" prop="menberInfoC" :rules="formData.members==1?formDataRule.menberInfoC:[{ required: false}]">
			<el-radio-group v-model="formData.members">
				<el-radio label="0">所有</el-radio>
				<el-radio label="1">仅会员</el-radio>
			</el-radio-group>
			<el-checkbox-group v-if="formData.members==1" v-model="formData.menberInfoC">
				<el-checkbox label="1">V1会员</el-checkbox>
				<el-checkbox label="2">V2会员</el-checkbox>
				<el-checkbox label="202">V2S会员</el-checkbox>
				<el-checkbox label="3">V3会员</el-checkbox>
				<el-checkbox label="303">V3S会员</el-checkbox>
			</el-checkbox-group>


		</el-form-item>

		<el-form-item label="价格基准:" v-if="formData.promotionType!=0 && formData.promotionType!=5">
			<el-radio-group v-model="formData.priceBasic">
				<el-radio label="1">吊牌价</el-radio>
				<el-radio label="2">现价</el-radio>
			</el-radio-group>




		</el-form-item>
		<el-form-item label="参与次数:" v-if="formData.promotionType!=0 && formData.promotionType!=1 && formData.promotionType!=4 && formData.promotionType!=2 && formData.promotionType!=3">
			<el-radio-group v-model="formData.reservedFields">
				<el-radio label="0">无限制</el-radio>
				<el-radio label="1">限每天</el-radio>
				<el-radio label="2">限活动期间</el-radio>
			</el-radio-group>
			<div v-if="formData.reservedFields!=0">每个用户参与&nbsp;&nbsp;<el-input class="innerIpt" placeholder="" v-model="formData.memberLimit">
				</el-input>&nbsp;&nbsp;次</div>




		</el-form-item>

		<!-- <el-form-item label="参活条件:" v-for="(item,index) in conditionsArr" >
			<div style="display: inline-block;" v-if="formData.promotionType==0 || formData.promotionType==5 || formData.promotionType==2 || formData.promotionType==4 || formData.promotionType==1">
				<el-form-item  prop="needPoint">
					<el-input class="innerIpt" placeholder="" v-model="(formData.promotionType!=1 || formData.promotionType!=4)?formData.needPoint:formData.resladder[index].needPoints" >
					<template slot="prepend" >消积分</template>
				</el-input></el-form-item>
			</div>
			<div style="display: inline-block;" v-if="formData.promotionType==1 || formData.promotionType==4 || formData.promotionType==2 || formData.promotionType==3">
				<el-form-item style="display: inline-block;" prop="needOrderSum" >
					<el-input class="innerIpt" placeholder="" v-model="(formData.promotionType!=1 || formData.promotionType!=4)?formData.needOrderSum:formData.resladder[index].ladder"  >
						<template slot="prepend">满件</template>
					</el-input>
				</el-form-item>
			</div>
			<div style="display: inline-block;" v-if="formData.promotionType==2 || formData.promotionType==3 || formData.promotionType==4 || formData.promotionType==1">
				<el-form-item style="display: inline-block;" prop="needOrderMoney">
					<el-input class="innerIpt" placeholder="" v-model="(formData.promotionType!=1 || formData.promotionType!=4)?formData.needOrderMoney:formData.resladder[index].needMoney" >
						<template slot="prepend">满额</template>
					</el-input>
				</el-form-item>
			</div>
			
			<div style="display: inline-block;" v-if="formData.promotionType==1">
				<el-form-item style="display: inline-block;" prop="value">
					<el-input class="innerIpt" placeholder="" v-model="formData.value">
						<template slot="prepend">直降(%)</template>
					</el-input>
				</el-form-item>
			</div>
			<div style="display: inline-block;" v-if="formData.promotionType==4">
				<el-form-item style="display: inline-block;" prop="reduceMoney" >
					<el-input class="innerIpt" placeholder="" v-model="formData.reduceMoney">
						<template slot="prepend">减额</template>
					</el-input>
				</el-form-item>
			</div>
			<el-button v-if="formData.promotionType==1 || formData.promotionType==4"  @click="addCondition" style="margin-left: 10px;">添加</el-button>
			<el-button  @click="deleteCondition(index)" v-if="formData.promotionType==1 || formData.promotionType==4">删除</el-button>
			

		</el-form-item> -->

		<el-form-item label="参活条件:" v-for="(item,index) in conditionsArr">
			<div style="display: inline-block;" v-if="formData.promotionType==0 || formData.promotionType==5 || formData.promotionType==2 || formData.promotionType==4 || formData.promotionType==1">
				<el-form-item prop="needPoint">
					<el-input class="innerIpt" placeholder="" v-model="formData.resIadder[index].needPoints">
						<template slot="prepend">消积分</template>
					</el-input>
				</el-form-item>
			</div>
			<div style="display: inline-block;" v-if="formData.promotionType==1 || formData.promotionType==4 || formData.promotionType==2 || formData.promotionType==3">
				<el-form-item style="display: inline-block;" prop="needOrderSum">
					<el-input class="innerIpt" placeholder="" v-model="formData.resIadder[index].ladder">
						<template slot="prepend">满件</template>
					</el-input>
				</el-form-item>
			</div>
			<div style="display: inline-block;" v-if="formData.promotionType==2 || formData.promotionType==3 || formData.promotionType==4 || formData.promotionType==1">
				<el-form-item style="display: inline-block;" prop="needOrderMoney">
					<el-input class="innerIpt" placeholder="" v-model="formData.resIadder[index].needMoney">
						<template slot="prepend">满额</template>
					</el-input>
				</el-form-item>
			</div>

			<div style="display: inline-block;" v-if="formData.promotionType==1">
				<el-form-item style="display: inline-block;" prop="value">
					<el-input class="innerIpt" placeholder="" v-model="formData.resIadder[index].value">
						<template slot="prepend">直降(%)</template>
					</el-input>
				</el-form-item>
			</div>
			<div style="display: inline-block;" v-if="formData.promotionType==4">
				<el-form-item style="display: inline-block;" prop="reduceMoney">
					<el-input class="innerIpt" placeholder="" v-model="formData.resIadder[index].reduceMoney">
						<template slot="prepend">减额</template>
					</el-input>
				</el-form-item>
			</div>
			<el-button v-if="formData.promotionType==1 || formData.promotionType==4" @click="addCondition" style="margin-left: 10px;">添加</el-button>
			<el-button @click="deleteCondition(index)" v-if="(formData.promotionType==1 || formData.promotionType==4) && index==condition">删除</el-button>


		</el-form-item>

		<div v-if="formData.promotionType!=0 && formData.promotionType!=1 && formData.promotionType!=4 && formData.promotionType!=2 && formData.promotionType!=5">
			<el-form-item label="赠送类型:" prop="pointsSum">
				<el-radio-group v-model="formData.pointsType">
					<el-radio label="0">多倍积分</el-radio>
					<el-radio label="1">送固定积分</el-radio>
				</el-radio-group>
				<div v-if="formData.pointsType!=0">
					积分&nbsp;&nbsp;<el-input class="innerIpt" placeholder="" v-model="formData.pointsSum">
					</el-input>&nbsp;&nbsp;倍
				</div>
			</el-form-item>
		</div>
		<div v-if="formData.promotionType!=5">


			<el-form-item label="参活范围:">
				<el-radio-group v-model="formData.isAllJoin">
					<el-radio label="0">全部参活</el-radio>
					<el-radio label="1">部分参活</el-radio>



				</el-radio-group>


			</el-form-item>
			<el-form-item v-if="formData.isAllJoin==1">
				<el-table :data="formData.resArray" style="width: 700px">
					<el-table-column fixed prop="supplySid" label="供应商编码" width="150">
					</el-table-column>
					<el-table-column prop="supplyName" label="供应商名称" width="120">
					</el-table-column>
					<el-table-column prop="brandSid" label="品牌编码" width="120">
					</el-table-column>
					<el-table-column prop="brandName" label="品牌名称" width="120">
					</el-table-column>
					<el-table-column prop="productYear" label="年份" width="<120></120>">
					</el-table-column>
					<el-table-column prop="productSeason" label="季节" width="120">
					</el-table-column>
					<el-table-column prop="a" label="品项" width="120">
					</el-table-column>
					<el-table-column prop="currentMinPrice" label="最小价格" width="120">
					</el-table-column>
					<el-table-column prop="currentMaxPrice" label="最小价格" width="120">
					</el-table-column>
					<el-table-column prop="originalMinPriceFlag" label="吊牌价最小价格" width="120">
					</el-table-column>
					<el-table-column prop="originalMaxPriceFlag" label="吊牌价最大价格" width="120">
					</el-table-column>
					<el-table-column prop="disCountMinPriceFlag" label="折扣最小区间" width="120">
					</el-table-column>
					<el-table-column prop="disCountMaxPriceFlag" label="折扣最大区间" width="120">
					</el-table-column>
					<el-table-column prop="shopSid" label="门店ID" width="120">
					</el-table-column>
					<el-table-column prop="o" label="门店名称" width="120">
					</el-table-column>

					<el-table-column prop="sku" label="款号" width="120">
					</el-table-column>
					<el-table-column prop="originalPrice" label="吊牌价" width="120">
					</el-table-column>
					<el-table-column prop="currentPrice" label="现价" width="120">
					</el-table-column>
					<el-table-column prop="promotionPrice" label="促销价" width="120">
					</el-table-column>
					<el-table-column prop="h" label="门槛阶梯" width="120">
					</el-table-column>
					<el-table-column prop="productSum" label="参活数量" width="120">
					</el-table-column>
					<el-table-column prop="限购数量" label="限购数量" width="120">
					</el-table-column>
					<el-table-column prop="flag" label="参活标记" width="120">
					</el-table-column>
				</el-table>

				<el-upload class="upload-demo" :action="createRuleBeforeForexcelImport" :on-success="showExcelData" :name="newadvertadress"
				 multiple>
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-form-item>
		</div>


		<el-form-item label="赠送类型:" v-if="formData.promotionType!=0 && formData.promotionType!=1 && formData.promotionType!=4 && formData.promotionType!=2 && formData.promotionType!=3">
			<el-radio-group v-model="formData.ticketFlag">
				<el-radio label="2">上品券</el-radio>
				<el-radio label="5">品牌券</el-radio>
				<el-radio label="3">异业券</el-radio>
				<el-radio label="4">实体券</el-radio>
			</el-radio-group>
			<div style="margin: 30px 0;" v-if="formData.ticketFlag==2 || formData.ticketFlag==5">
				赠送券前缀:&nbsp;&nbsp;<el-select v-model="formData.prefix" filterable  placeholder="请选择">
					<el-option v-for="item in prefixList" :key="item.sid" :label="item.prefix" :value="item.sid">
					</el-option>
				</el-select>

			</div>

			<div style="margin: 30px 0;" v-if="formData.ticketFlag==3 || formData.ticketFlag==4">
				券日期:&nbsp;&nbsp;<el-date-picker v-model="cupTime " type="datetimerange" range-separator="至" start-placeholder="开始日期"
				 end-placeholder="结束日期">
				</el-date-picker>
				<div style="margin: 30px 0;">动态有效期:&nbsp;&nbsp;<el-input class="innerIpt" v-model="formData.dynamic"></el-input>
				</div>
				<div style="margin: 30px 0;" v-if="formData.ticketFlag==3">异业券链接:&nbsp;&nbsp;<el-input class="innerIpt" v-model="formData.ticketUpload"></el-input>
				</div>
				<el-upload
				  class="avatar-uploader"
				  auto-upload
				  name="ticketPicture"
				  :action="this.$api.url.saveTicketPicture"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="imageUrl" :src="imageUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</div>

			<div style="margin: 30px 0;">券规则:&nbsp;&nbsp;<el-input class="desc" type="textarea" v-model="formData.promotionRule"></el-input>
			</div>

			<div>券说明:&nbsp;&nbsp;<el-input class="desc" type="textarea" v-model="formData.promotionMemo"></el-input>
			</div>




		</el-form-item>



		<el-form-item>
			<el-button type="primary" @click="onSubmit('formData')">立即创建</el-button>
			<el-button @click="back()" v-if="btnFlag">返回</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: "CreateAnOrder",
		created: function() {
			
			console.log(this.formData);
			console.log(this.formDataRule);
			if(this.$route.query.sid){
				this.btnFlag = true;
				this.dataBack(this.$route.query.sid);
			}
			//初始化调用所有档期
			this.selectGrade()
			//初始化调取所有券前缀
			this.selectprefixList();
		},
		mounted:function(){
			
			
		},
		
		data() {
			//自定义校验
			var needPointCheck = (rule, value, callback) => {
				if (this.formData.promotionType == 0 || this.formData.promotionType == 5 || this.formData.promotionType == 2 ||
					this.formData.promotionType == 4 || this.formData.promotionType == 1) {
					if (!value) {
						callback(new Error('请输入消积分'));
					}
				} else {
					alert("消积分取消验证")
					callback();
				}

			}
			var needOrderSumCheck = (rule, value, callback) => {
				if (this.formData.promotionType == 1 || this.formData.promotionType == 4 || this.formData.promotionType == 2 ||
					this.formData.promotionType == 3) {
					if (!value) {
						callback(new Error('请输入满件'));
					}
				} else {
					callback();
				}
			}
			var needOrderMoneyCheck = (rule, value, callback) => {
				if (this.formData.promotionType == 2 || this.formData.promotionType == 3 || this.formData.promotionType == 4 ||
					this.formData.promotionType == 1) {
					if (!value) {
						callback(new Error('请输入满额'));
					}
				} else {
					callback();
				}
			}
			var valueCheck = (rule, value, callback) => {
				if (this.formData.promotionType == 1) {
					if (!value) {
						callback(new Error('请输入直降'));
					}
				} else {
					callback();
				}
			}
			var reduceMoneyCheck = (rule, value, callback) => {
				if (this.formData.promotionType == 4) {
					if (!value) {
						callback(new Error('请输入减额'));
					}
				} else {
					callback();
				}
			}

			return {
				itemArr: [0],
				ele: "",
				conditionsArr: [0],
				condition: "",
				createRuleBeforeForexcelImport: this.$api.url.createRuleBeforeForexcelImport,
				prefixList: "",
				newadvertadress: "newadvertadress",
				grade: "", //所有档期列表
				innerCheck: [],
				btnFlag:false,
				imageUrl:"",
				cupTime:"",




				formData: {
					promotionType: "0", //活动类型
					name: "", //活动名称(内)		
					nameAlias: "", //活动名称(外)
					time: [], //活动范围时间
					startTime: "",
					endTime: "",
					promotionFlag: "2", //活动所属
					scheduleSid: "1", //活动档期 
					dangqiSelect: "", //活动档期列表 选择
					overlyingFlag: "0", //优惠券叠加
					couponsVal: [], //优惠券列表
					ticketOverlying: "1", //优惠券叠加
					channelInfoC: [], //渠道列表
					members: "1", //身份资格单选
					menberInfoC: [], //身份列表   
					reservedFields: "0", //参与次数 单选
					memberLimit: "", //参与次数
					priceBasic: "2", //价格基准
					pointsType: "1", //送积分
					isAllJoin: "0", //参活选项

					pointsSum: undefined, //消积分  无解
					needPoint: undefined, //消积分  无阶梯
					needOrderSum: undefined, //满件 无阶梯
					needOrderMoney: undefined, //满元 无阶梯
					creator: "lixuan", //创建人
					operatorName: "lixuan",
					auditor: "",
					resArray: "", //参活商品

					resIadder: [{
						ladder: undefined, //满件 阶梯
						needMoney: undefined, //满元 阶梯
						needPoints: undefined, //消积分 阶梯
						value: undefined, //直降 阶梯
						reduceMoney: undefined //减额 阶梯
					}],
					value: undefined,
					reduceMoney: undefined,

					resArray: [{}],

					ticketFlag: "2",
					prefix: "",
					dynamic: "",
					ticketUpload: "",
					ticketStartTime: "",
					ticketEndTime: "",
					imgPath: "",
					promotionRule: "",
					promotionMemo: "",


				},
				formDataRule: {
					name: [{
						required: true,
						message: '请输入活动名称(内显)'
					}],
					nameAlias: {
						required: true,
						message: '请输入活动名称(外显)',
						trigger: 'blur'
					},
					time: {
						required: true,
						message: '请选择活动时间',
						trigger: 'blur'
					},
					couponsVal: {
						type: 'array',
						required: true,
						message: '请至少选择一个优惠券',
						trigger: 'change'
					},
					channelInfoC: {
						type: 'array',
						required: true,
						message: '请至少选择一个渠道',
						trigger: 'change'
					},
					menberInfoC: {
						type: 'array',
						required: true,
						message: '请至少选择一个会员',
						trigger: 'change'
					},

					// needPoint:[{ validator: needPointCheck, trigger: 'blur' }],
					// 
					// needOrderSum: [{ validator: needOrderSumCheck, trigger: 'blur' }],
					// needOrderMoney:[{ validator: needOrderMoneyCheck, trigger: 'blur' }],
					// value: [{ validator: valueCheck, trigger: 'blur' }],
					// reduceMoney: [{ validator: reduceMoneyCheck, trigger: 'blur' }],
				}
			}
		},
		methods: {

			//提交最终表单

			onSubmit: function(formName) {
				if(this.cupTime!=""){
					this.formData.ticketStartTime = new Date(this.cupTime[0]).format("yyyy-MM-dd hh:mm:ss");
					this.formData.ticketEndTime = new Date(this.cupTime[1]).format("yyyy-MM-dd hh:mm:ss");
				}
		
				
				
				console.log(this.formData)
				//数据处理
				var time = [];
				this.formData.time.forEach(v => {
					v[0] = new Date(v[0]).format("yyyy-MM-dd hh:mm:ss");
					v[1] = new Date(v[1]).format("yyyy-MM-dd hh:mm:ss");
					time.push({
						"startTime": v[0],
						"endTime": v[1]
					})
				});
				this.formData.time = time;
				this.formData.startTime = this.startEndDate(time)[0];
				this.formData.endTime = this.startEndDate(time)[1];
				this.formData.memberInfo = this.formData.menberInfoC.join(",");
				this.formData.channelInfo = this.formData.channelInfoC.join(",");
				//领券活动处理
				this.formData.imgPath = this.imgPath;
				
				//处理无阶梯活动
				let promotionType = this.formData.promotionType;
				let resIadder = this.formData.resIadder
				if(promotionType==0 || promotionType==2 || promotionType==3 || promotionType==5){
					alert("有"+promotionType)
					this.formData.pointsSum = resIadder[0].needPoints;
					this.formData.needPoint = resIadder[0].needPoints;
					this.formData.needOrderSum = resIadder[0].ladder;
					this.formData.needOrderMoney = resIadder[0].needMoney;
					if(promotionType==2){
						this.formData.postageMoney=resIadder[0].needMoney;
					}
					
					this.formData.resIadder =[{
						ladder: undefined, //满件 阶梯
						needMoney: undefined, //满元 阶梯
						needPoints: undefined, //消积分 阶梯
						value: undefined, //直降 阶梯
						reduceMoney: undefined //减额 阶梯
					}]
					
				}
				
				var datas = this.$qs.stringify(this.formData);
				var datas = JSON.stringify(this.formData)

				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
						let httpUrl = "";
						console.log(this.formData.promotionType)
						if(this.formData.promotionType == "5"){
							httpUrl = this.$api.url.addPointAddTicket;
						}else{
							httpUrl = this.$api.url.addMainRule;
						}
						axios
							.post(httpUrl, datas, {
								headers: {
									'Content-Type': 'application/json'
								}
							}, )
							.then(response => {
						
								if(response.data.success == "true"){
									if(this.formData.promotionFlag == 1){
										 this.$message({
										  showClose: true,
										  message: response.data.msg,
										  type: 'success'
										});
										this.$router.push({path:"/official_activity_list"})
									}else{
										this.$router.push({path:"/Activity_list"})
									}
									
								}else{
									this.$message.error({
										message: response.data.msg,
									});
								}
						
							}).catch(function(error) {
						
							})
						
					} else {
						this.$message.error({
							message: "请将信息填写完整!",
						});
						console.log('error submit!!');
						return false;
					}
				});

			},


			//活动类型事件方法
			promotionTypeCheck: function(e) {
				// this.$refs['formData'].resetFields();
				// <el-radio label="0">单品特价</el-radio>
				// <el-radio label="1">折扣活动</el-radio>
				// <el-radio label="4">减额活动</el-radio>
				// <el-radio label="2">包邮活动</el-radio>
				// <el-radio label="3">赠送活动</el-radio>
				// <el-radio label="5">领取活动</el-radio>
				if(e==0 || e==2 || e==3 || e==5){
					this.formData.resIadder =[{
						ladder: undefined, //满件 阶梯
						needMoney: undefined, //满元 阶梯
						needPoints: undefined, //消积分 阶梯
						value: undefined, //直降 阶梯
						reduceMoney: undefined //减额 阶梯
					}]
					this.conditionsArr = [0];
					this.condition = "";
				}

			},
			//活动所属事件方法
			promotionFlagCheck: function(e) {

			},
			//所属档期事件方法
			scheduleSidCheck: function(e) {
				if (e == 1) {
						
				} else {

				}
			},
			//渲染所有券前缀
			selectprefixList: function() {
				axios
					.get(this.$api.url.ticketgroupList, {
						headers: {
							"Content-Type": "multipart/from-data",
						}
					})
					.then(response => {
						this.prefixList = response.data.list;

					}).catch(function(error) {
						console.log(error);
					})
			},

			//渲染所有档期
			selectGrade: function() {

				let datas = new FormData();
				datas.set("flag", 1);
				axios
					.post(this.$api.url.selectGrade, datas, {
						headers: {
							"Content-Type": "multipart/from-data",
						}
					})
					.then(response => {
						if (response.data.success == true) {
							this.grade = response.data.data;
						}

					}).catch(function(error) {
						console.log(error);
					})
			},

			//点击添加
			addExceptPrice() {
				this.ele++;
				this.itemArr.push(this.ele)
				
			},
			//删除一项
			deleteExceptPrice(index) {
				this.ele--
				if (index == 0) {
					this.$message.error({
						message: "第一个不可删除!",
					});
				} else {
					this.itemArr.splice(index, 1);
					this.formData.time.splice(index, 1);
				}

			},

			//点击添加
			addCondition() {
				this.condition++;
				this.conditionsArr.push(this.condition)
				this.formData.resIadder.push({
					ladder: undefined, //满件 阶梯
					needMoney: undefined, //满元 阶梯
					needPoints: undefined, //消积分 阶梯
					value: undefined, //直降 阶梯
					reduceMoney: undefined //减额 阶梯
				})
			},
			//删除一项
			deleteCondition(index) {
				if (index == 0) {
					this.$message.error({
						message: "第一个不可删除!",
					});
				} else {
					this.condition--;
					this.conditionsArr.splice(index, 1);
					this.formData.resIadder.splice(index, 1);
					console.log(this.condition)
					console.log(this.conditionsArr)
					console.log(this.formData.resIadder)
				}

			},
			//表格上传
			showExcelData: function(response) {
				this.formData.resArray = response.data;
				console.log(this.formData.resArray)

			},


			//日期转换最大日期最小日期
			startEndDate: function(time) {


				var arr = [];

				time.forEach(v => {
					arr.push(new Date(v.startTime));
					arr.push(new Date(v.endTime));
				});
				var arrNew = [new Date(Math.min(...arr)).format('yyyy-MM-dd h:m:s'), new Date(Math.max(...arr)).format(
					'yyyy-MM-dd h:m:s')]
				return arrNew;

			},
			
			//返回上一页
			back: function(){
				var flag = this.$route.query.flag;
				if(flag==1){
					this.$router.push({path:"/official_activity_list"})
				}else{
					this.$router.push({path:"/Activity_list"})
				}
			},
			
			handleAvatarSuccess(res, file) {
				// this.imageUrl = URL.createObjectURL(file.raw);
				if(res.success == true){
					this.$message({
					  showClose: true,
					  message: res.msg,
					  type: 'success'
					});
					this.imageUrl =this.$api.couponAddress + res.data;
					console.log(this.imageUrl)
				}
				
				
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
				  this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
				  this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			//数据回显
			dataBack:function(sid){
				var datas = {};
				datas.pcSid = sid;
				const loading = this.$loading({
					lock: true,
					text: '正在请求数据请稍后....',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				
				axios
					.post(this.$api.url.getAllCampaignDetailsBySid,this.$qs.stringify(datas))
					.then(response => {
						loading.close();
						console.log(response)
						if(response.data.success == "true"){
							if(response.data.date){
								var data = response.data.date;
								this.formData.name = data.name;
								this.formData.nameAlias = data.nameAlias;
								this.formData.promotionType = data.promotionType+"";
								var arrTime = [];
								data.promotionTime.forEach(v => {
									
									arrTime.push(
										[new Date(v.startTime).format("yyyy-MM-dd hh:mm:ss"),new Date(v.endTime).format("yyyy-MM-dd hh:mm:ss")],
									)
									this.addExceptPrice()
								});
								this.ele--;
								this.itemArr.pop();
								this.formData.time = arrTime;
								
								
								this.formData.promotionFlag = data.promotionFlag+"";
								this.formData.scheduleSid = data.scheduleSid+"";
								this.formData.overlyingFlag = data.overlyingFlag+"";
								this.formData.couponsVal = [];
								this.formData.ticketOverlying = data.pcdList[0].ticketOverlying+"";
								this.formData.channelInfoC = data.pcdList[0].channelInfo.split(",");
								
								console.log(this.formData)
								if(data.pcdList[0].memberInfo!=null && data.pcdList[0].memberInfo!=undefined){
									this.formData.members = 1+"";
									this.formData.menberInfoC = data.pcdList[0].memberInfo.split(",");
								}else{
									this.formData.members = 0+"";
									this.formData.menberInfoC = [];
								}
								this.formData.priceBasic = data.priceBasic+"";
								console.log(this.formData)
								var iadderArr = []
								
								let promotionType = this.formData.promotionType
								if(promotionType ==0 || promotionType==2 || promotionType==3 || promotionType==5){
									this.formData.resIadder[0].ladder=data.pcdList[0].needOrderSum;
									this.formData.resIadder[0].needMoney=data.pcdList[0].needOrderMoney;
									this.formData.resIadder[0].needPoints=data.pcdList[0].needPoint;
									
									if(promotionType==2){
										this.formData.resIadder[0].needMoney = data.postageMoney;
									}
								}else{
									data.pcdList[0].promotionLadders.forEach(v => {
										console.log()
										if(data.pcdList[0].promotionLadders.indexOf(v)==0){
											this.formData.resIadder[0].ladder=v.ladder;
											this.formData.resIadder[0].needMoney=v.needMoney;
											this.formData.resIadder[0].needPoints=v.needPoints;
											this.formData.resIadder[0].value=v.value;
											this.formData.resIadder[0].reduceMoney=v.reduceMoney;
										}else{
											this.condition++;
											this.conditionsArr.push(this.condition)
											this.formData.resIadder.push({
												ladder: v.ladder, //满件 阶梯
												needMoney: v.needMoney, //满元 阶梯
												needPoints: v.needPoints, //消积分 阶梯
												value: v.value, //直降 阶梯
												reduceMoney: v.reduceMoney //减额 阶梯
											})
										}
										
										
										
									});
								}
								//券回显
								let promotionPoints = data.promotionPoints[0];
								this.cupTime = [new Date(promotionPoints.ticketStartTime).format("yyyy-MM-dd hh:mm:ss"),new Date(promotionPoints.ticketEndTime).format("yyyy-MM-dd hh:mm:ss")]
								this.formData.ticketFlag = promotionPoints.ticketFlag+"";
								this.formData.ticketUpload = promotionPoints.ticketUpload;
								this.formData.dynamic = promotionPoints.dynamic;
								this.imageUrl = promotionPoints.imgPath;
								
								
								console.log(this.formData.resIadder)
								console.log(this.conditionsArr)
								console.log(this.condition)
								this.formData.isAllJoin = data.isAllJoin+"";
									
								// this.formData.time = data.name;
								// this.formData.name = data.name;
								
								
								
								
								// formData: {
								// 	promotionType: "0", //活动类型
								// 	name: "", //活动名称(内)		
								// 	nameAlias: "", //活动名称(外)
								// 	time: [], //活动范围时间
								// 	startTime: "",
								// 	endTime: "",
								// 	promotionFlag: "2", //活动所属
								// 	scheduleSid: "1", //活动档期 
								// 	dangqiSelect: "", //活动档期列表 选择
								// 	overlyingFlag: "0", //优惠券叠加
								// 	couponsVal: [], //优惠券列表
								// 	ticketOverlying: "1", //优惠券叠加
								// 	channelInfoC: [], //渠道列表
								// 	members: "1", //身份资格单选
								// 	menberInfoC: [], //身份列表   
								// 	reservedFields: "0", //参与次数 单选
								// 	memberLimit: "", //参与次数
								// 	priceBasic: "2", //价格基准
								// 	pointsType: "1", //送积分
								// 	isAllJoin: "0", //参活选项
								// 
								// 	pointsSum: undefined, //消积分  无解
								// 	needPoint: undefined, //消积分  无阶梯
								// 	needOrderSum: undefined, //满件 无阶梯
								// 	needOrderMoney: undefined, //满元 无阶梯
								// 	creator: "lixuan", //创建人
								// 	operatorName: "lixuan",
								// 	auditor: "",
								// 	resArray: "", //参活商品
								// 
								// 	resIadder: [{
								// 		ladder: undefined, //满件 阶梯
								// 		needMoney: undefined, //满元 阶梯
								// 		needPoints: undefined, //消积分 阶梯
								// 		value: undefined, //直降 阶梯
								// 		reduceMoney: undefined //减额 阶梯
								// 	}],
								// 	value: undefined,
								// 	reduceMoney: undefined,
								// 
								// 	resArray: [{}],
								// 
								// 	ticketFlag: "2",
								// 	prefix: "",
								// 	dynamic: "",
								// 	ticketUpload: "",
								// 	ticketStartTime: "",
								// 	ticketEndTime: "",
								// 	imgPath: "",
								// 	promotionRule: "",
								// 	promotionMemo: "",
								// 
								// 
								// }
							}
						}
						
						
						
						
						
						
						
						
						
						
					}).catch(function(error) {
						loading.close();
						console.log(error);
					})
			}

		}
	}
</script>

<style scoped>
	.name,
	.nameAlias {
		width: 300px;
	}

	.formBlock {
		text-align: left;
	}

	.innerIpt {
		width: 200px
	}

	.desc {
		width: 300px;
	}

	.tableBlock {
		left: 370px;
	}
	.avatar-uploader .el-upload {
		    
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  
  
</style>
