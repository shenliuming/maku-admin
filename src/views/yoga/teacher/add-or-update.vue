<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" draggable>
  <el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" :label-width="100">
  <el-form-item label="姓名" prop="name">
      <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="phone">
      <el-input v-model="dataForm.phone" placeholder="手机号"></el-input>
  </el-form-item>
  <el-form-item label="头像" prop="avatar">
      <el-input v-model="dataForm.avatar" placeholder="头像"></el-input>
  </el-form-item>
  <el-form-item label="关联会员ID" prop="memberId">
      <el-input v-model="dataForm.memberId" placeholder="关联会员ID"></el-input>
  </el-form-item>
  <el-form-item label="状态 0:离职 1:在职" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态 0:离职 1:在职"></el-input>
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
import { useYogaTeacherApi, useYogaTeacherSubmitApi } from '@/api/yoga/teacher'

const emit = defineEmits(['refreshDataList'])

const visible = defineModel<boolean>('visible')
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	name: '',
	phone: '',
	avatar: '',
	memberId: '',
	status: '',
	createTime: ''})

const init = (id?: number) => {
	if (id) {
		getTeacher(id)
	}
}

const getTeacher = (id: number) => {
	useYogaTeacherApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	phone: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	avatar: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	memberId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	status: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate(async (valid: boolean) => {
		if (!valid) {
			return false
		}


		useYogaTeacherSubmitApi(dataForm).then(() => {
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
