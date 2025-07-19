<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
  <el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" :label-width="100">
  <el-form-item label="课程名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="课程名称"></el-input>
  </el-form-item>
  <el-form-item label="1-私教 2-小班 3-团课 4-精品课" prop="type">
      <el-input v-model="dataForm.type" placeholder="1-私教 2-小班 3-团课 4-精品课"></el-input>
  </el-form-item>
  <el-form-item label="时长(分钟)" prop="duration">
      <el-input v-model="dataForm.duration" placeholder="时长(分钟)"></el-input>
  </el-form-item>
  <el-form-item label="状态 0:禁用 1:启用" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态 0:禁用 1:启用"></el-input>
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
import { useYogaCourseApi, useYogaCourseSubmitApi } from '@/api/yoga/course'

const emit = defineEmits(['refreshDataList'])

const visible = defineModel<boolean>('visible')
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	name: '',
	type: '',
	duration: '',
	status: '',
	version: '',
	deleted: '',
	createTime: ''})

const init = (id?: number) => {
	if (id) {
		getCourse(id)
	}
}

const getCourse = (id: number) => {
	useYogaCourseApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	type: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	duration: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	status: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}


		useYogaCourseSubmitApi(dataForm).then(() => {
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
