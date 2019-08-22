
import Vue from "vue";

let configJs = {};
configJs.host = "172.16.103.48";
configJs.port = "7080";
configJs.host = "192.168.110.177"
configJs.port = "10601"
configJs.project = "/bms"
//configJs.host = "cuxiao.ngrok.xiaomiqiu.cn";
//configJs.port = "80";
//configJs.host = "172.16.102.197";
//configJs.port = "8087";
configJs.hostDg = "192.168.110.22";
configJs.portDg = "8010";


//优惠券前缀
configJs.couponAddress = "https://shopin-images.oss-cn-beijing.aliyuncs.com/";

configJs.url = {
	//登录接口
	"login": "http://" + configJs.host + ":" + configJs.port + "/bms/admin/login",
	//注销
	"loginout": "http://" + configJs.host + ":" + configJs.port + "/bms/admin/loginout",
	//所有按钮权限
	"buttonPermissions": "http://" + configJs.host + ":" + configJs.port + "/bms/source/getAllResLog",
	//获取导航栏资源接口
	"getSourcesByUserName": "http://" + configJs.host + ":" + configJs.port + "/bms/source/getSourcesByUserName",
	/*资源管理接口*/
	//获取树资源
	"getResTree": "http://" + configJs.host + ":" + configJs.port + "/bms/source/getResTree",
	//添加树节点
	"addRes": "http://" + configJs.host + ":" + configJs.port + "/bms/source/addRes",
	//删除树节点
	"deleteRes": "http://" + configJs.host + ":" + configJs.port + "/bms/source/deleteRes",
	//修改树节点
	"updateRes": "http://" + configJs.host + ":" + configJs.port + "/bms/source/update",
	/*用户管理模块*/
	//查询所有用户
	"findusers": "http://" + configJs.host + ":" + configJs.port + "/bms/user/findusers",
	//查询用户所有权限
	"getAllRoles": "http://" + configJs.host + ":" + configJs.port + "/bms/role/getAllRoles",
	//添加用户
	"addUser": "http://" + configJs.host + ":" + configJs.port + "/bms/user/addUser",
	//修改用户
	"updateUser": "http://" + configJs.host + ":" + configJs.port + "/bms/user/updateUser",
	//删除用户
	"deleteUser": "http://" + configJs.host + ":" + configJs.port + "/bms/user/deleteUser",
	//校验用户名是否重复
	"checkUserName": "http://" + configJs.host + ":" + configJs.port + "/bms/user/checkUserName",
	/*角色管理*/
	//角色授权大表格
	"roleAuthorization": "http://" + configJs.host + ":" + configJs.port + "/bms/role/getTree",
	//提交角色管理信息
	"authorization": "http://" + configJs.host + ":" + configJs.port + "/bms/role/Authorization",
	//查询所有角色
	"getAllRoles2": "http://" + configJs.host + ":" + configJs.port + "/bms/role/getAllRoles",
	//添加角色
	"addRole": "http://" + configJs.host + ":" + configJs.port + "/bms/role/addRole",
	//删除角色
	"deleteRole": "http://" + configJs.host + ":" + configJs.port + "/bms/role/deleteRole",
	//修改角色
	"updateRole": "http://" + configJs.host + ":" + configJs.port + "/bms/role/updateRole",
	//校验角色标识重复
	"checkRoleLog": "http://" + configJs.host + ":" + configJs.port + "/bms/role/checkRoleLog",
	//显示角色下的成员l
	"memberMaintenance": "http://" + configJs.host + ":" + configJs.port + "/bms/role/memberMaintenance",
	//提交成员信息
	"submitMemberInformation": "http://" + configJs.host + ":" + configJs.port + "/bms/role/addUsers",

	//促销
	//活动创建   活动修改 （修改多加sid）   高萌
	"addMainRule": "http://" + configJs.host + ":" + configJs.port + "/bms/addMainRule",
	//	"addMainRule": "http://a0414wp.iok.la:26508/addMainRule",
	//创建优惠券的接口
	"addPointAddTicket": "http://a0414wp.iok.la:26508/addPointAddTicket",
	"addPointAddTicket": "http://" + configJs.host + ":" + configJs.port + "/bms/addPointAddTicket",
	//上传优惠券图片
	"saveTicketPicture": "http://" + configJs.host + ":" + configJs.port + "/bms/saveTicketPicture",
	//导入excl表格
	"createRuleBeforeForexcelImport": "http://" + configJs.host + ":" + configJs.port +
		"/bms/createRuleBeforeForexcelImport",
	//查询所有活动 高萌
	"getAllCampaignsByParam": "http://" + configJs.host + ":" + configJs.port + "/bms/getAllCampaignsByParam",
	//查询活动详情 参数pcSid 高萌 
	"getAllCampaignDetailsBySid": "http://" + configJs.host + ":" + configJs.port + "/bms/getAllCampaignDetailsBySid",
	//查询活动详情 参数pcSid 高萌 
	//	"getAllCampaignDetailsBySid": "http://a0414wp.iok.la:26508/getAllCampaignDetailsBySid",
	//审核活动
	"hasMainRule": "http://" + configJs.host + ":" + configJs.port + "/bms/status",
	//查看活动参活商品列表
	"getCondition": "http://" + configJs.host + ":" + configJs.port + "/bms/getCondition",
	//添加参活商品
	"addPromotionProduct": "http://" + configJs.host + ":" + configJs.port + "/bms/addPromotionProduct",

	"delPromotionProduct": "http://" + configJs.host + ":" + configJs.port + "/bms/delPromotionProduct",
	//获取券前缀
	"ticketgroupList": "http://" + configJs.host + ":" + configJs.port + "/bms/ticketgroupList",

	//促销
	//活动创建   高萌
	//	"addMainRule": "http://172.16.103.115:8080/addMainRule",
	//	//导入excl表格
	//	"createRuleBeforeForexcelImport": "http://172.16.103.115:8080/createRuleBeforeForexcelImport",
	//	//查询所有活动 高萌
	//	"getAllCampaignsByParam": "http://172.16.103.115:8080/getAllCampaignsByParam",
	//	//查询档期详情 参数pcSid 高萌
	//	"getAllCampaignDetailsBySid": "http://172.16.103.115:8080/getAllCampaignDetailsBySid",
	//	//审核活动
	//	"hasMainRule": "http://172.16.103.115:8080/status",
	//	//查看活动参活商品列表
	//	"getCondition": "http://172.16.103.115:8080/getCondition",
	//	//添加参活商品
	//	"addPromotionProduct":"http://172.16.103.115:8080/addPromotionProduct",
	//	//删除参活商品
	//	"delPromotionProduct":"http://172.16.103.115:8080/delPromotionProduct",

	//创建模板获取数据   司玉康
	"getPropertyValue": "http://" + configJs.host + ":" + configJs.port + "/bms/template/getPropertyValue",
	//创建模板提交数据   司玉康
	"createTemplate": "http://" + configJs.host + ":" + configJs.port + "/bms/template/createTemplate",
	//查看所有模板  司玉康
	"selectTemplate": "http://" + configJs.host + ":" + configJs.port + "/bms/template/selectTemplate",
	//删除模板 司玉康
	"deleteTemplate": "http://" + configJs.host + ":" + configJs.port + "/bms/template/deleteTemplate",
	//修改模板 司玉康
	"updateTemplate": "http://" + configJs.host + ":" + configJs.port + "/bms/template/updateTemplate",
	//创建档期 司玉康
	"createGrade": "http://" + configJs.host + ":" + configJs.port + "/bms/grade/createGrade",
	//查询所有档期 司玉康
	"selectGrade": "http://" + configJs.host + ":" + configJs.port + "/bms/grade/selectGrade",
	//删除档期 司玉康
	"deleteGrade": "http://" + configJs.host + ":" + configJs.port + "/bms/grade/deleteGrade",
	//修改审核档期 司玉康
	"updateGrade": "http://" + configJs.host + ":" + configJs.port + "/bms/grade/updateGrade",
	//添加删除参活 
	"updatePromotionConfig": "http://" + configJs.host + ":" + configJs.port + "/bms/activity/updatePromotionConfig",

	//	//创建模板获取数据   司玉康
	//	"getPropertyValue": "http://172.16.102.136:8081/template/getPropertyValue",
	//	//创建模板提交数据   司玉康
	//	"createTemplate": "http://172.16.102.136:8081/template/createTemplate",
	//	//查看所有模板  司玉康
	//	"selectTemplate": "http://172.16.102.136:8081/template/selectTemplate",
	//	//删除模板 司玉康
	//	"deleteTemplate": "http://172.16.102.136:8081/template/deleteTemplate",
	//	//修改模板 司玉康
	//	"updateTemplate": "http://172.16.102.136:8081/template/updateTemplate",
	//	//创建档期 司玉康
	//	"createGrade": "http://172.16.102.136:8081/grade/createGrade",
	//	//查询所有档期 司玉康
	//	"selectGrade": "http://172.16.102.136:8081/grade/selectGrade",
	//	//删除档期 司玉康
	//	"deleteGrade": "http://172.16.102.136:8081/grade/deleteGrade",
	//	//修改档期 司玉康
	//	"updateGrade": "http://172.16.102.136:8081/grade/updateGrade",
	//	//添加删除参活 
	//	"updatePromotionConfig": "http://172.16.102.136:8081/bms/activity/updatePromotionConfig",

	/*导购推荐*/
	////	//获取门店信息
	"getAllShipList": "http://192.168.205.167:8182/app-back-project/operationGuideRecommend/getAllShipList",
	//根据门店查供应商  参数:shopSid
	"getSupplyByShop": "http://192.168.205.167:8182/app-back-project/operationGuideRecommend/getSupplyByShop",
	//根据供应商编码查询品牌  参数:supplySid
	"getAllBrandBySupplySid": "http://192.168.205.167:8182/app-back-project/operationGuideRecommend/getAllBrandBySupplySid",
	//根据供应商编码和品牌编码查询优惠券 参数:supplySid,brandSid
	"getBrandCouponsBySupplySid": "http://192.168.205.167:8182/app-back-project/operationGuideRecommend/getBrandCouponsBySupplySid",
	//图片上传demo
	"headImgUpload": "http://192.168.205.167:8182/app-back-project/operationGuideRecommend/headImgUpload",
	//专柜保存添加
	"saveCabinet": "http://192.168.205.167:8182/app-back-project/operationGuideRecommend/saveCabinet",
	//查询所有专柜
	"selectCabinetTablAll": "http://192.168.205.167:8182/app-back-project/operationGuideRecommend/selectCabinetTablAll",
	//编辑前获取专柜信息
	"selectCabinetTableBySid": "http://192.168.205.167:8182/app-back-project/operationGuideRecommend/selectCabinetTableBySid",
	//开通屏蔽专柜
	"openUpOrShield": "http://192.168.205.167:8182/app-back-project/operationGuideRecommend/openUpOrShield",
	//删除专柜
	"deleteCabinetBySid": "http://192.168.205.167:8182/app-back-project/operationGuideRecommend/deleteCabinetBySid",
	//首页配置品类信息获取
	"getCategroys": "http://192.168.205.167:8182/app-back-project/operationGuideRecommend/getCategroys",
	//配置全部保存
	"saveHomePage": "http://192.168.205.167:8182/app-back-project/operationGuideRecommend/saveHomePage",
	//查看配置回显
	"selectHomePage": "http://192.168.205.167:8182/app-back-project/operationGuideRecommend/selectHomePage",
	//查看所有推荐商品
	"selectRecommendAll": "http://192.168.205.167:8182/app-back-project/guideRecommend/selectRecommendAll",
	//查看推荐专柜详情
	"selectRecommendByCabinetTableSid": "http://192.168.205.167:8182/app-back-project/guideRecommend/selectRecommendByCabinetTableSid",
	//下架商品
	"lowerRecommendCommodity": "http://192.168.205.167:8182/app-back-project/operationGuideRecommend/lowerRecommendCommodity",

	//	//获取门店信息  *本地*
	//	"getAllShipList": "http://172.16.102.106:9080/app-back-project/operationGuideRecommend/getAllShipList",
	//	//根据门店查供应商  参数:shopSid
	//	"getSupplyByShop": "http://172.16.102.106:9080/app-back-project/operationGuideRecommend/getSupplyByShop",
	//	//根据供应商编码查询品牌  参数:supplySid
	//	"getAllBrandBySupplySid": "http://172.16.102.106:9080/app-back-project/operationGuideRecommend/getAllBrandBySupplySid",
	//	//根据供应商编码和品牌编码查询优惠券 参数:supplySid,brandSid
	//	"getBrandCouponsBySupplySid": "http://172.16.102.106:9080/app-back-project/operationGuideRecommend/getBrandCouponsBySupplySid",
	//	//图片上传demo
	//	"headImgUpload": "http://172.16.102.106:9080/app-back-project/operationGuideRecommend/headImgUpload",
	//	//专柜保存添加
	//	"saveCabinet": "http://172.16.102.106:9080/app-back-project/operationGuideRecommend/saveCabinet",
	//	//查询所有专柜
	//	"selectCabinetTablAll":"http://172.16.102.106:9080/app-back-project/operationGuideRecommend/selectCabinetTablAll",
	//	//编辑前获取专柜信息
	//	"selectCabinetTableBySid":"http://172.16.102.106:9080/app-back-project/operationGuideRecommend/selectCabinetTableBySid",
	//	//开通屏蔽专柜
	//	"openUpOrShield":"http://172.16.102.106:9080/app-back-project/operationGuideRecommend/openUpOrShield",
	//	//删除专柜
	//	"deleteCabinetBySid":"http://172.16.102.106:9080/app-back-project/operationGuideRecommend/deleteCabinetBySid",
	//	//首页配置品类信息获取
	//	"getCategroys":"http://172.16.102.106:9080/app-back-project/operationGuideRecommend/getCategroys",
	//	//配置全部保存
	//	"saveHomePage":"http://172.16.102.106:9080/app-back-project/operationGuideRecommend/saveHomePage",
	//	//查看配置回显
	//	"selectHomePage":"http://172.16.102.106:9080/app-back-project/operationGuideRecommend/selectHomePage",
	//	//查看所有推荐商品
	//	"selectRecommendAll":"http://172.16.102.106:9080/app-back-project/guideRecommend/selectRecommendAll",
	//	//下架商品
	//	"lowerRecommendCommodity":"http://172.16.102.106:9080/app-back-project/operationGuideRecommend/lowerRecommendCommodity"

	//	//获取门店信息
	"getAllShipList": "http://" + configJs.hostDg + ":" + configJs.portDg +
		"/app-back-project/operationGuideRecommend/getAllShipList",
	//根据门店查供应商  参数:shopSid
	"getSupplyByShop": "http://" + configJs.hostDg + ":" + configJs.portDg +
		"/app-back-project/operationGuideRecommend/getSupplyByShop",
	//根据供应商编码查询品牌  参数:supplySid
	"getAllBrandBySupplySid": "http://" + configJs.hostDg + ":" + configJs.portDg +
		"/app-back-project/operationGuideRecommend/getAllBrandBySupplySid",
	//根据供应商编码和品牌编码查询优惠券 参数:supplySid,brandSid
	"getBrandCouponsBySupplySid": "http://" + configJs.hostDg + ":" + configJs.portDg +
		"/app-back-project/operationGuideRecommend/getBrandCouponsBySupplySid",
	//图片上传demo
	"headImgUpload": "http://" + configJs.hostDg + ":" + configJs.portDg +
		"/app-back-project/operationGuideRecommend/headImgUpload",
	//专柜保存添加
	"saveCabinet": "http://" + configJs.hostDg + ":" + configJs.portDg +
		"/app-back-project/operationGuideRecommend/saveCabinet",
	//查询所有专柜
	"selectCabinetTablAll": "http://" + configJs.hostDg + ":" + configJs.portDg +
		"/app-back-project/operationGuideRecommend/selectCabinetTablAll",
	//编辑前获取专柜信息
	"selectCabinetTableBySid": "http://" + configJs.hostDg + ":" + configJs.portDg +
		"/app-back-project/operationGuideRecommend/selectCabinetTableBySid",
	//开通屏蔽专柜
	"openUpOrShield": "http://" + configJs.hostDg + ":" + configJs.portDg +
		"/app-back-project/operationGuideRecommend/openUpOrShield",
	//删除专柜
	"deleteCabinetBySid": "http://" + configJs.hostDg + ":" + configJs.portDg +
		"/app-back-project/operationGuideRecommend/deleteCabinetBySid",
	//首页配置品类信息获取
	"getCategroys": "http://" + configJs.hostDg + ":" + configJs.portDg +
		"/app-back-project/operationGuideRecommend/getCategroys",
	//配置全部保存
	"saveHomePage": "http://" + configJs.hostDg + ":" + configJs.portDg +
		"/app-back-project/operationGuideRecommend/saveHomePage",
	//查看配置回显
	"selectHomePage": "http://" + configJs.hostDg + ":" + configJs.portDg +
		"/app-back-project/operationGuideRecommend/selectHomePage",
	//查看所有推荐商品
	"selectRecommendAll": "http://" + configJs.hostDg + ":" + configJs.portDg +
		"/app-back-project/guideRecommend/selectRecommendAll",
	//查看推荐专柜详情
	"selectRecommendByCabinetTableSid": "http://" + configJs.hostDg + ":" + configJs.portDg +
		"/app-back-project/guideRecommend/selectRecommendByCabinetTableSid",
	//下架商品
	"lowerRecommendCommodity": "http://" + configJs.hostDg + ":" + configJs.portDg +
		"/app-back-project/operationGuideRecommend/lowerRecommendCommodity",

}

Date.prototype.format = function(format) {
	var date = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S+": this.getMilliseconds()
	};
	if(/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for(var k in date) {
		if(new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
				date[k] : ("00" + date[k]).substr(("" + date[k]).length));
		}
	}
	return format;
}

export default configJs;
