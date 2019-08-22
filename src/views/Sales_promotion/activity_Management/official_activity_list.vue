<template>
	<div class="block">
		<el-form class="formBlock" label-width="130px">
			<el-form-item class="item" label="活动类型:">
				<el-select class="name"v-model="selectForm.promotionType" placeholder="请选择">
					<el-option label="请选择" value=""></el-option>
					<el-option label="特价活动" value="0"></el-option>
					<el-option label="折扣活动" value="1"></el-option>
					<el-option label="包邮活动" value="2"></el-option>
					<el-option label="赠送活动" value="3"></el-option>
					<el-option label="减额活动" value="4"></el-option>
					<el-option label="领券活动" value="5"></el-option>	
				</el-select>
			</el-form-item>
			<el-form-item class="item" label="活动ID:">
				<el-input v-model="selectForm.sid" class="name" placeholder="请输入活动ID"></el-input>
			</el-form-item>
			<el-form-item class="item" label="供应商ID:">
				<el-input v-model="selectForm.supplySid" class="name" placeholder="请输入供应商ID"></el-input>
			</el-form-item>
			<el-form-item class="item" label="款号:">
				<el-input v-model="selectForm.sku" class="name" placeholder="请输入款号"></el-input>
			</el-form-item>
			<el-form-item class="item" label="时间范围:">
				<el-date-picker v-model="selectForm.time" type="datetimerange" range-separator="至" start-placeholder="开始日期"
				 end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item class="item" label="活动状态:">
				<el-select class="name"v-model="selectForm.flag" placeholder="请选择">
					
									
					
					<el-option label="请选择" value=""></el-option>
									<el-option label="未开始" value="0"></el-option>
									<el-option label="待审核" value="1"></el-option>
									<el-option label="已作废" value="-1"></el-option>
									<el-option label="进行中" value="2"></el-option>
									<el-option label="已结束" value="3"></el-option>
									<el-option label="已删除" value="-2"></el-option>
									
							
				</el-select>
			</el-form-item>
			<el-form-item class="item" label="创建人:">
				<el-input v-model="selectForm.creator" class="name" placeholder="请输入创建人"></el-input>
			</el-form-item>
			<el-form-item class="item">
				<el-button type="primary">查询</el-button>
			</el-form-item>
		</el-form>
		
		<el-table
		 v-loading="loading"
		  :data="tableData"
		  style="width: 100%"
		  height="450">
		  <el-table-column
		    fixed
		    prop="sid"
		    label="活动ID"
		    width="150">
		  </el-table-column>
		  <el-table-column
		    prop="name"
		    label="活动名称"
		    width="120">
		  </el-table-column>
		  <el-table-column
		    prop="promotionType"
		    label="活动类型"
		    width="120">
		  </el-table-column>
		  <el-table-column
		    prop="startTime"
		    label="活动开始时间"
		    width="120">
		  </el-table-column>
		  <el-table-column
		    prop="endTime"
		    label="活动结束时间"
		    width="120">
		  </el-table-column>
		  
		  <el-table-column
		    prop="flag"
		    label="活动状态"
		    width="120">
		  </el-table-column>
			<el-table-column
			  prop="status"
			  label="价格基准"
			  width="120">
			</el-table-column>
			<el-table-column
			  prop="creator"
			  label="创建人"
			  width="120">
			</el-table-column>
			<el-table-column
			  prop="auditor"
			  label="审核人"
			  width="120">
			</el-table-column>
			<el-table-column
		    fixed="right"
		    label="操作"
		    width="200">
		    <template slot-scope="scope">
		      <el-button type="text" size="small" @click="handleSelect(scope.$index, scope.row)">查看</el-button>
				<el-button type="text" size="small">审核</el-button>
		      <el-button type="text" size="small">编辑</el-button>
				<el-button type="text" size="small">作废</el-button>
		    </template>
		  </el-table-column>
		
		</el-table>
		<div style="margin-top: 20px;">
			<el-pagination 
				background
                                                                                                                			  @size-change="handleSizeChange"
			  @current-change="handleCurrentChange"
			  :current-page="currentPage"
			  :page-sizes="[10,100, 200, 300, 400]"                                                                                                                                                                             
			  :page-size="10"                                                                                                                
			  layout="total, sizes, prev, pager, next, jumper"
			  :total="count">                                                                                                             
			</el-pagination>
		</div>
	  
	</div>
  
  
</template>

<script>
	export default {
		name:"Official_Activity",
		created: function() {
			//初始化官方活动表格
			this.selectInit()
			
		},
		data(){
			return {
				tableData:[],
				currentPage: 0,
				page:1,
				pageSize:10,
				count:0,
				loading : true,
				name:"",
				
				
				selectForm:{
					promotionType:"",
					sid:"",
					supplySid:"",
					sku:"",
					time:"",
					flag:"",
					creator:""
				}
			}
		},
		methods:{
			handleSelect:function(index,row){
				console.log(row);
				var sid = row.sid; 
				
				this.$router.push({path:"../CreateAnOrder",query:{sid:sid,flag:1}})
			},
			selectInit:function(){
				var datas = {};
				datas.pageSize = this.pageSize;
				datas.page = this.page;
				datas.promotionFlag = 1;
				axios
					.post(this.$api.url.getAllCampaignsByParam, this.$qs.stringify(datas) )
					.then(response => {
						this.loading = false;
						console.log(response)
						if(response.data.data){
							if(response.data.code == 200){
								this.tableData = response.data.data;
								this.count = response.data.count;
								
							}
						}
				
					}).catch(function(error) {
				
					})
			},
			handleSizeChange:function(val){
				this.loading = true;
				this.pageSize=val;
				this.selectInit()
			},
			handleCurrentChange:function(val){
				this.loading = true;
				this.page=val;
				this.selectInit()
			},
			
		}
	}
</script>

<style>
	.item{
		float: left;
	}
	.name{
		width: 150px;
	}
</style>
