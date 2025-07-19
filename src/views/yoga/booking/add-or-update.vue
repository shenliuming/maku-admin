<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
  <el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" :label-width="100">
  <el-form-item label="会员ID" prop="memberId">
      <el-input v-model="dataForm.memberId" placeholder="会员ID"></el-input>
  </el-form-item>
  <el-form-item label="排期ID" prop="scheduleId">
      <el-input v-model="dataForm.scheduleId" placeholder="排期ID"></el-input>
  </el-form-item>
  <el-form-item label="1-预约中 2-已完成 3-已取消" prop="status">
      <el-input v-model="dataForm.status" placeholder="1-预约中 2-已完成 3-已取消"></el-input>
  </el-form-item>
  </el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useYogaBookingApi, useYogaBookingSubmitApi } from '@/api/yoga/booking'

const emit = defineEmits(['refreshDataList'])

const visible = defineModel<boolean>('visible')
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	memberId: '',
	scheduleId: '',
	status: '',
	createTime: ''})

const init = (id?: number) => {
	if (id) {
		getBooking(id)
	}
}

const getBooking = (id: number) => {
	useYogaBookingApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	memberId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	scheduleId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	status: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}


		useYogaBookingSubmitApi(dataForm).then(() => {
			ElMessage.success({
				message: '操作成功',
				duration: 500,
				onClose: () => {
					visible.value = false
					emit('refreshDataList')
				}
			})
		})
	})
}

defineExpose({
	init
})
</script>
