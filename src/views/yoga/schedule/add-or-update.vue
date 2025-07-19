<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
  <el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" :label-width="100">
  <el-form-item label="课程ID" prop="courseId">
      <el-input v-model="dataForm.courseId" placeholder="课程ID"></el-input>
  </el-form-item>
  <el-form-item label="老师ID" prop="teacherId">
      <el-input v-model="dataForm.teacherId" placeholder="老师ID"></el-input>
  </el-form-item>
  <el-form-item label="场地ID" prop="spaceId">
      <el-input v-model="dataForm.spaceId" placeholder="场地ID"></el-input>
  </el-form-item>
  <el-form-item label="开始时间" prop="startTime">
      <el-input v-model="dataForm.startTime" placeholder="开始时间"></el-input>
  </el-form-item>
  <el-form-item label="结束时间" prop="endTime">
      <el-input v-model="dataForm.endTime" placeholder="结束时间"></el-input>
  </el-form-item>
  <el-form-item label="最大名额" prop="maxSeats">
      <el-input v-model="dataForm.maxSeats" placeholder="最大名额"></el-input>
  </el-form-item>
  <el-form-item label="已预约数" prop="bookedSeats">
      <el-input v-model="dataForm.bookedSeats" placeholder="已预约数"></el-input>
  </el-form-item>
  <el-form-item label="1-可预约 2-已满 3-取消" prop="status">
      <el-input v-model="dataForm.status" placeholder="1-可预约 2-已满 3-取消"></el-input>
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
import { useYogaScheduleApi, useYogaScheduleSubmitApi } from '@/api/yoga/schedule'

const emit = defineEmits(['refreshDataList'])

const visible = defineModel<boolean>('visible')
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	courseId: '',
	teacherId: '',
	spaceId: '',
	startTime: '',
	endTime: '',
	maxSeats: '',
	bookedSeats: '',
	status: '',
	createTime: ''})

const init = (id?: number) => {
	if (id) {
		getSchedule(id)
	}
}

const getSchedule = (id: number) => {
	useYogaScheduleApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	courseId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	teacherId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	spaceId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	startTime: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	endTime: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	maxSeats: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	bookedSeats: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	status: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}


		useYogaScheduleSubmitApi(dataForm).then(() => {
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
